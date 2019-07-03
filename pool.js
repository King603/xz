//引入MySQL模块
const mysql=require('mysql');
//创建连接池
var pool=mysql.createPool({
	host:'127.0.0.1',
	post:'3306',
	user:'root',
	password:'',
	database:'xz',
	connecionLimit:20
});
//导出连接池数据
module.exports=pool;