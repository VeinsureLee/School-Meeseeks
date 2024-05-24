# 学校通：为新生介绍学校的语音聊天小程序

## 目录：

### 一、[简介](#1.0)

#### 	1、[设计目的](#1.1)

#### 	2、[设计思路](#1.2)

#### 	3、[设计框架](1.3)

#### 	4、[依赖库](1.4)

### 二、[服务器](#2.0)

#### 	1、[语音转文字](2.1)

#### 	2、[文字转语音](2.2)

#### 	3、[错字过滤](2.3)

#### 	4、[相关性判断](2.4)

#### 	5、[服务器通信](2.5)

### 三、[前端](#3.0)

#### 	1、[首页](3.1)

#### 	2、[聊天页面（文字与语言）](3.2)

#### 	3、[用户界面](3.3)

### 四、[详细解读](https://blog.csdn.net/weixin_72501900/category_12653508.html)

<div id = "1.0"></div>

## 一、简介

<div id = "1.1"></div>

### 1、设计目的

​	向大一新生介绍大学相关内容的app。可以与新生语音互动，文字互动。以及判断所问问题与所在大学的相关性，若相关性弱将不予理睬。

<div id = "1.2"></div>

### 2、设计思路

​	前端：采用uniapp设计页面。在APP中实现首页（学校的相关信息以及介绍），聊天页面（完成以语音为主和以文字为主两种方式的与AI聊天功能），用户页面（用户学号姓名等等）。

​	服务器：采用python的http搭建。并采用openai开源的whisper模型进行语音转文字功能。以及采用词向量的方法训练模型，完成过滤功能（纠正错字并判断所问问题与学校相关性）

<div id = "1.3"></div>

### 3、设计框架

​	前端：采用uniapp设计页面。在APP中实现首页（学校的相关信息以及介绍），聊天页面（完成以语音为主和以文字为主两种方式的与AI聊天功能），用户页面（用户学号姓名等等）。

​	服务器：采用python的http搭建。并采用openai开源的whisper模型进行语音转文字功能。以及采用词向量的方法训练模型，完成过滤功能（纠正错字并判断所问问题与学校相关性）

<div id = "1.4"></div>

### 4、依赖库

​	服务器：http.server，cgi，wordVec，os，jieba，pyttsx3，whisper，gensim.models

​	uniapp：暂无

<div id = "2.0"></div>

## 二、服务器

<div id = "2.1"></div>

### 1、语音转文字（voice to text：vtt.py)

​	采用openai开源的whisper模型（下载与安装详见：https://github.com/openai/whisper）

<div id = "2.2"></div>

### 2、文字转语音（test to voice： vtt.py）

​	采用pyttvx3：

```
engine = pyttsx3.init()
engine.save_to_file(text, os.path.join(VOICE_FOLDER, 'voice.mp3'))
engine.runAndWait()
```

<div id = "2.3"></div>

### 3、错字过滤

​	自行搜集语音转文字的识别结果，并将其存放在corpus.txt中，将易错词提取通过model_train.py进行训练模型并将模型进行保存（名称自定义）。在test.py中即可调用此模型进行拼音的过滤。

<div id = "2.4"></div>

### 4、相关性判断

​	下载词意词向量模型，存放在words_filter文件夹中。这里给出一个词向量文件下载地址：https://ai.tencent.com/ailab/nlp/en/embedding.html。

<div id = "2.5"></div>

### 5、服务器通信

​	http.server通信，注意更改以及补充文件夹名称。

<div id = "3.0"></div>

## 三、前端

<div id = "3.1"></div>

### 1、首页

​	实现轮播图效果，轮播学校相关图片；新闻栏效果，显示学校常用网址

<div id = "3.2"></div>

### 2、聊天界面

​	实现类似微信聊天的聊天界面，并同时设置一个按钮，使其能进入纯语言聊天模式（类似gpt）

<div id = "3.3"></div>

### 3、用户界面

​	用户可以实现替换头像功能，并显示姓名学号

