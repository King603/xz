//引入express模块
const express=require('express');
//引入连接池
const pool=require('../pool.js');
//创建路由对象
var router=express.Router();
//添加路由
//1.商品添加
router.post('/add',function(req,res){
	//获取数据
	var obj=req.body;
	//验证数据每一项是否为空
	var i=400;
	for(var key in obj){
		i++;
		if(!obj[key]){res.send({code:i,msg:key+' required'});return;}
	}
	//执行sql语句
	pool.query('insert into xz_laptop set ?',[obj],function(err,result){
		if(err)throw err;
		console.log(result);
		if(result.affectedRows>0)res.send({code:200,msg:'reg suc'});
	});
});
//2.商品详情
router.get('/detail',function(req,res){
	//获取数据
	var obj=req.query;
	//验证每一项是否为空
	if(!obj.lid){res.send({code:401,msg:'pid required'});return;}
	//执行sql语句
	//查询编号所匹配的数据
	pool.query('select * from xz_laptop where lid=?',[obj.lid],function(err,result){
	if(err)throw err;
	res.send(result);
	});
});
//3.商品列表
router.get('/list',function(req,res){
	//获取数据
	var obj=req.query;
	//验证数据，设置默认值
	var count=obj.count;
	var pno=obj.pno;
	if(!count)count=2;
	if(!pno)pno=1;
	//转整型
	count=parseInt(count);
	pno=parseInt(pno);
	//计算开始
	var start=(pmo-1)*count;
	pool.query('select * from xz_laptop limit ?,?',[start,count],function(err,result){
		if(err)throw err;
		res.send(result);
	});
});
//4.删除商品
router.get('/delete',function(req,res){
	//获取数据
	var obj=req.query;
	if(!obj.lid){
		res.send({code:401,msg:'lid requirer'});
		return;
	}
	//执行SQL语句
	pool.query('delete from xz_lapyop where lid=?',[obj.lid],functionm(err,result){
		if(err)throw err;
		if(result.affectedRows>0)res .send({code:200,msg:'del sur'});
		else res.send ({code:201,msg'del err'});
		});
});
module.exports=router;