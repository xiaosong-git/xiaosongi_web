<template>
    <!--系统配置-->
    <div class="app">
        <div class="content-header">
            <div class="filter-container">
                <el-form :model="formData">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数据服务器:" prop="staffCheckType">
                                <el-switch
                                        v-model="value"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="员工通行方式:" prop="staffCheckType">
                                <el-select v-model="formData.staffCheckType" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="访客通行方式:" prop="visitorCheckType">
                                <el-select v-model="formData.visitorCheckType" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="共享通行方式:" prop="shareCheckType">
                                <el-select v-model="formData.shareCheckType" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-button @click="">取消</el-button>
                <el-button type="primary" @click="handleAdd()">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {selectAccessSet, editAccessSet} from '../../api/index.js'

    export default {

        data() {
            return {
                value: true,
                formData: {
                    staffCheckType: '',
                    visitorCheckType: '',
                    shareCheckType: '',
                }, // 表单数据
                options: [{
                    value: 'FACE',
                    label: '人脸通行方式'
                }, {
                    value: 'QRCODE',
                    label: '二维码通行方式'
                }, {
                    value: 'FQ',
                    label: '人脸+二维码通行'
                }],
            };
        },
        created() {
            this.findPage(); // VUE对象初始化完成后调用分页查询方法，完成分页查询
        },
        mounted() {

        },
        methods: {

            // 分页查询
            findPage() {
                // 发送ajax请求，提交分页相关请求参数（页码、每页显示记录数、查询条件）

                selectAccessSet().then(res => {
                    // alert(res.size)
                    // 解析Controller响应回的数据，为模型数据赋值
                    this.formData.staffCheckType = res.msg.staffCheckType;
                    this.formData.visitorCheckType = res.msg.visitorCheckType;
                    this.formData.shareCheckType = res.msg.shareCheckType;
                });
            },
            handleAdd() {
                editAccessSet(this.formData).then(res => {

                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: "设置成功"
                        });
                    } else {
                        // 执行失败
                        this.$message.error("设置失败");
                    }
                })
            }

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


</style>
