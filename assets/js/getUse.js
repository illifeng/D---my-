// 登录页业务代码
$(function () {
    $('.getA').on('click', function () {
        // 接收用户输入的用户名与密码
        let email = $('#email').val()
        let password = $('#password').val()
        // console.log(email, password);
        // console.log($('.lab').serialize());
        $.ajax({
            type: 'post',
            url: '/getUse',
            data: $('.lab').serialize(),
            // 请求之前都会经过这个函数
            beforeSend: function () {
                console.log('输出');
                // 判断用户输入的值
                if (!/\w+[@]\w+[.]\w+/.test(email)) {
                    $('.alert-danger>span').text('email输入不正确')
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    console.log('显示?');
                    return false
                    // trim()修饰前后空格
                } if (password.trim().length == 0) {
                    $('.alert-danger>span').text('请输入密码')
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    console.log('不显示?');
                    return false
                }
            },
            datatype: 'json',
            success: function (res) {
                // console.log('如何');
                // console.log(res.code);
                // console.log(typeof (res));
                var res = JSON.parse(res)
                // 用户输入与后台返回的数据一致,成功登陆后跳到后台页面
                if (res.code == 0) {
                    // console.log('心累');
                    location.href = '/admin'
                } else {
                    $('.alert-danger>span').text(res.msg)
                    // console.log('123');
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                }
            }
        })
    })


})