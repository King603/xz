//引入express模块
const express=require('express');
//引入连接池数据
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.注册路由
router.post('/reg',(req,res)=>{
	//获取数据
	var obj=req.body;
	var i=400;
	//验证每一项是否为空
	for(var key in obj){
		i++;
		if(!obj[key])res.send({code:i,msg:key+' required'});
		return;
	}
	//执行SQL语句
	pool.query('insert into xz_user set ?',[obj],(err,result)=>{
		if(err)throw err;
		if(result.affectedRows>0)res.send({code:200,msg:'reg suc'});
	});
});
//2.登入路由
router.post('/login',(req,res)=>{
	//获取数据
	var obj=req.body;
	//验证数据每一项是否为空
	if(!obj.uname){res.send({code:401,msg:'uname required'});return;}
	if(!obj.upwd){res.send({code:402,msg:'upwd required'});return;}
	//执行sql语句
	//查询密码和密码同时匹配的数据
	pool.query('select * from xz_user where uname=? and upwd=?',[obj.uname,obj.upwd],(err,result)=>{
		if(err)throw err;
		console.log(result);
		//验证账号密码是否正确
		if(result.length>0)res.send({code:200,msg:'login suc'});
		else res.send({code:301,msg:'uname or uwpd error'});
	});
});
//3.检索用户
router.get('/detail',(req,res)=>{
	//获取数据
	var obj=req.query;
	//验证数据每一项是否为空
	if(!obj.uid){res.send({code:401,msg:'uid required'});return;}
	//执行sql语句
	//查询密码和密码同时匹配的数据
	pool.query('select * from xz_user where uid=?',[obj.did],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});
//4.修改用户资料
router.post('update',(req,res)=>{
	//获取数据
	var obj=req.body;
	//验证数据每一项是否为空
	var i=400;
	for(var key in obj){
		i++;
		if(!obj[key]){res.send({code:i,msg:key+' required'});return;}
	}
	//取出用户编号
	var uid=obj.uid;
	//删除对象中的编号属性
	delete obj.uid;
	//执行sql语句
	pool.query('update xz_user set ? where uid=?',[obj,uid],(err,result)=>{
		if(err)throw err;
		console.log(result);
		//验证是否正确
		if(result.affectedRows>0)res.send({code:200,msg:'update suc'});
		else res.send({code:301,msg:'update error'});
	});
});
//5.用户列表
router.get('/list',(req,res)=>{
	//获取数据
	var obj=req.query;
	if(!obj.count)obj.count=2;
	if(!obj.pno)obj.pno=1;
	var count=parseInt(obj.count);
	var pno=parseInt(obj.pno);
	var start=(pno-1)*count;
	//执行sql语句
	pool.query('select * from xz_user limit ?,?',[start,count],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});
//6.删除用户
router.get('/delete',(req,res)=>{
	//获取数据
	var obj=req.query;
	//验证数据每一项是否为空
	if(!obj.uid){
		res.send({code:401,msg:'uid required'});
		return;
	}
	//执行sql语句
	pool.query('delete from xz_user where uid=?',[obj.uid],(err,result)=>{
		if(err)throw err;
		console.log(result);
		if(result.affectedRows>0)res.send({code:200,msg:'delete suc'});
		else res.send({code:301,msg:'delete error'});
	});
});
//7.检测邮箱
router.get('/checkmail',(req,res)=>{
	//获取数据
	var obj=req.query;
	//验证数据是否为空
	if(!obj.email){
		res.send({code:401,msg:'email required'});
		return;
	}
	if(!obj.uid){
		res.send({code:402,msg:'uid required'});
		return;
	}
	//执行sql语句
	pool.query('select email from xz_user where uid=?',[obj.uid],(err,result)=>{
		if(err)throw err;
		console.log(result);
		if(!result.email)res.send({code:200,msg:'non_exists'});
		else ({code:201,msg:'yes_exists'});
	});
});
//8.检测手机
router.get('/checkphone',(req,res)=>{
	//获取数据
	var obj=req.query;
	//验证数据是否为空
	if(!obj.phone){
		res.send({code:401,msg:'phone required'});
		return;
	}
	if(!obj.uid){
		res.send({code:402,msg:'uid required'});
		return;
	}
	//执行sql语句
	pool.query('select phone from xz_user where uid=?',[obj.uid],(err,result)=>{
		if(err)throw err;
		console.log(result);
		if(!result.phone)res.send({code:200,msg:'non_exists'});
		else ({code:201,msg:'yes_exists'});
	});
});
//9.检测用户名
router.get('/checkphone',(req,res)=>{
	//获取数据
	var obj=req.query;
	//验证数据是否为空
	if(!obj.uname){
		res.send({code:401,msg:'phone required'});
		return;
	}
	if(!obj.uid){
		res.send({code:402,msg:'uid required'});
		return;
	}
	//执行sql语句
	pool.query('select uname from xz_user where uid=?',[obj.uid],(err,result)=>{
		if(err)throw err;
		console.log(result);
		if(!result.uname)res.send({code:200,msg:'non_exists'});
		else ({code:201,msg:'yes_exists'});
	});
});

module.exports=router;