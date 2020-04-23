<template>
    <!--系统配置-->
    <div class="app">
        <div class="content-header" style="margin-left: 5%">
            <div class="query">
                <label>开始时间:</label>
                <el-date-picker
                        v-model="beginTime"
                        type="date"
                        placeholder="选择开始日期"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <label>结束时间:</label>
                <el-date-picker
                        v-model="endTime"
                        type="date"
                        placeholder="选择结束日期"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <label>班级:</label>
                <el-input class="filter-item" placeholder="班级" style="width: 220px;"
                          v-model="groupName"/>
                <el-button @click="findByName()" class="search">查询</el-button>
                <el-button @click="handleCreate()" class="add" style="margin-right: 0%">报表下载</el-button>
            </div>
            <div style="margin-top: 5%" >
                <label>宿舍编号:</label>
                <el-input class="filter-item" placeholder="宿舍编号" style="width: 220px;"
                          v-model="dormitory"/>
                 <label>体温状态:</label>
                <el-select v-model="status" placeholder="请选择" class="filter-item" style="width: 220px">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <label style="margin-left: 0.8%">姓名:</label>
                <el-input class="filter-item" placeholder="姓名" style="width: 220px;"
                          v-model="userName"/>
            </div>

                <!-- <el-select v-model="value" placeholder="请选择" class="filter-item">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.id"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>-->

        </div>
        <div class="app-container">
            <div class="box">
                <el-table :data="dataList" current-row-key="id" highlight-current-row
                          size="small" stripe
                          v-loading="listLoading">
                    <el-table-column align="center" label="序号" type="index"/>
                    <el-table-column align="center" label="分组" prop="groupName"/>
                    <el-table-column align="center" label="宿舍编号" prop="dormitory"/>
                    <el-table-column align="center" label="姓名" prop="name1"/>
                    <el-table-column align="center" label="学号（工号）" prop="studentNumber"/>
                    <el-table-column align="center" label="体温" prop="temperature"/>
                    <el-table-column align="center" label="是否正常" :formatter="statformate"/>
                    <el-table-column align="center" label="测量时间" prop="date"/>
                </el-table>

                <div class="pagination-container">
                    <el-pagination :current-page="pagination.currentPage" :page-size="pagination.pageSize"
                                   :total="pagination.total" @current-change="handleCurrentChange"
                                   class="pagiantion" layout="total, prev, pager, next, jumper"/>
                </div>
                <!-- 新增标签弹层 -->
                <div class="add-form">
                    <el-dialog :visible.sync="dialogFormVisible" title="报表下载" width="25%">
                        <el-form :model="formData" :rules="rules" label-position="right" label-width="100px"
                                 ref="dataAddForm">
                            <el-row>
                                <el-col :span="20">
                                    <el-form-item label="组名：" prop="groupId">
                                        <el-select v-model="value" placeholder="请选择">
                                            <el-option
                                                    v-for="item in groupList"
                                                    :key="item.id"
                                                    :label="item.groupName"
                                                    :value="item.groupName">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>

                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="dialog-footer" slot="footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button @click="download()" type="primary">下载</el-button>
                        </div>
                    </el-dialog>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import { findAllRecord ,findGroup,findRecordByName} from '../../api/index.js'

    let url = "http://127.0.0.1:80/statement?groupName=";
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
                value:'',
                beginTime:'',
                endTime:'',
                userName:'',
                groupName:'',
                status:'',
                dormitory:'',
                options:[{
                    value:'',
                    label:""
                },{
                    value:'normal',
                    label:"正常"
                },{
                    value:'abnormal',
                    label:"异常"
                }],
                groupList:[],
                imageUrl: '',
                dataList: [], // 当前页要展示的分页列表数据
                formData: {}, // 表单数据
                dialogFormVisible: false, // 增加表单是否可见
                listLoading: false,       //列表加载
                dialogLoading: false,
                rules: {
                }
            };
        },
        created() {
            this.findPage(); // VUE对象初始化完成后调用分页查询方法，完成分页查询*/

            this.findGroup()
        },
        mounted() {

        },
        methods: {
            statformate(row){
                switch (row.status1) {
                    case 'normal':
                        return '正常';
                        break;
                    case 'abnormal':
                        return '异常'
                    break;
                }
            },
            // 添加
            download() {
                window.open(url+this.value)
                this.dialogFormVisible = false
            },
            // 分页查询
            findPage() {
                // 发送ajax请求，提交分页相关请求参数（页码、每页显示记录数、查询条件）
                var param = {
                    currentPage: this.pagination.currentPage,
                    pageSize: this.pagination.pageSize,
                    queryString: this.pagination.queryString,
                    userName: this.userName,
                    status:this.status,
                    groupName:this.groupName,
                    dormitory: this.dormitory,
                    beginTime: this.beginTime,
                    endTime:this.endTime
                };
                findRecordByName(param).then(res => {
                    // 解析Controller响应回的数据，为模型数据赋值
                    window.console.log(res)
                    this.dataList = res.msg;
                    this.pagination.total = res.size;
                });
            },

            findGroup() {
                var param = {
                    currentPage: 1,
                    pageSize: 100
                };
                findGroup(param).then(res => {
                    this.groupList = res.msg;
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
            findByName(){
                var param = {
                    currentPage: this.pagination.currentPage,
                    pageSize: this.pagination.pageSize,
                    userName: this.userName,
                    status:this.status,
                    groupName:this.groupName,
                    dormitory: this.dormitory,
                    beginTime: this.beginTime,
                    endTime:this.endTime
                };
               /* window.console.log(param)*/
               findRecordByName(param).then(res => {
                    if (res.success) {
                        this.$message.success("查询成功")
                        this.dataList = res.msg;
                        this.pagination.total = res.size;
                    } else {
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
    .query{
        float: left;
    }
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
       // float: right;

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
        margin: 3% 30px 15px 15px;

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
