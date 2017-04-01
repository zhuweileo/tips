
var Event = (function(){
	var event = {};
	function on(eve,handler){
		event[eve] = event[eve] || [];
		event[eve].push({
			handler:handler
		});
	}

	function fire(eve,args){
		if(!event[eve]) return;
		for(var i=0;i<event[eve].length;i++){
			event[eve][i].handler(args);
		}	

	}

	return {
		on:on,
		fire:fire
	}
})();

module.exports = Event;