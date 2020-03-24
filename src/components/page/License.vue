<template>
    <div style="width: 100%;height: 100%">
        <div class="login-wrap">
        </div>
        <div class="ms-login">
            <el-form ref="form":model="form" :rules="rules" class="ms-content">
                <div class="ms-title">使用许可证</div>
                <el-form-item prop="license">
                    <el-input
                            class="log-input"
                            v-model="form.license"
                            placeholder="请输入使用码"
                            prefix-icon="el-icon-user"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="login-btn">
                        <el-button
                                type="primary"
                                class="btn"
                                @click="useLicense('form')"
                        >登录</el-button>
                    </div>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    import {login} from '../../api/index.js'
    export default {
        data() {
            return {
                form: {
                    license: "",

                },
                checkCode: '',
                rules: {
                    license: [{required: true, message: "请输入使用码", trigger: "blur"}],

                },
            };
        },
        mounted() {

        },
        methods: {

            // 对整个表单进行验证
            useLicense() {
                this.$router.push("/dashboard");
               /* if (this.form.seccode != this.checkCode) {
                    this.$message({
                        message: "验证码错误，注意大写字母",
                        type: "warning"
                    });
                    this.createCode();
                    return false;
                }
                if(this.form.username=='admin' &&this.form.password =='123456'){
                    localStorage.setItem("username",this.form.username);
                    this.$message({
                        message: "登录成功",
                        type: "success"
                    });
                    this.$router.push("/dashboard");
                }else {
                    this.$message({
                        message: "密码错误",
                        type: "warning"
                    });
                }*/
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 47%;
        background-image: url(../../assets/img/bg_login.png);
        background-size: 100%;
    }
    .ms-title {
        width:96px;
        height:43px;
        font-size:18px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(55,117,213,1);
        line-height:33px;
    }
    .ms-login {
        float: bottom;
        position: absolute;
        left: 52%;
        top: 62%;
        width: 300px;
        margin: -190px 0 0 -175px;
        background: rgba(255,255,255,1);
        overflow: hidden;
        box-shadow:0px 2px 23px 0px rgba(159,157,157,0.36);
        border-radius:10px;
    }
    /*验证码*/
    .log-input-checkcode{
        width: 100px;

    }
    /*验证码*/
    .checkCode   {
        height: 30px;
        width: 120px;
        border: 1px solid #DDD;
        float: right;
        z-index: 1;
        font-size: 1.5em;
        text-align: center;
        line-height: 1.5em;
        cursor: text;
        background-image: url(../../assets/img/check_code_bg.jpg);
        background-repeat: repeat;
    }
    .ms-content {
        padding: 30px 30px;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

</style>

