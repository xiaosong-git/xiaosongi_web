<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
       <!-- <v-sidebar v-show="sidebarShow"></v-sidebar>-->
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                      <!--  <div v-show="sidebarShow">-->
                        <div>
                            <router-view></router-view>
                        </div>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
                <div v-show="false">
                    <el-form ref="form" :model="form" class="ms-content">
                        <div class="ms-title">license:</div>
                        <el-form-item prop="license">
                            <el-input
                                    type="textarea"
                                    :rows="4"
                                    class="log-input"
                                    v-model="form.license"
                                    placeholder="请输入license"
                                    prefix-icon="el-icon-user"
                            >
                            </el-input>
                        </el-form-item>
                        <div class="ms-title">key:</div>
                        <el-form-item prop="key">
                            <el-input
                                    type="textarea"
                                    :rows="3"
                                    class="log-input"
                                    v-model="form.key"
                                    placeholder="请输入key"
                                    prefix-icon="el-icon-lock"
                            >
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button
                                    type="primary"
                                    class="btn"
                                    @click="confire('form')"
                            >确认
                            </el-button>
                        </div>

                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
import {checkLicense, getLicense} from '../../api/index.js'
export default {
    data() {
        return {
            sidebarShow: false,
            license:true,
            license1:false,
            form: {
                key: "",
                license: "",
            },
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        this.licenseShow();
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });

    },
    methods:{
        licenseShow() {
          getLicense().then(res => {
                if (res.success) {
                    this.sidebarShow=true
                    this.license =false;
                } else {
                    this.sidebarShow = false;
                    this.license =true;
                }
            })

        },
        confire(){
            this.sidebarShow=true
            this.license =false;
            /*checkLicense(this.form).then(res => {
                if (res.success) {
                    this.$message.success("license和key合法")
                    this.sidebarShow=true
                    this.license =false;
                } else {
                    this.$message.error("license和key不合法")
                    this.sidebarShow = false;
                    this.license =true;
                }

            })*/
        }

    }
};
</script>
<style>
    .wrapper{

    }
    .ms-title {
        width: 96px;
        height: 43px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(55, 117, 213, 1);
        line-height: 33px;
    }

    .ms-content {
        padding: 60px 60px;
    }

    .login-btn {
        text-align: center;
    }


</style>
