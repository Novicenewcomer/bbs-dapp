var treeObja = {
	init:function(data){
		this.alldata = data;
		this.trunkCanvas = document.getElementById("trunk");
		this.trunkCanvas.width = $(".canvastreebg").outerWidth();
		this.trunkCanvas.height = $(".canvastreebg").outerHeight(); ;
		this.trunkC = this.trunkCanvas.getContext("2d");
		
		this.crownCanvas = document.getElementById("crown");
		this.crownCanvas.width = $(".canvastreebg").outerWidth();
		this.crownCanvas.height = $(".canvastreebg").outerHeight(); ;
		this.crownC = this.crownCanvas.getContext("2d");
		
		this.rendering();
	},
	rendering:function(){
		this.trunkC.clearRect(0,0,660,660);
		this.crownC.clearRect(0,0,660,660);
		for(var i in this){
			if(i.substring(0,5)=="init_"&& typeof this[i] === "function"){
				this[i]()
			}
		}
		this.initsava()
	},
	init_treebg:function(){//背景颜色
		$(".canvastreebg").css({"background":allcode.bgc_d[this.alldata.bc]["b"]});
		$(".canvastreebg .treeshadow").css({"background":allcode.bgc_d[this.alldata.bc]["s"]});
	},
	init_treebgzs:function(){//背景装饰
		$(".treepage").css({"background-image":"url("+allcode.bgzs_d[this.alldata.bgzs]+")"});
	},
	init_treetks:function(){//树干外形 树干颜色
		var _this = this;
		var svg_xml1 =$(allcode.tks_d[this.alldata.tks]['s']);
		svg_xml1.find("path").attr("fill",allcode.tkc_d[this.alldata.tkc]['c'])
		var svg_img = new Image();
		svg_img.src =  "data:image/svg+xml;base64," + window.btoa(svg_xml1.prop("outerHTML"));
		svg_img.onload = function () {
			_this.trunkC.drawImage(svg_img,0, 0,$(".canvastreebg").outerWidth(),$(".canvastreebg").outerHeight());
			_this.trunkC.globalCompositeOperation="source-atop";
			_this.kskin()
		}
	},
	init_treeqjzs:function(){//背景装饰
		$(".treeqjbox").css({"background-image":"url("+allcode.qjzs_d[this.alldata.qjzs]+")"});
	},
	treetks_bk:function(){
		var _this = this;
		var svg_xml1 =$(allcode.tks_d[this.alldata.tks]['s']);
		var svg_img = new Image();
		svg_img.src =  "data:image/svg+xml;base64," + window.btoa(svg_xml1.prop("outerHTML"));
		svg_img.onload = function () {
			_this.trunkC.drawImage(svg_img,0, 0,$(".canvastreebg").outerWidth(),$(".canvastreebg").outerHeight());
			_this.trunkC.globalCompositeOperation="source-over";
		}
	},
	kskin:function(){//树干皮肤
		var _this = this;
		var svg_xml1 =$(allcode.kskin_d[this.alldata.kskin]['s']);
		var svg_img = new Image();
		svg_img.src =  "data:image/svg+xml;base64," + window.btoa(svg_xml1.prop("outerHTML"));
		svg_img.onload = function () {
			_this.trunkC.drawImage(svg_img,0, 0,$(".canvastreebg").outerWidth(),$(".canvastreebg").outerHeight());
			_this.treetks_bk()
		}
	},
	init_treetcs:function(){//树冠外形 树冠颜色
		var _this = this;
		var svg_xml1 =$(allcode.tcs_d[this.alldata.tcs]['s']);
		svg_xml1.find("*").attr("fill",allcode.tcc_d[this.alldata.tcc]['c'])
		var svg_img = new Image();
		svg_img.src =  "data:image/svg+xml;base64," + window.btoa(svg_xml1.prop("outerHTML"));
		svg_img.onload = function () {
			_this.crownC.drawImage(svg_img,0, 0,$(".canvastreebg").outerWidth(),$(".canvastreebg").outerHeight());
			_this.crownC.globalCompositeOperation="source-atop";
			_this.cskin()
		}
	},
	treetcs_bk:function(){
		var _this = this;
		var svg_xml1 =$(allcode.tcs_d[this.alldata.tcs]['s']);
		var svg_img = new Image();
		svg_img.src =  "data:image/svg+xml;base64," + window.btoa(svg_xml1.prop("outerHTML"));
		svg_img.onload = function () {
			_this.crownC.drawImage(svg_img,0, 0,$(".canvastreebg").outerWidth(),$(".canvastreebg").outerHeight());
			_this.crownC.globalCompositeOperation="source-over";
		}
	},
	cskin:function(){//树冠皮肤
		var _this = this;
		var svg_xml1 =$(allcode.cskin_d[this.alldata.cskin]['s']);
		var svg_img = new Image();
		svg_img.src =  "data:image/svg+xml;base64," + window.btoa(svg_xml1.prop("outerHTML"));
		svg_img.onload = function () {
			_this.crownC.drawImage(svg_img,0, 0,$(".canvastreebg").outerWidth(),$(".canvastreebg").outerHeight());
			_this.treetcs_bk()
		}
	},
}
var treeObj = {
	alldata:null,
	startbranch:[],
	svgimg:{},
	svgimgindex:[],
	flowerColor:[],
	fwround:{center:0,r:0},
	init:function(obj,data){
		this.setdata = data;
		var _this = this;
		this.alldata = obj;
		$.extend(this,Basicshapeobj);
		this.maintreeObj = maintreeObj;
		this.treeCanvas = document.getElementById("tree");
		this.treeCanvas.width = 660;
		this.treeCanvas.height = 660 ;
		this.tCxt = this.treeCanvas.getContext("2d");
		this.canvas = document.getElementById("canvas");
		this.canvas.width = 660;
		this.canvas.height = 660 ;
		this.cxt = this.canvas.getContext("2d");
		
		this.flowerList = [];
		this.rootTop = this.canvas.height;
		
		this.fallList = [];
		this.g = 0.01 ;
		this.gWind = 0.005;
		this.limitSpeedY = 1;
		var limitSpeedX = 1 ;
		
		this.cxt.shadowColor= "#FFF" ;
		this.cxt.shadowBlur = 5 ;
		//给树顶装饰
		if(this.alldata.zs==0||this.alldata.zs){
			this.tophatimgdom =new Image();
			this.tophatimgdom.src =treehattopshape[this.alldata.zs];
			
			this.tophatimgdom.onload = function () {
				_this.settree();
			}
		}else{
			_this.settree();
		}
	},
	settree:function(){
		for(var i in this){
			if(i.substring(0,5)=="init_"&& typeof this[i] === "function"){
				this[i]()
			}
		}
	},
	init_treebg:function(){//背景颜色
		$(this.treeCanvas).css({"background":this.alldata.bc});
	},
	init_leaves:function(){
		var _this = this;
		var thisimg = 0;
		for(var i in this.alldata.lvs){
			this.flowerColor[i] = this.alldata.lvs[i].c;
			this.svgimg[this.alldata.lvs[i].c]=[];
			for(var j in this.alldata.lvsp){
				var svg_xml1 =$(treeallshape[this.alldata.lvsp[j]]);
				var tmp_img = new Image();
				this.svgimg[this.alldata.lvs[i].c].push(tmp_img)
				this.svgimgindex.push(tmp_img);
				svg_xml1.find("*").attr("fill",this.flowerColor[i])
				this.svgimg[this.alldata.lvs[i].c][j].src = "data:image/svg+xml;base64," + window.btoa(svg_xml1.prop("outerHTML"));
				this.svgimg[this.alldata.lvs[i].c][j].onload = function () {
					thisimg++;
					if(thisimg==_this.alldata.lvs.length*_this.alldata.lvsp.length){
						if(!_this.alldata.t.b){
							_this.alldata.t.b = {};
							_this.initmaintree();
							_this.alldata.t.ln = _this.leavesnum;
							_this.yzinnum = [];
							var cindex = 0;
		        			for(var xi in _this.svgimg){
		        				var thismax = Math.round(_this.alldata.lvs[cindex].p*_this.alldata.t.ln);
		        				for(var yi=0;yi<thismax;yi++){
									_this.yzinnum.push({"img":_this.svgimg[xi],"color":xi})
								}
								cindex++;
							}
		        			_this.tCxt.globalAlpha = 1;
		        			_this.showtophat();
							_this.setdata.showBranchend();
							_this.leavesinit();
						}else{
							_this.yzinnum = [];
							var cindex = 0;
		        			for(var xi in _this.svgimg){
		        				var thismax = Math.round(_this.alldata.lvs[cindex].p*_this.alldata.t.ln);
								for(var yi=0;yi<thismax;yi++){
									_this.yzinnum.push({"img":_this.svgimg[xi],"color":xi})
								}
								cindex++;
							}
		        			_this.maintree = {
								mx_l:_this.canvas.width/2-_this.alldata.t.tm.w/2,
								mx_r:_this.canvas.width/2+_this.alldata.t.tm.w/2,
								lefty:_this.canvas.height,
								righty:_this.canvas.height
							};
		        			_this.readmaintree();
						}
						_this.len = _this.flowerList.length ;
						requestAnimationFrame(_this.step);
						_this.setdata.endfn();
						if(_this.setdata.status=="init"){
							_this.initsava();
						}
					}
				}
			}
		}
	},
	initmaintree:function(){//树主干
		
		this.tCxt.beginPath();
		this.initmaintreetop(this.canvas.width/2,this.rootTop,-Math.PI/2,30)
		this.maintreecenter();
	},
	readmaintree:function(){
		this.tCxt.beginPath();
		this.smdraw_triangle(
			this.tCxt,
			this.maintree.mx_l,
			this.maintree.lefty,
			this.maintree.mx_r,
			this.maintree.righty,
			this.alldata.t.tm.tx,
			this.alldata.t.tm.ty,
			this.alldata.tc,
			"fill"
		);
		for(var i=0;i<this.alldata.t.tm.tj.length;i++){
			this.smdraw_round(
				this.tCxt,
				this.alldata.t.tm.tj[i].x,
				this.alldata.t.tm.tj[i].y,
				this.alldata.t.tm.tj[i].r,
				0,
				360,
				this.alldata.tc,
				"fill",
				1
			);
		}
		for(var i in this.alldata.t.b){
			for(var j in this.alldata.t.b[i]){
				this.drawTree(this.alldata.t.b[i][j]);
			}
			if(!this.endpos){
				this.endpos =[]
			}
			var thisssposdata = this.alldata.t.b[i][this.alldata.t.b[i].length-1];
			this.endpos.push({
				x:thisssposdata.x,
				y:thisssposdata.y,
				type:i
			})				
		}
		for(var i in this.alldata.t.tm.mst){
			this.tCxt.globalCompositeOperation="source-atop";
			this.maintreeObj[this.alldata.t.tm.ms].read(this,i);
		}
		this.tCxt.globalAlpha = 1;
		this.showtophat();
		this.setdata.showBranchend();
		var windex = 0;
		for(var i in this.alldata.t.b){			
			for(var j in this.alldata.t.b[i]){
                                windex++;
				this.readinit(this.alldata.t.b[i][j],windex);
			}
		}
	},
	showtophat:function(){
		if(this.alldata.zs==0||this.alldata.zs){
			this.tCxt.globalCompositeOperation="source-over";
	    	this.tCxt.drawImage(this.tophatimgdom,this.alldata.t.tm.tx-40, this.alldata.t.tm.ty-40,80,80);
    	}
	},
	initmaintreetop:function(x,y,deg,step){
		var deg1 = step%2 == 0 ? 0.1 : -0.1 ;
		var x1 = x  + Math.cos(deg+deg1) * (step+4) * this.alldata.t.tm.h ;
		var y1 = y + Math.sin(deg+deg1) * (step-1) * this.alldata.t.tm.h ;
		var treeleftsjnum=Math.round(Math.random()*1+2);//左枝干
		var treerightsjnum=Math.round(Math.random()*1+2);;//右枝干
		step -- ;
		if(step > 0){
			this.initmaintreetop(x1,y1,deg,step);
			if(step%treerightsjnum == 1 && step > 0 && step < 30){
				this.initbranches(x1,y1,deg+0.2 + 0.3 * Math.random(),Math.round(step/this.treerightjd))
			}
			if(step%treeleftsjnum== 0 && step > 0 && step < 30){
				this.initbranches(x1,y1,deg-0.2 - 0.3 * Math.random(),Math.round(step/this.treeleftjd));
			}
		}else{
			this.maintree = {
				mx_l:this.canvas.width/2-this.alldata.t.tm.w/2,
				mx_r:this.canvas.width/2+this.alldata.t.tm.w/2,
				lefty:this.canvas.height,
				righty:this.canvas.height
			};
			this.alldata.t.tm.ty = Math.round(y);
		}
	},
	initbranches:function(x,y,deg,step){//树枝 
		var deg1 = step%2 == 0 ? 0.1 : -0.1 ;
		var x1 = x + Math.cos(deg+deg1) * (step+4) * this.alldata.t.tm.h;
		var y1 = y + Math.sin(deg+deg1) * (step-1) * this.alldata.t.tm.h ;
		this.startbranch.push({
			x:x,
			y:y,
			x1:x1,
			y1:y1,
			step:step-1,
			deg:deg
		})
	},
	maintreecenter:function(){
		this.smdraw_triangle(
			this.tCxt,
			this.maintree.mx_l,
			this.canvas.height,
			this.maintree.mx_r,
			this.canvas.height,
			this.alldata.t.tm.tx,
			this.alldata.t.tm.ty,
			this.alldata.tc,
			"fill"
		);
		var treesg_num = this.alldata.t.tm.tj.length;
		var treesg_h = (this.maintree.righty - this.alldata.t.tm.ty)/treesg_num;
		var thissg_x = this.maintree.mx_l+(this.maintree.mx_r-this.maintree.mx_l)/2
		var thissg_y = this.maintree.lefty
		var thissg_x1 = this.maintree.mx_l;
		var thissg_x2 = this.maintree.mx_r;
		var thissg_y3 =	this.maintree.righty-treesg_h;
		var thissg_x3 = this.alldata.t.tm.tx+(thissg_y3-this.alldata.t.tm.ty)*(this.maintree.mx_r-this.alldata.t.tm.tx)/(this.maintree.righty-this.alldata.t.tm.ty);
		var thissg_y4 =	this.maintree.lefty-treesg_h;
		var thissg_x4 = this.alldata.t.tm.tx+(thissg_y4-this.alldata.t.tm.ty)*(this.maintree.mx_l-this.alldata.t.tm.tx)/(this.maintree.lefty-this.alldata.t.tm.ty);
		for(var i =0;i<treesg_num;i++){//树结
			var thisr = Math.round((thissg_x2-thissg_x1)/2+Math.round(Math.random()*3+2));
			this.smdraw_round(
				this.tCxt,
				thissg_x,
				thissg_y,
				thisr,
				0,
				360,
				this.alldata.tc,
				"fill",
				1
			);
			this.alldata.t.tm.tj[i] = {
				x:thissg_x,
				y:thissg_y,
				r:thisr
			};
			thissg_x = Math.round(thissg_x4+(thissg_x3-thissg_x4)/2);
			thissg_y = Math.round(thissg_y-treesg_h);
			thissg_x1 = thissg_x4;
			thissg_x2 = thissg_x3;
			thissg_y3 =	thissg_y3-treesg_h;
			thissg_x3 = this.alldata.t.tm.tx+(thissg_y3-this.alldata.t.tm.ty)*(this.maintree.mx_r-this.alldata.t.tm.tx)/(this.maintree.righty-this.alldata.t.tm.ty);
			thissg_y4 =	thissg_y4-treesg_h;
			thissg_x4 = this.alldata.t.tm.tx+(thissg_y4-this.alldata.t.tm.ty)*(this.maintree.mx_l-this.alldata.t.tm.tx)/(this.maintree.lefty-this.alldata.t.tm.ty);
		};
		for(var i in this.startbranch){
			if(this.startbranch[i].x1>this.canvas.width/2){
				var thismax = this.alldata.t.tm.tx+(this.startbranch[i].y-this.alldata.t.tm.ty)*(this.maintree.mx_r-this.alldata.t.tm.tx)/(this.maintree.righty-this.alldata.t.tm.ty)-4;
				var thisx =Math.round(Math.random()*(thismax-this.alldata.t.tm.tx)+this.alldata.t.tm.tx);
			}else{
				var thismin = this.alldata.t.tm.tx+(this.startbranch[i].y-this.alldata.t.tm.ty)*(this.maintree.mx_l-this.alldata.t.tm.tx)/(this.maintree.lefty-this.alldata.t.tm.ty)+4
				var thisx =Math.round(Math.random()*(this.alldata.t.tm.tx-thismin)+thismin);
			}
			var thisx1 = this.startbranch[i].x1+(thisx - this.startbranch[i].x);
			if(!this.alldata.t.b[i]){
				this.alldata.t.b[i]=[]
			}
			var thisd = {
				"x":Math.round(thisx),
				"y":Math.round(this.startbranch[i].y),
				"x1":Math.round(thisx1),
				"y1":Math.round(this.startbranch[i].y1),
				"w":this.startbranch[i].step/2,
				"c":this.alldata.tc
			}
			this.smdraw_line(this.tCxt,thisd.w,thisd.x,thisd.y,thisd.x1,thisd.y1,thisd.c,1,"round",i);
			this.alldata.t.b[i].push(thisd);
			this.initallbranches(thisx1,this.startbranch[i].y1,this.startbranch[i].deg,this.startbranch[i].step,i);
		}
		this.alldata.t.tm.mst = [];
		this.maintreeObj[this.alldata.t.tm.ms].init(this,this.canvas.height,this.maintree.mx_l,this.maintree.mx_r);
	},
	initallbranches:function(x,y,deg,step,itype){
		var deg1 = step%2 == 0 ? 0.1 : -0.1 ;
		var x1 = x + Math.cos(deg+deg1) * (step+4) * this.alldata.t.tm.h ;
		var y1 = y + Math.sin(deg+deg1) * (step-1) * this.alldata.t.tm.h ;
		var thiscolor = (step > 5 ) ? this.alldata.tc : this.flowerColor[Math.round(Math.random()+0.2)];
		
		var thisarr = {
			"x":Math.round(x),
			"y":Math.round(y),
			"x1":Math.round(x1),
			"y1":Math.round(y1),
			"w":step/2,
			"c":thiscolor
		};
		this.smdraw_line(this.tCxt,thisarr.w,thisarr.x,thisarr.y,thisarr.x1,thisarr.y1,thisarr.c,1,"round");
		if(step < 3 || (step < 23 && Math.random() > 0.1)){
			if(step%this.leafnum==0){
				var sjindex = Math.round(Math.random()*(this.alldata.lvs.length-1)+1)-1;
				var thisshape = Math.round(Math.random()*(this.alldata.lvsp.length-1)+1)-1;//随机形状
				var color = this.flowerColor[sjindex] ;
				var r = 2+Math.random()*2;
				var imgx = x1-Math.random()*3;
				var imgy = y1+Math.random()*3;
				var leafwh = Math.round(Math.random()*45+12);//叶子大小
		        if(!this.leavesnum){
		        	this.leavesnum = 1
		        }else{
		        	this.leavesnum++;
		        }
				this.flowerList.push({x:x,y:y,sx:(Math.random()-0.5),sy:0,color:color,r:r,deg:deg});
				thisarr.lf = {
					"x":Math.round(imgx),
					"y":Math.round(imgy),
					"w":leafwh,
					"s":thisshape,
					"r":Math.round(Math.random()*360+0)
				};
			}
		}
		if(!this.alldata.t.b[itype]){
			this.alldata.t.b[itype]=[]
		}
		this.alldata.t.b[itype].push(thisarr);
		step--;
		if(step>0){
			var treeleftsjnum=Math.round(Math.random()*1+3);//左枝干
			var treerightsjnum=Math.round(Math.random()*1+3);//右枝干
			this.initallbranches(x1,y1,deg,step,itype);
			if(step%treerightsjnum == 1 && step > 0 && step < 30){
				var thisnum = parseFloat((itype+"").substr((itype+"").lastIndexOf("_")+1));
				itype=itype+"_"+(thisnum+step);
				this.initallbranches(x1,y1,deg+0.2 + 0.3 * Math.random(),Math.round(step/this.treerightjd),itype);
			}
			if(step%treeleftsjnum== 0 && step > 0 && step < 30){
				var thisnum = parseFloat((itype+"").substr((itype+"").lastIndexOf("_")+1));
				itype=itype+"_"+(thisnum+step);
				this.initallbranches(x1,y1,deg-0.2 - 0.3 * Math.random(),Math.round(step/this.treeleftjd),itype);
			}
		}
		if(step<=0){//树梢
			if(!this.endpos){
				this.endpos =[]
			}
			this.endpos.push({
				x:x1,
				y:y1,
				type:itype
			})
		}
	},
	step:function (){
		if(Math.random() > 0.3)	treeObj.fallList.push(treeObj.flowerList[Math.floor(Math.random()*treeObj.len)]);
		treeObj.cxt.clearRect(0,0,canvas.width,canvas.height);
		for(var i = 0 ;i < treeObj.fallList.length ; i ++){
			if(treeObj.fallList[i].sy < treeObj.limitSpeedY) treeObj.fallList[i].sy += treeObj.g ;
			treeObj.fallList[i].sx += treeObj.gWind ;
			treeObj.fallList[i].x += treeObj.fallList[i].sx ;
			treeObj.fallList[i].y += treeObj.fallList[i].sy ;
			if(treeObj.fallList[i].y > treeObj.canvas.height){
				treeObj.fallList.splice(i,1);
				i -- ;
				continue ;
			}
			treeObj.cxt.beginPath();
			treeObj.cxt.fillStyle = treeObj.fallList[i].color ;
			treeObj.fallList[i].deg += treeObj.fallList[i].sx*0.05 ;
			
			treeObj.cxt.arc(treeObj.fallList[i].x,treeObj.fallList[i].y,treeObj.fallList[i].r,treeObj.fallList[i].deg,treeObj.fallList[i].deg+Math.PI*1.3);
			treeObj.cxt.fill();
		}
		requestAnimationFrame(treeObj.step);
	},
	leavesinit:function(){
		var cs = 0;
		for(var i in this.alldata.t.b){
			for(var j in this.alldata.t.b[i]){
				if(this.alldata.t.b[i][j].lf){
					var irthis = this.alldata.t.b[i][j].lf;
					this.tCxt.globalCompositeOperation="source-over";
					if(this.yzinnum.length<1){
						return
					}
					var sjindex = Math.round(Math.random()*(this.yzinnum.length-1)+1)-1;
					this.alldata.t.b[i][j].lf.c = this.yzinnum[sjindex].color;
					var xzcolor = this.yzinnum[sjindex].img[irthis.s];
					this.selfrotate(this.tCxt,irthis.x+(irthis.w/2),irthis.y+(irthis.w/2),irthis.r);
					this.tCxt.drawImage(xzcolor,irthis.x,irthis.y,irthis.w,irthis.w);
					this.yzinnum.splice(sjindex,1)
					this.selfrotate(this.tCxt,irthis.x+(irthis.w/2),irthis.y+(irthis.w/2),-irthis.r)
				}
			}
		}
	},
	drawTree:function (data){
		var x1 = data.x1;
		var y1 = data.y1;
		this.tCxt.beginPath();
		this.smdraw_line(this.tCxt,data.w,data.x,data.y,x1,y1,data.c,1,"round");
		this.tCxt.stroke();
	},
	readinit:function(data,index){
		if(data.lf){
			if(this.yzinnum.length<1){
				return
			}
			var sjindex = Math.round(Math.random()*(this.yzinnum.length-1)+1)-1;
			var colorsjindex = Math.round(Math.random()*(this.alldata.lvs.length-1)+1)-1;
			var color = this.flowerColor[colorsjindex];
			var r = 2+Math.random()*2;
                        var xzcolor = null;
			if(this.svgimg[data.lf.c]){
				xzcolor = this.svgimg[data.lf.c][data.lf.s];//固定
			}
                        if(!xzcolor){
				xzcolor = this.svgimgindex[index%this.svgimgindex.length];//重置树叶图片比例
			}
			this.tCxt.globalCompositeOperation="source-over";
			var imgx = data.lf.x;
			var imgy = data.lf.y;
			var leafwh = data.lf.w;
			this.tCxt.globalAlpha = 1;
			this.selfrotate(this.tCxt,imgx+(leafwh/2),imgy+(leafwh/2),data.lf.r)
	        this.tCxt.drawImage(xzcolor,imgx, imgy,leafwh,leafwh);
	        this.selfrotate(this.tCxt,imgx+(leafwh/2),imgy+(leafwh/2),-data.lf.r)
			this.flowerList.push({x:data.x,y:data.y,sx:(Math.random()-0.5),sy:0,color:color,r:r,deg:-Math.PI/2});
			this.yzinnum.splice(sjindex,1)
		}
	},
	selfrotate:function (obj,x,y,deg){
	    obj.translate(x,y);//将绘图原点移到画布中点
	    obj.rotate((Math.PI/180)*deg);//旋转角度
	    obj.translate(-x,-y);//将画布原点移动   
	}
}
var Basicshapeobj = {
	smdraw_rectangle:function(ctx,x,y,width,height,radius,color,type,opacity){
		ctx.beginPath();
		ctx.lineWidth = 1;
	    ctx.moveTo(x, y+radius);
	    ctx.lineTo(x, y+height-radius);
	    ctx.quadraticCurveTo(x, y+height, x+radius, y+height);
	    ctx.lineTo(x+width-radius, y+height);
	    ctx.quadraticCurveTo(x+width, y+height, x+width, y+height-radius);
	    ctx.lineTo(x+width, y+radius);
	    ctx.quadraticCurveTo(x+width, y, x+width-radius, y);
	    ctx.lineTo(x+radius, y);
	    ctx.quadraticCurveTo(x, y, x, y+radius);
	    ctx.globalAlpha=opacity;
	    ctx[type + 'Style'] = color || params.color;
	    ctx.closePath();
	    ctx[type]();
	},
	smdraw_round:function(ctx,x,y,r,start,end,color,type,opacity) {
	    var unit = Math.PI / 180;
	    ctx.beginPath();
	    ctx.lineWidth = 1;
	    ctx.arc(x, y, r, start * unit, end * unit);
	    ctx.globalAlpha=opacity;
	    ctx[type + 'Style'] = color;
	    ctx.closePath();
	    ctx[type]();
	},
	smdraw_triangle:function(ctx,x1,y1,x2,y2,x3,y3,color,type,opacity) {
	    ctx.beginPath();
	    ctx.lineWidth = 1;
	    ctx.moveTo(x1, y1);
	    ctx.lineTo(x2, y2);
	    ctx.lineTo(x3, y3);
	    ctx.globalAlpha=opacity;
	    ctx[type + 'Style'] = color;
	    ctx.closePath();
	    ctx[type]();
	},
	smdraw_line:function(ctx,w,x,y,x1,y1,color,opacity,type){
	    ctx.beginPath();
		ctx.lineWidth = w;
		ctx.lineJoin = type;
		ctx.moveTo(x,y);
		ctx.lineTo(x1,y1);
		ctx.strokeStyle = color;
		ctx.globalAlpha=opacity;
		ctx.stroke();
	}
}

