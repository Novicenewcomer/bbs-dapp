var pagebottomnav = {
	init:function(data){
		var _this = this;
		this.container = data.container;
		this.actype = data.type
		if(!this.thisdom){
			this.readwdom();
		}
	},
	readwdom:function(){
		this.thisdom = $('<div class="pub_bottomnav"></div>');
		this.container.append(this.thisdom);
	},
	showbox:function(){
		this.acdom = this.thisdom.find("li[itype='"+this.actype+"']");
		this.acdom.addClass("active").siblings().removeClass("active");
		this.acdom.find("a").attr("href","javascript:;")
		this.thisdom.fadeIn();
		if(this.seteventfn){
			this.seteventfn();
		}
		
	},
	seteventfn:function(){
		this.acdom.on("click",function(){
			$('.scrollw_box').animate({scrollTop: 0}, 300);
		})
	}
}