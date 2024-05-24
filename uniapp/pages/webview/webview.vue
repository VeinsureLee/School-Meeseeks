<template>
  <view class="webview">
    <web-view :src="webUrl" :mpcomid="'webview'" :enable-back-forward="true"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      webUrl: ''
    };
  },
  onLoad(options) {
    this.webUrl = decodeURIComponent(options.url);
  }
};
</script>

<style>
.webview {
  width: 100%;
  height: 100%;
}
</style>
