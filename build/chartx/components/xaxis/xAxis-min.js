define("chartx/components/xaxis/xAxis",["canvax/index","canvax/shape/Line","chartx/utils/tools"],function(a,b,c){var d=function(a,b){this.graphw=0,this.graphh=0,this.yAxisW=0,this.w=0,this.h=0,this.disY=1,this.dis=6,this.line={enabled:1,width:1,height:4,strokeStyle:"#cccccc"},this.text={fillStyle:"#999999",fontSize:12,rotation:0,format:null,textAlign:null},this.maxTxtH=0,this.pos={x:null,y:null},this.enabled=1,this.disXAxisLine=6,this.disOriginX=0,this.xGraphsWidth=0,this.dataOrg=[],this.dataSection=[],this._layoutDataSection=[],this.data=[],this.layoutData=[],this.sprite=null,this._textMaxWidth=0,this.leftDisX=0,this.filter=null,this.init(a,b)};return d.prototype={init:function(b,c){this.dataOrg=c.org,b&&_.deepExtend(this,b),this.line.enabled||(this.line.height=1),this.sprite=new a.Display.Sprite({id:"xAxisSprite"}),0==this.dataSection.length&&(this.dataSection=this._initDataSection(this.dataOrg)),this._layoutDataSection=this._formatDataSectionText(this.dataSection),this._setTextMaxWidth(),this._setXAxisHeight()},_initDataSection:function(a){return _.flatten(a)},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){this._initConfig(a),this.data=this._trimXAxis(this.dataSection,this.xGraphsWidth);var b=this;_.each(this.data,function(a,c){a.layoutText=b._layoutDataSection[c]}),this._trimLayoutData(),this.setX(this.pos.x),this.setY(this.pos.y),this.enabled&&(this._widget(),this.text.rotation||this._layout())},_initConfig:function(a){a&&_.deepExtend(this,a),this.yAxisW=Math.max(this.yAxisW,this.leftDisX),this.w=this.graphw-this.yAxisW,null==this.pos.x&&(this.pos.x=this.yAxisW+this.disOriginX),null==this.pos.y&&(this.pos.y=this.graphh-this.h),this.xGraphsWidth=this.w-this._getXAxisDisLine(),this.disOriginX=parseInt((this.w-this.xGraphsWidth)/2)},_trimXAxis:function(a,b){for(var c=[],d=b/(a.length+1),e=0,f=a.length;f>e;e++){var g={content:a[e],x:parseInt(d*(e+1))};c.push(g)}return c},_formatDataSectionText:function(a){a||(a=this.dataSection);var b=this,c=[];return _.each(a,function(a){c.push(b._getFormatText(a))}),c},_getXAxisDisLine:function(){var a=this.disXAxisLine,b=2*a,c=a;return c=a+this.w%this.dataOrg.length,c=c>b?b:c,c=isNaN(c)?0:c},_setXAxisHeight:function(){if(this.enabled){var b=new a.Display.Text(this._layoutDataSection[0]||"test",{context:{fontSize:this.text.fontSize}});if(this.maxTxtH=b.getTextHeight(),this.text.rotation)if(this.text.rotation%90==0)this.h=this._textMaxWidth+this.line.height+this.disY+this.dis+3;else{var c=Math.sin(Math.abs(this.text.rotation)*Math.PI/180),d=Math.cos(Math.abs(this.text.rotation)*Math.PI/180);this.h=c*this._textMaxWidth+b.getTextHeight()+5,this.leftDisX=d*b.getTextWidth()+8}else this.h=this.disY+this.line.height+this.dis+this.maxTxtH,this.leftDisX=b.getTextWidth()/2}else this.dis=0,this.h=3},_getFormatText:function(a){var b;return b=_.isFunction(this.text.format)?this.text.format(a):a,_.isArray(b)&&(b=c.numAddSymbol(b)),b},_widget:function(){for(var c=this.layoutData,d=0,e=c.length;e>d;d++){var f=new a.Display.Sprite({id:"xNode"+d}),g=c[d],h=g.x,i=this.disY+this.line.height+this.dis,j=new a.Display.Text(g.layoutText||g.content,{context:{x:h,y:i,fillStyle:this.text.fillStyle,fontSize:this.text.fontSize,rotation:-Math.abs(this.text.rotation),textAlign:this.text.textAlign||(this.text.rotation?"right":"center"),textBaseline:this.text.rotation?"middle":"top"}});if(f.addChild(j),this.text.rotation&&90!=this.text.rotation&&(j.context.x+=5,j.context.y+=3),this.line.enabled){var k=new b({context:{x:h,y:this.disY,xEnd:0,yEnd:this.line.height+this.disY,lineWidth:this.line.width,strokeStyle:this.line.strokeStyle}});f.addChild(k)}_.isFunction(this.filter)&&this.filter({layoutData:c,index:d,txt:j,line:k||null}),this.sprite.addChild(f)}},_layout:function(){if(0!=this.sprite.getNumChildren()){var a=this.sprite.getChildAt(this.sprite.getNumChildren()-1).getChildAt(0);if(a){var b=a.context;if("center"==b.textAlign&&b.x+a.context.width/2>this.w&&(b.x=this.w-a.context.width/2),"left"==b.textAlign&&b.x+a.context.width>this.w&&(b.x=this.w-a.context.width),this.sprite.getNumChildren()>=2){var c=this.sprite.getChildAt(this.sprite.getNumChildren()-2).getChildAt(0),d=c.context;d.visible&&b.x<d.x+d.width&&(b.visible=!1)}}}},_setTextMaxWidth:function(){for(var b=this._layoutDataSection,c=b[0],d=0,e=b.length;e>d;d++)b[d].length>c.length&&(c=b[d]);var f=new a.Display.Text(c||"test",{context:{fillStyle:this.text.fillStyle,fontSize:this.text.fontSize}});return this._textMaxWidth=f.getTextWidth(),this._textMaxHeight=f.getTextHeight(),this._textMaxWidth},_trimLayoutData:function(){var a=[],b=this.data,c=this._textMaxWidth+10;this.text.rotation&&(c=1.5*this._textMaxHeight);var d=Math.min(Math.floor(this.w/c),b.length-1);if(d>=b.length-1)this.layoutData=b;else{for(var e=Math.max(Math.ceil(b.length/d-1),0),f=0;d>f;f++){var g=b[f+e*f];g&&a.push(g)}this.layoutData=a}}},d});