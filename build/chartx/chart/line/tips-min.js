define("chartx/chart/line/tips",["canvax/index","canvax/shape/Line","canvax/shape/Circle","chartx/components/tips/tip"],function(a,b,c,d){var e=function(a,b,c){this.line={enabled:1},this.sprite=null,this._line=null,this._nodes=null,this._tip=null,this._isShow=!1,this.enabled=!0,this.init(a,b,c)};return e.prototype={init:function(b,c,e){_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"tips"}),this._tip=new d(b,e)},show:function(a,b){this.enabled&&(b||(b={}),b=_.extend(this._getTipsPoint(a),b),this._initLine(a,b),this._initNodes(a,b),this.sprite.addChild(this._tip.sprite),this._tip.show(a,b),this._isShow=!0)},move:function(a){this.enabled&&(this._resetStatus(a),this._tip.move(a))},hide:function(a){this.enabled&&(this.sprite.removeAllChildren(),this._line=null,this._nodes=null,this._tip.hide(a),this._isShow=!1)},_getTipsPoint:function(a){return a.target.localToGlobal(a.tipsInfo.nodesInfoList[a.tipsInfo.iGroup])},_resetStatus:function(a){var b=this._getTipsPoint(a);this._line&&(this._line.context.x=parseInt(b.x)),this._resetNodesStatus(a,b)},_initLine:function(a,c){var d=_.deepExtend({x:parseInt(c.x),y:c.lineTop||a.target.localToGlobal().y,xStart:0,yStart:c.lineH||a.target.context.height,xEnd:0,yEnd:0,lineWidth:1,strokeStyle:"#cccccc"},this.line);this.line.enabled&&(this._line=new b({id:"tipsLine",context:d}),this.sprite.addChild(this._line))},_initNodes:function(b,d){this._nodes=new a.Display.Sprite({id:"line-tipsNodes",context:{x:parseInt(d.x),y:b.target.localToGlobal().y}});var e=this;_.each(b.tipsInfo.nodesInfoList,function(d){var f=new a.Display.Sprite({context:{y:b.target.context.height-Math.abs(d.y)}});f.addChild(new c({context:{r:d.r+2+2,fillStyle:"white",strokeStyle:d.strokeStyle,lineWidth:d.lineWidth}})),f.addChild(new c({context:{r:d.r+1,fillStyle:d.strokeStyle}})),e._nodes.addChild(f)}),this.sprite.addChild(this._nodes)},_resetNodesStatus:function(a,b){var c=this;this._nodes.children.length!=a.tipsInfo.nodesInfoList.length&&(this._nodes.removeAllChildren(),this._initNodes(a,b)),this._nodes.context.x=parseInt(b.x),_.each(a.tipsInfo.nodesInfoList,function(b,d){var e=c._nodes.getChildAt(d).context;e.y=a.target.context.height-Math.abs(b.y)})}},e});