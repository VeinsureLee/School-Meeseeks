<template>
  <view>
    <button @click="goTextToSpeech">文字转语音</button>
    <button @click="goSpeechToText">语音转文字</button>
  </view>
</template>

<script>
export default {
  methods: {
    goTextToSpeech() {
      uni.navigateTo({
        url: '/pages/test_ttv/test_ttv'
      });
    },
    goSpeechToText() {
      uni.navigateTo({
        url: '/pages/test_vtt/test_vtt'
      });
    }
  }
};
</script>

<style scoped>
button {
  margin: 10px;
}
</style>
