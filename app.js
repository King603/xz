//引入express模块
const express=require("express");
//引入body-parser模块
const bodyParser=require("body-parser");
//引入user路由器模块
const userRouter=require("./reuter/user.js");
//引入laptop路由器模块
const laptopRouter=require("./router/laptop");
//引入shoppingcart路由器模块
const shoppingRouter=require("./router/shoppingcart");
//创建web服务器
var app=express();
//监听端口
app.listen(8080);
//把静态资源托管到public目录下
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended:false
}));
//使用路由器，挂载到/user下
app.use("/user",userRouter);
//使用路由器，挂载到/laptop下
app.use("/laptop",laptopRouter);
//使用路由器，挂载到/cart下
app.use("/cart",shoppingRouter);