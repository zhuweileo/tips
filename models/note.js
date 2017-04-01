/**
 * Created by 维 on 2017/3/30.
 */
var Sequelize = require("sequelize");
var path = require("path");
var sequelize = new Sequelize(undefined,undefined,undefined, {
    host: 'localhost',
    dialect: 'sqlite',

    // SQLite only
    storage: path.join(__dirname,'../database/database.sqlite')
});
//测试使用
// sequelize
//     .authenticate()
//     .then(function(err) {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(function (err) {
//         console.log('Unable to connect to the database:', err);
//     });
var User = sequelize.define('user', {
    content:{
        type:Sequelize.STRING
    },
    uid:{
        type:Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
// User.sync({force: true})
//     .then(function () {
//     // Table created
//     return User.create({
//         content:"测试用",
//         uid:null
//     });
// }).then(function(){
//     console.log("添加成功");
//     User.findAll().then(function(notes){
//         console.log(notes)
//     });
// });

// User.findAll({
//     raw:true,
//     where:{
//         id:1
//     }
// }).then(function (note) {
//     console.log(note);
// });
module.exports = User;