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
// 获取全部数据
// 必须要传入用户输入的页码数与一页显示几条数据，把它存在nums这个对象下
// nums里面有三个值，pagesize页中显示的条数
// pagenum页码
module.exports.getAllPosts = (nums, callback) => {
    // sql查询语句,加别名sid和did来区分id的不同
    let sql = `select posts.id as sid,posts.slug,posts.title,posts.feature,posts.created,posts.content,posts.status,users.id,users.nickname,categories.name
    from posts
    inner join users on posts.user_id = users.id
    inner join categories on posts.category_id = categories.id
    where 1=1  `
    // 这里可以根据判断结构拼接筛选条件
    if (nums.cate) {
        // 拼接分类条件
        sql += ` and posts.category_id = '${nums.cate}' `
    }
    if (nums.statu) {
        // 拼接状态条件
        sql += ` and posts.category_id = '${nums.statu}' `
    }
    // console.log(sql);

    sql += ` order by posts.id desc
    limit ${(nums.pagenum - 1) * nums.pagesize},${nums.pagesize}`
    // 反引号里所谓的填坑
    // 注：pagenum：当前页码
    // pagesize：每页显示的数据条数
    coon.query(sql, (err, data) => {
        // console.log(sql);
        if (err) {
            callback(err)
        } else {
            // 这条语句可以得到这个表的总条数,同时把数据总条数count(*)的名称换为cnt
            let sql = 'select count(*) as cnt from posts'
            coon.query(sql, (err1, results) => {
                // console.log(results);
                if (err1) {
                    callback(err1)
                }
                else {
                    // 第一个结果为第一次查询到的数据，第二个结果为总条数，明显数据不止一个，用对象包起来并返回(里面数据是数组包对象)
                    // results因为这个是数组里面包着的一个对象，为了让前端更方便地拿数据，我们直接转为数字(results[0].cnt)
                    //js为弱类语言，可随时添加属性与方法
                    callback(null, { getResult: data, getNum: results[0].cnt })
                    // console.log({ result: data, getNum: results[0].cnt });
                }
            })
        }
    })
}
// 删除数据
module.exports.removeAllNum = (getId, callback) => {
    // 删除语句，前台传来id值进行删除
    let sql = 'delete from posts where id = ' + getId
    // console.log(getId);
    coon.query(sql, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
// 添加文章
module.exports.allPosts = (obj, callback) => {
    let sql = 'insert into posts set ?'
    // console.log(id);

    // console.log(obj)
    // 增删不需要返回数据给前台的
    coon.query(sql, obj, (err) => {
        // console.log('-------------------------------')
        // console.log(err);

        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
// 分类目录下的添加
module.exports.catePosts = (obj, callback) => {
    let sql = 'insert into categories values(null,?,?)'

    console.log(obj)
    // 增删不需要返回数据给前台的
    // 通过query方法把数据存入数据库
    coon.query(sql, [obj.name, obj.slug], (err) => {
        console.log('-------------------------------')
        console.log(err);
        console.log('-------------------------------')
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}