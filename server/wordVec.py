# 词意词向量，载入embedding初始化
import numpy as np


class EmbeddingSimilarity:
    def __init__(self, embedding_file):
        print("词向量初始化中")
        self.embeddings_index = self.load_embeddings(embedding_file)
        print("词向量初始化成功")

    # 读取词向量文件
    def load_embeddings(self, embedding_file):
        embeddings_index = {}
        with open(embedding_file, 'r', encoding='utf-8') as f:
            for line in f:
                values = line.strip().split(' ')
                word = values[0]
                coefs = np.asarray(values[1:], dtype='float32')
                embeddings_index[word] = coefs
        return embeddings_index

    # 计算两个向量的余弦相似度
    def cosine_similarity(self, vector1, vector2):
        dot_product = np.dot(vector1, vector2)
        norm1 = np.linalg.norm(vector1)
        norm2 = np.linalg.norm(vector2)
        return dot_product / (norm1 * norm2)

    # 计算两个词的余弦相似度
    def calculate_similarity(self, word1, word2):
        if word1 not in self.embeddings_index or word2 not in self.embeddings_index:
            return 0.0

        word1_embedding = self.embeddings_index[word1]
        word2_embedding = self.embeddings_index[word2]

        similarity = self.cosine_similarity(word1_embedding, word2_embedding)
        return similarity


if __name__ == "__main__":
    # 填写模型名称
    embedding_file = ""
    similarity_calculator = EmbeddingSimilarity(embedding_file)

    word1 = "北京"
    word2 = "上海"

    similarity = similarity_calculator.calculate_similarity(word1, word2)
    print(f"词 '{word1}' 和词 '{word2}' 的相关性：{similarity}")

    while True:
        word1 = input("请输入第一个词：")
        word2 = input("请输入第二个词：")

        similarity = similarity_calculator.calculate_similarity(word1, word2)
        print(f"词 '{word1}' 和词 '{word2}' 的相关性：{similarity}")


