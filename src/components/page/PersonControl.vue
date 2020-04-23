<template>
    <!--系统配置-->
    <div class="app">
        <div class="content-header">
            <div class="filter-container">
                <el-input class="filter-item" placeholder="用户姓名" style="width: 200px;"
                          v-model="pagination.queryString"/>
                <el-button @click="findByName()" class="search">查询</el-button>
                <el-button @click="handleCreate()" class="add" >新增</el-button>
                <el-button :disabled="this.sels.length===0" @click="delMoreUser()" class="del">批量删除
                </el-button>
            </div>
        </div>
        <div class="app-container">
            <div class="box">
                <el-table :data="dataList" @selection-change="selsChange" current-row-key="id" highlight-current-row
                          size="small" stripe
                          v-loading="listLoading">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column align="center" label="序号" type="index"/>
                    <el-table-column align="center" label="用户姓名" prop="userName"/>
                    <el-table-column align="center" label="卡号" prop="userId"/>
                    <el-table-column align="center" label="证件号" prop="idNO"/>
                    <el-table-column align="center" label="通行楼层" prop="companyFloor"/>

                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="handleUpdate(scope.$index,scope.row)" icon="el-icon-edit">详情</el-link>
                            &nbsp; &nbsp;
                            <el-link type="primary" @click="handleDelete(scope.$index,scope.row)" icon="el-icon-delete">删除</el-link>
                           <!-- <el-button @click="handleUpdate(scope.$index,scope.row)" size="mini" type="primary">详情
                            </el-button>-->
                           <!-- <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger">删除
                            </el-button>-->

                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination :current-page="pagination.currentPage" :page-size="pagination.pageSize"
                                   :total="pagination.total" @current-change="handleCurrentChange"
                                   class="pagiantion" layout="total, prev, pager, next, jumper"/>
                </div>
                <!-- 新增标签弹层 -->
                <div class="add-form">
                    <el-dialog :visible.sync="dialogFormVisible" title="人员管理">
                        <el-form :model="formData" :rules="rules" label-position="right" label-width="100px"
                                 ref="dataAddForm">
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="用户姓名:" prop="userName">
                                        <el-input v-model="formData.userName"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="卡号:" prop="userId">
                                        <el-input v-model="formData.userId"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="证件号:" prop="idNO">
                                        <el-input v-model="formData.idNO"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="通行楼层:" prop="companyFloor">
                                        <el-input v-model="formData.companyFloor"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="照片:" prop="photo">

                                        <el-upload
                                                :on-success="handleAvatarSuccess"
                                                :show-file-list="false"
                                                action="http://192.168.4.2:80/person/pic"
                                                class="avatar-uploader">
                                            <img :src="imageUrl" class="avatar" v-if="imageUrl">
                                            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                                        </el-upload>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="dialog-footer" slot="footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button @click="handleAdd()" type="primary">确定</el-button>
                        </div>
                    </el-dialog>
                </div>

                <!-- 编辑标签弹层 -->
                <div class="add-form" v-loading="dialogLoading">
                    <el-dialog :visible.sync="dialogFormVisible4Edit" title="编辑服务器配置">
                        <el-form :model="formData" :rules="rules" label-position="right" label-width="100px"
                                 ref="dataEditForm">
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="用户姓名:" prop="deviceId">
                                        <el-input v-model="formData.userName"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="卡号:" prop="userId">
                                        <el-input v-model="formData.userId"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="证件号:" prop="idNO">
                                        <el-input v-model="formData.idNO"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="通行楼层:" prop="companyFloor">
                                        <el-input v-model="formData.companyFloor"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="照片:" prop="devicePort">
                                        <el-upload
                                                :on-success="handleAvatarSuccess"
                                                :show-file-list="false"
                                                action="http://127.0.0.1:80/person/pic"
                                                class="avatar-uploader"
                                                >
                                            <img :src="imageUrl" class="avatar" v-if="imageUrl">
                                            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                                        </el-upload>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="dialog-footer" slot="footer">
                            <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
                            <el-button @click="handleEdit()" type="primary">确定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {addUser, findPersonControl, delPersonControl, editPersonControl, delMorePerson,findByName} from '../../api/index.js'

    export default {
        name: '',
        components: {},
        data() {
            return {
                pagination: {
                    // 分页相关模型数据
                    currentPage: 1, // 当前页码
                    pageSize: 10, // 每页显示的记录数
                    total: 0, // 总记录数
                    queryString: null // 查询条件
                },
                imageUrl: '',
                controllerShow: true,//自有控制器隐藏控件
                dataList: [], // 当前页要展示的分页列表数据
                formData: {}, // 表单数据
                sels: [],//列表选中列
                dialogFormVisible: false, // 增加表单是否可见
                dialogFormVisible4Edit: false, // 编辑表单是否可见
                listLoading: false,       //列表加载
                dialogLoading: false,
                rules: {
                    // 校验规则
                    /* userName: [{required: true, message: '用户姓名', trigger: 'blur'}],
                     userId: [{required: true, message: '卡号', trigger: 'blur'}],
                     idNO: [{required: true, message: '证件号', trigger: 'blur'}],
                     companyFloor: [{required: true, message: '楼层', trigger: 'blur'}],
 */

                }
            };
        },
        created() {
            this.findPage(); // VUE对象初始化完成后调用分页查询方法，完成分页查询
        },
        mounted() {

        },
        methods: {
            // 编辑
            handleEdit() {
                // 进行表单校验
                this.$refs['dataEditForm'].validate(valid => {
                    if (valid) {
                        // 表单校验通过，可以提交数据
                        this.listLoading=true;
                        this.dialogFormVisible4Edit =false;
                        editPersonControl(this.formData)
                            .then(res => {

                                if (res.success) {
                                    // 弹出成功提示信息
                                    this.listLoading=false,
                                    this.$message({
                                        type: 'success',
                                        message: "修改成功"
                                    });
                                    this.findPage();
                                } else {
                                    // 执行失败
                                    this.listLoading=false,
                                    this.$message.error("修改失败");
                                    this.findPage();
                                }
                            })
                    } else {
                        // 表单校验不通过
                        this.$message.error('表单数据校验失败!');
                        return false;
                    }
                });
            },
            // 添加
            handleAdd() {

                // 进行表单校验
                this.$refs['dataAddForm'].validate(valid => {
                    if (valid) {
                        // 表单校验通过，发生ajax请求，将录入的数据提交到后台进行处理
                        console.log(this.formData);
                        this.dialogFormVisible =false;
                        this.listLoading =true;
                        addUser(this.formData).then(res => {

                            if (res.success) {

                                this.findPage();
                                this.$message({
                                    type: 'success',
                                    message: "添加成功"
                                });
                                this.listLoading =false;
                            } else {
                                // 执行失败
                                this.$message.error("添加失败");
                                this.findPage();
                                this.listLoading =false;
                            }
                        });


                        // 不管成功还是失败，都调用分页查询方法

                    } else {
                        // 校验不通过
                        this.$message.error('数据校验失败，请检查你的输入信息是否正确！');
                        return false;
                    }

                });


            },

            //根据控制器隐藏控件
            hideUI() {
                this.controllerShow = false;
            },
            //根据控制器显示控件
            viewUI() {
                this.controllerShow = true;
            },
            // 分页查询
            findPage() {
                // 发送ajax请求，提交分页相关请求参数（页码、每页显示记录数、查询条件）
                var param = {
                    currentPage: this.pagination.currentPage,
                    pageSize: this.pagination.pageSize,
                    queryString: this.pagination.queryString
                };
                findPersonControl(param).then(res => {
                    // 解析Controller响应回的数据，为模型数据赋值
                    this.dataList = res.msg;
                    this.pagination.total = res.size;
                    //   this.listLoading = false;
                });
            },
            // 重置表单
            resetForm() {
                this.formData = {}; // 重置数据
                this.imageUrl = '';
            },
            // 弹出添加窗口
            handleCreate() {
                // 弹出新增窗口
                this.dialogFormVisible = true;
                this.resetForm();
            },

            // 弹出编辑窗口
            handleUpdate(index, row) {
                // 弹出编辑窗口
                this.dialogFormVisible4Edit = true;
                this.formData = Object.assign({}, row);
                this.imageUrl = "http://192.168.4.2:80/img/" + this.formData.photo;

            },
            handleAvatarSuccess(res, file) {

                this.imageUrl = URL.createObjectURL(file.raw);
                this.formData.photo = res.msg
            },
            // 切换页码
            handleCurrentChange(currentPage) {
                // 设置最新的页码
                this.pagination.currentPage = currentPage;
                // 重新调用findPage方法进行分页查询
                this.findPage();
            },
            // 删除
            handleDelete(index, row) {
                // row其实是一个json对象，json对象的结构为{"age":"0-100","attention":"无","code":"0011","id":38,"name":"白细胞计数","price":10.0,"remark":"白细胞计数","sex":"0","type":"2"}

                this.formData = Object.assign({}, row);
                var para = {'deviceId': this.formData.deviceId}

                this.$confirm('你确定要删除当前数据吗？', '提示', {
                    // 确认框
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    // 用户点击确定按钮，发送ajax请求，将检查项ID提交到Controller进行处理
                    var companyUserId = {"companyUserId": this.formData.companyUserId}
                    delPersonControl(companyUserId).then(res => {

                        this.listLoading = false;
                        this.findPage();
                    })
                })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '操作已取消'
                        });
                    });
            },
            //批量选中
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            delMoreUser() {
                var ids = {"companyUserId": this.sels.map(item => item.companyUserId).toString()};

                this.$confirm('你确定要删除当前数据吗？', '提示', {
                    // 确认框
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                        // 用户点击确定按钮，发送ajax请求，将检查项ID提交到Controller进行处理
                    delMorePerson(ids).then(res=>{

                       if(res.success){
                            this.$message.success("删除成功")
                           this.findPage();
                           this.listLoading = false;
                        }else{
                            this.$message.error("删除失败")
                           this.findPage();
                           this.listLoading = false;
                        }
                    })
                    this.listLoading = false;
                })
            },

            //根据名字查找
            findByName(){
                var param = {
                    currentPage: this.pagination.currentPage,
                    pageSize: this.pagination.pageSize,
                    queryString: this.pagination.queryString,
                    "userName":this.pagination.queryString
                };

               findByName(param).then( res=>{
                    if(res.success){
                        this.$message.success("查询成功")
                        this.dataList = res.msg;
                        this.pagination.total = res.size;
                    }else{
                        this.$message.error("查询失败")
                        this.dataList = "";
                        this.pagination.total = 0;
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
    .del{
        background:rgba(232,76,20,1);
        color:rgba(255,255,255,1);
        float: right;

    }
    .add{
        background:rgba(109,195,47,1);
        color:rgba(255,255,255,1);
        float: right;

    }
    .content-header > h1 {
        margin: 0;
        font-size: 24px;
        font-weight: normal;
    }

    .search{
        background:rgba(32,133,255,1);
        color:rgba(255,255,255,1);
        margin-left: 10px;
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
    .avatar-uploader .el-upload {
        width: 100px;
        height: 100px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 200px;
        display: block;
    }

</style>
