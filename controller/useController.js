// 用户登录
const useModule = require('../module/useModule')
module.exports.getAllUse = (req, res) => {
    // 获取用户输入的内容
    let obj = req.body
    // console.log(obj);
    console.log(999);
    useModule.setUse(obj.email, (err, data) => {
        console.log(data);
        // 后台返回错误结果时
        if (err) {
            res.json({
                'code': 200,
                'msg': '获取用户数据失败'
            })
        } else {
            // 有数据回来时
            // console.log(123);
            if (data) {
                // 进行用户密码与后台返回的密码是否一致
                if (data.password == obj.password) {
                    // 一致的话就以session方式进行状态保持
                    req.session.login = 'true'
                    // 将当前用户数据存储到setAllUse中
                    req.session.setAllUse = data
                    // 转成字符串形式进行存储
                    console.log(req.session.setAllUse);
                    res.end(JSON.stringify({
                        code: 0,
                        msg: '如何登陆成功'
                    }))
                } else {
                    // 否则直接提示
                    res.end(JSON.stringify({
                        code: 200,
                        msg: '密码输入不正确'
                    }))
                    // console.log('不一样');
                }
            } else {
                res.json({
                    'code': 200,
                    'msg': '邮箱输入不正确'
                })
                // console.log('非常一样');
            }
        }
    })
}