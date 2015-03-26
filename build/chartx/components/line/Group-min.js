define("chartx/components/line/Group",["canvax/index","canvax/shape/BrokenLine","canvax/shape/Circle","canvax/shape/Path","chartx/utils/tools","chartx/utils/colorformat","canvax/animation/Tween"],function(a,b,c,d,e,f,g){window.Canvax=a;var h=function(a,b,c){this._groupInd=a,this._nodeInd=-1,this.ctx=c,this.w=0,this.h=0,this.y=0,this.colors=["#26b471","#7aa1ff","#fa8529","#ff7c4d","#2494ed","#7aa1ff","#fa8529","#ff7c4d"],this.line={strokeStyle:{normal:this.colors[this._groupInd],over:null},lineWidth:2,smooth:!0},this.node={enabled:1,control:function(){},mode:0,r:{normal:2,over:3},fillStyle:{normal:"#ffffff",over:"#ffffff"},strokeStyle:{normal:null,over:null},lineWidth:{normal:2,over:2}},this.fill={fillStyle:{normal:null,over:null},alpha:.3},this.data=[],this.sprite=null,this._pointList=[],this._currPointList=[],this.init(b)};return h.prototype={init:function(b){_.deepExtend(this,b),this.line.strokeStyle.over||(this.line.strokeStyle.over=this.line.strokeStyle.normal),!this.node.strokeStyle.normal&&(this.node.strokeStyle.normal=this.line.strokeStyle.normal),!this.node.strokeStyle.over&&(this.node.strokeStyle.over=this.line.strokeStyle.over),!this.fill.fillStyle.normal&&(this.fill.fillStyle.normal=this.line.strokeStyle.normal),!this.fill.fillStyle.over&&(this.fill.fillStyle.over=this.line.strokeStyle.over),this.sprite=new a.Display.Sprite},draw:function(a){_.deepExtend(this,a),this._widget()},update:function(a){_.deepExtend(this,a);for(var b=[],c=0,d=this.data.length;d>c;c++){var e=this.data[c];b.push([e.x,e.y])}this._pointList=b,this._grow()},destroy:function(){this.sprite.remove()},_getColor:function(a){var b=this._getProp(a);return b&&""!=b||(b=this.colors[this._groupInd]),b},_getProp:function(a){return _.isArray(a)?a[this._groupInd]:_.isFunction(a)?a({iGroup:this._groupInd,iNode:this._nodeInd}):a},getNodeInfoAt:function(a){var b=this;b._nodeInd=a;var c=_.clone(b.data[a]);return c?(c.r=b._getProp(b.node.r.over),c.fillStyle=b._getProp(b.node.fillStyle.over)||"#ffffff",c.strokeStyle=b._getProp(b.node.strokeStyle.over)||b._getColor(b.line.strokeStyle.over),c.color=b._getProp(b.node.strokeStyle.over)||b._getColor(b.line.strokeStyle.over),c.lineWidth=b._getProp(b.node.lineWidth.over)||2,c.alpha=b._getProp(b.fill.alpha),c):null},_grow:function(){function a(){c=requestAnimationFrame(a),g.update()}var b=this,c=null,d=function(){new g.Tween(b._getPointY(b._currPointList)).to(b._getPointY(b._pointList),1500).easing(g.Easing.Quintic.Out).onUpdate(function(){for(var a in this)b._currPointList[parseInt(a.split("_")[1])][1]=this[a];b._bline.context.pointList=_.clone(b._currPointList),b._fill.context.path=b._fillLine(b._bline),b._circles&&_.each(b._circles.children,function(a){var c=parseInt(a.id.split("_")[1]);a.context.y=b._currPointList[c][1]})}).onComplete(function(){cancelAnimationFrame(c)}).start();a()};d()},_getPointY:function(a){var b={};return _.each(a,function(a,c){b["p_"+c]=a[1]}),b},_widget:function(){for(var e=this,g=[],h=0,i=e.data.length;i>h;h++){var j=e.data[h];g.push([j.x,j.y])}e._pointList=g,g=[];for(var h=0,i=e.data.length;i>h;h++){var j=e.data[h];g.push([j.x,e.data[0].y])}e._currPointList=g;var k=new b({id:"brokenline_"+e._groupInd,context:{pointList:g,strokeStyle:e._getColor(e.line.strokeStyle.normal),lineWidth:e.line.lineWidth,y:e.y,smooth:e.line.smooth},smoothFilter:function(a){a[1]>0&&(a[1]=0)}});e.sprite.addChild(k),e._bline=k;var l=null;if(_.isArray(e.fill.alpha)){e.fill.alpha.length=2,void 0==e.fill.alpha[0]&&(e.fill.alpha[0]=0),void 0==e.fill.alpha[1]&&(e.fill.alpha[1]=0);var m=_.min(k.context.pointList,function(a){return a[1]});l=e.ctx.createLinearGradient(m[0],m[1],m[0],0);var n=f.colorRgb(e._getColor(e.fill.fillStyle.normal)),o=n.replace(")",", "+e._getProp(e.fill.alpha[0])+")").replace("RGB","RGBA");l.addColorStop(0,o);var p=n.replace(")",", "+e.fill.alpha[1]+")").replace("RGB","RGBA");l.addColorStop(1,p)}var q=new d({context:{path:e._fillLine(k),fillStyle:l||e._getColor(e.fill.fillStyle.normal),globalAlpha:l?1:e.fill.alpha}});if(e.sprite.addChild(q),e._fill=q,e.node.enabled&&e.line.lineWidth){this._circles=new a.Display.Sprite({id:"circles"}),this.sprite.addChild(this._circles);for(var h=0,i=e.data.length;i>h;h++){e._nodeInd=h;var r=new c({id:"circle_"+h,context:{x:e._currPointList[h][0],y:e._currPointList[h][1],r:e._getProp(e.node.r.normal),fillStyle:e._getProp(e.node.fillStyle.normal)||"#ffffff",strokeStyle:e._getProp(e.node.strokeStyle.normal)||e._getColor(e.line.strokeStyle.normal),lineWidth:e._getProp(e.node.lineWidth.normal)||2}});e.node.control();var s=!0;if(1==e.node.mode){var t=e.data[h].value,u=e.data[h-1],v=e.data[h+1];u&&v&&t==u.value&&t==v.value&&(s=!1)}s&&e._circles.addChild(r)}e._nodeInd=-1}},_fillLine:function(a){var b=_.clone(a.context.pointList);return b.push([b[b.length-1][0],-1.5],[b[0][0],-1.5],[b[0][0],b[0][1]]),e.getPath(b)}},h});