# 读取项目文件夹
import os


def read_size_txt(folder_path, text_name):
    # 检查文件夹路径是否存在
    if not os.path.exists(folder_path):
        print("文件夹路径不存在")
        return None

    # 构造 size.txt 文件的完整路径
    file_path = os.path.join(folder_path, text_name)

    # 检查文件是否存在
    if not os.path.isfile(file_path):
        print("size.txt 文件不存在")
        return None

    # 读取 size.txt 文件的内容并返回
    with open(file_path, 'r') as f:
        return f.read()


def modify_size_txt(folder_path, new_content, text_name):
    # 构造 size.txt 文件的完整路径
    file_path = os.path.join(folder_path, text_name)

    # 检查文件是否存在
    if not os.path.isfile(file_path):
        print(text_name + "文件不存在")
        return

    # 写入新内容到 size.txt 文件中
    with open(file_path, 'w') as f:
        f.write(new_content)

    print(text_name + "文件内容已修改")

