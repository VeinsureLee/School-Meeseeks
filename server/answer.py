# 生成回答函数，方便调用
from api import *


def answer(recognized_text):
    my_ans = require_ans(
        appid="",
        api_secret="",
        api_key="",
        # appid、api_secret、api_key三个服务认证信息请前往开放平台控制台查看（https://console.xfyun.cn/services/bm35）
        gpt_url="wss://spark-api.xf-yun.com/v3.5/chat",
        # Spark_url = "ws://spark-api.xf-yun.com/v3.1/chat"  # v3.0环境的地址
        # Spark_url = "ws://spark-api.xf-yun.com/v2.1/chat"  # v2.0环境的地址
        # Spark_url = "ws://spark-api.xf-yun.com/v1.1/chat"  # v1.5环境的地址
        domain="generalv3.5",
        # domain = "generalv3"    # v3.0版本
        # domain = "generalv2"    # v2.0版本
        # domain = "general"    # v2.0版本
        query=recognized_text
    )
    return my_ans
