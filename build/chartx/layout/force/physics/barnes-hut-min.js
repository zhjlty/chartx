define("chartx/layout/force/physics/barnes-hut",["chartx/layout/force/physics/atoms"],function(a){var b=function(){!a&&self.Atoms&&(a=self.Atoms);var b=[],c=0,d=null,e=.5,f={init:function(a,b,g){e=g,c=0,d=f._newBranch(),d.origin=a,d.size=b.subtract(a)},insert:function(b){for(var c=d,e=[b];e.length;){var g=e.shift(),h=g._m||g.m,i=f._whichQuad(g,c);if(void 0===c[i])c[i]=g,c.mass+=h,c.p=c.p?c.p.add(g.p.multiply(h)):g.p.multiply(h);else if("origin"in c[i])c.mass+=h,c.p=c.p?c.p.add(g.p.multiply(h)):g.p.multiply(h),c=c[i],e.unshift(g);else{var j=c.size.divide(2),k=new a.Point(c.origin);"s"==i[0]&&(k.y+=j.y),"e"==i[1]&&(k.x+=j.x);var l=c[i];if(c[i]=f._newBranch(),c[i].origin=k,c[i].size=j,c.mass=h,c.p=g.p.multiply(h),c=c[i],l.p.x===g.p.x&&l.p.y===g.p.y){var m=.08*j.x,n=.08*j.y;l.p.x=Math.min(k.x+j.x,Math.max(k.x,l.p.x-m/2+Math.random()*m)),l.p.y=Math.min(k.y+j.y,Math.max(k.y,l.p.y-n/2+Math.random()*n))}e.push(l),e.unshift(g)}}},applyForces:function(b,c){for(var f=[d];f.length;)if(node=f.shift(),void 0!==node&&b!==node)if("f"in node){var g=b.p.subtract(node.p),h=Math.max(1,g.magnitude()),i=(g.magnitude()>0?g:a.Point.random(1)).normalize();b.applyForce(i.multiply(c*(node._m||node.m)).divide(h*h))}else{var j=b.p.subtract(node.p.divide(node.mass)).magnitude(),k=Math.sqrt(node.size.x*node.size.y);if(k/j>e)f.push(node.ne),f.push(node.nw),f.push(node.se),f.push(node.sw);else{var g=b.p.subtract(node.p.divide(node.mass)),h=Math.max(1,g.magnitude()),i=(g.magnitude()>0?g:a.Point.random(1)).normalize();b.applyForce(i.multiply(c*node.mass).divide(h*h))}}},_whichQuad:function(a,b){if(a.p.exploded())return null;var c=a.p.subtract(b.origin),d=b.size.divide(2);return c.y<d.y?c.x<d.x?"nw":"ne":c.x<d.x?"sw":"se"},_newBranch:function(){if(b[c]){var a=b[c];a.ne=a.nw=a.se=a.sw=void 0,a.mass=0,delete a.p}else a={origin:null,size:null,nw:void 0,ne:void 0,sw:void 0,se:void 0,mass:0},b[c]=a;return c++,a}};return f};return self.BarnesHutTree=b,b});