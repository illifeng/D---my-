
const getCateModule = require('../module/getCateModule')
exports.setAllCate = (req, res) => {
    // console.log(22222)
    // 调用数据模块方法
    getCateModule.getAllCateModule((err, data) => {

        if (err) {
            res.json({
                code: 200,
                msg: '失败了'
            })

        }
        else {
            res.json({
                code: 0,
                msg: '成功',
                data: data
            })
        }
    })
}