<template>
  <div>
    <view class="table">
      <view class="row header">
        <view class="cell">尺寸</view>
        <view class="cell">参数</view>
        <view class="cell">所需VRAM</view>
        <view class="cell">速度</view>
      </view>
      <view v-for="(item, index) in modelSizes" :key="index" class="row">
        <view class="cell">{{ item.尺寸 }}</view>
        <view class="cell">{{ item.参数 }}</view>
        <view class="cell">{{ item['所需VRAM'] }}</view>
        <view class="cell">{{ item['速度'] }}</view>
      </view>
    </view>

    <div class="info">
      <p>1、本语音识别app采用OPENAI开源的whisper模型，模型参数如上。</p>
      <p>2、当前模型为基本，如果你想切换模型，请用文本输入：“切换模型”+“模型尺寸”</p>
      <p>3、该模型详情链接：<a href="https://github.com/openai/whisper" target="_blank">https://github.com/openai/whisper</a></p>
    </div>
  </div>
</template>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px; /* 添加间隔 */
}

.row {
  display: flex;
}

.header {
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.cell {
  flex: 1;
  padding: 8px;
  text-align: center;
  border-right: 1px solid #ddd;
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.cell:last-child {
  border-right: none;
}

.info {
  margin-top: 20px; /* 添加间隔 */
}

.info p {
  margin-bottom: 10px; /* 添加间隔 */
}
</style>

<script>
export default {
  data() {
    return {
      modelSizes: [
        { 尺寸: '微型', 参数: '39 M', '所需VRAM': '~1 GB', '速度': '~32x' },
        { 尺寸: '基本', 参数: '74 M', '所需VRAM': '~1 GB', '速度': '~16x' },
        { 尺寸: '小型', 参数: '244 M', '所需VRAM': '~2 GB', '速度': '~6x' },
        { 尺寸: '中型', 参数: '769 M', '所需VRAM': '~5 GB', '速度': '~2x' },
        { 尺寸: '大型', 参数: '1550 M', '所需VRAM': '~10 GB', '速度': '1x' }
      ]
    };
  }
};
</script>
