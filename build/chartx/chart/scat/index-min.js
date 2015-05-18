define("chartx/chart/scat/index",["chartx/chart/index","chartx/utils/tools","chartx/utils/datasection","./xaxis","chartx/components/yaxis/yAxis","chartx/components/back/Back","./graphs","chartx/utils/dataformat"],function(a,b,c,d,e,f,g,h){var i=a.Canvax;return a.extend({init:function(a,b,c){this._xAxis=null,this._yAxis=null,this._back=null,this._graphs=null,_.deepExtend(this,c),this.dataFrame=this._initData(b,this)},draw:function(){this.stageTip=new i.Display.Sprite({id:"tip"}),this.core=new i.Display.Sprite({id:"core"}),this.stageBg=new i.Display.Sprite({id:"bg"}),this.stage.addChild(this.stageBg),this.stage.addChild(this.core),this.stage.addChild(this.stageTip),this.rotate&&this._rotate(this.rotate),this._initModule(),this._startDraw(),this._drawEnd(),this._arguments=arguments},_initData:h,_initModule:function(){this._xAxis=new d(this.xAxis,this.dataFrame.xAxis),this._yAxis=new e(this.yAxis,this.dataFrame.yAxis),this._back=new f(this.back),this._graphs=new g(this.graphs)},_startDraw:function(){var a=parseInt(this.height-this._xAxis.h);this._yAxis.draw({pos:{x:0,y:a},yMaxHeight:a});var b=this._yAxis.w;this._xAxis.draw({graphh:this.height,graphw:this.width,yAxisW:b}),this._xAxis.yAxisW!=b&&(this._yAxis.resetWidth(this._xAxis.yAxisW),b=this._xAxis.yAxisW),this._back.draw({w:this._xAxis.w,h:a,xAxis:{data:this._yAxis.layoutData},yAxis:{data:this._xAxis.layoutData},pos:{x:b,y:a}}),this._graphs.draw(this._trimGraphs(),{w:this._xAxis.xGraphsWidth,h:this._yAxis.yGraphsHeight,pos:{x:b,y:a}}),this._graphs.grow()},_trimGraphs:function(){var a=this._xAxis.dataOrg,b=this._yAxis.dataOrg,c=Math.min(b.length,a.length);a.length=c,b.length=c;for(var d=(this._xAxis.xDis,this._yAxis.dataSection[this._yAxis.dataSection.length-1]),e=this._xAxis.dataSection[this._xAxis.dataSection.length-1],f=[],g=0,h=b.length;h>g;g++){!f[g]&&(f[g]=[]);for(var i=0,j=b[g].length;j>i;i++){var k=-(b[g][i]-this._yAxis._bottomNumber)/(d-this._yAxis._bottomNumber)*this._yAxis.yGraphsHeight,l=(a[g][i]-this._xAxis._baseNumber)/(e-this._xAxis._baseNumber)*this._xAxis.w;f[g][i]={value:{x:a[g][i],y:b[g][i]},x:l,y:k}}}return f},_drawEnd:function(){this.stageBg.addChild(this._back.sprite),this.core.addChild(this._xAxis.sprite),this.core.addChild(this._graphs.sprite),this.core.addChild(this._yAxis.sprite)}})});