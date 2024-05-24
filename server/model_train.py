# 训练模型（拼音向量），训练集：corpus.txt
import jieba
from gensim.models import Word2Vec
# 定义读取文件和分词的函数
def read_corpus(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            # 使用jieba进行分词
            words = jieba.lcut(line.strip())
            # 对分词结果进行进一步处理，将自定义词典中的词按照自定义词典的方式分开
            processed_words = []
            for word in words:
                if word in ["北京邮电大学"]:
                    processed_words.extend(["北京", "邮电", "大学"])
                else:
                    processed_words.append(word)
            yield processed_words

# 定义文件路径（假设文件名为corpus.txt）
file_path = 'corpus.txt'

# # 读取语料库并分词
sentences = list(read_corpus(file_path))

# 训练Word2Vec模型
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

# 保存模型
MODEL_NAME = ""         # 此处填写你所想要的模型名称
model.save(MODEL_NAME)

