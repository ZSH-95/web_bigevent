//每次发起Ajax请求的时候都会调用 ajaxPrefilter 这个函数，拿到提供给Ajax的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    //统一为有权限的接口设置 headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        //在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token');
            //强制跳转到登录页面
            location.href = '/login.html';
        }
    }
});