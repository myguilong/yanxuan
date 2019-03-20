
const pageDatas = {}
//当前页面的内容
let MyPlugun ={}

MyPlugun.install = function(Vue){
    //添加全局属性或者方法
    //使用全局属性做判断
    Vue.prototype.$isPage = function isPage(){
        //添加$isPage方法
        return this.$mp && this.$mp.mpType==='page'
    }
    Vue.prototype.$pageId = function pageId (){
        //页面的ID
        return this.$isPage() ? this.$mp.page.__wxWebviewId__:null
    }
    //注入方法到组件
    Vue.mixin({
        methods: {
            statshPageData(){
                //备份route和当前数据
                return {
                    data:{...this.$data}
                }
            },
            restorePageData(oldData){
                //合并旧的数据
                Object.assign(this.$data,oldData.data)
            },
            onLoad(){
                //小程序的生命周期的方法
                if(this.$isPage()){
                    //新进入页面 初始化数据
                    Object.assign(this.$data,this.$options.data())
                }
            },
            onUnload(){
                if(this.$isPage()){
                    //退出页面，删除数据,如果当前页存在即删除
                    delete pageDatas[this.$pageId()]
                    this.$needReloadPageData=true
                    console.log(pageDatas)
                }
            },
            onHide(){
                if(this.$isPage())
                {  
                    //小程序的方法当页面隐藏时
                    console.log(this.$isPage())
                    //将要隐藏时，备份数据
                    pageDatas[this.$pageId()] = this.statshPageData()
                    console.log(pageDatas)
                }
            },
            onShow(){
                if(this.$isPage()){
                    //如果是后退回来的，拿出历史数据来设置data
                    if(this.$needReloadPageData){
                          const oldData = pageDatas[this.$pageId]
                          if(oldData){
                              this.restorePageData=false
                          }
                    }
                }
            }
        },
    })


}
export default MyPlugun