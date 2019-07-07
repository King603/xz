//引入express模块
const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.登入接口
router.get("/V1/login/:uname&:upwd",(req,res)=>{
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
//2.用户列表
router.get('/V1/list/:count&pno',(req,res)=>{
	//获取数据
	var obj=req.params;
	if(!obj.count)obj.count=2;
	if(!obj.pno)obj.pno=1;
	var $count=parseInt(obj.count);
	var $pno=parseInt(obj.pno);
	var $start=($pno-1)*$count;
	//执行sql语句
	pool.query('select * from xz_user limit ?,?',[$start,$count],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});
//导出路由器对象
module.exports=router;