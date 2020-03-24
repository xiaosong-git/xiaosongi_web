<template>
    <!--系统配置-->
    <div class="app">
        <div class="content-header">
            <div class="filter-container">
                <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right"
                         label-width="100px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="大楼编号" prop="orgCode">
                                <el-input v-model="formData.orgCode"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="大楼名称" prop="orgName">
                                <el-input v-model="formData.orgName"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联网方式" prop="netType">
                                <el-radio-group v-model="formData.netType">
                                    <el-radio class="radio" :label="0">内网</el-radio>
                                    <el-radio class="radio" :label="1">外网</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="比对阈值" prop="faceComparesCope">
                                <el-input v-model="formData.faceComparesCope"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="findPage()">取消</el-button>
                    <el-button type="primary" @click="handleAdd()">确定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {floor,addBuildingSet} from '../../api/index.js'

    export default {
        name: '',
        components: {},
        data() {
            return {
                formData: {}, // 表单数据
                listLoading: false,       //列表加载
                rules: {
                    // 校验规则

                     orgCode: [{required: true, message: '大楼编号', trigger: 'blur'}],
                     orgName: [{required: true, message: '大楼名称', trigger: 'blur'}],
                     netType: [{required: true, message: '联网方式', trigger: 'blur'}],
                     faceComparesCope: [{required: true, message: '人脸比对阈值', trigger: 'blur'}],
                }
            };
        },
        created() {
            this.findPage(); // VUE对象初始化完成后调用分页查询方法，完成分页查询
        },
        mounted() {

        },
        methods: {
            // 添加
            handleAdd() {
                // 进行表单校验

                // 表单校验通过，发生ajax请求，将录入的数据提交到后台进行处理
                console.log(this.formData);
                this.listLoading = true;
                addBuildingSet(this.formData)
                    .then(res => {
                        // 关闭新增窗口
                        if (res.success) {
                            // 执行成功
                            // 新增成功后，重新调用分页查询方法，查询出最新的数据
                            // 弹出提示信息
                            this.$message({
                                message: "添加成功",
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                            this.findPage();
                        } else {
                            // 执行失败,弹出提示
                            this.$message.error("添加失败");
                            this.dialogFormVisible = false;
                            this.findPage();
                        }
                    })

            },
            // 查询
            findPage() {
                // 发送ajax请求，提交分页相关请求参数（页码、每页显示记录数、查询条件）
                this.listLoading = true,
                    floor().then(res => {
                        // alert(res.size)
                        // 解析Controller响应回的数据，为模型数据赋值
                        // alert(JSON.stringify(res))
                        /* this.formData = res.msg;
                         if (this.formData.netType == '0') {
                             this.formData.netType = 0
                         } else if (this.formData.netType == '1') {
                             this.formData.netType = 1
                         } else {
                             this.formData.netType = 2
                         }*/
                        //    alert(JSON.stringify(res.msg))
                        if (res.msg == null) {
                            this.formData = {};
                        } else {
                            this.formData = res.msg;
                            if (this.formData.netType == '内网') {
                                this.formData.netType = 0
                            } else if (this.formData.netType == '外网') {
                                this.formData.netType = 1
                            } else {
                                this.formData.netType = 2
                            }
                        }
                        this.listLoading = false;
                    });
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


</style>
