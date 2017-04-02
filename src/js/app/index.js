// var Event = require("mod/event.js");
var NoteMan = require("mod/noteMan.js");
var Waterfall = require("mod/waterfall.js");
require("less/index.less");
// Toast("nihao",2000);
NoteMan.load();
$(".add").on("click",function(){
    NoteMan.add()
});
$(".manage").on("click",function(){
    Waterfall.init($("#content"))
});
// $.post("/api/notes/add");
// $.post("/api/notes/edit");

