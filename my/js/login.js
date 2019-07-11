function login(){
    var $uname=uname.value;
    var $upwd=upwd.value;
    var xhr=new XMLHttpRequest();
    if(!$uname){
        alert("用户名为空");
        return;
    }
    if(!$upwd){
        alert("密码为空");
        return;
    }
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4&&xhr.status==200){
            var result=xhr.responseText;
            if(result=="1")alert("登录成功");
            else if(result=="0")alert("登入失败");
            else alert("未接收到客户信息");
        }
    }
    xhr.open("get","/pro/V1/login/"+$uname+"&"+$upwd,true);
    xhr.send();
}