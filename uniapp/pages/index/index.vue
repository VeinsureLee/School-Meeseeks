<template>
  <view class="container">
    <swiper :autoplay="true" :interval="3000" :circular="true" :indicator-dots="true" class="swiper">
      <swiper-item v-for="(item, index) in images" :key="index">
        <image :src="item" class="swiper-img" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <!-- 新闻栏 -->
    <view class="news-container">
      <view v-for="(news, index) in newsList" :key="index" class="news-item" @click="goToUrl(news.url)">
        <view class="news-content">
          <text class="news-title">{{ news.title }}</text>
          <image :src="news.image" class="news-image" mode="aspectFill"></image>
        </view>
        <view class="news-description">{{ news.description }}</view> <!-- Added -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      images: [
        '/static/index/swiper_photo/1.jpg',
        '/static/index/swiper_photo/2.jpg',
        '/static/index/swiper_photo/3.jpg'
      ],
      newsList: [
        { 
          title: '北京邮电大学官方网站', 
          url: 'https://www.bupt.edu.cn', 
          image: '/static/index/link_photo/photo1.png',
          description: '网址：https://www.bupt.edu.cn' // Added description
        },
        { 
          title: '北邮校内VPN系统', 
          url: 'http://webvpn.bupt.edu.cn', 
          image: '/static/index/link_photo/photo2.png',
          description: '网址：http://webvpn.bupt.edu.cn' // Added description
        },
        { 
          title: '北京邮电大学教学云平台', 
          url: 'http://ucloud.bupt.edu.cn', 
          image: '/static/index/link_photo/photo3.png',
          description: '网址：http://ucloud.bupt.edu.cn' // Added description
        }
      ]
    };
  },
  methods: {
    goToUrl(url) {
      uni.navigateTo({
          url: '/pages/webview/webview?url=' + encodeURIComponent(url)
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 300px; /* Reduced height */
}

.swiper {
  width: 100%;
  height: 40%; /* Reduced height */
}

.swiper-img {
  width: 100%;
  height: 100%; /* Changed height to 100% */
}

.news-container {
  display: inherit;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.news-item {
  flex: 1;
  padding: 0 10px;
  cursor: pointer;
}

.news-content {
  display: flex;
  align-items: center;
}

.news-title {
  flex: 1;
  font-size: 16px;
  font-weight: bold;
}

.news-image {
  width: 60px;
  height: 60px;
  margin-left: 10px;
}

.news-description {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}
</style>