define("chartx/components/line/Group",["canvax/index","canvax/shape/BrokenLine","canvax/shape/Circle","canvax/shape/Path","chartx/utils/tools","chartx/utils/deep-extend"],function(a,b,c,d,e){window.Canvax=a;var f=function(a){this._groupId=0,this.w=0,this.h=0,this.y=0,this.node={enabled:0,control:function(){},mode:0,r:{normal:3,over:3},fillStyle:{normal:"#ffffff",over:"#ffffff"},strokeStyle:{normal:"",over:""},lineWidth:{normal:2,over:2}},this.line={strokeStyle:{normal:"",over:""}},this.fill={strokeStyle:{normal:"",over:""},alpha:1},this.data=[],this.sprite=null,this.init(a)};return f.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){var b=this;_.deepExtend(this,a),b._widget()},getNodeInfoAt:function(a){var b=this,c=_.clone(b.data[a]);return c?(c.r=b.node.r.over,c.fillStyle=b.node.fillStyle.over,c.strokeStyle=b.node.strokeStyle.over,c.lineWidth=b.node.lineWidth.over,c.alpha=b.fill.alpha,c):null},_widget:function(){for(var a=this,e=[],f=0,g=a.data.length;g>f;f++){var h=a.data[f];e.push([h.x,h.y])}var i=new b({context:{pointList:e,strokeStyle:a.line.strokeStyle.normal,lineWidth:2,y:a.y,smooth:a.line.smooth}});if(a.sprite.addChild(i),a.sprite.addChild(new d({context:{path:a._fillLine(i),fillStyle:a.fill.strokeStyle.normal,globalAlpha:a.fill.alpha}})),a.node.enabled)for(var f=0,g=a.data.length;g>f;f++){var h=a.data[f],j=new c({id:"circle",context:{x:h.x,y:h.y,r:a.node.r.normal,fillStyle:a.node.fillStyle.normal||"#FFFFFF",strokeStyle:a.node.strokeStyle.normal||a.line.strokeStyle.normal,lineWidth:a.node.lineWidth.normal}});a.node.control();var k=!0;if(1==a.node.mode){var l=h.value,m=a.data[f-1],n=a.data[f+1];m&&n&&l==m.value&&l==n.value&&(k=!1)}k&&a.sprite.addChild(j)}},_fillLine:function(a){var b=_.clone(a.context.pointList);return b.push([b[a.pointsLen-1][0],-1.5],[b[0][0],-1.5],[b[0][0],b[0][1]]),e.getPath(b)}},f});