var $= ready = window.ready = function(fn) {
	if(document.addEventListener) { //兼容非IE  
		document.addEventListener("DOMContentLoaded", function() {
			//注销事件，避免反复触发  
			document.removeEventListener("DOMContentLoaded", arguments.callee, false);
			fn(); //调用参数函数  			
		}, false);
	} else if(document.attachEvent) { //兼容IE  
		document.attachEvent("onreadystatechange", function() {
			if(document.readyState === "complete") {
				document.detachEvent("onreadystatechange", arguments.callee);
				fn();
			}
		});
	}
}
