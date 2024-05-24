<template>
  <view class="container">
    <input v-model="inputText" type="text" placeholder="请输入文本" />
    <button @click="submit">提交</button>
    <button @click="downloadAndPlay">下载并播放语音</button>
  </view>
</template>

<script>
const innerAudioContext = uni.createInnerAudioContext();
export default {
  data() {
    return {
      inputText: '', // 用于存储输入的文本
      audioSrc: ''   // 用于存储音频文件的URL
    };
  },
  onLoad() {
    innerAudioContext.autoplay = true;
    const self = this;
  },
  methods: {
    submit() {
      // 发送文本到服务器
      uni.request({
        url: 'http://10.21.198.127:8000/receive_text',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          text: this.inputText
        },
        success: res => {
          console.log('文本已发送并处理成功');
        },
        fail: err => {
          console.error('请求失败', err);
        }
      });
    },
    downloadAndPlay() {
      uni.downloadFile({
        url: 'http://10.21.198.127:8000/voice/voice.mp3',
        success: res => {
          if (res.statusCode === 200) {
            // 下载成功，设置音频路径并播放
            innerAudioContext.src = res.tempFilePath;
            innerAudioContext.play();
          } else {
            console.error('下载失败，请先上传文本', res);
          }
        },
        fail: err => {
          console.error('下载音频文件失败', err);
        },
      });
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}
</style>
