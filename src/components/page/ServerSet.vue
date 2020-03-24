<template>
    <!--系统配置-->
    <div class="app">
        <div class="content-header">
            <div class="filter-container">
                <el-input v-model="pagination.queryString" placeholder="服务器名称" style="width: 200px;"
                          class="filter-item"/>
                <el-button class="dalfBut" @click="findByServerType()">查询</el-button>
                <el-button type="primary" class="butT" @click="handleCreate()">添加</el-button>

            </div>
        </div>
        <div class="app-container">
            <div class="box">
                <el-table :data="dataList" size="small" v-loading="listLoading" current-row-key="id" stripe
                          highlight-current-row>
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column type="index" prop="id" align="center" label="序号"/>
                    <el-table-column prop="serverName" label="服务器名称" align="center"/>
                    <el-table-column prop="serverUrl" label="服务器地址" align="center"/>
                    <el-table-column prop="serverPort" label="服务器端口" align="center"/>
                    <el-table-column prop="netStatus" label="网络状态" align="center"/>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleUpdate(scope.$index,scope.row)">编辑
                            </el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination :current-page="pagination.currentPage" :page-size="pagination.pageSize"
                                   :total="pagination.total" class="pagiantion"
                                   layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
                </div>
                <!-- 新增标签弹层 -->
                <div class="add-form">
                    <el-dialog :visible.sync="dialogFormVisible" title="服务器配置">
                        <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right"
                                 label-width="100px">
                            <el-row>
                                <el-col :span="17">
                                    <el-form-item label="服务器名称:" prop="serverName">
                                            <el-radio-group v-model="formData.serverName">
                                            <el-radio class="radio" :label="0">文件服务器</el-radio>
                                            <el-radio class="radio" :label="1">数据服务器</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="17">
                                    <el-form-item label="服务器地址:" prop="serverUrl">
                                        <el-input v-model="formData.serverUrl"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    &nbsp;&nbsp;&nbsp;<el-button type="primary" @click="ping()">测试连接</el-button>
                                </el-col>

                            </el-row>
                            <el-row>
                                <el-col :span="17">
                                    <el-form-item label="服务器端口:" prop="serverPort">
                                        <el-input v-model="formData.serverPort"/>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="handleAdd()">确定</el-button>
                        </div>
                    </el-dialog>
                </div>

                <!-- 编辑标签弹层 -->
                <div class="add-form">
                    <el-dialog :visible.sync="dialogFormVisible4Edit" title="编辑服务器配置">
                        <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right"
                                 label-width="100px">
                            <el-row>
                                <el-col :span="17">
                                    <el-form-item label="服务器名称:" prop="serverName">
                                        <el-radio-group v-model="formData.serverName">
                                            <el-radio class="radio" :label="0">文件服务器</el-radio>
                                            <el-radio class="radio" :label="1">数据服务器</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="17">
                                    <el-form-item label="服务器地址:" prop="serverUrl">
                                        <el-input v-model="formData.serverUrl"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    &nbsp;&nbsp;&nbsp;<el-button type="primary" @click="ping()">测试连接</el-button>
                                </el-col>

                            </el-row>
                            <el-row>
                                <el-col :span="17">
                                    <el-form-item label="服务器端口:" prop="serverPort">
                                        <el-input v-model="formData.serverPort"/>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                        </el-form>
                        <div slot="footer" class="dialog-footer">

                            <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
                            <el-button type="primary" @click="handleEdit()">确定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        addServerSet,
        selectServer,
        delServerSet,
        editServerSet,
        testServerUrl,
        findByServerName
    } from '../../api/index.js'

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
                dataList: [], // 当前页要展示的分页列表数据
                formData: {}, // 表单数据
                dialogFormVisible: false, // 增加表单是否可见
                dialogFormVisible4Edit: false, // 编辑表单是否可见
                listLoading: false,       //列表加载
                rules: {
                    // 校验规则
                    id: [{required: true, message: '服务器名称', trigger: 'blur'}],
                    serverName: [{required: true, message: '服务器名称', trigger: 'blur'}],
                    serverUrl: [{required: true, message: '服务器地址', trigger: 'blur'},
                        {
                            pattern: /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g,
                            message: 'IP地址格式错误'
                        }],
                    serverPort: [{required: true, message: '服务器端口', trigger: 'blur'}],
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
                        editServerSet(this.formData)
                            .then(res => {
                                if (res.success) {
                                    // 弹出成功提示信息
                                    this.$message({
                                        type: 'success',
                                        message: "修改成功"
                                    });
                                } else {
                                    // 执行失败
                                    this.$message.error("修改失败");
                                }
                            })
                            .finally(() => {
                                // 隐藏编辑窗口
                                this.dialogFormVisible4Edit = false;
                                // 不管成功还是失败，都调用分页查询方法
                                this.findPage();

                            });
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
                        /*
                            遍历数据列表判断数据是不是与新建数据冲突（决定服务器类型只有一种）
                        */
                        var serName = this.formData.serverName == '0' ? "文件服务器" : "数据服务器";
                        var n = this.pagination.total;
                        for (var i = 0; i < n; i++) {
                            if (this.dataList[i].serverName == serName) {
                                this.$message.error("已配置该服务器ping类型数据")
                                return false;
                            }
                        }
                        // 表单校验通过，发生ajax请求，将录入的数据提交到后台进行处理
                        console.log(this.formData);
                        this.listLoading = true;

                        addServerSet(this.formData)
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
                                    this.findPage();
                                } else {
                                    // 执行失败,弹出提示
                                    this.$message.error("添加失败");
                                }
                            })
                            .finally(() => {
                                // 不管成功还是失败，都调用分页查询方法
                                this.findPage();
                                // 隐藏编辑窗口
                                this.dialogFormVisible = false;
                            });
                    } else {
                        // 校验不通过
                        this.$message.error('数据校验失败，请检查你的输入信息是否正确！');
                        return false;
                    }
                    this.listLoading = false;
                });
            },
            // 测试连接
            ping() {
                var para = {'serverUrl': this.formData.serverUrl}
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
            findByServerType() {
                var param = {"serverName": this.pagination.queryString};
                    findByServerName(param).then( res =>{
                        if(res.success){
                            this.$message.success("查询成功")
                            this.dataList = res.msg;
                            this.pagination.total = res.size;
                        }else{
                            this.$message.success("查询失败")
                            this.dataList = "";
                            this.pagination.total = 0;
                        }
                    })
            },
            // 分页查询
            findPage() {
                // 发送ajax请求，提交分页相关请求参数（页码、每页显示记录数、查询条件）
                var param = {
                    currentPage: this.pagination.currentPage,
                    pageSize: this.pagination.pageSize,
                    queryString: this.pagination.queryString
                };

                this.listLoading = true,
                    selectServer().then(res => {
                        this.dataList = res.msg;
                        this.pagination.total = res.size;
                        this.listLoading = false;
                    });
            },
            // 重置表单
            resetForm() {
                this.formData = {}; // 重置数据
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

                if (this.formData.serverName == '文件服务器') {
                    this.formData.serverName = 0
                } else if (this.formData.serverName == '数据服务器') {
                    this.formData.serverName = 1
                } else {
                    this.formData.serverName = 2

                }
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
                // alert(row.id);
                this.formData = Object.assign({}, row);
                var para = {'id': this.formData.id}
                this.$confirm('你确定要删除当前数据吗？', '提示', {
                    // 确认框
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true,
                        // 用户点击确定按钮，发送ajax请求，将检查项ID提交到Controller进行处理

                        delServerSet(para).then(res => {
                            this.listLoading = false,
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            this.findPage();
                        });
                })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '操作已取消'
                        });
                    });
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
