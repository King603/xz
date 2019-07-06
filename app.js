//引入express模块
const express=require("express");
//引入body-parser模块
const bodyParser=require("body-parser");
//引入user路由器模块
const userRouter=require("./router/user.js");
//引入demo路由器模块
const demoRouter=require("./router/demo.js");
const proRouter=require("./router/pro.js");
//创建web服务器
var app=express();
//监听端口
app.listen(8080);
//把静态资源托管到public目录下
app.use(express.static("public"));
app.use(express.static('myajax'));
app.use(express.static('mypro'));
app.use(bodyParser.urlencoded({
	extended:false
}));
//使用路由器，挂载到/user下
app.use("/user",userRouter);
//使用路由器，挂载到/demo下
app.use("/demo",demoRouter);
app.use("/v1",proRouter);