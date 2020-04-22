<template>
    <!--系统配置-->
    <div class="app">
        <div class="content-header">
            <div class="filter-container">
                <el-input v-model="pagination.queryString" placeholder="设备类型" style="width: 200px;"
                          class="filter-item"/>
                <el-button class="search" @click="findByTpye()">查询</el-button>
                <el-button type="primary" class="add" @click="handleCreate()">新增</el-button>
                <el-button type="danger" class="del" @click="deleteMore()" :disabled="this.sels.length===0">批量删除
                </el-button>
            </div>
        </div>
        <div class="app-container">
            <div class="box">
                <el-table :data="dataList" size="small" v-loading="listLoading" @selection-change="selsChange"
                          current-row-key="id" stripe
                          highlight-current-row>
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column align="center" label="序号" type="index"/>
                    <el-table-column prop="deviceMode" label="设备类型" align="center"/>
                    <el-table-column prop="deviceType" label="设备型号" align="center"/>
                    <el-table-column prop="deviceIp" label="设备IP地址" align="center"/>
                    <el-table-column prop="FQ_turnover" label="进出标识" align="center"/>
                    <el-table-column prop="remark" label="备注" align="center"/>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="handleUpdate(scope.$index,scope.row)" icon="el-icon-edit">详情</el-link>
                            &nbsp; &nbsp;
                            <el-link type="primary" @click="handleDelete(scope.$index,scope.row)" icon="el-icon-delete">删除</el-link>
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
                    <el-dialog :visible.sync="dialogFormVisible" title="设备配置">
                        <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right"
                                 label-width="100px">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="控制器配置:" prop="deviceId">
                                        <el-radio-group v-model="formData.relayController">
                                            <el-radio class="radio" :label="0" @change="hideUI()" border="">自有控制器
                                            </el-radio>
                                            <el-radio class="radio" :label="1" @change="viewUI()" border="">外接控制器
                                            </el-radio>
                                            <el-radio class="radio" :label="2" @change="noController()" border="">无控制器
                                            </el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="设备类别:" prop="deviceMode">
                                        <el-select v-model="formData.deviceMode" placeholder="请选择" @change="typeSelect">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="设备型号:" prop="deviceType">
                                        <el-select v-model="devType" placeholder="请选择" @change="typeConfire">
                                            <el-option
                                                    v-for="item in typeOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="IP地址:" prop="deviceIp">
                                        <el-input v-model="formData.deviceIp"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="设备端口:" prop="devicePort">
                                        <el-input v-model="formData.devicePort"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="进出标识:" prop="FQ_turnover">
                                        <el-radio-group v-model="formData.FQ_turnover">
                                            <el-radio class="radio" :label="0">进</el-radio>
                                            <el-radio class="radio" :label="1">出</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="使用状态:" prop="status">
                                        <el-radio-group v-model="formData.status">
                                            <el-radio class="radio" :label="0">使用</el-radio>
                                            <el-radio class="radio" :label="1">闲置</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" v-show="controllerShow">
                                    <el-form-item label="继电器IP:" prop="relayIP">
                                        <el-input v-model="formData.relayIP"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" v-show="controllerShow">
                                    <el-form-item label="继电器端口:" prop="relayPort">
                                        <el-input v-model="formData.relayPort"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="对应楼层:" prop="contralFloor" v-show="noControlShow">
                                        <el-input v-model="formData.contralFloor"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="登录账号:" prop="admin" v-show="userAdmin">
                                        <el-input v-model="formData.admin"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="登录密码:" prop="password" v-show="userAdmin">
                                        <el-input v-model="formData.password"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="备注:" prop="remark">
                                        <el-input v-model="formData.remark"/>
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
                    <el-dialog :visible.sync="dialogFormVisible4Edit" title="编辑设备配置">
                        <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right"
                                 label-width="100px">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="控制器配置:" prop="deviceId">
                                        <el-radio-group v-model="formData.relayController">
                                            <el-radio class="radio" :label="0" @change="hideUI()" border="">自有控制器
                                            </el-radio>
                                            <el-radio class="radio" :label="1" @change="viewUI()" border="">外接控制器
                                            </el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="设备类别:" prop="deviceMode">
                                        <el-select v-model="formData.deviceMode" placeholder="请选择" @change="typeSelect">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="设备型号:" prop="deviceType">
                                        <el-select v-model="formData.deviceType" placeholder="请选择" @change="typeConfire">
                                            <el-option
                                                    v-for="item in typeOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="IP地址:" prop="deviceIp">
                                        <el-input v-model="formData.deviceIp"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="设备端口:" prop="devicePort">
                                        <el-input v-model="formData.devicePort"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="进出标识:" prop="FQ_turnover">
                                        <el-radio-group v-model="formData.FQ_turnover">
                                            <el-radio class="radio" :label="0">进</el-radio>
                                            <el-radio class="radio" :label="1">出</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="使用状态:" prop="status">
                                        <el-radio-group v-model="formData.status">
                                            <el-radio class="radio" :label="0">使用</el-radio>
                                            <el-radio class="radio" :label="1">闲置</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" v-show="controllerShow">
                                    <el-form-item label="继电器IP:" prop="relayIP">
                                        <el-input v-model="formData.relayIP"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" v-show="controllerShow">
                                    <el-form-item label="继电器端口:" prop="relayPort">
                                        <el-input v-model="formData.relayPort"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="对应楼层:" prop="contralFloor">
                                        <el-input v-model="formData.contralFloor"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="登录账号:" prop="admin" v-show="userAdmin">
                                        <el-input v-model="formData.admin"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="登录密码:" prop="password" v-show="userAdmin">
                                        <el-input v-model="formData.password"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="备注:" prop="remark">
                                        <el-input v-model="formData.remark"/>
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
    import {addDeviceSet, selectDeviceSet, delDeviceSet, editDeviceSet, delMoreDeviceSet,findByMode} from '../../api/index.js'

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
                options: [{
                    value: 'FACE',
                    label: '人脸设备'
                }, {
                    value: 'QRCODE',
                    label: '二维码设备'
                }],
                devType:'',
                typeOptions:[],
                userAdmin:true,//登录账号密码隐藏控件
                controllerShow: true,//自有控制器隐藏控件
                noControlShow:true,
                dataList: [], // 当前页要展示的分页列表数据
                formData: {}, // 表单数据
                sels: [],//列表选中列
                dialogFormVisible: false, // 增加表单是否可见
                dialogFormVisible4Edit: false, // 编辑表单是否可见
                listLoading: false,       //列表加载
                rules: {
                    // 校验规则

                    deviceMode: [{required: true, message: '设备类别', trigger: 'blur'}],
                    deviceIp: [{required: true, message: 'IP地址', trigger: 'blur'}],
                    devicePort: [{required: true, message: '端口', trigger: 'blur'}],
                    FQ_turnover: [{required: true, message: '进出标识', trigger: 'blur'}],
                    deviceType: [{required: true, message: '设备型号', trigger: 'blur'}],
                    status: [{required: true, message: '使用状态', trigger: 'blur'}],
                    relayController: [{required: true, message: '使用状态', trigger: 'blur'}],
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
                            editDeviceSet(this.formData)
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
                        // 表单校验通过，发生ajax请求，将录入的数据提交到后台进行处理
                        window.console.log(this.formData);
                        this.listLoading = true;
                        this.formData.deviceType = this.devType;
                        addDeviceSet(this.formData)
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
                    this.typeOptions = [];
                    this.listLoading = false;

            },
            //根据控制器隐藏控件
            hideUI() {
                this.controllerShow = false;
                this.noControlShow = true;
            },
            //根据控制器显示控件
            viewUI() {
                this.controllerShow = true;
                this.noControlShow = true;
            },
            //单一设备，没有控制器
            noController(){
                this.noControlShow = false;
                this.controllerShow = false;
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
                    selectDeviceSet(param).then(res => {
                        // alert(res.size)
                        // 解析Controller响应回的数据，为模型数据赋值
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
                this.typeOptions =[];
                this.resetForm();
            },
            // 弹出编辑窗口
            handleUpdate(index, row) {
                // 弹出编辑窗口

                this.dialogFormVisible4Edit = true;
                this.formData = Object.assign({}, row);

                if (this.formData.relayController == "自有"||this.formData.relayController == "0") {
                    this.formData.relayController = 0;
                    this.controllerShow =false;
                } else if (this.formData.relayController == "外接"||this.formData.relayController == "1") {
                    this.controllerShow =true;
                    this.formData.relayController = 1;
                } else {
                    this.formData.relayController = 3;
                }
                if (this.formData.FQ_turnover == "进") {
                    this.formData.FQ_turnover = 0;
                } else if (this.formData.FQ_turnover == "出") {
                    this.formData.FQ_turnover = 1;
                } else {
                    this.formData.FQ_turnover = null;
                }
                if (this.formData.status == "使用") {
                    this.formData.status = 0;
                } else if (this.formData.status == "闲置") {
                    this.formData.status = 1;
                } else {
                    this.formData.status = null;
                }
                if(this.formData.deviceMode=="人脸设备"){
                    this.typeOptions = [{
                        value: 'TPS980',
                        label: 'TPS980'
                    }, {
                        value: 'DS-K5671',
                        label: 'DS-K5671'
                    }, {
                        value: 'DH-ASI728',
                        label: 'DH-ASI728'
                    }, {
                        value: 'DS-2CD8627FWD',
                        label: 'DS-2CD8627FWD'
                    }, {
                        value: 'KS-250',
                        label: 'KS-250'
                    }];

                }else if(this.formData.deviceMode=="二维码设备"){
                    this.typeOptions = [{
                        value: 'MX86',
                        label: 'MX86'
                    }];
                }else{
                    this.typeOptions = [];
                }

                if(this.formData.deviceType == 'DH-ASI728'||this.formData.deviceType == 'DS-K5671'||this.formData.deviceType=='DS-2CD8627FWD'||this.formData.deviceType == 'KS-250'){
                    this.userAdmin =true;
                }else{
                    this.userAdmin =false;
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
                var para = {'deviceId': this.formData.deviceId}
                this.$confirm('你确定要删除当前数据吗？', '提示', {
                    // 确认框
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true,
                        // 用户点击确定按钮，发送ajax请求，将检查项ID提交到Controller进行处理
                        delDeviceSet(para).then(res => {
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
                        });deleteMore
                    });
            },
            //批量选中
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            deleteMore() {
                var ids = {"deviceId": this.sels.map(item => item.deviceId).toString()};
                this.$confirm('你确定要删除当前数据吗？', '提示', {
                    // 确认框
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true,
                        // 用户点击确定按钮，发送ajax请求，将检查项ID提交到Controller进行处理
                        delMoreDeviceSet(ids).then(res => {
                            if (res.success) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error("批量删除失败")
                            }
                            this.listLoading = false,
                                this.findPage()
                        })
                })
            },

            typeSelect(itemValue){

                if(itemValue =='FACE'){
                    this.typeOptions = [{
                        value: 'TPS980',
                        label: 'TPS980'
                    }, {
                        value: 'DS-K5671',
                        label: 'DS-K5671'
                    }, {
                        value: 'DH-ASI728',
                        label: 'DH-ASI728'
                    }, {
                        value: 'DS-2CD8627FWD',
                        label: 'DS-2CD8627FWD'
                    }, {
                        value: 'KS-250',
                        label: 'KS-250'
                    }];
                    this.formData.deviceType =""
                }else if(itemValue =='QRCODE'){
                    this.typeOptions = [{
                        value: 'MX86',
                        label: 'MX86'
                    }];
                    this.formData.deviceType =""
                }
            },

            typeConfire(itemVaule){
                window.console.log(itemVaule)
                this.formData.deviceType = itemVaule;
                if(itemVaule == 'DH-ASI728'||itemVaule == 'DS-K5671'||itemVaule=='DS-2CD8627FWD'||itemVaule=='KS-250'){
                    this.userAdmin =true;
                }else{
                    this.userAdmin =false;
                }
            },

            findByTpye(){
                var para = {
                    "deviceMode":this.pagination.queryString,
                    "currentPage":this.pagination.currentPage
                }
                this.listLoading = true;
                findByMode(para).then(res=>{
                    if(res.success){
                        this.$message.success("查询成功")
                        this.dataList = res.msg;
                        this.pagination.total = res.size;
                        this.listLoading = false;
                    }else{
                        this.$message.error("查询失败")
                        this.listLoading = false;
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
    .search{
        background:rgba(32,133,255,1);
        color:rgba(255,255,255,1);
        margin-left: 10px;
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
