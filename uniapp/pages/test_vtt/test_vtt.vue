<template>
  <view>
    <view class="audioPlay">
      <button @click="startRecord">开始录音</button>
      <button @click="endRecord">停止录音</button> 
      <button @click="playVoice">播放录音</button>
      <button @click="uploadVoice">上传录音</button>
	  <button @click="speechToText">语音识别</button>
    </view>
	<view v-if="recognizedText !== ''" class="recognizedTextContainer">
	      <text class="recognizedText">{{ recognizedText }}</text> <!-- 显示识别结果 -->
	    </view>
  </view>
</template>

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
const url_upload_audio = 'http://IP:port/uploads/audio/audio';
const url_upload_audio_question = 'http://IP:port/uploads/audio/audio';
export default {
  data() {
    return {
      voicePath: '',
	  recognizedText: '' // 存储识别结果
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
  methods: {
    startRecord() {
      console.log('开始录音');
      recorderManager.start();
    },
    endRecord() {
      console.log('录音结束');
      recorderManager.stop();
    },
    playVoice() {
      console.log('播放录音');
      if (this.voicePath) {
        innerAudioContext.src = this.voicePath;
        innerAudioContext.play();
      } else {
        console.error('No recorded audio available');
      }
    },
    uploadVoice() {
      console.log('上传录音');
      if (this.voicePath) {
        uni.uploadFile({
          url: url_upload_audio,
          filePath: this.voicePath,
          name: 'audio',
          success: (res) => {
            console.log('Upload success', res);
          },
          fail: (err) => {
            console.error('Upload fail', err);
          }
        });
      } else {
        console.error('No recorded audio available');
      }
    },
	speechToText() {
	      console.log('语音识别');
	      if (this.voicePath) {
	        const self = this;
	        uni.uploadFile({
	          url: url_upload_audio,
	          filePath: this.voicePath,
	          name: 'audio',
	          success: function(res) {
	            // 服务器返回的识别结果在 res.data 中
	            self.recognizedText = res.data; // 更新识别结果
	          },
	          fail: function(err) {
	            console.error('Speech to text request failed', err);
	          }
	        });
	      } else {
	        console.error('No recorded audio available');
	      }
	    }
  }
};
</script>

<style scoped>
.audioPlay {
  display: flex;
  flex-direction: row;
}
.recognizedTextContainer {
  width: 100%; /* 设置容器宽度为100% */
  display: flex; /* 使用 Flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.recognizedText {
	font-size: 20px;
	color: #333;
  /* 这里可以添加文本样式，比如字体大小、颜色等 */
}
button {
  margin-right: 10px;
}
</style>
