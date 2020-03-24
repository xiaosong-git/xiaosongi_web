<template>
    <!--系统配置-->
    <div class="app">
        <div class="content-header">
            <div class="filter-container">
                <el-steps :active="active" finish-status="success">
                    <el-step title="服务器配置" icon="el-icon-edit"></el-step>
                    <el-step title="大楼配置" icon="el-icon-s-home"></el-step>
                    <el-step title="通行方式配置" icon="el-icon-s-tools"></el-step>
                    <el-step title="内网穿透配置" icon="el-icon-s-tools"></el-step>
                </el-steps>


                <div class="info1" v-if="active==1">
                    <el-form ref="serverform" :model="serverformData" label-position="right"
                             :rules="rules" label-width="100px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="数据服务器:" prop="value1">
                                    <el-switch
                                            v-model="serverformData.value1"
                                            @change="switchServer1">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div v-show="serverShow1">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="服务器地址:" prop="serverUrl1">
                                        <el-input v-model="serverformData.serverUrl1"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5">
                                    <el-form-item label="服务器端口:" prop="serverPort1">
                                        <el-input v-model="serverformData.serverPort1"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="3">
                                    &nbsp;&nbsp;&nbsp;<el-button type="primary" @click="ping1()">测试连接</el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="文件服务器:" prop="value2">
                                    <el-switch
                                            v-model="serverformData.value2"
                                            @change="switchServer2">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div v-show="serverShow2">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="服务器地址:" prop="serverUrl2">
                                        <el-input v-model="serverformData.serverUrl2"/>
                                    </el-form-item>
                                </el-col>


                            </el-row>
                            <el-row>
                                <el-col :span="5">
                                    <el-form-item label="服务器端口:" prop="serverPort2">
                                        <el-input v-model="serverformData.serverPort2"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="3">
                                    &nbsp;&nbsp;&nbsp;<el-button type="primary" @click="ping2()">测试连接</el-button>
                                </el-col>
                            </el-row>
                        </div>

                    </el-form>
                </div>
                <div class="info2" v-if="active==2">
                    <el-form ref="buildingform" :model="buildingformData" label-position="right"
                             :rules="rules" label-width="100px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="大楼编号" prop="orgCode">
                                    <el-input v-model="buildingformData.orgCode"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="大楼名称" prop="orgName">
                                    <el-input v-model="buildingformData.orgName"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="联网方式" prop="netType">
                                    <el-radio-group v-model="buildingformData.netType">
                                        <el-radio class="radio" :label="0">内网</el-radio>
                                        <el-radio class="radio" :label="1">外网</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="比对阈值" prop="faceComparesCope">
                                    <el-input v-model="buildingformData.faceComparesCope"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="info3" v-if="active==3">
                    <div class="info-title">通行方式配置</div>
                    <el-form ref="accessTypeform" :model="acceessformData" :rules="rules">
                        <el-row>
                            <el-col :span="15">
                                <el-form-item label="员工:" prop="staffCheckType">
                                    <el-radio-group v-model="acceessformData.staffCheckType">
                                        <el-radio class="radio" :label="0">人脸通行方式</el-radio>
                                        <el-radio class="radio" :label="1">二维码通行方式</el-radio>
                                        <el-radio class="radio" :label="2">人脸+二维码通行</el-radio>
                                        <el-radio class="radio" :label="3">无此功能</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="15">
                                <el-form-item label="访客:" prop="visitorCheckType">
                                    <el-radio-group v-model="acceessformData.visitorCheckType">
                                        <el-radio class="radio" :label="0">人脸通行方式</el-radio>
                                        <el-radio class="radio" :label="1">二维码通行方式</el-radio>
                                        <el-radio class="radio" :label="2">人脸+二维码通行</el-radio>
                                        <el-radio class="radio" :label="3">无此功能</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="15">
                                <el-form-item label="共享:" prop="shareCheckType">
                                    <el-radio-group v-model="acceessformData.shareCheckType">
                                        <el-radio class="radio" :label="0">人脸通行方式</el-radio>
                                        <el-radio class="radio" :label="1">二维码通行方式</el-radio>
                                        <el-radio class="radio" :label="2">人脸+二维码通行</el-radio>
                                        <el-radio class="radio" :label="3">无此功能</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
                <div class="info4" v-if="active==4">
                    <el-form ref="natappformData" :model="natappformData" label-position="right"
                             :rules="rules" label-width="100px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="内网穿透:" prop="natappValue">
                                    <el-switch
                                            v-model="natappformData.natappValue"
                                            @change="natappTurnover">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div v-show="natappUrlShow">
                            <el-row>
                                <el-col :span="7">
                                    <el-form-item label="token:" prop="token">
                                        <el-input v-model="natappformData.token"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </div>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="before" v-show="beforeShow">上一步</el-button>
                    <el-button type="primary" @click="handleAdd()" v-show="saveShow">保存</el-button>
                    <el-button @click="next">{{nextTxt}}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        selectAccessSet,
        editAccessSet,
        addServerSet,
        testServerUrl,
        addBuildingSet,
        selectServer,
        floor,
        penetrateSet
    } from '../../api/index.js'

    export default {

        data() {
            return {
                active: 1, //步骤条状态
                formData: {}, // 表单数据
                serverShow1: false,
                serverShow2: false,
                beforeShow: false,
                saveShow:true,
                nextTxt: "下一步",
                issave1: 0,
                issave2: 0,
                issave3: 0,
                issave4: 0,
                natappUrlShow:false,
                natappformData: {
                    natappValue: false,
                    token:'',
                },
                serverformData: {
                    value1: false,
                    value2: false,

                    serverUrl1: '',
                    serverPort1: '',

                    serverUrl2: '',
                    serverPort2: '',
                },
                buildingformData: {
                    orgCode: '',
                    orgName: '',
                    netType: '',
                    faceComparesCope: '',
                },
                acceessformData: {
                    staffCheckType: '',
                    visitorCheckType: '',
                    shareCheckType: '',
                },
                rules: {
                    // 校验规则

                    orgName: [{required: true, message: ' ', trigger: 'blur'}],
                    orgCode: [{required: true, message: ' ', trigger: 'blur'}],
                    netType: [{required: true, message: ' ', trigger: 'blur'}],
                    faceComparesCope: [{required: true, message: ' ', trigger: 'blur'}],
                    staffCheckType: [{required: true, message: ' ', trigger: 'blur'}],
                    visitorCheckType: [{required: true, message: ' ', trigger: 'blur'}],
                    shareCheckType: [{required: true, message: ' ', trigger: 'blur'}],
                    serverUrl: [{required: true, message: '服务器地址', trigger: 'blur'},
                        {
                            pattern: /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g,
                            message: 'IP地址格式错误'
                        }],


                }
            };
        },
        created() {
            this.findServer()
        },
        mounted() {

        },
        methods: {

            findServer() {
                selectServer().then(res => {
                    if (res.success) {
                        this.issave1 = 1;
                        if (res.msg.value1 == "true") {
                            this.serverShow1 = true;
                            this.serverformData.value1 = true;
                            this.serverformData.serverUrl1 = res.msg.serverUrl
                            this.serverformData.serverPort1 = res.msg.serverPort
                        } else if (res.msg.serverName == "false") {
                            this.serverformData.value1 = false;
                        }
                        if (res.msg.value2 == "true") {
                            this.serverShow2 = true;
                            this.serverformData.value2 = true;
                            this.serverformData.serverUrl2 = res.msg.serverUrl2
                            this.serverformData.serverPort2 = res.msg.serverPort2
                        } else {
                            this.serverformData.value2 = false;
                        }
                        if(res.msg.netappValue =="true"){
                            this.natappformData.natappValue =true;
                            this.natappUrlShow =true;
                            this.natappformData.token = res.msg.token
                        }else{
                            this.natappformData.natappValue =false;
                            this.natappUrlShow =false;
                        }
                    } else {

                    }
                })
            },
            findBuildind() {
                floor().then(res => {
                    if (res.success) {
                        this.issave2 = 1;
                        this.buildingformData.orgCode = res.msg.orgCode;
                        this.buildingformData.orgName = res.msg.orgName;
                        this.buildingformData.faceComparesCope = res.msg.faceComparesCope;
                        if (res.msg.netType == '内网') {
                            this.buildingformData.netType = 0
                        } else if (res.msg.netType == '外网') {
                            this.buildingformData.netType = 1
                        }

                    } else {

                    }
                })
            },
            natappTurnover(){
                this.natappUrlShow = !this.natappUrlShow;
            },
            findAccessType() {
                selectAccessSet().then(res => {
                    if (res.success) {
                        if (res.msg.staffCheckType == null || res.msg.visitorCheckType == null || res.msg.shareCheckType == null) {
                            this.issave3 = 0
                        } else {
                            this.issave3 = 1
                            if (res.msg.staffCheckType == '人脸通行') {
                                this.acceessformData.staffCheckType = 0
                            } else if (res.msg.staffCheckType == '二维码通行') {
                                this.acceessformData.staffCheckType = 1
                            } else if (res.msg.staffCheckType == '人脸二维码通行') {
                                this.acceessformData.staffCheckType = 2
                            } else if (res.msg.staffCheckType == '禁止通行') {
                                this.acceessformData.staffCheckType = 3
                            } else {
                                this.acceessformData.staffCheckType = 4
                            }
                            if (res.msg.visitorCheckType == '人脸通行') {
                                this.acceessformData.visitorCheckType = 0
                            } else if (res.msg.visitorCheckType == '二维码通行') {
                                this.acceessformData.visitorCheckType = 1
                            } else if (res.msg.visitorCheckType == '人脸二维码通行') {
                                this.acceessformData.visitorCheckType = 2
                            } else if (res.msg.visitorCheckType == '禁止通行') {
                                this.acceessformData.visitorCheckType = 3
                            } else {
                                this.acceessformData.visitorCheckType = 4
                            }
                            if (res.msg.shareCheckType == '人脸通行') {
                                this.acceessformData.shareCheckType = 0
                            } else if (res.msg.shareCheckType == '二维码通行') {
                                this.acceessformData.shareCheckType = 1
                            } else if (res.msg.shareCheckType == '人脸二维码通行') {
                                this.acceessformData.shareCheckType = 2
                            } else if (res.msg.shareCheckType == '禁止通行') {
                                this.acceessformData.shareCheckType = 3
                            } else {
                                this.acceessformData.shareCheckType = 4
                            }
                        }
                    } else {

                    }
                })
            },
            switchServer1() {
                if (this.serverformData.value1) {
                    this.serverformData.serverName1 = "0"
                    this.serverShow1 = true;
                } else {
                    this.serverformData.serverName1 = "1"
                    this.serverformData.serverPort1 = "";
                    this.serverformData.serverUrl1 = "";
                    this.serverShow1 = false;
                }
            },
            switchServer2() {
                if (this.serverformData.value2) {
                    this.serverformData.serverName2 = "0"
                    this.serverShow2 = true;
                } else {
                    this.serverformData.serverName2 = "1"
                    this.serverformData.serverPort2 = "";
                    this.serverformData.serverUrl2 = "";
                    this.serverShow2 = false;
                }
            },
            // 测试连接,ping服务器1
            ping1() {
                var para = {'serverUrl': this.serverformData.serverUrl1}
                testServerUrl(para).then(res => {

                    if (res.msg) {
                        this.$message({
                            message: '服务器连接成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error("服务器连接失败")
                    }
                })
            },
            // 测试连接,ping服务器2
            ping2() {
                var para = {'serverUrl': this.serverformData.serverUrl2}
                testServerUrl(para).then(res => {

                    if (res.msg) {
                        this.$message({
                            message: '服务器连接成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error("服务器连接失败")
                    }
                })
            },
            next() {
                if (this.active == 1) {
                    if (this.issave1 == 1) {
                        this.active++;
                        this.beforeShow = true
                        this.findBuildind();
                    } else {
                        this.$message.error("请保存数据再进行下一步")
                    }
                } else if (this.active == 2) {
                    if (this.issave2 == 1) {
                        this.active++;
                        this.findAccessType();
                    } else {
                        this.$message.error("请保存数据再进行下一步")
                    }

                } else if (this.active == 3) {
                    if (this.issave3 == 1) {
                        this.findServer(),
                        this.active++;
                        this.nextTxt = "完成"
                        this.saveShow =false;
                    } else {
                        this.$message.error("请保存数据再进行下一步")
                    }
                } else if (this.active == 4) {
                    this.$refs['natappformData'].validate(valid => {
                        if (valid) {

                            penetrateSet(this.natappformData).then(res =>{
                                alert(JSON.stringify(res))
                                if (res.success) {
                                    this.$message.success('配置成功!');
                                    this.active = 1;
                                    this.saveShow =true;
                                    this.nextTxt = "下一步"
                                    this.beforeShow = false;
                                }else{
                                    this.$message.error('网络穿透配置失败!');
                                }
                            })
                        }else{
                            this.$message.error("网络穿透配置失败!")
                        }
                    })
                }
            },
            before() {
                if (this.active == 1) {

                } else if (this.active == 2) {
                    this.active--;
                    this.beforeShow = false
                } else if (this.active == 3) {
                    this.active--;

                } else if (this.active == 4) {
                    this.nextTxt = '下一步'
                    this.active--;
                    this.saveShow =true;
                }
            },
            handleAdd() {
                if (this.active == 1) {
                    this.$refs['serverform'].validate(valid => {
                        if (valid) {
                            addServerSet(this.serverformData).then(res => {
                                if (res.success) {
                                    this.$message.success('服务器配置成功!');
                                    this.issave1 = 1;
                                } else {
                                    this.$message.error('服务器配置失败!');
                                }
                            })
                        } else {
                            // 表单校验不通过
                            this.$message.error('服务器未选，保存失败!');
                            return false;
                        }
                    })
                } else if (this.active == 2) {
                    this.$refs['buildingform'].validate(valid => {
                        if (valid) {
                            addBuildingSet(this.buildingformData).then(res => {
                                if (res.success) {
                                    this.$message.success('大楼配置成功!');
                                    this.issave2 = 1;
                                } else {
                                    this.$message.error('大楼配置失败!');
                                }
                            })
                        } else {
                            // 表单校验不通过
                            this.$message.error('大楼配置未选，保存失败!');
                            return false;
                        }
                    })
                } else if (this.active == 3) {
                    this.$refs['accessTypeform'].validate(valid => {
                        if (valid) {
                            editAccessSet(this.acceessformData).then(res => {
                                if (res.success) {
                                    this.$message.success('通行方式配置成功!');
                                    this.issave3 = 1;
                                } else {
                                    this.$message.error("通行方式配置失败!")
                                }
                            })
                        } else {
                            // 表单校验不通过
                            this.$message.error('通行方式未选，保存失败!');
                            return false;
                        }
                    })
                }else if (this.active == 4) {

                }

            },

        }
    };
</script>

<style lang='less' scoped>

    /* title */
    .content-header {
        position: relative;
        padding: 15px 15px 0 15px;
        /* margin-top: 70px; */
    }

    .content-header > h1 {
        margin: 0;
        font-size: 24px;
        font-weight: normal;
    }

    .content-header > h1 > small {
        font-size: 15px;
        display: inline-block;
        padding-left: 4px;
        font-weight: 300;
    }

    .content-header > .breadcrumb {
        float: right;
        background: transparent;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 12px;
        padding: 7px 5px;
        position: absolute;
        top: 20px;
        right: 10px;
        border-radius: 2px;
    }

    /*  */
    .app-container {
        background: #fff;
        margin: 15px 30px 15px 15px;

    }

    .pagiantion {
        text-align: right;
        padding: 15px;
    }

    .box {
        position: relative;
        border-radius: 3px;
        background: #ffffff;
        border-top: 3px solid #3c8dbc;
        padding: 10px;
        margin-bottom: 20px;
        width: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }

    .filter-container {
        padding: 10px 0 15px 0;
    }

    .main-container {
        margin-top: 70px;
    }

    .filter-container .el-button, .filter-container .el-input__inner {
        padding: 0 15px;
        height: 34px;
        line-height: 34px;
    }

    .el-aside {
        overflow: hidden;
    }

    .el-submenu .el-menu-item a {
        display: block;
        height: 50px;
    }

    .el-menu--collapse .el-submenu__icon-arrow {
        display: none
    }

    /* .el-container{position: relative;} */
    .info1 {
        text-align: center;
        padding-top: 10px;
        padding-left: 35%;
        width: 100%;
    }

    .info2 {
        padding-top: 10px;
        padding-left: 34%;
        width: 100%;
    }

    .info3 {
        padding-top: 20px;
        padding-left: 25%;
        width: 100%;
    }
    .info4 {
        padding-top: 20px;
        padding-left: 34%;
        width: 100%;
    }

    .info1 el-form-item {
        padding-top: 5px;
        text-align: center;
    }

    .dialog-footer {
        text-align: center;
        width: 100%;
    }

    .info-title {
        padding-left: 20%;
        padding-top: 30px;
        padding-bottom: 20px;
        font-family: Arial;
        font-size: 18px;
        font-weight: 400;
        color: orangered;

    }

    .app {
        font-family: Arial;
        font-size: 16px;
        font-weight: bold;
    }


</style>
