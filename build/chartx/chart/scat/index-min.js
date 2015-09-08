define("chartx/chart/scat/xaxis",["chartx/components/xaxis/xAxis","chartx/utils/datasection"],function(a,b){var c=function(a,b){this.xDis=0,c.superclass.constructor.apply(this,arguments)};return Chartx.extend(c,a,{_initDataSection:function(a){var a=_.flatten(a),c=b.section(a);return this._baseNumber=c[0],1==c.length&&c.push(100),c},_trimXAxis:function(a,b){var c=[];this.xDis=b/(a.length-1);for(var d=0,e=a.length;e>d;d++){var f={content:a[d],x:this.xDis*d};c.push(f)}return c}}),c}),define("chartx/chart/scat/graphs",["canvax/index","canvax/shape/Circle","canvax/shape/Rect","canvax/animation/Tween"],function(a,b,c,d){var e=function(a,b){this.zAxis=b,this.w=0,this.h=0,this.pos={x:0,y:0},this.circle={maxR:20,minR:3,r:null,normalR:10},this._colors=["#6f8cb2","#c77029","#f15f60","#ecb44f","#ae833a","#896149"],this.sprite=null,this._circles=[],_.deepExtend(this,a),this.init()};return e.prototype={init:function(){this.sprite=new a.Display.Sprite({id:"graphsEl"})},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},getCircleFillStyle:function(a,b,c){var d=null;return _.isArray(this.circle.fillStyle)&&(d=this.circle.fillStyle[b]),_.isFunction(this.circle.fillStyle)&&(d=this.circle.fillStyle(a,b,c)),d&&""!=d||(d=this._colors[b]),d},getR:function(a){var b=this.circle.r;return _.isFunction(b)?b(a):b},draw:function(d,e){var f=this;if(_.deepExtend(this,e),0!=d.length){f.data=d,this.induce=new c({id:"induce",context:{y:-this.h,width:this.w,height:this.h,fillStyle:"#000000",globalAlpha:0,cursor:"pointer"}}),this.sprite.addChild(this.induce),this.induce.on("panstart mouseover",function(a){a.eventInfo=null}),this.induce.on("panmove mousemove",function(a){a.eventInfo=null});var g=d[0].length,h=1;this.zAxis.field&&this.zAxis.field.length>0&&(h=_.max(_.flatten(this.zAxis.org)));for(var i=0;g>i;i++){for(var j=new a.Display.Sprite({id:"barGroup"+i}),k=0,l=d.length;l>k;k++){var m=d[k][i],n=this.zAxis.org[k]&&this.zAxis.org[k][i],o=this.getR(m)||(n?Math.max(this.circle.maxR*(n/h),this.circle.minR):this.circle.normalR),p=new b({hoverClone:!1,context:{x:m.x,y:m.y,fillStyle:this.getCircleFillStyle(i,k,m.value),r:o,globalAlpha:0,cursor:"pointer"}});j.addChild(p),p.iGroup=k,p.iNode=i,p.r=o,n&&(p.zAxis={field:this.zAxis.field,value:n,org:this.zAxis.org}),p.on("panstart mouseover",function(a){a.eventInfo=f._getInfoHandler(a),this.context.globalAlpha=.9,this.context.r++}),p.on("panmove mousemove",function(a){a.eventInfo=f._getInfoHandler(a)}),p.on("panend mouseout",function(a){a.eventInfo={},this.context.globalAlpha=.8,this.context.r--}),p.on("tap click",function(a){a.eventInfo=f._getInfoHandler(a)}),this._circles.push(p)}this.sprite.addChild(j)}this.setX(this.pos.x),this.setY(this.pos.y)}},_getInfoHandler:function(a){var b=a.target,c={iGroup:b.iGroup,iNode:b.iNode,nodesInfoList:this._getNodeInfo(b.iGroup,b.iNode)};return c},_getNodeInfo:function(a,b){var c=[];return c.push(this.data[a][b].y),c},grow:function(){function a(){c=requestAnimationFrame(a),d.update()}var b=this,c=null,e=function(){new d.Tween({h:0}).to({h:100},500).onUpdate(function(){for(var a=0,c=b._circles.length;c>a;a++){var d=b._circles[a];d.context.globalAlpha=this.h/100*.8,d.context.r=this.h/100*d.r}}).onComplete(function(){cancelAnimationFrame(c)}).start();a()};e()}},e}),define("chartx/chart/scat/index",["chartx/chart/index","chartx/utils/tools","chartx/utils/datasection","./xaxis","chartx/components/yaxis/yAxis","chartx/components/back/Back","./graphs","chartx/utils/dataformat","chartx/components/anchor/Anchor","chartx/components/tips/tip"],function(a,b,c,d,e,f,g,h,i,j){var k=a.Canvax;return a.extend({init:function(a,b,c){this._xAxis=null,this._yAxis=null,this._back=null,this._graphs=null,this._anchor=null,_.deepExtend(this,c),this.dataFrame=this._initData(b,this)},draw:function(){this.stageTip=new k.Display.Sprite({id:"tip"}),this.core=new k.Display.Sprite({id:"core"}),this.stageBg=new k.Display.Sprite({id:"bg"}),this.stage.addChild(this.stageBg),this.stage.addChild(this.core),this.stage.addChild(this.stageTip),this.rotate&&this._rotate(this.rotate),this._initModule(),this._startDraw(),this._drawEnd()},_initData:h,_initModule:function(){this._xAxis=new d(this.xAxis,this.dataFrame.xAxis),this._yAxis=new e(this.yAxis,this.dataFrame.yAxis),this._back=new f(this.back),this._anchor=new i(this.anchor),this._graphs=new g(this.graphs,this.dataFrame.zAxis),this._tip=new j(this.tips,this.canvax.getDomContainer()),this._tip._getDefaultContent=this._getTipDefaultContent,this.stageBg.addChild(this._back.sprite),this.core.addChild(this._xAxis.sprite),this.core.addChild(this._yAxis.sprite),this.core.addChild(this._graphs.sprite),this.core.addChild(this._anchor.sprite),this.stageTip.addChild(this._tip.sprite)},_getTipDefaultContent:function(a){return a.xAxis.field+"："+a.nodesInfoList[0].value},_startDraw:function(a){var b=a&&a.w||this.width,c=a&&a.h||this.height,d=parseInt(c-this._xAxis.h);this._yAxis.draw({pos:{x:0,y:d},yMaxHeight:d});var e=this._yAxis.w;this._xAxis.draw({graphh:c,graphw:b,yAxisW:e}),this._xAxis.yAxisW!=e&&(this._yAxis.resetWidth(this._xAxis.yAxisW),e=this._xAxis.yAxisW);var f=this._yAxis.yGraphsHeight;this._back.draw({w:this._xAxis.xGraphsWidth,h:f,xAxis:{data:this._yAxis.layoutData},yAxis:{data:this._xAxis.layoutData},pos:{x:e,y:d}}),this._graphs.draw(this._trimGraphs(),{w:this._xAxis.xGraphsWidth,h:f,pos:{x:e,y:d}}),this._graphs.grow(),this._anchor.enabled&&(this._anchor.draw({w:this._xAxis.xGraphsWidth,h:f,cross:{x:this._back.yAxis.org,y:f+this._back.xAxis.org},pos:{x:e,y:d-f}},this._xAxis,this._yAxis),this._anchor.hide()),this._bindEvent()},_setXaxisYaxisToeventInfo:function(a){var b=this;a.eventInfo.xAxis={field:b.dataFrame.xAxis.field[a.eventInfo.iGroup],value:b.dataFrame.xAxis.org[a.eventInfo.iGroup][a.eventInfo.iNode]},a.target.zAxis&&(a.eventInfo.zAxis=a.target.zAxis),_.each(a.eventInfo.nodesInfoList,function(c,d){c.field=b.dataFrame.yAxis.field[a.eventInfo.iGroup]})},_bindEvent:function(){var a=this;this._graphs.sprite.on("panstart mouseover",function(b){a._anchor.enabled&&a._anchor.show(),b.eventInfo&&(a._setXaxisYaxisToeventInfo(b),a._tip.show(b))}),this._graphs.sprite.on("panmove mousemove",function(b){var c=b.point;"induce"!=b.target.id&&(c=b.target.localToGlobal(b.point,a._graphs.sprite),c.y+=a._graphs.h),a._anchor.enabled&&a._anchor.resetCross(c),b.eventInfo&&(a._setXaxisYaxisToeventInfo(b),a._tip.move(b))}),this._graphs.sprite.on("panend mouseout",function(b){a._anchor.enabled&&a._anchor.hide(),b.eventInfo&&a._tip.hide(b)}),this._graphs.sprite.on("tap click",function(a){})},_trimGraphs:function(){var a=this._xAxis.dataOrg,b=this._yAxis.dataOrg,c=Math.min(b.length,a.length);a.length=c,b.length=c;for(var d=(this._xAxis.xDis,this._yAxis.dataSection[this._yAxis.dataSection.length-1]),e=this._xAxis.dataSection[this._xAxis.dataSection.length-1],f=[],g=0,h=b.length;h>g;g++){!f[g]&&(f[g]=[]);for(var i=0,j=b[g].length;j>i;i++){var k=-(b[g][i]-this._yAxis._bottomNumber)/(d-this._yAxis._bottomNumber)*this._yAxis.yGraphsHeight,l=this._xAxis._baseNumber;(void 0==l||null==l)&&(l=this._xAxis._baseNumber=this._xAxis.dataSection[0]);var m=(a[g][i]-l)/(e-l)*this._xAxis.w;f[g][i]={value:{x:a[g][i],y:b[g][i]},x:m,y:k}}}return f},_drawEnd:function(){}})});