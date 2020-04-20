import request from '../utils/request';

let url="";
export const login = query => {  //请求的接口放置位置
    return request({
        // url: './table.json',
        url: '/login',  //接口请求的url
        method: 'post',
        params: query
    });
};
//License验证
export const checkLicense = query => {  //请求的接口放置位置
    return request({
        // url: './table.json',
        url: '/license',  //接口请求的url
        method: 'post',
        params: query
    });

};
//License获取
export const getLicense = query => {  //请求的接口放置位置
    return request({
        // url: './table.json',
        url: '/license/cache',  //接口请求的url
        method: 'get',
        params: query
    });

};

//退出
export const logout = query => {  //请求的接口放置位置
    return request({
        url: '/login/logout',  //接口请求的url
        method: 'post',
        params: query
    });

};
export const floor = query => {  //请求的接口放置位置
    return request({
        url: '/floor',  //接口请求的url
        method: 'get',
        params: query
    });
};
//删除大楼数据
export const delBuildingSet = query => {  //请求的接口放置位置
    return request({
        url: '/floor/delete',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//保存大楼配置
export const addBuildingSet = query => {  //请求的接口放置位置
    return request({
        url: '/floor/save',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//修改大楼配置
export const editBuildingSet = query => {  //请求的接口放置位置
    return request({
        url: '/floor/update',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//查询服务器配置
export const selectServer = query => {  //请求的接口放置位置
    return request({
        url: '/server',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//根据服务器名字查询查询服务器配置
export const findByServerName = query => {  //请求的接口放置位置
    return request({
        url: '/server/findByName',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//保存服务器配置
export const addServerSet = query => {  //请求的接口放置位置
    return request({
        url: '/server/save',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//编辑服务器配置
export const editServerSet = query => {  //请求的接口放置位置
    return request({
        url: '/server/update',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//删除服务器配置
export const delServerSet = query => {  //请求的接口放置位置
    return request({
        url: '/server/delete',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//测试服务器连接
export const testServerUrl = query => {  //请求的接口放置位置
    return request({
        url: '/server/ping',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//内网穿透配置
export const penetrateSet = query => {  //请求的接口放置位置
    return request({
        url: '/penetrate',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//查询所有设备配置
export const selectDeviceSet = query => {  //请求的接口放置位置
    return request({
        url: '/device',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//查询旷世设备
export const findKS = query => {  //请求的接口放置位置
    return request({
        url: '/device/findKS',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//根据设备类型查询设备
export const findByMode = query => {  //请求的接口放置位置
    return request({
        url: '/device/findByType',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//添加所有设备配置
export const addDeviceSet = query => {  //请求的接口放置位置
    return request({
        url: '/device/save',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//修改设备配置
export const editDeviceSet = query => {  //请求的接口放置位置
    return request({
        url: '/device/update',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//删除设备配置
export const delDeviceSet = query => {  //请求的接口放置位置
    return request({
        url: '/device/delete',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//批量删除设备配置
export const delMoreDeviceSet = query => {  //请求的接口放置位置
    return request({
        url: '/device/batchDel',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//查询通行方式配置
export const selectAccessSet = query => {  //请求的接口放置位置
    return request({
        url: '/passWay',  //接口请求的url
        method: 'get',
        params: query,
    });
};
//修改通行方式配置
export const editAccessSet = query => {  //请求的接口放置位置
    return request({
        url: '/passWay/save',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//查询设备使用配置
export const selectDeviceUse = query => {  //请求的接口放置位置
    return request({
        url: '/dr',  //接口请求的url
        method: 'get',
        params: query,
    });
};

//删除设备使用配置
export const delDeviceUse = query => {  //请求的接口放置位置
    return request({
        url: '/dr/delete',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//修改设备使用配置
export const editDeviceUse = query => {  //请求的接口放置位置
    return request({
        url: '/dr/update',  //接口请求的url
        method: 'post',
        params: query,
    });
};

/*
    人员管理
 */
//人员录入
export const addUser = query => {  //请求的接口放置位置
    return request({
        url: '/person/sendFace',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//查找人员
export const findPersonControl = query => {  //请求的接口放置位置
    return request({
        url: '/person',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//上传图片接口
export const addPersonControl = query => {  //请求的接口放置位置
    return request({
        url: '/person/pic',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//删除人员
export const delPersonControl = query => {  //请求的接口放置位置
    return request({
        url: '/person/delete',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//批量删除人员
export const delMorePerson = query => {  //请求的接口放置位置
    return request({
        url: '/person/batchDel',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//修改人员
export const editPersonControl = query => {  //请求的接口放置位置
    return request({
        url: '/person/update',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//根据姓名查找用户
export const findByName = query => {  //请求的接口放置位置
    return request({
        url: '/person/findByName',  //接口请求的url
        method: 'post',
        params: query,
    });
};
/**
 *
 *  校园管理
 * @param query
 */
//查询所有分组
export const findGroup = query => {  //请求的接口放置位置
    return request({
        url: '/group',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//新增分组
export const addGroup = query => {  //请求的接口放置位置
    return request({
        url: '/group/save',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//修改分组
export const editGroup = query => {  //请求的接口放置位置
    return request({
        url: '/group/update',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//删除单条分组
export const delGroup = query => {  //请求的接口放置位置
    return request({
        url: '/group/delete',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//批量删除分组
export const delBatchGroup = query => {  //请求的接口放置位置
    return request({
        url: '/group/batchDel',  //接口请求的url
        method: 'post',
        params: query,
    });
};

//查询所有名单
export const findPer = query => {  //请求的接口放置位置
    return request({
        url: '/per',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//新增名单
export const addPer = query => {  //请求的接口放置位置
    return request({
        url: '/per/save',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//修改名单
export const editPer = query => {  //请求的接口放置位置
    return request({
        url: '/per/update',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//删除名单
export const delPer = query => {  //请求的接口放置位置
    return request({
        url: '/per/delete',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//批量删除名单
export const delBatchPer = query => {  //请求的接口放置位置
    return request({
        url: '/per/batchDel',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//查询人所在组别
export const findPerByGroup = query => {  //请求的接口放置位置
    return request({
        url: '/per/findGroupName',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//人员信息导入（excel）
export const importPerExcel = query => {  //请求的接口放置位置
    return request({
        url: '/per/batchImport',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//人员查找
export const findPerByName = query => {  //请求的接口放置位置
    return request({
        url: '/per/dim',  //接口请求的url
        method: 'post',
        params: query,
    });
};
//报表下载
export const download = query => {  //请求的接口放置位置
    return request({
        url: '/statement',  //接口请求的url
        method: 'post',
        params: query,
        responseType: 'blob'
    });
};
//报表下载
export const findAllRecord = query => {  //请求的接口放置位置
    return request({
        url: '/statement/findAll',  //接口请求的url
        method: 'post',
        params: query,

    });
};
//报表查找某人
export const findRecordByName = query => {  //请求的接口放置位置
    return request({
        url: '/statement/bim',  //接口请求的url
        method: 'post',
        params: query,

    });
};