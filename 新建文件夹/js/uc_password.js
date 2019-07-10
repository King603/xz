/**左边附加导航切换**/
$("#leftsidebar_box dt").css({"background-color":" #0AA1ED"});
$(function(){
    $("#leftsidebar_box dd").hide();
    $("#leftsidebar_box .my_order dd").show();
    $("#leftsidebar_box dt").click(function(){
        $("#leftsidebar_box dt").css({"background-color":"#0AA1ED"});
        $(this).css({"background-color": "#0AA1ED"});
        $(this).parent().find('dd').removeClass("menu_chioce");
        $("#leftsidebar_box dt img").attr("src","img/myOrder/myOrder2.png");
        $(this).parent().find('img').attr("src","img/myOrder/myOrder1.png");
        $(".menu_chioce").slideUp();
        $(this).parent().find('dd').slideToggle();
        $(this).parent().find('dd').addClass("menu_chioce");
        $(this).parent().siblings().children('dd').slideUp();

    });
})

/************************修改用户密码*********************/
$('#bt-pwd-save').click(function(e){
    e.preventDefault();
    var pwdOld = $('#pwd-old').val();
    var pwdNew = $('#pwd-new').val();
    var pwdConfirm = $('#pwd-confirm').val();
    if(!pwdOld){
        alertMsg('<b>错误！</b><p>原密码不能为空！</p>');
    }else if(!pwdNew){
        alertMsg('<b>错误！</b><p>新密码不能为空！</p>');
    }else if(pwdNew !== pwdConfirm){
        alertMsg('<b>错误！</b><p>两次输入的新密码不一致！</p>');
    }else {
        $.ajax({
            type: 'POST',
            url: 'data/user/update_password.php',
            data: {old_pwd: pwdOld, new_pwd: pwdNew},
            success: function(result){
                if(result.code === 200){
                    alertMsg('<b>成功！</b><p>密码修改完成。</p>');
                    $('#pwd-old').val('');
                    $('#pwd-new').val('');
                    $('#pwd-confirm').val('');
                }else if(result.code === 201){
                    alertMsg('<b>错误！</b><p>原密码输入错误！</p>');
                }else {
                    alertMsg('<b>错误！</b><p>错误消息：'+result.msg+'</p>');
                }
            }
        })
    }

})


