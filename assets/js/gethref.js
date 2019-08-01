let getAdd = {
    getHref: function (href) {
        // 查找关键字
        let index = href.indexOf('?')
        let routername = ''
        if (index == -1) {
            // 提取地址栏第一个关键字为/后面的路径
            routername = href.slice(href.lastIndexOf('/') + 1)
            // console.log(routername);
        } else {
            routername = href.slice(href.lastIndexOf('/') + 1, href.indexOf('?'))
            // console.log(routername);
        }
        return routername
    }
}