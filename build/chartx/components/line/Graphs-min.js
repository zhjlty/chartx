define("chartx/components/line/Graphs",["canvax/index","canvax/shape/Rect","chartx/utils/tools","canvax/animation/Tween","chartx/components/line/Group","chartx/utils/deep-extend"],function(a,b,c,d,e){var f=function(a){this.w=0,this.h=0,this.y=0,this.style={normals:["#458AE6","#39BCC0","#5BCB8A","#94CC5C","#C3CC5C","#E6B522","#E68422"],overs:["#135EBF","#2E9599","#36B26A","#78A64B","#9CA632","#BF9E39","#BF7C39"]},this.line={node:{enabled:1,mode:0,r:{normals:[2,2,2,2,2,2,2],overs:[3,3,3,3,3,3,3]},fillStyle:{normals:["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"],overs:this.style.overs},strokeStyle:{normals:this.style.normals,overs:["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"]},lineWidth:{normals:[2,2,2,2,2,2,2],overs:[2,2,2,2,2,2,2]}},strokeStyle:{normals:this.style.normals,overs:this.style.overs},alpha:{normals:[.1,.1,.1,.1,.1,.1,.1],overs:[.1,.1,.1,.1,.1,.1,.1]},smooth:!0},this.data=[],this.disX=0,this.groups=[],this.iGroup=0,this.iNode=-1,this._nodesInfoList=[],this.sprite=null,this.induce=null,this.init(a)};return f.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},getX:function(){return this.sprite.context.x},getY:function(){return this.sprite.context.y},draw:function(a){var b=this;_.deepExtend(this,a),b._widget()},grow:function(){function a(){c=requestAnimationFrame(a),d.update()}var b=this,c=null,e=function(){new d.Tween({h:0}).to({h:b.h},500).onUpdate(function(){b.sprite.context.scaleY=this.h/b.h}).onComplete(function(){cancelAnimationFrame(c)}).start();a()};e()},_widget:function(){for(var a=this,c=0,d=a.data.length;d>c;c++){var f=new e({node:{enabled:a.line.node.enabled,mode:a.line.node.mode,r:{normal:a.line.node.r.normals[c],over:a.line.node.r.overs[c]},fillStyle:{normal:a.line.node.fillStyle.normals[c],over:a.line.node.fillStyle.overs[c]},strokeStyle:{normal:a.line.node.strokeStyle.normals[c],over:a.line.node.strokeStyle.overs[c]},lineWidth:{normal:a.line.node.lineWidth.normals[c],over:a.line.node.lineWidth.overs[c]}},line:{strokeStyle:{normal:a.line.strokeStyle.normals[c],over:a.line.strokeStyle.overs[c]},smooth:a.line.smooth},fill:{strokeStyle:{normal:a.line.strokeStyle.normals[c],over:a.line.strokeStyle.overs[c]},alpha:a.line.alpha.normals[c]}});f.draw({data:a.data[c]}),a.sprite.addChild(f.sprite),a.groups.push(f)}a.induce=new b({id:"induce",context:{y:-a.h,width:a.w,height:a.h,fillStyle:"#000000",globalAlpha:0}}),a.sprite.addChild(a.induce),a.induce.on("hold mouseover",function(b){b.tipsInfo=a._getInfoHandler(b)}),a.induce.on("drag mousemove",function(b){b.tipsInfo=a._getInfoHandler(b)}),a.induce.on("release mouseout",function(b){var c={iGroup:a.iGroup,iNode:a.iNode};b.tipsInfo=c,a.iGroup=0,a.iNode=-1})},_getInfoHandler:function(a){var b=a.point.x,d=a.point.y-this.h,e=0==this.disX?0:parseInt((b+this.disX/2)/this.disX),f=c.getDisMinATArr(d,_.pluck(this._nodesInfoList,"y"));this._nodesInfoList=[];for(var g=0,h=this.groups.length;h>g;g++){var i=this.groups[g].getNodeInfoAt(e);this._nodesInfoList.push(i)}this.iGroup=f,this.iNode=e;var j={iGroup:this.iGroup,iNode:this.iNode,nodesInfoList:_.clone(this._nodesInfoList)};return j}},f});