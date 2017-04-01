/**
 * Created by 维 on 2017/3/28.
 */
var Note = require("mod/note.js").Note;
var Toast = require("mod/toast.js").Toast;
var NoteMan = (function () {
    function load(){
        $.get("/api/notes")
            .done(function (ret) {
                if(ret.status===0){
                    $.each(ret.data,function (idx,content) {
                        new Note({
                            id:content.id,
                            content:content.content
                        })
                    })
                }else{
                    Toast(ret.errorMsg);
                }
            }).fail(function(){
                Toast("网络异常");
            })
    }
    function add(){
        new Note();
    }
    return {
        load:load,
        add:add
    }
})();

module.exports = NoteMan;
