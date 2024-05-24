# 过滤是否与关键词相关
import os
import jieba


def load_words(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return [line.strip() for line in file.readlines()]

# rwords, wwords, bwords分别是正确，错误，模糊词的txt


def filter_text(file_text_path, file_text_name, embedding_sim, rwords, wwords, bwords):
    print("过滤器以及词库加载中")
    # 加载词库
    right_words = load_words(rwords)
    wrong_words = load_words(wwords)
    between_words = load_words(bwords)
    print("过滤器以及词库加载完毕")

    # 读取聊天文本
    with open(os.path.join(file_text_path, file_text_name), 'r', encoding='utf-8') as file:
        text = file.read()

    # 分词
    words = jieba.lcut(text)

    # 检查分词后的每个词
    for word in words:
        for right_word in right_words:
            if embedding_sim.calculate_similarity(word, right_word) > 0.9:
                print("相关")
                return 1

        for wrong_word in wrong_words:
            if embedding_sim.calculate_similarity(word, wrong_word) > 0.9:
                print("不相关")
                return 0

        for between_word in between_words:
            if embedding_sim.calculate_similarity(word, between_word) > 0.9:
                print("模糊")
                previous_file = get_previous_file(file_text_path, file_text_name)
                print("上一个")
                if previous_file:
                    result = filter_text(file_text_path, previous_file, embedding_sim, rwords, wwords, bwords)
                    if result != -1:
                        return result

    return -1


def get_previous_file(folder_path, current_file):
    files = sorted(os.listdir(folder_path))
    current_index = files.index(current_file)
    if current_index > 0:
        return files[current_index - 1]
    return None


# if __name__ == "__main__":
#     folder_path = 'history/ask/text'
#     file_text_path = 'history/ask/text'
#     file_text_name = '2024-05-15_13-46-45.txt'
#     WRONG_WORDS_TXT = 'words_filter/university.txt'
#     RIGHT_WORDS_TXT = 'words_filter/BUPT_name_nickname.txt'
#     BETWEEN_R_W_WORDS_TXT = 'words_filter/模糊词.txt'
#
#     embedding_file = 'wordVectxt/tencent-ailab-embedding-zh-d200-v0.2.0-s.txt'
#     embedding_sim = EmbeddingSimilarity(embedding_file)
#
#     result = filter_text(file_text_path, file_text_name, embedding_sim, RIGHT_WORDS_TXT, WRONG_WORDS_TXT,
#                          BETWEEN_R_W_WORDS_TXT)
#     print(f'Result for file {file_text_name}: {result}')
