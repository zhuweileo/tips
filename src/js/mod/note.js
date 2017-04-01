var Event = require("mod/event.js");
var Toast = require("mod/toast.js").Toast;
require("less/note.less");
function Note(opts){
    this.optsInit(opts);
    this.createNote();
    this.bindEvent();
}
Note.prototype={
    constructor:Note,
    colors:[
        ['#ea9b35','#efb04e'], // headColor, containerColor
        ['#dd598b','#e672a2'],
        ['#eee34b','#f2eb67'],
        ['#c24226','#d15a39'],
        ['#c1c341','#d0d25c'],
        ['#3f78c3','#5591d2']
    ],
    defaultOpts:{
        id:"",
        $ct:$("#content").length>0?$("#content"):$("body"),//为便利贴设置容器
        content:"输入内容"
    },
    optsInit:function (opts) {
        this.opts = $.extend({},this.defaultOpts,opts||{});
        if(this.opts.id){
            this.id = this.opts.id;
        }
    },
    createNote:function(){
        var tpl = '<div class="note">'
            + '<div class="note-head"><span class="delete">&times;</span></div>'
            + '<div class="note-ct" contenteditable="true"></div>'
            +'</div>';
        this.$note = $(tpl);
        this.$note.find(".note-ct").html(this.opts.content);
        //为便签添加颜色
        var color = this.colors[Math.floor(Math.random()*6)];
        this.$note.find(".note-head").css("background",color[0]);
        this.$note.find(".note-ct").css("background",color[1]);
        this.opts.$ct.append(this.$note);
    },
    bindEvent:function(){
        var self = this;
        var $note = this.$note;
        var $noteHead = this.$note.find(".note-head");
        var $noteCt = this.$note.find(".note-ct");
        var $delete = this.$note.find(".delete");
        /*
        *添加鼠标跟随效果
        * */
        //鼠标按下时绑定跟随
        $noteHead.on("mousedown",function(e){
            var relX = e.pageX - $note.offset().left;//计算鼠标点下时，鼠标和note右上角的相对距离
            var relY = e.pageY - $note.offset().top;
            $note.addClass("draggable").data("Pos",{x:relX,y:relY});
        });
        //鼠标抬起时，解除绑定
        $(window).on("mouseup",function () {
            $note.removeClass("draggable");
        });
        $("body").on("mousemove",function(e){
            var drag = $(".draggable");
            if(drag.length){
                // console.log("我是"+self.opts.id+"x:"+drag.data("Pos").y);
                drag.offset({
                    top:e.pageY - drag.data("Pos").y,
                    left:e.pageX - drag.data("Pos").x
                })
            }
        });
        /*
        *删除note事件
        * */
        $delete.on("click",function () {
            self.delete();
        });
        /*
        * 编辑note时，做的事情
        * */
        $noteCt.on({
            "focus":function(){
                if($noteCt.html() === "输入内容"){
                    $noteCt.html("")
                }
                $noteCt.data("before",$noteCt.html())
            },
            "blur":function(){
                if($noteCt.html()!=$noteCt.data("before")){
                    $noteCt.data("before",$noteCt.html());
                    if(self.id){
                        self.edit($noteCt.html())
                    }else{
                        self.add($noteCt.html())
                    }
                }
            }
        })
    },
    edit:function(msg){
        var self = this;
        $.post("/api/notes/edit",{
            id:self.id,
            note:msg
        }).done(function (ret) {
            if(ret.status === 0){
                Toast("更新成功")
            }else{
                Toast(ret.errorMsg)
            }
        }).fail(function () {
            Toast("编辑失败")
        })
    },
    add:function(msg){
        var self = this;
        $.post("/api/notes/add",{note:msg})
            .done(function (ret) {
                if(ret.status === 0){
                    self.id = ret.data.id;
                    Toast("添加成功");
                }else{
                    Toast(ret.errorMsg);
                }
            }).fail(function(){
                Toast("添加失败")
        })
    },
    delete:function () {
        var self = this;
        $.post("/api/notes/delete",{id:self.id})
            .done(function(ret){
                console.log(ret);
                if(ret.status===0){
                    Toast("删除成功");
                    self.$note.remove();
                }else{
                    Toast(ret.errorMsg);
                }
            });
    }
};

module.exports.Note = Note;
