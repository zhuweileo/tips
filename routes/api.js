var express = require('express');
var router = express.Router();
var Note = require("../models/note.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/notes',function(req,res,next){
    if(req.session.user){
        Note.findAll({raw:true,where:{
            uid:req.session.user.id
        }}).then(function(notes){
            res.send({status:0,data:notes})
        },function(err){
            res.send(err)
        })
    }else{
        Note.findAll({raw:true}).then(function(notes){
            res.send({status:0,data:notes});
        },function (err) {
            res.send(err);
        })
    }

});

router.post('/notes/add',function (req,res,next) { var note = req.body.note;
    if(!req.session.user){
        res.send({status:1,errorMsg:"用户未登录"});
        return;
    }
    Note.create({content:note,uid:req.session.user.id}).then(function(note){
        res.send({status:0,data:note})
    },function(err){
        res.send({errorMsg:"数据库出错"})
    })
});
router.post('/notes/edit',function (req,res,next) {
    if(!req.session.user){
        res.send({status:1,errorMsg:"用户未登录"});
        return;
    }
    Note.update({content:req.body.note},{
        where:{
            id:req.body.id,
            uid:req.session.user.id
        }
    }).then(function () {
        res.send({status:0})
    },function (err) {
        res.send({errorMsg:err})
    });
});
router.post('/notes/delete',function (req,res,next) {
    if(!req.session.user){
        res.send({status:1,errorMsg:"用户未登录"});
        return;
    }
    Note.destroy({
        where:{
            id:req.body.id,
            uid:req.session.user.id
        }
    }).then(function(){
        res.send({status:0})
    },function (err) {
        res.send({errorMsg:err})
    })
});

module.exports = router;
