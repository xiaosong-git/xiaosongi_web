import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

    export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/HomePage.vue'),
                    meta: { title: '系统首页' }
                },
                {   //系统配置
                    path: '/SysConfig',
                    component: () => import(/* webpackChunkName: "SysConfig" */ '../components/page/SysConfig.vue'),
                    meta: { title: '系统配置' }
                },
                {   //app权限管理
                    path: '/appPower',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/AppPower.vue'),
                    meta: { title: 'app权限管理' }
                },
                {   //部门管理
                    path: '/dept',
                    component: () => import(/* webpackChunkName: "OrganizationTree" */ '../components/page/Dept.vue'),
                    meta: { title: '部门管理' }
                },
                {   //员工信息
                    path: '/deptUser',
                    component: () => import(/* webpackChunkName: "User" */ '../components/page/DeptUser.vue'),
                    meta: { title: '员工信息' }
                },

                {   //用户管理
                    path: '/sysUser',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/SysUser.vue'),
                    meta: { title: '用户管理' }
                },

                {
                    // 考勤规则
                    path: '/rule',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/rule.vue'),
                    meta: { title: '考勤规则' }
                },

                {
                    // 门禁配置
                    path: '/doorControl',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/DoorControl.vue'),
                    meta: { title: '门禁配置' }
                },

                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    //vip管理
                    path: '/vip',
                    component: () => import(/* webpackChunkName: "vipTable" */ '../components/page/Vip.vue'),
                    meta: { title: 'vip管理' }
                },
                {   //设备管理
                    path: '/equipment',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/Equipment.vue'),
                    meta: { title: '设备管理' }
                },
                {   //服务器配置
                    path: '/serverSet',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/ServerSet.vue'),
                    meta: { title: '服务器配置' }
                },
                {   //大楼配置
                    path: '/buildingSet',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/BuildingSet.vue'),
                    meta: { title: '大楼配置' }
                },
                {   //大楼配置
                    path: '/baseSet',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/BaseSet.vue'),
                    meta: { title: '基础配置' }
                },
                {   //设备配置
                    path: '/deviceSet',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/DeviceSet.vue'),
                    meta: { title: '设备配置' }
                },
                {   //通行方式配置
                    path: '/accessSet',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/AccessSet.vue'),
                    meta: { title: '通行方式配置' }
                },
                {   //通行方式配置
                    path: '/personControl',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/PersonControl.vue'),
                    meta: { title: '通行人员管理' }
                },
                {   //通行方式配置
                    path: '/groupSet',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/GroupSet.vue'),
                    meta: { title: '分组管理' }
                },
                {   //通行方式配置
                    path: '/schoolSet',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/SchoolSet.vue'),
                    meta: { title: '名单管理' }
                },
                {   //通行方式配置
                    path: '/reportSet',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/ReportSet.vue'),
                    meta: { title: '报表统计' }
                }

            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录',
                    requireAuth:true
            }

        },
        {
            path: '/license',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/License.vue'),
            meta: { title: '注册使用码',
                requireAuth:true
            }

        },
       /* {
            path: '*',
            redirect: '/404'
        }*/
    ]
});
