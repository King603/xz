//引入express模块
const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.登入接口
router.get("/login/:uname&:upwd",(req,res)=>{
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
//导出路由器对象
module.exports=router;