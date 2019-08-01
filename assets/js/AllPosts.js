

$(function () {

    // 实现数据动态渲染，并且能实现分页功能
    var pagenum = 1 //页码
    var pagesize = 2  //页中显示的条数
    // 第一次请求时获取所有数据，进行页面动态渲染
    getAjax()
    function getAjax(query) {
        // console.log(query);
        $.ajax({
            type: 'get',
            url: '/getAllPost',  //文件接口
            data: {
                pagenum,  //es6中的新语法，若键和值一样，可只写一个
                pagesize,
                // ...展开运算符,把数组里面的对象展开,后期不用通过点语法去query里面取值了
                ...query
            },
            datatype: 'json',
            success: function (res) {
                // res是请求服务器成功返回的数据
                // console.log(res);
                let htmlstr = template('temp', res.data)
                $('tbody').html(htmlstr)  //想要渲染数据的标签
                // 调用方法并传参且生成分页按钮或结构
                setPage(Math.ceil(res.data.getNum / pagesize))
            }
        })

    };
    // 事件委托,实现数据删除
    $('tbody').on('click', '.delBtn', function () {
        // console.log($(this).data());
        // confirm返回一个bool值，如果你单击了确定，就是true,否则就是false
        //window.confirm弹窗提示
        if (window.confirm('确认删除')) {
            // 获取到这个id，点击后删除
            var id = $(this).data('id')
            // console.log(id);
            $.ajax({
                type: 'get',
                url: '/removeAllNum',
                // 传id给后台进行数据删除
                data: { id: id },
                datatype: 'json',
                success: (res) => {
                    $.ajax({
                        type: 'get',
                        url: '/getAllPost',  //文件接口
                        data: {
                            pagenum,  //es6中的新语法，若键和值一样，可只写一个
                            pagesize
                        },
                        datatype: 'json',
                        success: function (res) {
                            // res是请求服务器成功返回的数据
                            // console.log(res);
                            let htmlstr = template('temp', res.data)
                            $('tbody').html(htmlstr)  //想要渲染数据的标签
                            // 调用方法并传参且生成分页按钮或结构
                            setPage(Math.ceil(res.data.getNum / pagesize))
                        }
                    })
                }
            })
        }
    });
    // 分页
    function setPage(getNum) {
        // console.log(getNum);
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: pagenum,
            // 总页数：数据总数除以每一页显示的数据条数
            totalPages: getNum,
            //当单击页码操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, page) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                // 当用户触发事件时，重置页码数时，发请求的时候会相应地取到当前页码数的数据，实现数据的不同
                pagenum = page//此为当前获取到的页码值重新赋值给页码
                // 第二次请求是请求当前页码所需要的数据
                getAjax()
            }
        })
    };
    // 筛选
    (function () {
        // console.log(2222);
        $.ajax({
            type: 'get',
            datatype: 'json',
            url: '/getCate',
            success: function (res) {
                // console.log(res);
                // 对查找回来的分类数据进行页面渲染,以拼接字符串的方式
                let str = '<option value="all">所有分类</option>'
                // 遍历里面的数据把是name的属性添加
                for (i = 0; i < res.data.length; i++) {
                    str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
                }
                $('.otn').html(str)
            }
        })
    })();

    // 点击筛选
    $('.bun').on('click', function (event) {
        var query = {
        }
        // console.log(333);
        event.preventDefault()
        // 筛选条件,获取到cate的值传给后台
        if ($('.otn').val() !== 'all') {
            query.cate = $('.otn').val()
            // console.log(query.cate);
            // 查找回来的数据有对应的值
        } if ($('.con').val() !== 'all') {
            query.statu = $('.con').val()
            // console.log(query.statu);
        }
        getAjax(query)
    })

})