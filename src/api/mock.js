import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'

Mock.mock('/api/home/getData', homeApi.getStatisticalData)

//用户列表数据
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post', permission.getMenu)

// 【VUE项目，VUE项目实战，vue后台管理系统，前端面试，前端面试项目】https://www.bilibili.com/video/BV1QU4y1E7qo?p=24&vd_source=183b22be59ff501b788e5972e860fb1a
// 第24集