//引入express模块
const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.测试接口 myAjax
router.get("/ajaxDemo",function(req,res){
	res.send("我的第一个ajax程序");
});
//2.get方法的登陆
router.get("/get_login",(req,res)=>{
	//获取参数
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	if(!$uname){
		res.send("用户名不存在");
		return;
	}
	if(!$upwd){
		res.send("密码不存在");
		return;
	}
	//查询数据库，返回响应
	var sql='select * from xz_user where uname=? and upwd=?';
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(result&&result.length>0)res.send("1");
		else res.send("0");
	});

});
//导出路由器对象
module.exports=router;