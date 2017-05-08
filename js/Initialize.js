/**
 * @author <钟立军> [<2950458637@qq.com>]
 * 首先说明一下load事件与ready事件的区别
 * HTML文档加载顺序：
 * ①       解析HTML结构
 * ②       加载外部脚本和样式表文件
 * ③       解析并执行脚本代码
 * ④       构造HTML DOM模型
 * ⑤       加载图片等外部文件
 * ⑥       页面加载完毕
 * Load事件是在页面加载完毕后触发；
 * ready事件是在DOM模型构造完毕，加载外部文件前触发；
 */
var $ = ready = window.ready = function(fn) {
	if(document.addEventListener) { //兼容非IE  
		document.addEventListener("DOMContentLoaded", function() {		
//			这个事件是从HTML中的onLoad的延伸而来的，
//			当一个页面完成加载时, 初始化脚本的方法是使用load事件， 
//			但这个类函数的缺点是仅在所有资源都完全加载后才被触发, 
//			这有时会导致比较严重的延迟, 开发人员随后创建了一种自定义事件, 
//			domready, 它在DOM加载之后及资源加载之前被触发。
//			domready事件迅速被众多JavaScript库所采用, 它开始在本地浏览器中以DOMContentLoaded的形式被使用;
//			此外, 它目前已在HTML5中被标准化, 下面的代码显示了DOMContentLoaded是如何在document对象中被触发的;
//			document.addeventListener('DOMContentLoaded', function() {...}, false);
//          1、CSS样式表影响了图片的加载速度，然而JS不会影响，如果想让图片尽快加载，就不要给图片使用样式，比如宽高采用标签属性即可。
//			2、JS的加载执行速度影响了DOMContentLoaded事件的触发时间，如果想要尽快触发DOMContentLoaded事件，就将次要的JS采用动态加载的方式加载吧。
//     		DOMContentLoaded事件的触发条件是：
//			将会在“所有的DOM全部加载完毕并且JS加载执行后触发”。
//          但如果“js是通过动态加载进来的话，是不会影响到DOMContentLoaded的触发时间”

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

