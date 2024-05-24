# 该函数编写文字转语音部分
import os
import pyttsx3
import datetime


def ttv(text, VOICE_FOLDER):
    engine = pyttsx3.init()
    engine.save_to_file(text, os.path.join(VOICE_FOLDER, 'voice.mp3'))
    engine.runAndWait()
