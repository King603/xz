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
	//查询数据库，返回响应
	var sql='select * from xz_user where uname=? and upwd=?';
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err)throw err;
		if(result.length>0)res.send("1");
		else res.send("0");
	});
});
//2.用户列表
router.get('/V1/list',(req,res)=>{
	//执行sql语句
	pool.query('select * from xz_user',(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});
//3.商品列表分页查询
router.get('/V1/product_list',(req,res)=>{
	//获取数据
	var obj=req.params;
	if(!obj.count)obj.count=2;
	if(!obj.pno)obj.pno=1;
	var $count=parseInt(obj.count);
	var $pno=parseInt(obj.pno);
	var $start=($pno-1)*$count;

	//执行sql语句
	pool.query('select * from xz_laptop ',(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});
//4.根据uid删除用户
router.delete("/V1/deluser/:uid",(req,res)=>{
	var $uid=req.params.uid;
	if(!$uid){res.render("未找到");return;}
	pool.query("delete from xz_user where uid=?",[$uid],(err,result)=>{
		if(err)throw err;
		res.send("1");
	});
});
//5.根据uid查询用户
router.get("/V1/queryuser/:uid",(req,res)=>{
	var $uid=req.params.uid;
	//查询数据库，返回响应
	var sql='select * from xz_user where uid=?';
	pool.query(sql,[$uid],(err,result)=>{
		if(err)throw err;
		if(result.length>0)res.send(result);
		else res.send("0");
	});
});
//6.修改用户信息
router.put("/V1/update",(req,res)=>{
	var obj=req.body;
	var $uid=obj.uid;
	delete obj.uid;
	var sql="update xz_user set ?where uid=?";
	pool.query(sql,[obj,$uid],(err,result)=>{
		if(err)throw err;
		res.send("1");
	});
});
//7.用户注册
router.post("/V1/reg",(req,res)=>{
	//获取数据
	var obj=req.body;
	//执行SQL语句
	pool.query('insert into xz_user set ?',[obj],(err,result)=>{
		if(err)throw err;
		if(result.affectedRows>0)res.send("1");
		else res.send("0");
	});
});
//6.修改商品信息
router.put("/V1/queryproduct",(req,res)=>{
	var obj=req.body;
	var $lid=obj.lid;
	delete obj.lid;
	var sql="update xz_laptop set ?where lid=?";
	pool.query(sql,[obj,$lid],(err,result)=>{
		if(err)throw err;
		res.send("1");
	});
});
//7.根据lid删除商品
router.delete("/V1/dellaptop/:lid",(req,res)=>{
	var $lid=req.params.lid;
	if(!$lid){res.render("未找到");return;}
	pool.query("delete from xz_laptop where lid=?",[$lid],(err,result)=>{
		if(err)throw err;
		res.send("1");
	});
});
//导出路由器对象
module.exports=router;