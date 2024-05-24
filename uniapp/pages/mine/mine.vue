<template>
  <view class="container">
    <!-- 用户信息 -->
    <view class="user-info">
      <view class="avatar-container" @click="chooseAvatar">
        <image class="avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
      </view>
      <view class="user-detail">
        <view class="user-id">学号：{{ userInfo.userId }}</view>
        <view class="user-name">姓名：{{ userInfo.userName }}</view>
      </view>
    </view>

    <!-- 测试跳转界面 -->
    <view class="item test" @click="goToTestPage">
      <text class="text">测试</text>
      <view class="arrow-container">
        <text class="arrow">></text>
      </view>
    </view>
	
	<!-- 跳转到temp页面 -->
	<view class="item temp" @click="goToTempPage">
	  <text class="text">Temp页面</text>
	  <view class="arrow-container">
	    <text class="arrow">></text>
	  </view>
	</view>

    <!-- 设置 -->
    <view class="setting" @click="goToSettings">
      <text class="text">设置</text>
      <view class="arrow-container">
        <text class="arrow">></text>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatarUrl: '/static/user/logo.png',
        userId: '2024000000',
        userName: '佚名'
      }
    };
  },
  methods: {
    goToTestPage() {
      uni.navigateTo({
        url: '/pages/test/test'
      });
    },
    goToSettings() {
      uni.navigateTo({
        url: '/pages/settings/settings'
      });
    },
    chooseAvatar() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          this.userInfo.avatarUrl = tempFilePaths[0];
        }
      });
    },
    goToTempPage() {
      uni.navigateTo({
        url: '/pages/temp/temp'
      });
    }
  }
};
</script>

<style>
.item,
.setting,
.temp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #007aff;
  text-align: center;
  cursor: pointer;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 15px 20px;
}

.arrow-container {
  margin-left: auto;
}

.container {
  padding: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  border: 2px solid black;
}

.avatar {
  width: 100%;
  height: 100%;
}

.user-detail {
  margin-left: 20px;
}

.user-id {
  font-size: 16px;
  color: #333;
}

.user-name {
  font-size: 16px;
  color: #333;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #007aff;
  text-align: center;
  cursor: pointer;
}
</style>
