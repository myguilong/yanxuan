<template>
  <div class="index">
     <div class="search">
       <div>{{cityName}}</div>
       <div>
           <input type="text" placeholder="搜索商品">
           <span class="icon"></span>
       </div>
     </div>
       <!-- 使用小程序原生的轮播图 -->
      <div class="swiper">
            <swiper class="swiper-container" indicator-dots="true" autoplay="true"
            interval="3000" circulat="true"
            >
              <block v-for="(item,index) in banner" :key="index">
                  <swiper-item class="swiper-item">
                     <image :src="item.image_url" class="slide-image"/>
                  </swiper-item>
              </block>
            </swiper>
       </div>
       <div class="channel">
         <div v-for="(item,index) in channer" :key="index">
             <img :src="item.icon_url" alt="">
             <p>{{item.name}}</p>
         </div>
       </div>
       <div class="brand">
           <div class="head">
                品牌制造商直供
           </div>
           <div class="content">
              <div v-for="(item,index) in brandList" :key="index">
                 <div>
                     <p>{{item.name}}</p>
                     <p>{{item.floor_price}}元起</p>
                 </div>
                 <img :src="item.new_pic_url" alt="">
              </div>
           </div>
       </div>
       <div class="newgoods">
          <div class="top">
             <p>新品首发</p>
             <P>查看全部</P>
          </div>
          <div class="list">
             <ul>
                 <!-- 微信的滑动块的内容组件 -->
                 <scroll-view class="scroll-view" :scroll-x="true">
                   <li v-for="(item,index) in newGoods" :key="index">
                       <img :src="item.list_pic_url" alt="">
                       <p>{{item.name}}</p>
                       <p>{{item.goodds_brief}}</p>
                       <P>${{item.retail_price}}</P>
                   </li>
                 </scroll-view>
             </ul>
          </div>
       </div>
       <div class="newgoods hotgoods">
           <div class="newgoods-top">
              <div class="top">
                <p>人气推荐
                    <span></span>好物精选</p>
                <p>查看全部</p>
              </div>
           </div>
           <div class="list">
             <ul>
                 <scroll-view class="scroll-view" :scroll-x="true">
                      <li v-for="(item,index) in hotGoods" :key="index">
                         <img :src="item.list_pic_url" alt="">
                         <p>{{item.name}}</p>
                         <p>{{item.goods_brief}}</p>
                         <P>${{item.retail_price}}元起</P>
                      </li>
                 </scroll-view>
             </ul>
           </div>
       </div>
       <div class="topicList">
                <div class="topicList-top">
                    专题精选
                    <span class="icon"></span>
                </div>
                <div class="list">
                    <ul>
                    <scroll-view class="scroll-view" :scroll-x="true">
                        <li v-for="(item,index) in topicList" :key="index">
                            <img :src="item.item_pic_url" alt="">
                            <div class="btom">
                               <div>
                                   <p>{{item.title}}</p>
                                   <p>{{item.subtitle}}</p>
                               </div>
                            </div>
                            <div>
                                {{item.price_info}}元起
                            </div>
                        </li>
                    </scroll-view>
                    </ul>
                </div>
           </div>
  </div>
</template>
<script>
//引入高德地图api
import amapFile from '../../utils/amap-wx.js'
import {get} from '../../utils'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
      return {
          banner:[],
          channer:[],
          brandList:[],
          hotGoods:[],
          message:[],
          newCategoryList:[],
          newGoods:[],
          topicList:[]
      
      }
    },
    mounted() {
         this.getCityName();
         this.getData()
    },
     computed: {
         ...mapState(["cityName"])
     },
     methods: {
         ...mapMutations(["update"]),//分发sotre中的方法
         toMappage(){
             let _this=this
             wx.getSetting({
                 //可以通过wx.getSetting先查询用户是否授权了"scope.record"这个scope
                 success(res){
                      //如果没有同意，打开设置
                      if(!res.authSetting["scope.userLocation"]){
                          wx.openSetting({
                              success:res=>{
                                  _this.geCityName()
                              }
                          })
                      }else
                      {
                         
                      }

                 }
             })
         },
         getCityName(){
             let _this=this
             //高德地图定位功能
             //全局api
             let myAmaFun = new amapFile.AMapWX({
                 key: "e545e7f79a643f23aef187add14e4548"
             })
             myAmaFun.getRegeo({

                 success:function(data){
                     //成功的回调
                     console.log(data)
                    _this.update({cityName:data[0].name})
                 },
                 fail:function(info){
                     //失败回调
                     console.log(info)
                     //如果用户拒绝授权
                     //默认设置为北京
                     _this.cityName = "北京市"
                     _this.update({cityName:"北京市"})
                 }
             })
         },
         async getData(){
              const data =await get('/index/index')
              console.log(data)
              this.banner=data.banner
              this.topicList=data.topicList
              this.newCategoryList=data.newCategoryList
              this.channer=data.channel
              this.newGoods=data.newGoods
              this.hotGoods=data.hotGoods
              this.brandList=data.brandList
         }
     }
     
}
</script>
<style lang='scss'>
@import './style.scss';
     
</style>