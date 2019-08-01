$(function () {
    // 事件委托
    $('tbody').on('click', '.age', function () {
        // 通过请求,已把分类数据请求了回来,在模板那里可以进行存储,方便后期拿来使用
        // 通过jq自定义属性data存储点击编辑时的那一项的数据
        // console.log($(this).data());
        $('.sh').text('编辑分类目录')
        let res = $(this).data()
        $('.age').val(res.id)
        $('.slg').val(res.slug)
        $('.nua').val(res.name)
        // 点击编辑按钮时,左边添加按钮隐藏,编辑按钮显示
        $('.sub').hide()
        $('.suc').show()

    })
    // 请求分类目录的数据
    function cate() {
        $.ajax({
            type: 'get',
            datatype: 'json',
            url: '/getCate',
            success(res) {
                // console.log(res);
                $('tbody').html(template('setLate', res))
            }
        })
    }
    cate()
    $('.sub').on('click', function (event) {
        // 阻止submit默认事件
        event.preventDefault()
        console.log($('from').serialize());
        $.ajax({
            url: '/setCateAll',
            type: 'post',
            // datatype: 'json',
            data: $('from').serialize(),
            success: function (res) {
                console.log('前端大神');
                console.log(res);
                //    if (res.code == 0) {
                //     //    location.href = '/posts'
                //    }
            }
        })
    })
})