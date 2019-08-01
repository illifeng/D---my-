// 引入模块
const express = require('express')
// 创建express实例对象router
const router = express.Router()

// 引入控制器用户模块
const indexClit = require('../controller/postClit')
const getAllCate = require('../controller/getAllCate')
const postAllUploads = require('../controller/postAllUploads')
const useController = require('../controller/useController')
// 判断请求文件的路径,调用控制器方法
router.get('/index', indexClit.getIndexPage)
    .get('/detail', indexClit.getDetailPage)
    .get('/list', indexClit.getListPage)
    .get('/admin', indexClit.getAdmin)
    .get('/categories', indexClit.getCategories)
    .get('/nav-menus', indexClit.getNavMenusPage)
    .get('/comments', indexClit.getCommentsPage)
    .get('/login', indexClit.getLoginPage)
    .get('/password-reset', indexClit.getPasswordResetPage)
    .get('/post-add', indexClit.getPostAddPage)
    .get('/posts', indexClit.getPostsPage)
    .get('/profile', indexClit.getProfilePage)
    .get('/settings', indexClit.getSettingsPage)
    .get('/slides', indexClit.getSlidesPage)
    .get('/users', indexClit.getUsersPage)

    // 获取所有数据
    .get('/getAllPost', indexClit.getAllNum)
    // 删除数据
    .get('/removeAllNum', indexClit.removeNum)
    // 筛选数据,分类数据
    .get('/getCate', getAllCate.setAllCate)
    // 上传数据
    .post('/postUploads', postAllUploads.getAllUploads)
    // 添加数据
    .post('/addPosts', indexClit.addAllPosts)
    // 用户登录
    .post('/getUse', useController.getAllUse)
    // 分页目录下的添加
    .post('/setCateAll', indexClit.cateAll)
// 向外暴露,要不会报错为没有中间件
module.exports = router
