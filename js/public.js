document.write('<script src="//at.alicdn.com/t/font_1170216_24do378wyfz.js" type="text/javascript" charset="utf-8"></script>');
function resizefn(){
	var iWidth=$(".mbdivcon").outerWidth();iWidth=iWidth>1000?1000:iWidth;//document.documentElement.getBoundingClientRect().width
	document.getElementsByTagName("html")[0].style.fontSize=iWidth/10+"px";
	$("body").css("opacity",1);
};
$(window).on("resize",function(){
	resizefn();
});
resizefn();

//loadhtml
$.fn.loadHtmlobj =function(opt){
	this.loadstyle="no";//inside outer
	this.csslink=[];
	this.jssrc=[];
	$.extend(this,opt);
	var _this = this;
	if(this.loadstyle=="outer"){
		if($(".yy_loadouterbox").length<1){
			var html = '<div class="yy_loadouterbox"></div>';
			$("body").append(html)
		}
		$(".yy_loadouterbox").show();
	}else if(this.insidedom&&this.loadstyle=="inside"){
		if($(".yy_loadinsidebox").length<1){
			var html = '<div class="yy_loadinsidebox"></div>';
			this.insidedom.append(html)
		}
		$(".yy_loadinsidebox").fadeIn();
	}
	this.readcssfn=function(i){
		var _this = this;
		_this.existence = false;
		for(var n=0;n<$("link").length;n++){
			if($("link").eq(n).attr("href")==_this.csslink[i]){
				_this.existence = true
			}
		}
		if(!_this.existence){
			var ilink = document.createElement('link') ;  
        	ilink.rel="stylesheet";
        	ilink.type="text/css"
        	ilink.href = _this.csslink[i] ;  
        	var head = document.getElementsByTagName('head').item(0);  
        	head.appendChild(ilink);  
       		ilink.onload = function(){
       			if(i>=_this.csslink.length-1){
       				if(_this.jssrc.length>=1){
						_this.readjsfn(0);
					}
       			}else{
       				i++;
       				_this.readcssfn(i)
       			}
        	}  
		}else{
			if(i>=_this.csslink.length-1){
   				if(_this.jssrc.length>=1){
					_this.readjsfn(0);
				}
   			}else{
   				i++;
   				_this.readcssfn(i)
   			}
		}
	};
	this.readjsfn=function(i){
		var _this = this;
		_this.existence = false;
		for(var n=0;n<$("script").length;n++){
			if($("script").eq(n).attr("src")==_this.jssrc[i]){
				_this.existence = true
			}
		}
		if(!_this.existence){
			var script = document.createElement('script') ;  
            script.type ='text/javascript' ;  
            script.src =  _this.jssrc[i] ;  
            var head = document.getElementsByTagName('head').item(0);  
            head.appendChild(script);  
            script.onload = function(){  
                if(i>=_this.jssrc.length-1){
                	script.setAttribute("iload","true");
       				_this.callbackfn(_this);
       			}else{
       				i++;
       				_this.readjsfn(i)
       			}
            }  
		}else{
			if(i>=_this.jssrc.length-1){
				if($("script[src='"+_this.jssrc[i]+"']").attr("iload")=="true"){
					_this.callbackfn(_this);
				}else{
					$("script[src='"+_this.jssrc[i]+"']").load(function(){
						$(this).attr("iload","true");
						_this.callbackfn(_this);
					})
				}
   			}else{
   				i++;
   				_this.readjsfn(i)
   			}
		}
	}
	//load 显示
	if(_this.csslink.length>=1){
		_this.readcssfn(0);
	}else if(_this.jssrc.length>=1){
		_this.readjsfn(0);
	}else{
		_this.callbackfn(_this);
	}
	this.endfn = function(){
		$(".yy_loadouterbox").fadeOut();
	}
};
var linkOpenpage = {
	pagenum:0,
	pagedata:{
		taskpage:{
			
		}
	},
	othis:$("body"),
	pagearr:[],
	readpage:function(opt){
		$.extend(this,opt); 
		if(this.pagearr.length>this.pagenum){
			this[this.pagearr[this.pagenum]](this.othis,this.opts);
			this.opts = null;
			this.pagenum++;
		}else{
			this.pagenum = 0;
		}
	}
};
//
document.body.addEventListener('touchstart', function () { });
//提示
var errorprompt = {
	timeout:null,
	thisdom:null,
	show : function (html) {
		var _this = this;
		if(!this.thisdom){
			this.thisdom = $('<div class="errorpromptbox"></div>');
			$("body").append(this.thisdom)
		}
		clearTimeout(this.timeout);
		this.thisdom.html(html)
		.fadeIn()
		.css({'margin-left':-this.thisdom.outerWidth()/2});
		this.timeout = setTimeout("$('.errorpromptbox').fadeOut();",2000);	
	}
};
//操作失败提示
var operationFailedobj = {
	init:function(text){
		var _this = this;
		if(!this.thisdom){
			this.readthisdomhtml(text);
		}
		this.thisdom.find(".y_operationfailtipcon p").html(text);
		this.thisdom.fadeIn().css({"margin-left":-this.thisdom.outerWidth()/2});
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function(){
			_this.thisdom.fadeOut();
		},2000);
	},
	readthisdomhtml:function(){
		var _this = this;
		var thishtml = $(['<div class="y_operationfailtipbox"><div class="y_operationfailtipcon"><p></p></div></div>'].join(""));
		this.thisdom = thishtml;
		$("body").append(thishtml);
	}
}
//操作成功提示
var operationSucedobj = {
	init:function(text,fn){
		var _this = this;
		if(!this.thisdom){
			this.readthisdomhtml(text);
		}
		this.thisdom.find(".y_operationsuctipcon p").html(text);
		this.thisdom.fadeIn().css({"margin-left":-this.thisdom.outerWidth()/2});
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function(){
			_this.thisdom.fadeOut(function(){
				if(fn){
					fn()
				}
			});
		},2000);
	},
	readthisdomhtml:function(){
		var _this = this;
		var thishtml = $(['<div class="y_operationsuctipbox"><div class="y_operationsuctipcon"><p></p></div></div>'].join(""));
		this.thisdom = thishtml;
		$("body").append(thishtml);
	}
};
function isNumber(val){
	var regPos = /^\d+(\.\d+)?$/; //非负浮点数
	var regNeg = /^((([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //浮点数
	if(regPos.test(val) || regNeg.test(val)){
		return true;
	}else{
		return false;
	}
}
function decimalNumber(e, num) {
	if (e.indexOf('.') > -1&&e.split('.')[1].length > num) {
		return false;
	} else{
		return true;
	}
}

var calculationObj ={
	add:function(a, b) {
	    var c, d, e;
	    try {
	        c = a.toString().split(".")[1].length;
	    } catch (f) {
	        c = 0;
	    }
	    try {
	        d = b.toString().split(".")[1].length;
	    } catch (f) {
	        d = 0;
	    }
	    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
	},
	sub:function(a, b) {
	    var c, d, e;
	    try {
	        c = a.toString().split(".")[1].length;
	    } catch (f) {
	        c = 0;
	    }
	    try {
	        d = b.toString().split(".")[1].length;
	    } catch (f) {
	        d = 0;
	    }
	    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
	},
	mul:function(a, b) {
	    var c = 0,
	        d = a.toString(),
	        e = b.toString();
	    try {
	        c += d.split(".")[1].length;
	    } catch (f) {}
	    try {
	        c += e.split(".")[1].length;
	    } catch (f) {}
	    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
	},
	div:function (a, b) {
	    var c, d, e = 0,
	        f = 0;
	    try {
	        e = a.toString().split(".")[1].length;
	    } catch (g) {}
	    try {
	        f = b.toString().split(".")[1].length;
	    } catch (g) {}
	    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
	}
}