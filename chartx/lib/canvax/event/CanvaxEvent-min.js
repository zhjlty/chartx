define("canvax/event/CanvaxEvent",["canvax/core/Base"],function(a,b){var c=function(a){this.target=null,this.currentTarget=null,this.params=null,this.type=a.type,this.points=null,this._stopPropagation=!1};return c.prototype={stopPropagation:function(){this._stopPropagation=!0}},c.pageX=function(a){return a.pageX?a.pageX:a.clientX?a.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft):null},c.pageY=function(a){return a.pageY?a.pageY:a.clientY?a.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop):null},c});