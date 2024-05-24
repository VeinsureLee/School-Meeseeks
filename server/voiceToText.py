# 该模块编写函数进行语音转文字
import whisper


def vtt(file_path, LANGUAGE, size):
    model = whisper.load_model(size)
    result = model.transcribe(file_path, language=LANGUAGE)
    recognized_text = result["text"]
    print(result)
    return recognized_text
