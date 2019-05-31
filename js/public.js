document.write('<script src="//at.alicdn.com/t/font_1170216_tl5g2a62g8.js" type="text/javascript" charset="utf-8"></script>');
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
//弹出确认取消提示框
var Popupboxfn = {
	thisdom:null,
	otext:"确定要删除？",
	init:function(okfn,cancelfn,otext,ontext){
		var _this = this;
		_this.okfn = okfn;
		if(!_this.thisdom){
			this.readhtml();
		}
		if(ontext){
			_this.thisdom.find(".del_okbtn").html(ontext);
		}else{
			_this.thisdom.find(".del_okbtn").html("确定");
		}
		
		if(cancelfn){
			_this.cancelfn = cancelfn;
		};
		if(otext){
			_this.thisdom.find(".text").html(otext);
		}else{
			_this.thisdom.find(".text").html(_this.otext);
		};
		_this.thisdom.fadeIn();
		_this.thisdom.find(".del_cancelbtn").unbind("touchend").on("touchend",function(){
			_this.cancelfn();
		});
		_this.thisdom.find(".del_okbtn").unbind("touchend").on("touchend",function(){
			_this.okfn();
		});
	},
	okfn:function(){},
	cancelfn:function(){},
	readhtml:function(){
		this.thisdom = $('<div class="del_msgbox"><div class="del_msgdiv"><p class="text"></p><div class="del_msgbtndiv"><span class="del_cancelbtn">取消</span><span class="del_okbtn">确定</span></div></div></div>')
		$("body").append(this.thisdom)
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
function flooldecimal(num,n){
	var w = Math.pow(10,n)
	return calculationObj.div(Math.floor(calculationObj.mul(num,w)),w);
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

function yzmTime(obj,con,opt){
	this.obj;
	this.con;
	this.wait = 60;
	this.timer;
	this.obj = obj;
	this.con = con;
	this.settings = {
		inittext : "发送验证码",
		ctext : "重新获取"
	}
	$.extend(this.settings,opt);
}
yzmTime.prototype.init = function(){
	var _this = this;
	clearTimeout(this.timer);
	this.wait = 60;
	this.starttime();
}
yzmTime.prototype.starttime = function(){
	var _this = this;
	if (this.wait == 0) { 
		this.clearthis() 
	} else { 
		this.obj.attr("disabled", true);//倒计时过程中禁止点击按钮 
		this.obj.addClass("yzmac");
		this.con.html(this.settings.ctext+"("+this.wait+'s)');//改变按钮中value的值 
		this.wait--; 
		clearTimeout(this.timer);
		this.timer = setTimeout(function() { 
			_this.starttime();//循环调用 
		}, 1000) 
	} 
}
function Countdown(){
	var _this = this;
	this.data = {};
	this.timer;
	this.settings = {
		s:0,
		fn:function(){},
		endfn:function(){}
	}
	
	
}
Countdown.prototype.init = function(opt){
	var _this = this;
	$.extend(this.settings,opt);
	this.data = {};
	clearInterval(this.timer)
	this.starttime();
	this.timer = setInterval(function(){
		_this.starttime();
	},1000)
}
Countdown.prototype.starttime = function(opt){
	$.extend(this.settings,opt);
	this.data["d"] = Math.floor(this.settings.s / 60 / 60 /24)<10?"0"+Math.floor(this.settings.s / 60 / 60 /24):Math.floor(this.settings.s / 60 / 60 /24);
	this.data["h"] = Math.floor(this.settings.s / 60 /60 % 24)<10?"0"+Math.floor(this.settings.s / 60 /60 % 24):Math.floor(this.settings.s / 60 /60 % 24);
	this.data["m"] = Math.floor(this.settings.s / 60 % 60)<10?"0"+Math.floor(this.settings.s / 60 % 60):Math.floor(this.settings.s / 60 % 60);
	this.data["s"] = Math.floor(this.settings.s % 60)<10?"0"+Math.floor(this.settings.s % 60):Math.floor(this.settings.s % 60);
	this.settings.fn(this.data);
	if(this.settings.s==0){
		clearInterval(this.timer);
		this.settings.endfn()
	}	
	this.settings.s--;
}
yzmTime.prototype.clearthis = function(){
	var _this = this;
	clearTimeout(this.timer);
	this.obj.removeAttr("disabled").removeClass("yzmac");
	this.con.html(this.settings.inittext);
	this.wait = 60; 
}
var setrollIN_pc = {
	start_X:0,
	start_left:0,
	bigwidth:0,
	opamove:0,
	fn:function(obj,fn){
		var _this = this;
		obj.find('.rolltiaomovebtn').unbind("mousedown").on('mousedown',function(e){
			_this.start_X =e.pageX;
			_this.start_left =parseInt(obj.find('.rolltiaomovebtn').css("left"));
			obj.unbind("mousemove").on('mousemove',function(e) {
				_this.opamove = _this.move(e,obj,_this.start_left,_this.start_X)[0];
				_this.bigwidth = _this.move(e,obj,_this.start_left,_this.start_X)[1];
				obj.find('.rolltiaobg span').css('width',(100-Math.round((_this.opamove/(_this.bigwidth-obj.find('.rolltiaomovebtn').outerWidth()))*100))+'%');
				obj.find('.rolltiaomovebtn').css("left",_this.opamove);
				fn(obj);
			});
			$(document).unbind("mouseup").on('mouseup',function(e) {
				obj.unbind("mousemove");
			});
		});
	},
	move:function(e,obj,start_left,start_X){
		var moveX = e.pageX;
		var opamove = start_left+(moveX-start_X);
		
		var bigwidth = parseFloat(obj.find('.rolltiaobg').css("width"));
		if(opamove<0){
			opamove=0;
		};
		if(opamove>bigwidth-obj.find('.rolltiaomovebtn').outerWidth()+3){
			opamove=bigwidth-obj.find('.rolltiaomovebtn').outerWidth()+3;
		};
		return [opamove,bigwidth];
	},
	cs:function(obj,num,s,b){
		var ww = parseFloat(obj.find(".rolltiaobg").css("width"));
		var spanw = calculationObj.mul(calculationObj.sub(1,calculationObj.div(calculationObj.sub(num,s),calculationObj.sub(b,s))),100);
		obj.find('.rolltiaobg span').css('width',spanw.toFixed(2)+"%");
		var btnl= calculationObj.mul(calculationObj.div(calculationObj.sub(num,s),calculationObj.sub(b,s)),calculationObj.add(calculationObj.sub(ww,$(".rolltiaomovebtn").outerWidth()),4));
		obj.find('.rolltiaomovebtn').css('left',btnl);
	}
};
//左右滚动条
var setrollIN_yd = {
	start_X:0,
	start_left:0,
	bigwidth:0,
	opamove:0,
	fn:function(obj,fn){
		var _this = this;
		obj.find('.rolltiaomovebtn').on('touchstart',function(e){
			_this.start_X =e.originalEvent.targetTouches[0].pageX;
			_this.start_left =parseInt(obj.find('.rolltiaomovebtn').css("left"));
		});
		obj.find('.rolltiaomovebtn').on('touchmove',function(e) {
			_this.opamove = _this.touchmove(e,obj,_this.start_left,_this.start_X)[0];
			_this.bigwidth = _this.touchmove(e,obj,_this.start_left,_this.start_X)[1];
			obj.find('.rolltiaobg span').css('width',(100-Math.round((_this.opamove/(_this.bigwidth-obj.find('.rolltiaomovebtn').outerWidth()))*100))+'%');
			obj.find('.rolltiaomovebtn').css("left",_this.opamove);
			fn();
			e.preventDefault();
		});
	},
	touchmove:function(e,obj,start_left,start_X){
		var opamove = start_left+(e.originalEvent.targetTouches[0].pageX-start_X);
		var bigwidth = parseFloat(obj.find('.rolltiaobg').css("width"));
		if(opamove<0){
			opamove=0;
		};
		if(opamove>bigwidth-obj.find('.rolltiaomovebtn').outerWidth()+4){
			opamove=bigwidth-obj.find('.rolltiaomovebtn').outerWidth()+4;
		};
		return [opamove,bigwidth];
	},
	cs:function(obj,num,s,b){
		var ww = parseFloat(obj.find(".rolltiaobg").css("width"));
		var spanw = calculationObj.mul(calculationObj.sub(1,calculationObj.div(calculationObj.sub(num,s),calculationObj.sub(b,s))),100);
		obj.find('.rolltiaobg span').css('width',spanw.toFixed(2)+"%");
		var btnl= calculationObj.mul(calculationObj.div(calculationObj.sub(num,s),calculationObj.sub(b,s)),calculationObj.add(calculationObj.sub(ww,$(".rolltiaomovebtn").outerWidth()),4));
		obj.find('.rolltiaomovebtn').css('left',btnl);
	}
};
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
//图片居中显示
var resetImg = {
	imgload:function(obj){
		var _this = this;
		if(!obj.get(0)){
			return false;
		}
		if(obj.get(0).complete){
        	_this.resetimg(obj);
        }else{
           obj.load(function(){
            	_this.resetimg(obj);
            });
           obj.error(function(){
				_this.resetimg(obj);
            });
        };
	},
	resetimg:function(obj){
		obj.parent().removeClass("imgloadbg");
		var ys_width = obj.outerWidth();
		var ys_height = obj.outerHeight();
		var w_width = obj.parent().outerWidth()-parseInt(obj.parent().css("border-width"))*2;
		var w_height = obj.parent().outerHeight()-parseInt(obj.parent().css("border-width"))*2;
		if(ys_height/ys_width>w_height/w_width){
			obj.css({"height":"auto","width":"100%"});
			obj.css({"margin-top":-(obj.outerHeight()-w_height)/2,"margin-left":"auto"});
		}else{
			obj.css({"height":"100%","width":"auto"});
			obj.css({"margin-left":-(obj.outerWidth()-w_width)/2,"margin-top":"auto"});
		};
	}
};
$.fn.longPress = function(fn) {
    var timeout = undefined;
    var timestop = undefined;
    var $this = this;
    for(var i = 0;i<$this.length;i++){
        $this[i].addEventListener('touchstart', function(event) {
            timeout = setTimeout(function(){
            	clearInterval(timestop)
				console.log()
            	timestop = setInterval(function(){
					fn($this)
				},60);
            },100);  //长按时间超过800ms，则执行传入的方法
        }, false);
    }
    $("body").on('touchend', function(event) {
    	clearInterval(timestop);
        clearTimeout(timeout);  //长按时间少于800ms，不会执行传入的方法
    });
};
var jmz = {};
jmz.GetLength = function(str) {
  var realLength = 0, len = str.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
};
