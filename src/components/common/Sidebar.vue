<template>
    <div class="sidebar">
            <el-menu
                    class="sidebar-el-menu"
                    :default-active="onRoutes"
                    :collapse="collapse"
                    background-color="#FFFFFF"
                    text-color="#000000"
                    active-text-color="#015EFF"
                    active-background-color='#033CE1'
                    unique-opened
                    router
            >
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index+''" :key="item.index">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.title }}</span>
                            </template>
                            <template v-for="subItem in item.subs">
                                <el-submenu
                                        v-if="subItem.subs"
                                        :index="subItem.index"
                                        :key="subItem.index"
                                >
                                    <template slot="title">{{ subItem.title }}</template>
                                    <el-menu-item
                                            v-for="(threeItem,i) in subItem.subs"
                                            :key="i"
                                            :index="threeItem.index"
                                    >{{ threeItem.title }}
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item
                                        v-else
                                        :index="subItem.index"
                                        :key="subItem.index"
                                >{{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :key="item.index">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';

    export default {
        data() {
            return {
                collapse: false,
                sidebarShow: true,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    }, {
                        icon: 'el-icon-setting',
                        index: '2',
                        title: '系统配置',
                        subs: [
                            {
                                index: 'baseSet',
                                title: '基础配置'
                            },
                            {
                                index: 'deviceSet',
                                title: '设备配置'
                            },
                        ]

                    },

                    {
                        icon: 'el-icon-user-solid',

                        title: '人员管理',
                        subs: [

                            {
                                index: 'personControl',
                                title: '通行人员管理'
                            },

                        ]
                    },
                    {
                        icon: 'el-icon-school',
                        index: '3',
                        title: '校园管理',
                        subs: [
                            {
                                index: 'groupSet',
                                title: '分组管理'
                            },
                            {
                                index: 'schoolSet',
                                title: '名单管理'
                            },
                            {
                                index: 'reportSet',
                                title: '报表统计'
                            }
                        ]

                    },
                ]
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {

            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });

        },

    };
</script>

<style scoped>
    .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}</style>
