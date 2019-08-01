$(function () {
    $.ajax({
        type: 'get',
        datatype: 'json',
        url: '/getCate',
        success: function (res) {
            // console.log(res);
            // 对查找回来的分类数据进行页面渲染,以拼接字符串的方式
            // 不给默认值,用户一定要选一个
            let str = ''
            // 遍历里面的数据把是name的属性添加
            for (i = 0; i < res.data.length; i++) {
                str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
            }
            // 向.otn这个标签里渲染数据
            $('.otn').html(str)
        }
    })

    // 添加文章
    // 引入富文本框把原来的文本域给覆盖掉
    CKEDITOR.replace('content')
    $('.btn').on('click', function (event) {
        // console.log('更新');
        // 阻止submit默认事件
        event.preventDefault()
        // 与文本域获取到的内容同步,即是跟文本域的内容一样,content是文本域的id名称
        CKEDITOR.instances.content.updateElement()
        // console.log($('.row').serialize());
        $.ajax({
            url: '/addPosts',
            type: 'post',
            datatype: 'json',
            data: $('.row').serialize(),
            success: function (res) {
                // console.log('前端大神');
                console.log(res);
                if (res.code == 0) {
                    location.href = '/posts'
                }
            }
        })
    })
    // file上传文件会触发change事件,
    $('#feature').on('change', function () {
        // 上传文件的file按钮没有value值
        // files可以获取当前被选择对象的所有数据,里面有获取到的数据(以对象的形式展示),获取到要上传的图片
        var getfile = document.querySelector('#feature').files[0]
        // console.log(getfile);
        // 创建上传文件对象
        var formData = new FormData()
        // 往fromdata里面追加参数,第一个参数为键,第二个为值
        formData.append('getImg', getfile)
        $.ajax({
            type: 'post',
            datatype: 'json',
            // 传给后台的数据
            data: formData,
            // 文件上传一定要设置这两个参数,不然会报非法占用的错误
            processData: false, //不要对数据进行处理
            contentType: false,  //不要对数据进行编码
            url: '/postUploads',
            success: function (res) {
                // console.log(res);
                // console.log(res.img);
                // 为了避免后期拼参数,把图片的路径存在隐藏域中
                $('#hdn').val(res.img)
                if (res.code == 0) {
                    // attr里的变量,键和值得形式
                    // 实现图片预览
                    $('.thumbnail').attr('src', '/uploads/' + res.img).show()
                }
            }
        })
    })
})