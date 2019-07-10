/**用户名和密码的非空验证**/
$("#uname").blur(function () {
  if (!this.value) {
    $("#showResult").text("用户名不能为空！");
    $("#showResult").css("color", "red");
    return false;
  }
});
$("#upwd").blur(function () {
  if (!this.value) {
    $("#showResult").text("密码不能为空！");
    $("#showResult").css("color", "red");
    return false;
  }
});

/**登录单击按钮事件监听**/
$('#bt-login').click(function () {
  var data = $('#form-login').serialize();
  $.ajax({
    type: 'POST',
    url: 'data/user/login.php',
    data: data,
    success: function (result) {
      if (result.code === 200) {              //登录成功
        var pageToJump = result.pageToJump?result.pageToJump:'index.html';
        location.href = pageToJump;
      } else if (result.code === 201) {       //登录失败
        alertMsg('<b>登录失败！</b><p>用户名或密码输入有误。</p>');
      } else {
        alertMsg('<b>登录失败！</b><p>原因：' + result.msg + '</p>');
      }
    }
  });
});


/***7天之内不再登录***/
$(document).ready(function () {
  if ($.cookie("rmbUser") == "true") {
    $("#ck_rmbUser").attr("checked", true);
    $("#username").val($.cookie("username"));
    $("#password").val($.cookie("password"));
  }
});
//记住用户名密码
function save() {
  if ($("#ck_rmbUser").attr("checked")) {
    var str_username = $("#username").val();
    console.log(str_username);
    var str_password = $("#password").val();
    $.cookie("rmbUser", "true", {expires: 7}); //存储一个带7天期限的cookie
    $.cookie("username", str_username, {expires: 7});
    $.cookie("password", str_password, {expires: 7});
  }
  else {
    $.cookie("rmbUser", "false", {expire: -1});
    $.cookie("username", "", {expires: -1});
    $.cookie("password", "", {expires: -1});
  }
}