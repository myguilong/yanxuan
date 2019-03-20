<template>
  <div class="topic">
    <ul class="list">
      <li v-for="(item,index) in topList" :key="index">
        <div class="t-img">
          <img :src="item.scene_pic_url" alt>
        </div>
        <div class="info">
          <p>{{item.title}}</p>
          <p>{{item.usbtitle}}</p>
          <p>{{item.price_info}}</p>
        </div>
      </li>
    </ul>
    <div>
      <p v-if="showBottomTips" class="bottomTips">没有更多内容</p>
    </div>
  </div>
</template>
<script>
import { get } from "../../utils";
export default {
  data() {
    return {
      page: 1,
      topList:[],
      total:'',
      showBottomTips:false
    };
  },
 
 startPullDownRefresh(){
   console.log('123')
 },
  async onReachBottom(){
      if(this.page>=this.total)
      {
        wx.showToast({
          title:'没有内容啦!'
        })
      }
      else
      {
        this.page=this.page+1
        if(this.page==this.total) this.showBottomTips=true
        const result = await get("/topic/listaction", {
        page: this.page
      });
      result.data.map(item=>{
       this.topList.push(item)
      })
        }
    
  },
  
  mounted () {
    this.getDatalist()
  },
  methods: {
    async getDatalist() {

      const topiclist = await get("/topic/listaction", {
        page: this.page
      });
      
     
         this.topList=topiclist.data
         this.total=topiclist.total
         console.log(this.total)
       
    }
  }
};
</script>
<style lang='scss'>
@import "./style.scss";
</style>