var lotteryhistoryfn= {
	page:1,
	thiswdom:null,
	init:function(opt){
		var _this = this;
		this.thiswdom = opt.container;
		if(!this.thisdom){
			this.readwdom();
		}
	},
	readwdom:function(){
		this.thisdom = $('<div class="lotteryhistoryflobox"></div>');
		this.thiswdom.append(this.thisdom);
	},
	showbox:function(){
		this.movekg = true;
		this.thisdom.fadeIn();
		if(this.seteventfn){
			this.seteventfn();
		}
	},
	seteventfn:function(){
		var _this = this;
		this.thisdom.find(".lhflo_turnpagebtn").on("touchend",function(){
			_this.thisdom.fadeOut(function(){
				_this.thisdom.html("");
			});
		});
		this.thisdom.on("click",".titbox",function(){
			var sibele = $(this).siblings();
			if(sibele.is(':hidden') && sibele.find('li').length>0){
				$(".lhflo_conul").slideUp();
				sibele.slideDown();
			}else if(!sibele.is(':hidden')){
				$(".lhflo_conul").slideUp();
			}
		})
		this.thisdom.find(".lhflo_scrollwbox").scroll(function(){
			if(_this.thisdom.find(".lhflo_scrollwcon").outerHeight()-$(this).height()<=$(this).scrollTop()+1){
		 		if(_this.movekg===true){
					_this.page++;
					_this.movekg=false;
					_this.readlistpage();
				};
		 	}
		});
	}
}