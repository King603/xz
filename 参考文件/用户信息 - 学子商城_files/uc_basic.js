/************异步请求当前登录用户的相关信息*************/
$.ajax({
  url: 'data/user/get_basic.php',
  success: function (result) {
    if (result.code === 200) {
      $('#avatar').attr('src', result.avatar);
      $('[name="user_name"]').val(result.user_name);
      $('[name="phone"]').val(result.phone);
      $('[name="email"]').val(result.email);
      if (result.gender == 0) {
        $('[name="gender"]').val(result.gender);
        $(".women").addClass("selected");
        $(".women img").attr("src", "img/uc/select.png");
        $(".man").removeClass("selected");
        $(".man img").attr("src", "img/uc/un_select.png");
      }
    } else if (result.code === 401) {
      alertMsg('您尚未登录！');
      $('#alertMsg_btn1').click(function () {
        location.href = 'login.html';
      });
    } else {
      alertMsg('<b>错误！</b><p>原因：' + result.msg + '</p>');
    }
  }
})

$('#form-uc-basic .save').click(function () {
  $.ajax({
    type: 'POST',
    url: 'data/user/update_basic.php',
    data: $('#form-uc-basic').serialize(),
    success: function (result) {
      if(result.code===200){
        alertMsg('用户信息更新成功！');
      }else {
        alertMsg('<b>错误！</b><p>原因：'+result.msg+'</p>');
      }
    }
  })
})

/****************左边附加导航切换*****************/
$("#leftsidebar_box dt").css({"background-color": " #0AA1ED"});
$(function () {
  $("#leftsidebar_box dd").hide();
  $("#leftsidebar_box .my_order dd").show();
  $("#leftsidebar_box dt").click(function () {
    $("#leftsidebar_box dt").css({"background-color": "#0AA1ED"});
    $(this).css({"background-color": "#0AA1ED"});
    $(this).parent().find('dd').removeClass("menu_chioce");
    $("#leftsidebar_box dt img").attr("src", "img/myOrder/myOrder2.png");
    $(this).parent().find('img').attr("src", "img/myOrder/myOrder1.png");
    $(".menu_chioce").slideUp();
    $(this).parent().find('dd').slideToggle();
    $(this).parent().find('dd').addClass("menu_chioce");
    $(this).parent().siblings().children('dd').slideUp();

  });
})

/*****************************************************地址管理页面js********************************************************/
/**
 * 地址页面添加名称至输入框
 */
$(".sp").click(function () {
  var value = $(this).html();
  $("#addressName").val(value);
})

/**
 * 手机号码中间4位以*号代替转换
 * @param {Object} phone
 */
function changePhone(phone) {
  var dh = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  return dh;
}
/**
 * 校验手机号码格式是否正确
 */
$("#receiverMobile").blur(function () {

  var regex = /^1[3|4|5|8][0-9]\d{4,8}$/;
  var value = $(this).val();
  console.log(value);
  if (!regex.test(value)) {
    console.log("格式不对")
  }
})

/**
 * 提交表单时，校验必填项是否填写完整
 */
$(".save_recipient").click(function () {
  var receiverName = $("#receiverName").val();// 收件人
  var receiverState = $("#receiverState").val();// 省
  var receiverCity = $("#receiverCity").val();// 市
  var receiverDistrict = $("#receiverDistrict").val();// 区/县
  var receiverAddress = $("#receiverAddress").val();//
  var receiverMobile = $("#receiverMobile").val();
  if (receiverName && receiverState && receiverCity && receiverDistrict && receiverAddress && receiverMobile) {
    $("form").submit();
  } else {
    alert("请将必填信息填写完整");
  }
})

/**
 * 地址设为默认点击事件
 */
$(function () {
  $(".swmr_normal").click(function () {
    setDefault(this);
  })
})

/**
 * 设置默认方法
 * @param {Object} e
 */
function setDefault(e) {
  var parent = $(e).parent();
  if ($(parent).siblings().hasClass("aim_active")) {
    $(parent).siblings().removeClass("aim_active");
    $(parent).siblings().children(".dzmc_active").removeClass("dzmc_active").addClass("dzmc_normal");
    $(parent).siblings().children(".swmr_normal").html("设为默认")
  }
  $(parent).addClass("aim_active");
  $(parent).children(".dzmc_normal").removeClass("dzmc_normal").addClass("dzmc_active");
  $(e).html("");
}


$(function () {
  $(".aco_delete").click(function () {
    if (confirm("确定删除吗？")) {
      var url = "";
      var param = "";
      $.post(url, {data: param}, function (data) {

      }, "json");
    }

  })
})


/*****************************************************个人信息管理页面js********************************************************/

/**
 * 这是个人信息页面js
 */
// 跳页面
function toPage(page) {
  window.location.href = page;
}


/**
 * 性别选择男
 */
$(".man").click(function () {
  if (!$(".man").hasClass("selected")) {
    $('[name="gender"]').val(1);
    $(".man").addClass("selected");
    $(".man img").attr("src", "img/uc/select.png");
    $(".women").removeClass("selected");
    $(".women img").attr("src", "img/uc/un_select.png");
  }
})

/**
 * 性别选择女
 */
$(".women").click(function () {
  if (!$(".women").hasClass("selected")) {
    $('[name="gender"]').val(0);
    $(".women").addClass("selected");
    $(".women img").attr("src", "img/uc/select.png");
    $(".man").removeClass("selected");
    $(".man img").attr("src", "img/uc/un_select.png");
  }
})

