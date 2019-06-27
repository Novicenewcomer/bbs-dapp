document.write('<script src="//at.alicdn.com/t/font_1170216_fygip30s754.js" type="text/javascript" charset="utf-8"></script>');
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
		// if($(".yy_loadouterbox").length<1){
		// 	var html = '<div class="yy_loadouterbox"></div>';
		// 	$("body").append(html)
		// }
		// $(".yy_loadouterbox").show();
	}else if(this.insidedom&&this.loadstyle=="inside"){
		// if($(".yy_loadinsidebox").length<1){
		// 	var html = '<div class="yy_loadinsidebox"></div>';
		// 	this.insidedom.append(html)
		// }
		// $(".yy_loadinsidebox").fadeIn();
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
		this.thisdom.find(".y_operationfailtipcon .con").html(text);
		this.thisdom.fadeIn().css({"margin-left":-this.thisdom.outerWidth()/2});
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function(){
			_this.thisdom.fadeOut();
		},2000);
	},
	readthisdomhtml:function(){
		var _this = this;
		var thishtml = $(['<div class="y_operationfailtipbox"><div class="y_operationfailtipcon"><span class="ico"><svg class="icon" aria-hidden="true"><use xlink:href="#iconcuowu"></use></svg></span><div class="con"></div></div></div>'].join(""));
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
		this.thisdom.find(".y_operationsuctipcon .con").html(text);
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
		var thishtml = $(['<div class="y_operationsuctipbox"><div class="y_operationsuctipcon"><span class="ico"><svg class="icon" aria-hidden="true"><use xlink:href="#iconzhengque"></use></svg></span><div class="con"></div></div></div>'].join(""));
		this.thisdom = thishtml;
		$("body").append(thishtml);
	}
};

//确认信息
var confirmmsgflo= {
	thisdom:null,
	init:function(opt){
		var _this = this;
		this.wobj=$("body");
		this.con="";
		this.tit=null;
		this.oktext="确定";
		this.cctext="取消";
		this.text=null;
		this.cancelfn = function(){
			this.thisdom.fadeOut()
		};
		this.closefn = function(){
			this.thisdom.fadeOut()
		};
		this.colsebtn=false;
		
		$.extend(this,opt)
		if(!this.thisdom){
			this.readhtml();
		}
		if(this.tit){
			this.thisdom.find(".tit").show().html(this.tit)
		}else{
			this.thisdom.find(".tit").hide()
		}
		this.thisdom.find(".pubreconflo_boxtip").remove()
		if(this.text){
			this.thisdom.find(".pubreconflo_btnbox").before('<div class="pubreconflo_boxtip">'+this.text+'</div>')
		}
		this.thisdom.find(".closepub_reconfirmationflo").remove()
		if(this.colsebtn){
			this.thisdom.find(".tit").before('<a href="javascript:;"class="closepub_reconfirmationflo"><svg class="icon"aria-hidden="true"><use xlink:href="#iconclose"></use></svg></a>')
		}
		if(isString(this.con)){
			this.thisdom.find(".pubreconflo_boxc").html('<div class="pubreconflo_boxtext">'+this.con+'</div>');	
		}else if($.isArray(this.con)){
			this.thisdom.find(".pubreconflo_boxc").html('<ul class="pubreconflo_boxul"></ul>');
			for(var i=0;i<this.con.length;i++){
				this.thisdom.find(".pubreconflo_boxul").append(['<li><p class="leftb">',
					this.con[i].lcon
				,'</p><p class="rightb">',
					this.con[i].rcon
				,'</p></li>'].join(""))
			}
		}
		this.thisdom.find(".pubreconflo_obtn").html(this.oktext)
		this.thisdom.find(".pubreconflo_cbtn").html(this.cctext)
		this.thisdom.fadeIn();
		_this.thisdom.find(".pubreconflo_cbtn").unbind("click").on("click",function(){
			_this.cancelfn();
		});
		_this.thisdom.find(".closepub_reconfirmationflo").unbind("click").on("click",function(){
			_this.thisdom.fadeOut()
		});
		_this.thisdom.find(".pubreconflo_obtn").unbind("click").on("click",function(){
			_this.okfn();
		});
	},
	okfn:function(){},
	readhtml:function(){
		this.thisdom = $('<div class="pub_reconfirmationflo"><div class="pubreconflo_box"><span class="yico"></span><span class="yico"></span><span class="yico"></span><div class="pubreconflo_c"><p class="tit"></p><div class="pubreconflo_boxc"></div><div class="pubreconflo_btnbox"><a class="pubreconflo_cbtn"href="javascript:;"></a><a class="pubreconflo_obtn"href="javascript:;"></a></div></div></div></div>')
		this.wobj.append(this.thisdom)
	}
}
//判断数字
function isNumber(val){
	var regPos = /^\d+(\.\d+)?$/; //非负浮点数
	var regNeg = /^((([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //浮点数
	if(regPos.test(val) || regNeg.test(val)){
		return true;
	}else{
		return false;
	}
}
//判断小数位
function decimalNumber(e, num) {
	if (e.indexOf('.') > -1&&e.split('.')[1].length > num) {
		return false;
	} else{
		return true;
	}
}
//截取保留小数位
function flooldecimal(num,n){
	var w = Math.pow(10,n)
	return calculationObj.div(Math.floor(calculationObj.mul(num,w)),w);
}
//判断对象是否是字符串
function isString(obj){
  return Object.prototype.toString.call(obj) === "[object String]";
}
if ((/Android/gi).test(navigator.userAgent)) {
	window.addEventListener('resize', function () {
		if (document.activeElement.tagName == 'INPUT' || 
			document.activeElement.tagName == 'TEXTAREA') {
			window.setTimeout(function () {
				document.activeElement.scrollIntoViewIfNeeded();
			}, 0);
		}
	});
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
var landpubfloObj ={
	state:"0",
	init:function(state){
		var _this = this;
		this.state = state;
		this.thisdom =$('<div class="landpubflo"><p class="tit">请登录您的Tron钱包</p><div class="textcon"><p>如果您还没有安装Tron钱包，请访问：</p><p><a href="http://u6.gg/gmc5D">http://u6.gg/gmc5D</a></p><p>并下载安装chrome浏览器扩展程序Tronlink。</p></div></div>')
		$(".mbdivcon").append(this.thisdom)
		if(this.state!="1"){
			this.thisdom.show()
		}
	}
}
var resettopnavnumObj = {
	ulh:'<div class="uldiv"><div class="s"><ul><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li></ul><div><div>',
	resethtml:function(obj){
		if(obj.find('ul').length>0){
			return false;
		}
		// obj.attr("num",obj.html())
		obj.html(obj.attr("num"))
		var tval = obj.html();
		var thishtml;;
		obj.html("");
		var h = parseFloat(obj.outerHeight());
		obj.css("height",h)
		for(var i=0; i<tval.length;i++){
			if(tval[i]=="."){
				obj.append('<span>.</span>')
			}else{
				thishtml = $(this.ulh)
				obj.append(thishtml);
				thishtml.find('li').css("height",h)
				mvcss(thishtml.find('.s')[0],"translateY",-tval[i]*h)
			}
			
		}
	},
	resetnum:function(obj,num,wobj){
		if(!wobj.attr("style")){
			wobj.css({
				"position":"absolute",
				"left":wobj.offset().left-$(".mbdivcon").offset().left,
				"top":wobj.offset().top-$(".mbdivcon").offset().top-wobj.css("margin-top"),
			})
		}
		obj.find("*").show()
		var _this = this;
		var h = parseFloat(obj.outerHeight());
		
		var oldnum = obj.attr("num");
		console.log(oldnum)
		var newnum = num+"";
		obj.attr("num",num);
		MTween({
			el : wobj[0],
			target : {
				scale : 140,
			},
			time : 100,
			type : "easeIn",
			callBack : function(){
			}
		});
		var maxnum = newnum.length>oldnum.length?newnum.length:oldnum.length;
		for(var i=0;i<maxnum;i++){
			if(oldnum[i]=="."&&newnum[i]=="."){
			}else if(newnum[i]==undefined){
				if(oldnum[i]=="."){
					obj.children().eq(i).hide().addClass("hide")
				}else{
					obj.children().eq(i).show()
					MTween({
						el : obj.children().eq(i).find(".s")[0],
						target : {
							translateY :h,
						},
						time : 600,
						type : "easeIn",
						callBack : function(){
							$(this).parent().hide().addClass("hide")
						}
					});
				}
			}else if(oldnum[i]==undefined){
				if(newnum[i]=="."){
					if(obj.children().eq(i).length>0){
						obj.children().eq(i).replaceWith('<span>.</span>')
					}else{
						obj.append('<span>.</span>')
					}
				}else{
					if(obj.children().eq(i).length>0){
						obj.children().eq(i).replaceWith(thishtml)
						var thishtml = obj.children().eq(i);
					}else{
						var thishtml = $(this.ulh)
						obj.append(thishtml)
					}
					thishtml.find('li').css("height",h)
					mvcss(thishtml.find('.s')[0],"translateY",0);
					thishtml.show()
					MTween({
						el : thishtml.find(".s")[0],
						target : {
							translateY : (-newnum[i]*h),
						},
						time : 600,
						type : "easeIn",
						callBack : function(){
						}
					});
				}
			}else{
				var o;
				if(oldnum[i]=="."){
					var thishtml = $(this.ulh)
					obj.children().eq(i).replaceWith(thishtml)
					thishtml.find('li').css("height",h)
					mvcss(thishtml.find('.s')[0],"translateY",0);
					y = -newnum[i]*h
				}else if(newnum[i]=="."){
					y = h;
				}else{
					y = -newnum[i]*h
				}
				obj.children().eq(i).show()
				MTween({
					el : obj.children().eq(i).find(".s")[0],
					target : {
						translateY : y,
					},
					time : 600,
					type : "easeIn",
					callBack : function(){
						if(mvcss($(this)[0],"translateY")==h){
							$(this).replaceWith('<span>.</span>')
						}
					}
				});
			}
		}
		this.t =setTimeout(function(){
			MTween({
				el : wobj[0],
				target : {
					scale : 100,
				},
				time : 100,
				type : "easeIn",
				callBack : function(){
					wobj.attr({
						"style":""
					})
					var thisd = false;
					for(var j in newnum){
						if(newnum[j]=="."){
							thisd = true
						}
						if(thisd){
							obj.children().eq(j).hide()
						}
					}
				}
			});
		},1000);
	},
	sethtml:function(obj,num){
		obj.html(num).attr("num",num)
	}
}
function starstypetextfn(type){
	switch(type) {
    case "0":
       return "孝"
       break;
	case "1":
	   return "悌"
	   break;
	case "2":
	   return "忠"
	   break;
	case "3":
	   return "信"
	   break;
	case "4":
	   return "礼"
	   break;
	case "5":
	   return "义"
	   break;
	case "6":
	   return "廉"
	   break;
    default:
       return "耻"
} 
}