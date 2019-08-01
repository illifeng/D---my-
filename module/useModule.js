// 引入SQL数据库
const mysql = require('mysql')
// 创建连接
let coon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'baixiu2', //数据库名称
    dateStrings: true  //把时间在未发送时进行编码解析
})
// 前提前台需要传email过来
// 判断传进来的email是否等于数据库里面的email
module.exports.setUse = (email, callback) => {
    var sql = `SELECT * from users where email='${email}'`
    // console.log(sql);
    coon.query(sql, (err, data) => {
        // console.log(data);
        if (err) {
            callback(err)
        } else {
            callback(null, data[0])
        }
    })
}