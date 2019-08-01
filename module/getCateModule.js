// 引入SQL数据库
const mysql = require('mysql')
// 创建连接
let coon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'baixiu2', //数据库名称
    dateStrings: true  //把时间在未返回时进行编码解析
})

exports.getAllCateModule = (callback) => {
    // console.log(121212)
    let sql = 'select * from categories'
    // console.log('000000000000');
    // console.log(sql);
    // console.log('000000000000');
    coon.query(sql, (err, result) => {
        if (err) {
            callback(err)
        }
        else {
            callback(null, result)
        }
    })
}


