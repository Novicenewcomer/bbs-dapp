var landingfn = {
	thisnavac:"",
	thisdata:{},
	btnd:false,
	typeobj:{},
	init:function(){
		var _this = this;
		_this.typeobj["phone"] = readphoneobj;
		_this.typeobj["mailbox"] = readmailboxobj;
		for(var i in _this.typeobj){
			_this.typeobj[i].init(_this);
		}
		$(".landingnavbox li").on("click",function(){
			_this.thisnavac = $(this).attr("itype");
			$(this).addClass("active").siblings().removeClass("active");
			_this.thisdata = jQuery.extend(true, {}, _this.typeobj[_this.thisnavac].initdata); 
			_this.showconw();
		})
		$(".landingnavbox li[itype='"+_this.thisnavac+"']").click();
	},
	showconw:function(){
		$(".landingwbox .conw[itype='"+this.thisnavac+"']").show().siblings().hide();
		for(var i in this.typeobj[this.thisnavac]){
			if(i.substring(0,5)=='read_'&&(this.typeobj[this.thisnavac][i] instanceof Function) ){
				this.typeobj[this.thisnavac][i](this);
			};
		}
		this.readlandingbtn();
	},
	readlandingbtn:function(){
		var kg = true;
		this.btnd = false;
		for(var i in this.thisdata){
			if($.trim(this.thisdata[i])==""&&i!="invcode"){
				kg = false;
			}
		}
		if (!kg) {
			$(".landingbtn").addClass("graybtn").removeClass("yellowbtn");
			return false;
		}
		this.btnd = true;
		$(".landingbtn").addClass("yellowbtn").removeClass("graybtn");

	}
	
}
var readphoneobj = {
	thisdom:$(".phonecon"),
	initdata:{"telad":"+86","telnum":"","mm":""},
	eyes:[false],
	init:function(wthis){
		var _this = this;
		_this.wthis = wthis;
		this.thisdom.find(".telvalue").on("input propertychange",function(){
			_this.wthis.thisdata.telnum =$(this).val()
			_this.wthis.readlandingbtn();
		})
		this.thisdom.find(".mmvalue").on("input propertychange",function(){
			_this.wthis.thisdata.mm = $(this).val()
			_this.wthis.readlandingbtn();
		})
		this.thisdom.find(".mmeyesbtn").on("click",function(){
			_this.thisdom.find(".mmvalue").val(_this.wthis.thisdata.mm)
			if($(this).hasClass("closeeyes")){
				_this.eyes[0] = true;
			}else{
				_this.eyes[0] = false;
			}
			_this.read_eyes()
		})
	},
	read_telad:function(){
		$("#phone_teladvalue").val(this.wthis.thisdata.telad)
		this.thisdom.find(".teladlabel span").html(this.wthis.thisdata.telad)
	},
	read_telnum:function(){
		this.thisdom.find(".telvalue").val(this.wthis.thisdata.telnum)
	},
	read_mm:function(){
		this.thisdom.find(".mmvalue").val(this.wthis.thisdata.mm)
	},
	read_eyes:function(){
		this.thisdom.find(".mmvalue").hide()
		this.thisdom.find(".qrmmvalue").hide()
		this.thisdom.find(".mmeyesbtn").hide()
		this.thisdom.find(".qrmmeyesbtn").hide()
		if(this.eyes[0]){
			this.thisdom.find(".mmvalue").eq(1).show()
			this.thisdom.find(".mmeyesbtn").eq(1).show()
		}else{
			this.thisdom.find(".mmvalue").eq(0).show()
			this.thisdom.find(".mmeyesbtn").eq(0).show()
		}
	}
}
var readmailboxobj = {
	thisdom:$(".mailboxcon"),
	initdata:{"mail":"","mm":""},
	init:function(wthis){
		var _this = this;
		_this.wthis = wthis;
	},
	eyes:[false],
	init:function(wthis){
		var _this = this;
		_this.wthis = wthis;
		this.thisdom.find(".mailvalue").on("input propertychange",function(){
			_this.wthis.thisdata.mail =$(this).val()
			_this.wthis.readlandingbtn();
		})
		this.thisdom.find(".mmvalue").on("input propertychange",function(){
			_this.wthis.thisdata.mm = $(this).val()
			_this.wthis.readlandingbtn();
		})
		this.thisdom.find(".mmeyesbtn").on("click",function(){
			_this.thisdom.find(".mmvalue").val(_this.wthis.thisdata.mm)
			if($(this).hasClass("closeeyes")){
				_this.eyes[0] = true;
			}else{
				_this.eyes[0] = false;
			}
			_this.read_eyes()
		})
	},
	read_mailvalue:function(){
		this.thisdom.find(".mailvalue").val(this.wthis.thisdata.mail)
	},
	read_mm:function(){
		this.thisdom.find(".mmvalue").val(this.wthis.thisdata.mm)
	},
	read_eyes:function(){
		this.thisdom.find(".mmvalue").hide()
		this.thisdom.find(".qrmmvalue").hide()
		this.thisdom.find(".mmeyesbtn").hide()
		this.thisdom.find(".qrmmeyesbtn").hide()
		if(this.eyes[0]){
			this.thisdom.find(".mmvalue").eq(1).show()
			this.thisdom.find(".mmeyesbtn").eq(1).show()
		}else{
			this.thisdom.find(".mmvalue").eq(0).show()
			this.thisdom.find(".mmeyesbtn").eq(0).show()
		}
	}
}
var adnumdata = [
{"name":"+86","values":"中国"},
{"name":"+375","values":"白俄罗斯"},
{"name":"+993","values":"土库曼"},
{"name":"+91","values":"印度"},
{"name":"+960","values":"马尔代夫"},
{"name":"+370","values":"立陶宛"},
{"name":"+376","values":"安道尔共和国"},
{"name":"+1","values":"加拿大"},
{"name":"+254","values":"肯尼亚"},
{"name":"+1","values":"美国"},
{"name":"+992","values":"塔吉克"},
{"name":"+55","values":"巴西"},
{"name":"+53","values":"古巴"},
{"name":"+382","values":"黑山共和国"},
{"name":"+92","values":"巴基斯坦"},
{"name":"+380","values":"乌克兰"},
{"name":"+389","values":"马其顿"},
{"name":"+1242","values":"巴哈马"},
{"name":"+387","values":"波斯尼亚和黑塞哥维那"},
{"name":"+5","values":"福克兰群岛"},
{"name":"+962","values":"约旦"},
{"name":"+1664","values":"蒙特塞拉特"},
{"name":"+680","values":"帛琉"},
{"name":"+63","values":"菲律宾共和国"},
{"name":"+66","values":"泰国"},
{"name":"+381","values":"塞尔维亚共和国"},
{"name":"+381","values":"南斯拉夫"},
{"name":"+54","values":"阿根廷"},
{"name":"+45","values":"丹麦"},
{"name":"+45","values":"格陵兰"},
{"name":"+386","values":"斯洛文尼亚"},
{"name":"+57","values":"哥伦比亚"},
{"name":"+973","values":"巴林"},
{"name":"+972","values":"以色列"},
{"name":"+595","values":"巴拉圭"},
{"name":"+58","values":"委内瑞拉"},
{"name":"+350","values":"直布罗陀"},
{"name":"+260","values":"赞比亚"},
{"name":"+355","values":"阿尔巴尼亚"},
{"name":"+501","values":"伯利兹城"},
{"name":"+1441","values":"百慕大"},
{"name":"+673","values":"文莱达鲁萨兰国"},
{"name":"+226","values":"布基纳法索"},
{"name":"+240","values":"赤道几内亚"},
{"name":"+251","values":"埃塞俄比亚"},
{"name":"+298","values":"法罗群岛"},
{"name":"+504","values":"洪都拉斯"},
{"name":"+7","values":"哈萨克"},
{"name":"+996","values":"吉尔吉斯"},
{"name":"+356","values":"马尔他"},
{"name":"+52","values":"墨西哥"},
{"name":"+48","values":"波兰"},
{"name":"+7","values":"俄罗斯联邦"},
{"name":"+677","values":"索罗门群岛"},
{"name":"+27","values":"南非"},
{"name":"+94","values":"斯里兰卡"},
{"name":"+7","values":"阿布哈兹"},
{"name":"+7","values":"南奥赛梯"},
{"name":"+241","values":"加蓬"},
{"name":"+223","values":"马里"},
{"name":"+968","values":"阿曼"},
{"name":"+966","values":"沙特阿拉伯"},
{"name":"+62","values":"印度尼西亚"},
{"name":"+51","values":"秘鲁"},
{"name":"+250","values":"卢旺达"},
{"name":"+1787","values":"波多黎各"},
{"name":"+248","values":"塞舌尔"},
{"name":"+855","values":"柬埔寨"},
{"name":"+971","values":"阿拉伯联合酋长国"},
{"name":"+236","values":"中非共和国"},
{"name":"+682","values":"库克群岛"},
{"name":"+220","values":"冈比亚"},
{"name":"+961","values":"黎巴嫩"},
{"name":"+266","values":"莱索托"},
{"name":"+352","values":"卢森堡"},
{"name":"+351","values":"葡萄牙"},
{"name":"+263","values":"津巴布韦"},
{"name":"+852","values":"中国香港"},
{"name":"+374","values":"亚美尼亚"},
{"name":"+235","values":"乍得"},
{"name":"+354","values":"冰岛"},
{"name":"+423","values":"列支敦士登"},
{"name":"+261","values":"马达加斯加"},
{"name":"+505","values":"尼加拉瓜"},
{"name":"+970","values":"巴勒斯坦"},
{"name":"+675","values":"巴布亚新几内亚"},
{"name":"+268","values":"斯威士兰"},
{"name":"+65","values":"新加坡"},
{"name":"+974","values":"卡塔尔"},
{"name":"+228","values":"多哥"},
{"name":"+506","values":"哥斯达黎加"},
{"name":"+967","values":"也门"},
{"name":"+44","values":"英国"},
{"name":"+44","values":"泽西岛"},
{"name":"+1767","values":"多米尼克国"},
{"name":"+599","values":"荷兰安的列斯群岛"},
{"name":"+886","values":"中国台湾"},
{"name":"+1758","values":"圣卢西亚岛"},
{"name":"+1264","values":"安圭拉岛"},
{"name":"+1268","values":"安提瓜和巴布达"},
{"name":"+297","values":"阿鲁巴"},
{"name":"+1246","values":"巴巴多斯"},
{"name":"+1345","values":"开曼群岛"},
{"name":"+20","values":"埃及"},
{"name":"+503","values":"萨尔瓦多"},
{"name":"+1473","values":"格林纳达"},
{"name":"+1876","values":"牙买加"},
{"name":"+265","values":"马拉维"},
{"name":"+377","values":"摩纳哥"},
{"name":"+976","values":"外蒙古"},
{"name":"+258","values":"莫桑比克"},
{"name":"+674","values":"瑙鲁"},
{"name":"+234","values":"尼日利亚"},
{"name":"+507","values":"巴拿马"},
{"name":"+1868","values":"特立尼达和多巴哥"},
{"name":"+1809","values":"土克斯及开科斯群岛"},
{"name":"+1340","values":"维尔京群岛(美国)"},
{"name":"+1869","values":"圣基茨和尼维斯"},
{"name":"+1784","values":"圣文森特和格林纳丁斯"},
{"name":"+1670","values":"北马里亚纳群岛"},
{"name":"+61","values":"澳大利亚"},
{"name":"+61","values":"圣延岛"},
{"name":"+61","values":"科科斯群岛"},
{"name":"+49","values":"德国"},
{"name":"+371","values":"拉脱维亚"},
{"name":"+421","values":"斯洛伐克（斯洛伐克人的共和国）"},
{"name":"+592","values":"圭亚那"},
{"name":"+218","values":"利比亚"},
{"name":"+850","values":"朝鲜"},
{"name":"+47","values":"挪威"},
{"name":"+82","values":"韩国"},
{"name":"+598","values":"乌拉圭"},
{"name":"+856","values":"老挝"},
{"name":"+56","values":"智利"},
{"name":"+264","values":"那米比亚"},
{"name":"+262","values":"马约特"},
{"name":"+262","values":"留尼汪岛"},
{"name":"+244","values":"安哥拉"},
{"name":"+41","values":"瑞士"},
{"name":"+32","values":"比利时"},
{"name":"+679","values":"斐济"},
{"name":"+233","values":"加纳"},
{"name":"+853","values":"中国澳门"},
{"name":"+60","values":"马来西亚"},
{"name":"+212","values":"摩洛哥"},
{"name":"+676","values":"汤加"},
{"name":"+678","values":"瓦努阿图"},
{"name":"+84","values":"越南"},
{"name":"+81","values":"日本"},
{"name":"+269","values":"科摩罗"},
{"name":"+420","values":"捷克"},
{"name":"+30","values":"希腊"},
{"name":"+353","values":"爱尔兰"},
{"name":"+39","values":"意大利"},
{"name":"+965","values":"科威特"},
{"name":"+39","values":"梵蒂冈(罗马教廷)"},
{"name":"+229","values":"贝宁"},
{"name":"+237","values":"喀麦隆"},
{"name":"+225","values":"Cote D'Ivoire"},
{"name":"+385","values":"克罗地亚"},
{"name":"+372","values":"爱沙尼亚"},
{"name":"+502","values":"危地马拉"},
{"name":"+245","values":"几内亚比绍"},
{"name":"+691","values":"密克罗尼西亚"},
{"name":"+685","values":"美属萨摩亚"},
{"name":"+597","values":"苏里南"},
{"name":"+685","values":"西撒哈拉"},
{"name":"+239","values":"圣多美和普林西比"},
{"name":"+211","values":"南苏丹共和国"},
{"name":"+358","values":"芬兰"},
{"name":"+242","values":"刚果"},
{"name":"+36","values":"匈牙利"},
{"name":"+880","values":"孟加拉国"},
{"name":"+357","values":"塞浦路斯"},
{"name":"+6723","values":"诺福克岛"},
{"name":"+221","values":"塞内加尔"},
{"name":"+46","values":"瑞典"},
{"name":"+684","values":"萨摩亚"},
{"name":"+33","values":"法国"},
{"name":"+33","values":"法国大都会"},
{"name":"+998","values":"乌兹别克斯坦"},
{"name":"+689","values":"法属玻里尼西亚"},
{"name":"+267","values":"博茨瓦纳"},
{"name":"+509","values":"海地"},
{"name":"+964","values":"伊拉克"},
{"name":"+31","values":"荷兰"},
{"name":"+378","values":"圣马力诺共和国"},
{"name":"+591","values":"玻利维亚"},
{"name":"+687","values":"新喀里多尼亚"},
{"name":"+373","values":"摩尔多瓦"},
{"name":"+977","values":"尼泊尔"},
{"name":"+216","values":"突尼斯"},
{"name":"+43","values":"奥地利"},
{"name":"+359","values":"保加利亚"},
{"name":"+252","values":"索马里"},
{"name":"+963","values":"叙利亚"},
{"name":"+90","values":"土耳其"},
{"name":"+213","values":"阿尔及利亚"},
{"name":"+238","values":"佛得角"},
{"name":"+231","values":"利比里亚"},
{"name":"+95","values":"缅甸"},
{"name":"+64","values":"新西兰"},
{"name":"+64","values":"皮特凯恩岛"},
{"name":"+34","values":"西班牙"},
{"name":"+253","values":"吉布提"},
{"name":"+243","values":"刚果民主共和国"},
{"name":"+93","values":"阿富汗"},
{"name":"+975","values":"不丹"},
{"name":"+246","values":"英属印度洋领地"},
{"name":"+257","values":"布隆迪"},
{"name":"+670","values":"东帝汶"},
{"name":"+995","values":"格鲁吉亚"},
{"name":"+224","values":"几内亚"},
{"name":"+98","values":"伊朗（伊斯兰共和国）"},
{"name":"+222","values":"毛里塔尼亚"},
{"name":"+230","values":"毛里求斯"},
{"name":"+40","values":"罗马尼亚"},
{"name":"+232","values":"塞拉利昂"},
{"name":"+249","values":"苏丹"},
{"name":"+255","values":"坦桑尼亚"},
{"name":"+994","values":"阿塞拜疆"},
{"name":"+227","values":"尼日尔"},
{"name":"+593","values":"厄瓜多尔"},
{"name":"+594","values":"法属圭亚那"},
{"name":"+590","values":"瓜德罗普岛"},
{"name":"+1671","values":"关岛"},
{"name":"+596","values":"马提尼克岛"},
{"name":"+590","values":"圣马丁岛"},
{"name":"+256","values":"乌干达"},
{"name":"+291","values":"厄立特里亚国"},
{"name":"+692","values":"马绍尔群岛"},
{"name":"+690","values":"托克劳"},
{"name":"+688","values":"图瓦卢"},
{"name":"+681","values":"沃利斯和富图纳群岛"},
{"name":"+672","values":"南极洲"},
{"name":"+1849","values":"多米尼加共和国"},
{"name":"+1284","values":"维尔京群岛(英国)"},
{"name":"+441481","values":"格恩西岛"}
];
var phonead=$('.phone_teladvalue').mPicker({
	level:1,
	dataJson:adnumdata,
	Linkage:false,
	rows:6,
	idDefault:true,
	header:'<div class="mPicker-header">请选择地区</div>',
	confirm:function(json){
		landingfn.thisdata.telad = json.name;
		readphoneobj.read_telad(landingfn);
	},
	cancel:function(json){
	}
})
