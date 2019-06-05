var pagebuydxggpos= {
	myhas:0,
	unitprice:0,
	cnum:0,
	hjnum:0,
	ggnum:0,
	thiswdom:null,
	init:function(opt){
		var _this = this;
		this.thiswdom = opt.container;
		if(!this.thisdom){
			this.readwdom();
		}
	},
	readwdom:function(){
		this.thisdom = $('<div class="buydxggposflo"></div>');
		this.thiswdom.append(this.thisdom);
	},
	showbox:function(){
		this.colorclick = true;
		this.thisdom.fadeIn();
		if(this.seteventfn){
			this.seteventfn();
		}
		this.thisdom.find(".mynum span").html(this.myhas)
		this.thisdom.find(".unitprice span").html(this.unitprice)
	},
	seteventfn:function(){
		var _this = this;
		this.thisdom.bind('contextmenu', function(e) {
			e.preventDefault();
		});

		this.thisdom.find(".closebuydxggposflocbtn").on("touchend",function(){
			_this.thisdom.fadeOut(function(){
				_this.thisdom.html("");
			});
		});
		var bnum = Math.floor(calculationObj.div(this.myhas,this.unitprice));
		if(bnum<~~this.ggnum){
			this.ggnum = bnum
		}
		_this.changenum(this.thisdom.find(".plusbtn"),this.thisdom.find(".lessbtn"),~~this.ggnum,0,this.thisdom.find(".numinput").val()*1);
		
		this.thisdom.find(".plusbtn").on("click",function(){
			_this.changenum(_this.thisdom.find(".plusbtn"),_this.thisdom.find(".lessbtn"),~~_this.ggnum,0,calculationObj.add(_this.cnum,1));
			_this.thisdom.find(".numinput").val(_this.cnum);
		});
		this.thisdom.find(".plusbtn").longPress(function(obj){
			_this.changenum(_this.thisdom.find(".plusbtn"),_this.thisdom.find(".lessbtn"),~~_this.ggnum,0,calculationObj.add(_this.cnum,1));
			_this.thisdom.find(".numinput").val(_this.cnum);
		});
		this.thisdom.find(".lessbtn").on("click",function(){
			_this.changenum(_this.thisdom.find(".plusbtn"),_this.thisdom.find(".lessbtn"),~~_this.ggnum,0,calculationObj.sub(_this.cnum,1));
			_this.thisdom.find(".numinput").val(_this.cnum);
		});
		this.thisdom.find(".lessbtn").longPress(function(obj){
			_this.changenum(_this.thisdom.find(".plusbtn"),_this.thisdom.find(".lessbtn"),~~_this.ggnum,0,calculationObj.sub(_this.cnum,1));
			_this.thisdom.find(".numinput").val(_this.cnum);
		});
		_this.thisdom.find(".numinput").on("input propertychange",function(){
			if(!isNumber($(this).val()*1)||!decimalNumber($(this).val(),0)||$(this).val()*1>~~_this.ggnum){
				$(this).val(_this.cnum);
				return;
			}
			_this.changenum(_this.thisdom.find(".plusbtn"),_this.thisdom.find(".lessbtn"),~~_this.ggnum,0,~~$(this).val());
		})

	},
	changenum:function(jiabtn,jianbtn,maxnum,minnum,num){
		if(num<=maxnum&&num>=minnum){
			jianbtn.removeClass("disable");
			jiabtn.removeClass("disable");
			this.cnum = num*1;
		}
		if(num>=maxnum){
			this.cnum = maxnum;
			jiabtn.addClass("disable");
		}
		if(num<=minnum){
			this.cnum = minnum;
			jianbtn.addClass("disable");
		}
		// this.readchoicenum()
		this.hjfn();
	},
	hjfn:function(){
		this.hjnum = calculationObj.mul(this.cnum,this.unitprice)
		this.thisdom.find(".hjnum span").html(this.hjnum)
		if(this.cnum<=0){
			$(".buydxggposflobtn").addClass("graybtn").removeClass("yellowbtn");
			this.colorclick = false;
		}else{
			$(".buydxggposflobtn").addClass("yellowbtn").removeClass("graybtn");
			this.colorclick = true;
		}

	},
	buyendfn:function(){}
}