// 做法：通过路由名称的唯一性来进行页面不跳转
$(function () {
    // 页面地址的获取
    var routername = getAdd.getHref(location.href)
    // console.log(href);

    // 满足条件给选中的元素加样式,给获取到的路由名字的元素都保持展开
    if (routername == 'posts' || routername == 'post-add' || routername == 'categories') {
        $('#menu-posts').addClass('in')
        $('#menu-posts').attr('aria-expanded', true)
    }
    if (routername == 'nav-menus' || routername == 'slides' || routername == 'settings') {
        $('#menu-settings').addClass('in')
        $('#menu-settings').attr('aria-expanded', true)
    }
    $('li').removeClass('active')
    $('#' + routername).addClass('active')
})
