// var $ = require("jquery")
var Event = require("mod/event.js");

require("less/toast.less");
function Toast(msg,time){
	Event.on("test",function(x){
		console.log(x)
	})
	this.msg = msg;
	this.showTime = time || 1000;//默认1s
	this.creatHtml();
	this.action();
}

Toast.prototype.creatHtml=function(){
	var html = $("<div class='toast'>"+this.msg+"</div>");
	this.$tpl = html;
	$("body").append(html);
};
Toast.prototype.action=function(){
	var self = this;
	this.$tpl.fadeIn(300,function(){
		setTimeout(function(){
			self.$tpl.fadeOut(300,function(){
				self.$tpl.remove();
			});
			Event.fire("test","测试")
		},self.showTime)
	})
}

function newToast(msg,time){
	return new Toast(msg,time);
}

module.exports.Toast = newToast;