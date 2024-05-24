<template>
	<button @tap="toggleVoiceInput" class="voice-btn">{{ voiceInputText }}</button>
	<image v-if="showRecording" class="recording-animation" src="/static/recording_speaking/recording.gif"></image>
	<image v-if="showRecognizing" class="recognizing-animation" src="/static/recording_speaking/recognizing.gif"></image>
	<image v-if="showSpeaking" class="speaking-animation" src="/static/recording_speaking/speaking.gif"></image>
	<image v-if="errReciving" class = "err-animation" src = "../../static/chat/logo.png"></image>
	<!-- <view class="test-text">测试文本</view> -->
</template>  

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
//录音上传
const url_ask_voice = 'http://IP:port/history/ask/voice';
//语音转文字 上传文字
const url_send_text = 'http://IP:port/change/text'; 
//语音转文字，下载音频
const url_download_audio = 'http://IP:port/change/voice/voice.mp3';
//文本信息上传
const url_ask_text = 'http://IP:port/history/ask/text'; 
export default {
  data() {
    return {
      messages: [], // 存储聊天消息
      newMessage: '', // 当前输入的消息
      isRecording: false, // 是否正在录音
      voicePath: '', // 存储语音文件路径
	  showRecording: false,
	  showRecognizing: false,
	  showSpeaking: false,
	  errReciving: false,
    };
  },
  onLoad() {
    innerAudioContext.autoplay = true;
    const self = this;
    recorderManager.onStop(function(res) {
      console.log('recorder stop', res);
      self.voicePath = res.tempFilePath;
    });
  },
  computed: {
    voiceInputText() {
      return this.isRecording ? '录音中' : '语音';
    }
  },
  methods: {
	stopAudioPlayback() {
	  if (innerAudioContext && innerAudioContext.paused === false) {
		innerAudioContext.stop(); // 停止音频播放
	  }
	},
	receiveAnswer(text) {
	  return new Promise((resolve, reject) => {
	    uni.request({
	      url: url_ask_text,
	      method: 'POST',
	      header: {
	        'Content-Type': 'application/json'
	      },
	      data: {
	        text: text // 发送消息内容到服务器
	      },
	      success: res => {
	        console.log('文本已发送到服务器');
	        const ans = res.data;
	        resolve(ans); // 返回服务器的回答
	      },
	      fail: err => {
	        console.error('请求失败', err);
	        reject(err); // 返回错误信息
	      }
	    });
	  });
	},
	
	//发送消息（点击发送按钮）并接收消息
	sendMessage() {
	  if (this.newMessage.trim() === '') return;
	  const userMessage = this.newMessage.trim();
	  console.log("发送信息", userMessage);
	  // 发送用户消息
	  this.messages.push({
	    type: 'send',
	    content: userMessage
	  });
	  	  
	  // 接收回答
	  this.receiveAnswer(userMessage)
	    .then(ans => {
	      console.log("收到回答", ans);
	      // 接收到回答后将其显示
	    })
	    .catch(err => {
	      console.error("接收回答失败", err);
	    });
	},

    //录音输入
	toggleVoiceInput() {
	  this.isRecording = !this.isRecording;
	  if (this.isRecording) {
	    // 开始录音逻辑
	    console.log('开始录音');
	    recorderManager.start();
		this.showRecording = true;
		this.showRecognizing = false;
		this.showSpeaking = false;
		this.errReciving = false;
	  } else {
	    // 结束录音逻辑
	    console.log('结束录音');
	    recorderManager.stop();
		this.showRecording = false;
		this.showRecognizing = true;
		this.showSpeaking = false;
		this.errReciving = false;
	  }
	  const self = this; // 捕获当前上下文
	  recorderManager.onStop(function(res) {
	    console.log('recorder stop', res);
	    self.voicePath = res.tempFilePath;
	    if (self.voicePath) {
	      uni.uploadFile({
	        url: url_ask_voice,
	        filePath: self.voicePath,
	        name: 'audio',
	        success: function(res) {
	          // 语音识别成功后发送消息和接收回复
	          const recognitionResult = res.data;
	          self.handleVoiceRecognition(recognitionResult);
	        },
	        fail: function(err) {
	          console.error('语音识别请求失败', err);
	        }
	      });
	    } else {
	      console.error('没有录制的语音可用');
	    }
	    // 使用完毕后清空 voicePath
	    self.voicePath = '';
	  });
	},

	//发送处理的录音结果
	handleVoiceRecognition(text) {
      // 处理语音识别结果
      if (text === '') return;
      const userMessage = text;
      console.log("发送信息", userMessage);
            
      // 接收回答
      this.receiveAnswer(userMessage)
        .then(ans => {
          console.log("收到回答", ans);
          this.chattovoice(ans);
        })
        .catch(err => {
          console.error("接收回答失败", err);
		  this.showRecording = false;
		  this.showRecognizing = false;
		  this.showSpeaking = false;
		  this.errReciving = true;
        });
    },
	//把聊天文字转化为语音
    chattovoice(message) {
      // 点击聊天消息右侧按钮，发送文本到服务器
      uni.request({
        url: url_send_text,
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          text: message // 发送消息内容到服务器
        },
        success: res => {
          console.log('文本已发送并处理成功');
        },
        fail: err => {
          console.error('请求失败', err);
        }
      });
      console.log('播放语音:', message.content);
	  
	  uni.downloadFile({
	    url: url_download_audio,
	    success: res => {
	      if (res.statusCode === 200) {
	        // 下载成功，设置音频路径并播放
			console.log('下载成功');
	        innerAudioContext.src = res.tempFilePath;
			this.showRecording = false;
			this.showRecognizing = false;
			this.showSpeaking = true;
			this.errReciving = false;
	        innerAudioContext.play();
			innerAudioContext.onEnded(() => {
				this.showRecording = false;
				this.showRecognizing = false;
				this.showSpeaking = false;
				this.errReciving = false;
			});
			
	      } else {
	        console.error('下载失败，请先上传文本', res);
			this.showRecording = false;
			this.showRecognizing = false;
			this.showSpeaking = false;
			this.errReciving = true;
	      }
	    },
		
	    fail: err => {
	      console.error('下载音频文件失败', err);
		  this.showRecording = false;
		  this.showRecognizing = false;
		  this.showSpeaking = false;
		  this.errReciving = true;
	    },
		
	  });
    },
	onUnload() {
	    this.stopAudioPlayback(); // 调用停止音频播放的方法
	},
	

  }
};
</script>
<style>
/* 添加这个样式来设置图标边框为透明 */
.voice-icon {
  position: absolute;
  top: 50%;
  right: 10px; /* 将按钮移到聊天框的右边 */
  transform: translateY(-50%);
  background: transparent; /* 设置背景为透明 */
  border: none; /* 移除按钮边框 */
  padding: 0;
}

.icon {
  width: 20px;
  height: 20px;
}

.voice-btn {
	top: 100%;
	margin-left: 10px;
	padding: 10px 20px;
	border-radius: 20px;
}

.voice-btn {
	background-color: #007AFF;
	color: #fff;
}

.recording-animation,
.recognizing-animation,
.speaking-animation,
.err-animation {
  position: absolute;
  top: 20%; /* 居中 */
  left: 50%; /* 居中 */
  transform: translate(-50%, -50%); /* 居中 */
  z-index: 9999; /* 确保它在其他元素之上 */
  width: 200px;
  height: 200px;
}
</style>