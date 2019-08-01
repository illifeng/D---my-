
const postModule = require('../module/postModule')
// 向外暴露，静态ejs文件的路径判断
module.exports.getIndexPage = (req, res) => {
    // 路径正确,向浏览器输出页面
    res.render('index.ejs', {})
}
module.exports.getListPage = (req, res) => {
    res.render('list.ejs', {})
}
module.exports.getDetailPage = (req, res) => {
    res.render('detail.ejs', {})
}
exports.getAdmin = (req, res) => {
    res.render('admin/index.ejs')
}
exports.getCategories = (req, res) => {
    res.render('admin/categories.ejs')
}
exports.getNavMenusPage = (req, res) => {
    res.render('admin/nav-menus.ejs')
}
module.exports.getLoginPage = (req, res) => {
    res.render('admin/login.ejs')
}
module.exports.getCommentsPage = (req, res) => {
    res.render('admin/comments.ejs')
}
module.exports.getPasswordResetPage = (req, res) => {
    res.render('admin/password-reset.ejs')
}
module.exports.getPostAddPage = (req, res) => {
    res.render('admin/post-add.ejs')
}
module.exports.getPostsPage = (req, res) => {
    res.render('admin/posts.ejs')
}
exports.getProfilePage = (req, res) => {
    res.render('admin/profile.ejs')
}
module.exports.getSettingsPage = (req, res) => {
    res.render('admin/settings.ejs')
}
module.exports.getSlidesPage = (req, res) => {
    res.render('admin/slides.ejs')
}
module.exports.getUsersPage = (req, res) => {
    res.render('admin/users.ejs')
}
// 获取所有数据,这样肯定涉及获取数据成功与否，res（请求相关）req（响应相关）
module.exports.getAllNum = (req, res) => {
    // 获取前台请求来的对象，页码与页中显示的条数
    let obj = req.query
    // console.log(obj);
    // 数据模块返回给控制器的回调函数
    postModule.getAllPosts(obj, (err, data) => {
        if (err) {
            res.json({
                'code': 200,
                'msg': '获取数据失败'
            })
        } else {
            res.json({
                'code': 0,
                'msg': '获取数据成功',
                'data': data

            })
        }
    })
}
module.exports.removeNum = (req, res) => {
    // 获取前台请求来的对象，获取请求发来的要删除的
    let getId = req.query.id
    console.log(getId);
    // postModule.removeAllNum数据模块中的方法
    postModule.removeAllNum(getId, (err) => {
        if (err) {
            res.json({
                'code': 200,
                'msg': '删除数据失败'
            })
        } else {
            res.json({
                'code': 0,
                'msg': '删除数据成功'
            })
        }
    })
}
// 添加数据
module.exports.addAllPosts = (req, res) => {
    let obj = req.body
    // console.log('1111111');
    // console.log(obj);
    // console.log('12221111');
    obj.id = null
    obj.views = 0
    obj.likes = 0
    obj.user_id = req.session.setAllUse.id
    postModule.allPosts(obj, (err, data) => {
        // console.log(data);
        // console.log(obj.user_id);
        if (err) {
            res.json({
                'code': 200,
                'msg': '添加数据失败'
            })
        } else {
            res.json({
                'code': 0,
                'msg': '添加数据成功',
            })
        }
    })
}
// 分页目录中的添加数据
module.exports.cateAll = (req, res) => {
    let obj = req.body
    console.log('1111111');
    console.log(obj);
    console.log('12221111');
    postModule.catePosts(obj, (err, data) => {
        console.log(data);
        if (err) {
            res.json({
                'code': 200,
                'msg': '添加数据失败'
            })
        } else {
            res.json({
                'code': 0,
                'msg': '添加数据成功',
            })
        }
    })
}