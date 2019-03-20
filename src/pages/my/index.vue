<template>
  <div class="my">
    <div class="myinfo">
      <button v-if="showButton" open-type="getUserInfo" @getuserinfo="getUserInfo">授权信息</button>
      <img :src="user.avatarUrl" alt>
      <div>
        <p>{{user.nickName}}</p>
        <p>微信用户</p>
      </div>
    </div>
    <div class="iconlist">
      <div v-for="(item,index) in listData" :key="index">
        <span class="iconfont" :class="item.icon"></span>
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showButton: false,
      user: {},
      listData: [
        {
          title: "我的订单",
          icon: "icon-unie64a",
          url: ""
        },
        {
          title: "优惠券",
          icon: "icon-youhuiquan",
          url: ""
        },
        {
          title: "我的足迹",
          icon: "icon-zuji",
          url: ""
        },
        {
          title: "我的收藏",
          icon: "icon-shoucang",
          url: "/pages/collectlist/main"
        },
        {
          title: "地址管理",
          icon: "icon-dizhiguanli",
          url: "/pages/address/main"
        },
        {
          title: "联系客服",
          icon: "icon-lianxikefu",
          url: ""
        },
        {
          title: "帮助中心",
          icon: "icon-bangzhuzhongxin",
          url: ""
        },
        {
          title: "意见反馈",
          icon: "icon-yijianfankui",
          url: "/pages/feedback/main"
        }
      ]
    };
  },
  onShow() {
    //组件创建时调用login方法chon
    const userinfo = wx.getStorageSync("user");
    if (!userinfo) this.showButton = true;
  },
  mounted() {
    try {
      const user = wx.getStorageSync("user");
      this.user = JSON.parse(user);
      console.log(this.user);
    } catch (err) {
        console.log(err)
    }
  },
  methods: {
    getUserInfo(e) {
      console.log(e);
      //将获取到的信息存到storage中
     if(e.target.rawData)
     {
         wx.setStorageSync("user",e.target.rawData);
         this.user=JSON.parse(e.target.rawData)
         this.showButton=false
     }
     else
     {
         console.log('b')
     }
     
    }
  }
};
</script>
<style lang='scss'>
@import "./style.scss";
</style>