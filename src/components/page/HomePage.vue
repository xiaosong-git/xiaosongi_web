<template>
    <!--<div class="picture">
        <iframe id="mainIframe" name="mainIframe" src="http://www.baidu.com" width="100%" height="100%" frameborder="0" scrolling="auto" ></iframe>
    </div>-->
    <div style="width: 100%;height: 100%">
        <div  style="margin-left:10%; margin-top: 2%" >
            <el-button type="primary" round style="margin-left: 5%" v-for="(item,i) in device" @click="changeIframe(this)">{{item}} 设备</el-button>
        </div>
        <div style="margin-top: 2%">
            <iframe id="iframeId" class="iframeshow" :src="addr" frameborder="0" v-show="iframe"></iframe>
        </div>
    </div>
</template>

<script>
    import {findKS} from "../../api/index"

    export default {
        data() {
            return {
                addr:'',
                quanp:false,
                iframe:false,
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../../assets/img/bg.png') + ')'
                },
                device:[]
            }
        },
        created(){
            findKS().then(res=>{
                if(res.code == 200){
                    var data = res.msg;
                    for(var i in data){
                        this.device.push(data[i].deviceIp);
                    }
                    window.console.log(this.device)
                }else{

                }
            })
        },
        methods :{
            changeIframe(device){
                window.console.log(this.device)
               /* this.iframe = true;
                this.quanp = true;
                if(status == 1){
                    //this.addr ="http://api.map.baidu.com/lbsapi/creatmap/index.html"
                    window.open("http://192.168.1.9")
                }else if(status == 2){
                    window.open("http://192.168.1.9")
                }else if(status == 3){
                   /!* this.addr = "http://www.baidu.com";*!/
                    window.open("http://192.168.1.9")
                }else if(status ==4){
                    window.open("http://192.168.1.9")
                }*/
            },
            quanping(){
                document.getElementById('iframeId').style.position="absolute";
                document.getElementById('iframeId').style.left="0px";
                document.getElementById('iframeId').style.top="0px";
            }
        }
    }
</script>

<style lang='less' scoped>
    .picture {
        height: 600px;
        width: 1100px;
        background: no-repeat center top;
        background-size: contain;
    }
    .iframeshow{
        height : 500px;
        width: 90%;
        frameborder : 0;
    }


</style>
