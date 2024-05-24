# 调用模型，完成拼音过滤
from gensim.models import Word2Vec
import jieba
# 加载模型
# 填写模型名称
MODEL_NAME = ""
model = Word2Vec.load(MODEL_NAME)


# 替换关键词函数
def replace_similar_pronunciation_words(sentence, target_word, threshold=0.8):
    replaced_sentence = []
    sentence_split = jieba.lcut(sentence)
    for word in sentence_split:
        if word not in model.wv:
            print(word, "pass")
            replaced_sentence.append(word)
            continue
        # 计算词语与目标词语的相似度
        similarity = abs(model.wv.similarity(word, target_word))
        print(word, similarity)
        if similarity > threshold:
            replaced_sentence.append(target_word)
        else:
            replaced_sentence.append(word)

    return ''.join(replaced_sentence)


def correct(sentence, target_words, threshold=0.6):
    for target_word in target_words:
        print("\n", target_word, "检测：")
        sentence = replace_similar_pronunciation_words(sentence, target_word, threshold)
        print("纠正", target_word, "后的句子：", sentence)
    return sentence


def replace_with_most_similar_word(sentence, threshold=0.8):
    replaced_sentence = []
    sentence_split = jieba.lcut(sentence)

    for word in sentence_split:
        if word not in model.wv:
            print("pass", word)
            replaced_sentence.append(word)
            continue

        # 查询最相似的词
        similar_words = model.wv.most_similar(word, topn=1)
        if similar_words:
            similar_word, similarity = similar_words[0]
            print(word, similar_word, similarity)
            if similarity > threshold:
                replaced_sentence.append(similar_word)
            else:
                replaced_sentence.append(word)
        else:
            replaced_sentence.append(word)

    return ''.join(replaced_sentence)


if __name__ == '__main__':
    # 测试
    sentence = input("sentence:")
    target_word = "target words:"
    print(jieba.lcut(sentence))
    replaced = correct(sentence)
    print("原句:", sentence)
    print("替换后:", replaced)



