<template>
  <div class="category">
    <div class="search">
      <div class="ser">
        <span class="icon"></span>
        <span>商品搜索,共239款好物</span>
      </div>
    </div>
    <div class="content">
         <scroll-view class="left" scroll-y="true">
             <div class="iconText" v-for="(item,index) in listData" :key="index" @click="changeCategory(item.id)">
               {{item.name}}
             </div>
         </scroll-view>
         <scroll-view class="right" scroll-y="true">
           <div class="banner">
               <img :src="detailData.banner_url" alt="">
           </div>
           <div class="title">
                <span>-</span>
                <span>{{detailData.name}}分类</span>
                <span>-</span>
           </div>
           <div class="bottom">
              <div v-for="(item,index) in detailData.subList" :key="index">
                   <img :src="item.wap_banner_url" alt="">
                   <span>{{item.name}}</span>
              </div>
           </div>
         </scroll-view>
    </div>
  </div>
</template>
<script>
import {get} from '../../utils'
export default {
    data () {
        return {
            listData:[],
            id:"1005000",
            nowIndex:[],
            detailData:{}
        }
    },
    mounted() {
        this.getLIstData()
        this.selectItem(this.id,this.nowIndex)
    },
    methods: {
        async selectItem(id,index){
           this.nowIndex=index
           const data = await get("/category/currentaction",{
               id
           })
           console.log(data.data.currentOne)
           this.detailData=data.data.currentOne
        },
        async getLIstData(){
            const data = await get("/category/indexaction")
            this.listData=data.categoryList
            console.log(data)
        },
        async changeCategory(index){
            if(index==this.id) return false
            //传值获得分类信息
            const result = await get("/category/currentaction",{
                id:index
            })
            this.id=index
            this.detailData=result.data.currentOne
        }
    }
};
</script>
<style lang='scss'>
@import "./style.scss";
</style>