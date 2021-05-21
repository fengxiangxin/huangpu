<template>
    <div class="right">
        <div class="close" @click="close"><i class="el-icon-close"></i></div>
        <div class="content">
            <div v-for="(value,key,index) in dataList" :key="index">
               <span>{{key}}:{{value}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dataList:
                {
                    '名字':'洪恩医疗财团法人洪恩综合医院',
                    '城市':'广州',
                    '区域':'黄埔区',
                    '地址':'开发大道412号-416号-420号',
                }
            
        }
    },
    methods:{
        close(){
            console.log(1111)
        }
    }
}
</script>

<style lang="less" scoped>
.right{
    width: 350px;
    border: 1px solid #208ABE;
    position: absolute;
    right: 320px;
    top: 300px;
    zoom: 4;
    box-shadow:5px 5px 15px #208ABE;
    // background-image:url(../../assets/img/frame.60f567eb.png) ;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    opacity:0.6;
    .close{
        font-size:10px;
        float: right;
        cursor: pointer;
        color: #ffffff;
    }
    .content{
        padding: 0 10px 10px 10px;
        clear: both;
        span{
            font-size: 10px;
            display: block;
        }
    }
}

</style>