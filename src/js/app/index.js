var Event = require("mod/event.js");
var NoteMan = require("mod/noteMan.js");
require("less/index.less");
// Toast("nihao",2000);
NoteMan.load();
$(".add").on("click",function(){
    NoteMan.add()
});
// $.post("/api/notes/add");
// $.post("/api/notes/edit");

