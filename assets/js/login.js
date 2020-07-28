$(function() {
    //点击“去注册账号” 的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    //点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    //从 LayUI 中获取 form 对象
    var form = layui.form;
    var layer = layui.layer;
    //通过 form.verify() 函数自定义校验规则
    form.verify({
        //自定义pwd密码校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        }
    });

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止表单的默认提交行为
        e.preventDefault();
        // 2. 发起POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                //注册成功后自动调用去登录的点击行为
                $('#link_login').click();
            });
    });

    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 1. 阻止表单的默认提交行为
        e.preventDefault();
        // 2. 发起 Ajax 请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                //将登录成功后得到的 token 值保存到 localStorage 中
                localStorage.setItem('token', res.token);
                //跳转到后台首页
                location.href = '/index.html';
            }
        });
    });
});