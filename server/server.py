# 最终服务器
from http.server import BaseHTTPRequestHandler, HTTPServer
import cgi
from api import *
from filter import filter_text
from textToVoice import ttv
from voiceToText import vtt
from answer import answer
from size_change import size_change
from read import read_size_txt
from read import modify_size_txt
from wordVec import EmbeddingSimilarity
from test import correct


# 设置文件夹
HISTORY_FOLDER                      = 'history'
HISTORY_ASK_FOLDER                  = 'history/ask'
HISTORY_ANSWER_TEXT_FOLDER          = 'history/answer/text'
HISTORY_ANSWER_VOICE_FOLDER         = 'history/answer/voice'
HISTORY_ASK_TEXT_FOLDER             = 'history/ask/text'
HISTORY_ASK_VOICE_FOLDER            = 'history/ask/voice'
CHANGE_FOLDER                       = 'change'
CHANGE_TEXT_FOLDER                  = 'change/text'
CHANGE_VOICE_FOLDER                 = 'change/voice'
MODEL_SIZE                          = 'model_size'
MODEL_SIZE_TXT                      = 'size.txt'
EMBEDDINGFILE_TXT                   = ""                    # 查看wordVectxt文件夹里面的下载链接
WRONG_WORDS_TXT                     = ""                    # 快速查询错误单词
RIGHT_WORDS_TXT                     = ""                    # 快速查询正确单词
BETWEEN_R_W_WORDS_TXT               = ""                    # 模糊词


class RequestHandler(BaseHTTPRequestHandler):
    embedding_sim = None

    def _set_headers(self, status_code=200, content_type='application/json'):
        self.send_response(status_code)
        self.send_header('Content-type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    # 服务器向前端传输数据
    def do_GET(self):
        if self.path.startswith(CHANGE_VOICE_FOLDER + '/voice.mp3'):
            try:
                with open(os.path.join(CHANGE_VOICE_FOLDER, 'voice.mp3'), 'rb') as f:
                    self._set_headers(status_code=200, content_type='audio/mpeg')
                    self.wfile.write(f.read())
            except FileNotFoundError:
                self._set_headers(status_code=404)
                self.wfile.write(json.dumps({"error": "File not found"}).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode('utf-8'))

    def do_POST(self):
        # 上传数据为文本时，将其语音播放（文字转语音）
        if self.path == CHANGE_TEXT_FOLDER:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            text = data.get('text')
            print(text)

            if text:
                # 保存
                file_text_name = datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.txt'
                file_text_path = f'./change/{file_text_name}'
                with open(file_text_path, 'w', encoding='utf-8') as file:
                    file.write(text)

                # 转化
                ttv(text, CHANGE_VOICE_FOLDER)

                self._set_headers()
                self.wfile.write(json.dumps({"message": "Text received and processed"}).encode('utf-8'))
            else:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": "Text not provided"}).encode('utf-8'))

        # 上传数据为语音时将其转化为文本并保存
        elif self.path == HISTORY_ASK_VOICE_FOLDER:
            self._set_headers()
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={'REQUEST_METHOD': 'POST'}
            )
            uploaded_file = form['audio']
            file_voice_name = datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.mp3'
            file_voice_path = f'./history/ask/voice/{file_voice_name}'
            with open(file_voice_path, 'wb') as f:
                f.write(uploaded_file.file.read())

            # 使用 Whisper 模型进行语音识别
            size = read_size_txt(MODEL_SIZE, MODEL_SIZE_TXT)
            recognized_text = vtt(file_voice_path, "Chinese", size)
            recognized_text = correct(recognized_text)
            file_text_name = datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.txt'
            file_text_path = f'./history/ask/text/{file_text_name}'
            with open(file_text_path, 'w', encoding='utf-8') as file:
                file.write(recognized_text)

            # 将识别出的文本作为响应发送给前端
            self.wfile.write(recognized_text.encode())
        # 上传数据处理为文本后，调用api生成回答
        elif self.path == HISTORY_ASK_TEXT_FOLDER:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            text = data.get('text')

            file_text_name = datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.txt'
            file_text_path = f'./history/ask/text/{file_text_name}'
            with open(file_text_path, 'w', encoding='utf-8') as file:
                file.write(text)

            if text:
                if size_change(text) != 0:
                    modify_size_txt(MODEL_SIZE, size_change(text), MODEL_SIZE_TXT)
                    ans = '成功切换模型' + size_change(text)
                else:
                    # 检查问题是否与指定内容相关
                    similarity_result = filter_text(HISTORY_ASK_TEXT_FOLDER, file_text_name, self.embedding_sim,
                                                    RIGHT_WORDS_TXT, WRONG_WORDS_TXT, BETWEEN_R_W_WORDS_TXT)
                    if similarity_result == 1:
                        ans = answer(text)
                    else:
                        ans = '抱歉,我只能回答与   的问题'   # 空格处替换为关键词
                file_answer_name = datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.txt'
                file_text_path = f'./history/answer/text/{file_answer_name}'
                with open(file_text_path, 'w', encoding='utf-8') as file:
                    file.write(ans)
                # 将回答作为json响应返回
                self._set_headers()
                self.wfile.write(json.dumps(ans).encode('utf-8'))
            else:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": "Text not provided"}).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode('utf-8'))


def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}')
    # 初始化 EmbeddingSimilarity 类
    embedding_file = EMBEDDINGFILE_TXT
    RequestHandler.embedding_sim = EmbeddingSimilarity(embedding_file)
    httpd.serve_forever()


if __name__ == '__main__':
    run()
