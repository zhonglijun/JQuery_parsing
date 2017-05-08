//1）为什么要创建这样一个自调用匿名函数 ? 通过创建一个自调用匿名函数，创建了一个特殊的函数作用域，该作用域中的代码不 会和已有的同名函数、方法和变量以及第三方库冲突。
//由于jQuery 会被应用在成千上万的 JavaScript 程序中，所以必须确保 jQuery 的代码不会受到其他代码的干扰，并且jQuery 不能破坏和污染全局变量以至于影响到其他代码。这一点是任何一个JavaScript 库和框架所必须 具备的功能。
//注意，在这个自调用匿名函数的最后，通过手动把变量jQuery 添加到window 对象上， 明确地使变量 jQuery 成为公开的全局变量，而其他的部分将是私有的。

//2）为什么要为自调用匿名函数设置参数 window，并传入 window 对象？ 通过传入window 对象，可以使window 对象变为局部变量（即把函数参数作为局部 变量使用），
//这样当在jQuery 代码块中访问window 对象时，
//不需要将作用域链回退到顶 层作用域，从而可以更快地访问window 对象，这是原因之一；另外，将window 对象作 为参数传入，可以在压缩代码时进行优化

//3）什么要为自调用匿名函数设置参数 undeﬁned ？ 特殊值 undeﬁned 是 window 对象的一个属性，
//例如，执行下面的代码将会弹出 true： alert( "undeﬁned" in window ); // true 通过把参数undeﬁned 作为局部变量使用，但是又不传入任何值，可以缩短查 找 undeﬁned 时的作用域链，并且可以在压缩代码时进行优化，如前面代码所示，参数 undeﬁned 会被压缩为 b。
//另外，更重要的原因是，通过这种方式可以确保参数undeﬁned 的值是undeﬁned，因为 undeﬁend 有可能会被重写为新的值。

//4）注意到自调用匿名函数最后的分号（ ; ）了吗？ 通常在JavaScript 中，如果语句分别放置在不同的行中，则分号（;）是可选的，但是对 于自调用匿名函数来说，在之前或之后省略分号都可能会引起语法错误。例如，执行下面的 两个例子，就会抛出异常。
//例 1　在下面的代码中，如果自调用匿名函数的前一行末尾没有加分号，则自调用匿名 函数的第一对括号会被当作是函数调用。 var n = 1 ( function(){} )() // TypeError: number is not a function 
//例 2　在下面的代码中，如果未在第一个自调用匿名函数的末尾加分号，则下一行自调 用匿名函数的第一对括号会被当作是函数调用。 ( function(){} )() ( function(){} )()
//// TypeError: undeﬁned is not a function 所以，在使用自调用匿名函数时，最好不要省略自调用匿名函数之前和之后的分号。
(function(global, factory) {
	factory(global)
})(window, function(global) {
	var jQuery = function(selector, context) {
		return new jQuery.fn.init(selector, context);
	}
	
	window.jQuery = window.$ = jQuery;
	return jQuery;
	
})