# 转化模型大小函数
def size_change(text):
    if text[:4] == "切换模型":
        if text[4:] == '微型':
            return 'tiny'
        elif text[4:] == '基本':
            return 'base'
        elif text[4:] == '小型':
            return 'small'
        elif text[4:] == '中型':
            return 'medium'
        elif text[4:] == '大型':
            return 'large'
        else:
            return 0
    return 0


