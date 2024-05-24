<template>
  <view class="container">
    <view class="content">
      <canvas canvas-id="myCanvas" style="width: 100%; height: 200rpx;"></canvas>
      <button @touchstart="startRecording">{{ isRecording ? '停止录音' : '开始录音' }}</button>
    </view>
  </view>
</template>

<script>
const innerAudioContext = uni.createInnerAudioContext();
export default {
  data() {
    return {
      ctx: null,
      isRecording: false,
      animationId: null,
      volume: 0,
      voicePath: ''
    };
  },
  onLoad() {
    innerAudioContext.autoplay = true;
  },
  onReady() {
    this.ctx = uni.createCanvasContext('myCanvas', this);
  },
  methods: {
    startRecording() {
      if (!this.isRecording) {
        console.log('Starting recording...');
        uni.getRecorderManager().start({
          success: () => {
            this.isRecording = true;
            this.drawSineWave(); // 开始录音时绘制波形
            // 启动定时器，每100毫秒获取一次录音帧数据并计算音量
            this.animationId = setInterval(this.getVolumeFromRecorder, 100);
          },
          fail: (err) => {
            console.error('Failed to start recording:', err);
          }
        });
      } else {
        console.log('Stopping recording...');
        uni.getRecorderManager().stop({
          success: (res) => {
            console.log('Stop recording success:', res);
            this.isRecording = false;
            clearInterval(this.animationId); // 停止定时器
            this.clearCanvas();
          },
          fail: (err) => {
            console.error('Failed to stop recording:', err);
          }
        });
      }
    },
    getVolumeFromRecorder() {
      uni.getRecorderManager().onFrameRecorded((res) => {
        const frameBuffer = new Float32Array(res.frameBuffer);
        const volume = this.calculateVolume(frameBuffer);
        this.volume = volume;
        console.log('Volume:', volume);
        this.drawSineWave(); // 获取音量后更新波形
      });
    },
    calculateVolume(buffer) {
      let sum = 0;
      for (let i = 0; i < buffer.length; i++) {
        sum += buffer[i] * buffer[i];
      }
      const rms = Math.sqrt(sum / buffer.length);
      console.log('RMS:', rms);
      return rms;
    },
    drawSineWave() {
      const width = uni.upx2px(750);
      const height = uni.upx2px(200);
      let amplitude = this.volume * 50;
      const frequency = 0.02;
      const centerX = width / 2;
      const centerY = height / 2;
      let phase = 0;

      this.ctx.clearRect(0, 0, width, height);
      this.ctx.beginPath();
      this.ctx.moveTo(0, centerY);

      for (let x = 0; x < width; x++) {
        const y = amplitude * Math.sin(frequency * x + phase) + centerY;
        this.ctx.lineTo(x, y);
      }

      this.ctx.strokeStyle = 'blue';
      this.ctx.stroke();
      this.ctx.draw(false);

      phase += 0.05;
    },
    clearCanvas() {
      const width = uni.upx2px(750);
      const height = uni.upx2px(200);
      this.ctx.clearRect(0, 0, width, height);
      this.ctx.draw();
    }
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content {
  width: 100%;
  text-align: center;
}
</style>
