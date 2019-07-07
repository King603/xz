//引入express模块
const express=require('express');
//引入连接池模块
const pool=require('../pool.js').default.default;
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
		if(err)throw err;
		if(result.length>0)res.send("1");
		else res.send("0");
	});
});
//3.result规则的登录
router.get("/v1/login/:uname&:upwd",(req,res)=>{
	//获取用户名和密码
	var $uname=req.params.uname;
	var $upwd=req.params.upwd;
	console.log($uname+"   "+$upwd);
		//查询数据库，返回响应
	var sql='select * from xz_user where uname=? and upwd=?';
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err)throw err;
		if(result.length>0)res.send("1");
		else res.send("0");
	});
});
//4.post登录
router.post("/post_login",(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send("用户名为空");
		return;
	}
	if(!$upwd){
		res.send("密码为空");
		return;
	}
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err)throw err;
		if(result.length>0)res.send("1");
		else res.send("0");
	});
});
//5.uselist,查询所有用户
router.get("/userlist",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});
//导出路由器对象
module.exports=router;