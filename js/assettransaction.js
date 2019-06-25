var assettransactionfn = {
	timen:6000,
	thistype:'',
	buysellt:'',
	navd:[],
	init:function(opt){
		var _this = this;
		$.extend(this,opt)
		this.readcss();
		this.readnavul();
		
		$(".zcjy_topnavs span").on("click",function(){
			$(".zcjy_topnavconbox").fadeIn();
			$(".zcjy_topnavlist li[itype='"+_this.thistype+"']").addClass("active").siblings().removeClass("active")
		})
		$(".zcjy_topnavlist").on("click","li",function(ev){
			ev.stopPropagation()
			_this.thistype = $(this).attr("itype");
			$(this).addClass("active").siblings().removeClass("active")
			$(".zcjy_topnavconbox").fadeOut();
			_this.getdata();
			_this.sett();
			if(_this.buysellt=="buy"){
				buyObj.show()
			}else if(_this.buysellt=="sell"){
				sellObj.show()
			}else{
				entrustobj.show()
			}
		})
		$(".zcjy_topnavconbox").on("click",function(){
			$(".zcjy_topnavconbox").fadeOut();
		})
		$(".zcjy_setconnav li").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			_this.buysellt = $(this).attr("itype")
			if(_this.buysellt=="buy"){
				buyObj.show()
			}else if(_this.buysellt=="sell"){
				sellObj.show()
			}else{
				entrustobj.show()
			}
		})
		$(".yy_marketconrightul").on("click","li>div",function(){
			if(_this.buysellt=="buy"){
				buyObj.toplistcfn($(this).find(".jg").html(),$(this).find("num").html())
			}else if(_this.buysellt=="sell"){
				sellObj.toplistcfn($(this).find(".jg").html(),$(this).find("num").html())
			}
		})
		$(".zcjy_topnavs strong").on("click",function(){
			if(_this.buysellt=="buy"){
				buyObj.toplistcfn($(this).html())
			}else if(_this.buysellt=="sell"){
				sellObj.toplistcfn($(this).html())
			}
		})
		this.getdata(function(){
			$(".zcjy_setconnav li").eq(0).click();
		});
		_this.sett();
	},
	sett:function(){
		var _this = this;
		clearInterval(_this.timer)
		_this.timer = setInterval(function(){
			_this.getdata()
		},_this.timen);
	},
	readcss:function(){
		$('.zcjy_topnavconbox').css("height",$(".mbdivbg").outerHeight()-$(".zcjy_navbox").outerHeight())
	},
	readnavul:function(){
		var thish = "";
		var ai;
		for(var i=0;i<this.navd.length;i++){
			ai =[];
			ai = this.navd[i].split("/");
			thish=thish+'<li itype="'+this.navd[i]+'"><p><span class="target1">'+ai[0]+'</span>/<span class="target2">'+ai[1]+'</span></p></li>'
		}
		$(".zcjy_topnavlist").html(thish)
	},
	readpage:function(data){
		var tr =this.thistype.split("/")
		$(".zcjy_topnavs span").html(tr.join(" / "));
		$(".zcjy_topnavs strong").html(data.price);
		$(".yy_marketconrightul").html("");
		var thisd;
		for(var i=0;i<5;i++){
			thisd = $('<li class="clear"><div class="buy"></div><div class="sell"></div></li>');
			if(data.sell&&data.sell[i]){
				thisd.find(".sell").append(['<span class="jg">',
					data.sell[i].price
				,'</span><span class="num">',
					data.sell[i].num
				,'</span><span class="smtit">#',
					i+1
				,'</span>'].join(""))
			}
			if(data.buy[i]){
				thisd.find(".buy").append(['<span class="smtit">#',
					i+1
				,'</span><span class="num">',
					data.buy[i].num
				,'</span><span class="jg">',
					data.buy[i].price
				,'</span>'].join(""))
			}
			$(".yy_marketconrightul").append(thisd);
		}
		$(".zcjy_setconbox .target1").html(tr[0]);
		$(".zcjy_setconbox .target2").html(tr[1]);
		this.hasb = data.hasb;
		this.hasa = data.hasa;
		this.sxf =  data.sxf;
		this.b_minnum = data.b_minnum;
		this.btarget = data.atarget;
		this.bdecimal = data.bdecimal;
		$(".buybox .myhas").html(this.hasb);
		$(".sellbox .myhas").html(this.hasa)
	}
}
var buyObj = {
	thisdom:$(".buybox"),
	atarget:0.0001,
	btarget:0,
	a_maxnum:0,
	a_minnum:0.0001,
	b_minnum:0,
	sxf:0,
	bdecimal:0,
	a_jiabtn:$(".buybox .plusbtn"),
	a_jianbtn:$(".buybox .lessbtn"),
	a_input:$("#buy_paynum"),
	b_input:$("#buy_targetnum"),
	init:function(){
		var _this = this;
		$(".zcjy_setconbox").bind('contextmenu', function(e) {
			e.preventDefault();
		});

		this.a_jiabtn.on("click",function(){
			_this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,calculationObj.add(_this.a_input.val()*1,0.0001));
			_this.hs();
		});
		this.a_jiabtn.longPress(function(){
			_this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,calculationObj.add(_this.a_input.val()*1,0.0001));
			_this.hs();
		});
		this.a_jianbtn.on("click",function(){
			_this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,calculationObj.sub(_this.a_input.val()*1,0.0001));
			_this.hs();
		});
		this.a_jianbtn.longPress(function(){
		   _this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,calculationObj.sub(_this.a_input.val()*1,0.0001));
		   _this.hs();
		});
		this.a_input.on("input propertychange",function(){
			if(!isNumber(_this.a_input.val()*1)||!decimalNumber(_this.a_input.val(),4)){
				_this.atarget = (_this.atarget*1).toFixed(4)
				_this.hs();
				return;
			}
			_this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,(_this.a_input.val()*1).toFixed(4)*1);
			_this.all()
		})
		this.a_input.on("blur",function(){
			_this.hs(_this.atarget);
		})
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
		this.thisdom.find(".allbtn").on("click",function(){
			if(_this.a_maxnum<_this.a_minnum){
				operationFailedobj.init("您的"+$(".target2").html()+"不足");
				return false;
			}
			// _this.btarget = Math.floor(calculationObj.div(_this.a_maxnum,_this.atarget)*100)/100;
			_this.btarget = flooldecimal(calculationObj.div(_this.a_maxnum,calculationObj.mul(calculationObj.add(_this.sxf,1),_this.atarget)),_this.bdecimal);
			console.log(_this.a_maxnum)
			_this.b_input.val(_this.btarget)
			
			_this.all()
		})
		this.thisdom.find(".ahalfbtn").on("click",function(){
			if(_this.a_maxnum<_this.a_minnum){
				operationFailedobj.init("您的"+$(".target2").html()+"不足");
				return false;
			}
			// var maxbuy = calculationObj.div(_this.a_maxnum,2).toFixed(4)
			// _this.btarget = calculationObj.div(maxbuy,_this.atarget).toFixed(4);
			_this.btarget = flooldecimal(calculationObj.div(calculationObj.div(_this.a_maxnum,2),calculationObj.mul(calculationObj.add(_this.sxf,1),_this.atarget)),_this.bdecimal);
			_this.b_input.val(_this.btarget)
			_this.all()
		})
		this.thisdom.find(".onefourthbtn").on("click",function(){
			if(_this.a_maxnum<_this.a_minnum){
				operationFailedobj.init("您的"+$(".target2").html()+"不足");
				return false;
			}
			// var maxbuy = calculationObj.div(_this.a_maxnum,4).toFixed(4);
			// _this.btarget = calculationObj.div(maxbuy,_this.atarget).toFixed(4);
			 _this.btarget = flooldecimal(calculationObj.div(calculationObj.div(_this.a_maxnum,4),calculationObj.mul(calculationObj.add(_this.sxf,1),_this.atarget)),_this.bdecimal);
			_this.b_input.val(_this.btarget)
			_this.all()
		})
		_this.b_input.on("input propertychange",function(){
			if(!isNumber($(this).val()*1)||!decimalNumber($(this).val(),_this.bdecimal)){
				$(this).val((_this.btarget*1).toFixed(_this.bdecimal))
				_this.all()
				return;
			}
			var num = ($(this).val()*1).toFixed(_this.bdecimal);
			_this.btarget = num;
			if(num<=_this.b_minnum){
				console.log(_this.b_minnum)
				_this.btarget = _this.b_minnum;
			}
			_this.all()
		})
		_this.b_input.on("blur",function(){
			$(this).val(_this.btarget)
		})
		this.thisdom.find(".purchasebtn").on("click",function(){
			if(_this.a_maxnum<0.0001||_this.a_maxnum<parseFloat(_this.thisdom.find(".totalmsgnum").html())){
				operationFailedobj.init("您的"+$(".target2").html()+"不足")
				return false;
			}
			if(Usermsg.realname!="1"){
				confirmmsgflo.init({
					"wobj":$(".mbdivcon"),
					"con":'您还未完成实名认证，不能进行本操作',
					"oktext":"立即认证",
					"okfn":function(){
						window.location = "entrance.html"
					},
					"cancelfn":function(){
						this.thisdom.fadeOut()
					}
				})
			}else{
				_this.completefn();
			}
			
		})
	},
	toplistcfn:function(num,num1){
		this.atarget = num;
		this.btarget = num1;
		// var thismax = Math.floor(calculationObj.div(this.a_maxnum,this.atarget)*100)/100;
		var thismax = flooldecimal(calculationObj.div(this.a_maxnum,calculationObj.mul(calculationObj.add(this.sxf,1),this.atarget)),this.bdecimal);
		if(this.btarget>thismax||!this.btarget){
			this.btarget = thismax
		}
		this.hs()
	},
	hs:function(){
		this.a_input.val(this.atarget);
		this.b_input.val(this.btarget);
		this.all()
	},
	all:function(){
		var sxf = calculationObj.mul(calculationObj.mul(this.atarget,this.btarget).toFixed(4),this.sxf).toFixed(4);
		this.thisdom.find(".sxfnum").html(sxf)
		this.thisdom.find(".totalmsgnum").html(calculationObj.add(calculationObj.mul(this.atarget,this.btarget).toFixed(4),sxf))
	},
	show:function(){
		this.thisdom.addClass("active").siblings().removeClass("active");
		this.a_maxnum = assettransactionfn.hasb;
		this.sxf = assettransactionfn.sxf;
		this.b_minnum = assettransactionfn.b_minnum;
		this.btarget = assettransactionfn.btarget;
		this.bdecimal = assettransactionfn.bdecimal;
		$(".zcjy_topnavs strong").click();
		this.changenum(this.a_jiabtn,this.a_jianbtn,this.a_maxnum,this.a_minnum,this.atarget*1);
	},
	changenum:function(jiabtn,jianbtn,maxnum,minnum,num){
		if(num<=maxnum&&num>=minnum){
			jianbtn.removeClass("disable");
			jiabtn.removeClass("disable");
			this.atarget = (num*1).toFixed(4);
		}
		if(num>=maxnum){
			this.atarget = maxnum;
			jiabtn.addClass("disable");
		}
		if(num<=minnum){
			this.atarget = minnum;
			jianbtn.addClass("disable");
		}
		
	}
}
var sellObj = {
	thisdom:$(".sellbox"),
	atarget:0.0001,
	btarget:0,
	a_maxnum:0,
	a_minnum:0.0001,
	b_minnum:0,
	b_maxnum:0,
	sxf:0,
	bdecimal:0,
	a_jiabtn:$(".sellbox .plusbtn"),
	a_jianbtn:$(".sellbox .lessbtn"),
	a_input:$("#sell_getnum"),
	b_input:$("#sell_targetnum"),
	init:function(){
		var _this = this;
		
		this.a_jiabtn.on("click",function(){
			_this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,calculationObj.add(_this.a_input.val()*1,0.0001));
			_this.hs();
		});
		this.a_jiabtn.longPress(function(){
			_this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,calculationObj.add(_this.a_input.val()*1,0.0001));
			_this.hs();
		});
		this.a_jianbtn.on("click",function(){
			_this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,calculationObj.sub(_this.a_input.val()*1,0.0001));
			_this.hs();
		});
		this.a_jianbtn.longPress(function(){
		   _this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,calculationObj.sub(_this.a_input.val()*1,0.0001));
		   _this.hs();
		});
		this.a_input.on("input propertychange",function(){
			if(!isNumber(_this.a_input.val()*1)||!decimalNumber(_this.a_input.val(),4)){
				_this.atarget = (_this.atarget*1).toFixed(4)
				_this.hs();
				return;
			}
			_this.changenum(_this.a_jiabtn,_this.a_jianbtn,_this.a_maxnum,_this.a_minnum,(_this.a_input.val()*1).toFixed(4)*1);
			_this.all()
		})
		this.a_input.on("blur",function(){
			_this.hs(_this.atarget);
		})
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
		this.thisdom.find(".allbtn").on("click",function(){
			_this.btarget = _this.b_maxnum
			_this.b_input.val(_this.btarget)
			if(_this.b_maxnum<_this.b_minnum){
				operationFailedobj.init("您的"+$(".zcjy_setconbox .target1").html()+"不足")
			}
			_this.all()
		})
		this.thisdom.find(".ahalfbtn").on("click",function(){
			_this.btarget = flooldecimal(calculationObj.div(_this.b_maxnum,2),_this.bdecimal);
			_this.b_input.val(_this.btarget)
			if(_this.b_maxnum<_this.b_minnum){
				operationFailedobj.init("您的"+$(".zcjy_setconbox .target1").html()+"不足")
			}
			_this.all()
		})
		this.thisdom.find(".onefourthbtn").on("click",function(){
			 _this.btarget = flooldecimal(calculationObj.div(_this.b_maxnum,4),_this.bdecimal);
			_this.b_input.val(_this.btarget)
			if(_this.b_maxnum<_this.b_minnum){
				operationFailedobj.init("您的"+$(".zcjy_setconbox .target1").html()+"不足")
			}
			_this.all()
		})
		_this.b_input.on("input propertychange",function(){
			if(!isNumber($(this).val()*1)||!decimalNumber($(this).val(),_this.bdecimal)){
				$(this).val((_this.btarget*1).toFixed(_this.bdecimal))
				_this.all()
				return;
			}
			var num = ($(this).val()*1).toFixed(_this.bdecimal);
			_this.btarget = num;
			if(num<=_this.b_minnum){
				console.log(_this.b_minnum)
				_this.btarget = _this.b_minnum;
			}
			_this.all()
		})
		_this.b_input.on("blur",function(){
			$(this).val(_this.btarget)
		})
		this.thisdom.find(".selloutbtn").on("click",function(){
			if(_this.b_maxnum<_this.b_minnum||_this.a_maxnum<parseFloat(_this.thisdom.find(".totalmsgnum").html())){
				operationFailedobj.init("您的"+$(".target2").html()+"不足")
				return false;
			}
			if(Usermsg.realname!="1"){
				confirmmsgflo.init({
					"wobj":$(".mbdivcon"),
					"con":'您还未完成实名认证，不能进行本操作',
					"oktext":"立即认证",
					"okfn":function(){
						window.location = "entrance.html"
					},
					"cancelfn":function(){
						this.thisdom.fadeOut()
					}
				})
			}else{
				_this.completefn();
			}
		})
	},
	toplistcfn:function(num,num1){
		this.atarget = num;
		this.btarget = num1;
		var thismax = this.b_maxnum;
		if(this.btarget>thismax||!this.btarget){
			this.btarget = thismax
		}
		this.hs()
	},
	hs:function(){
		this.a_input.val(this.atarget);
		this.b_input.val(this.btarget);
		this.all()
	},
	all:function(){
		var sxf = calculationObj.mul(calculationObj.mul(this.atarget,this.btarget).toFixed(4),this.sxf).toFixed(4);
		var all = calculationObj.sub(calculationObj.mul(this.atarget,this.btarget).toFixed(4),sxf);
		this.thisdom.find(".sxfnum").html(sxf);
		this.thisdom.find(".totalmsgnum").html(all);
	},
	show:function(){
		this.thisdom.addClass("active").siblings().removeClass("active");
		this.a_maxnum = 1000000000;
		this.b_maxnum =  assettransactionfn.hasa;
		this.sxf = assettransactionfn.sxf;
		this.b_minnum = assettransactionfn.b_minnum;
		this.btarget = assettransactionfn.btarget;
		this.bdecimal = assettransactionfn.bdecimal;
		$(".zcjy_topnavs strong").click();
		this.changenum(this.a_jiabtn,this.a_jianbtn,this.a_maxnum,this.a_minnum,this.atarget*1);
	},
	changenum:function(jiabtn,jianbtn,maxnum,minnum,num){
		if(num<=maxnum&&num>=minnum){
			jianbtn.removeClass("disable");
			jiabtn.removeClass("disable");
			this.atarget = (num*1).toFixed(4);
		}
		if(num>=maxnum){
			this.atarget = maxnum;
			jiabtn.addClass("disable");
		}
		if(num<=minnum){
			this.atarget = minnum;
			jianbtn.addClass("disable");
		}
		
	}
}
var entrustobj = {
	movekg:true,
	page:1,
	thisdom:$(".entrustbox"),
	init:function(){
		var _this = this;
		$('.scrollw_box').scroll(function(){
		 	_this.srollli($(this))
		});
		this.thisdom.on("click",".undobtn",function(){
			var _thisli = $(this).parents(".delegateli");
			var thisid = _thisli.attr("iid")
			if(Usermsg.realname!="1"){
				confirmmsgflo.init({
					"wobj":$(".mbdivcon"),
					"con":'您还未完成实名认证，不能进行本操作',
					"oktext":"立即认证",
					"okfn":function(){
						window.location = "entrance.html"
					},
					"cancelfn":function(){
						this.thisdom.fadeOut()
					}
				})
			}else{
				confirmmsgflo.init({
					"wobj":$(".mbdivcon"),
					"con":'是否确认撤销交易?',
					"okfn":function(){
						this.thisdom.fadeOut()
						_this.delegatesend(thisid,function(data){
							_thisli.remove();
							assettransactionfn.getdata();
							assettransactionfn.sett();
							_this.srollli($('.scrollw_box'))
						});
					},
					"cancelfn":function(){
						this.thisdom.fadeOut()
					}
				})
			}
			
		})
	},
	show:function(){
		this.thisdom.addClass("active").siblings().removeClass("active");
		$(".entrustbox ul").html("");
		this.page=1;
		this.movekg=true;
		this.readHtml();
	},
	srollli:function(obj){
		if(obj[0].scrollHeight-obj.height()-5<=obj.scrollTop()){
	 		if(this.movekg===true){
				this.page++;
				this.movekg=false;
				this.readHtml();
			};
	 	}
	}
}