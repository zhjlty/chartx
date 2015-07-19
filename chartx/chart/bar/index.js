define(
    "chartx/chart/bar/index",
    [
        'chartx/chart/index',
        'chartx/utils/tools',
        'chartx/utils/datasection',
        './xaxis',
        './yaxis',
        //'chartx/components/yaxis/yAxis',
        'chartx/components/back/Back',
        './graphs',
        "chartx/components/tips/tip",
        'chartx/utils/dataformat'
    ],
    function(Chart , Tools, DataSection, xAxis, yAxis, Back, Graphs , Tip , dataFormat ){
        /*
         *@node chart在dom里的目标容器节点。
        */
        var Canvax = Chart.Canvax;
    
        return Chart.extend( {
            _xAxis  : null,
            _yAxis  : null,
            _back   : null,
            _graphs : null,
            _tip    : null,
            init:function(node , data , opts){
                _.deepExtend( this , opts );
                this.dataFrame = this._initData( data );
            },
            _setStages : function(){
                this.core    = new Canvax.Display.Sprite({
                    id      : 'core'
                });
                this.stageBg  = new Canvax.Display.Sprite({
                    id      : 'bg'
                });
                this.stageTip  = new Canvax.Display.Sprite({
                    id      : 'tip'
                });
    
                this.stage.addChild(this.stageBg);
                this.stage.addChild(this.core);
                this.stage.addChild(this.stageTip);

                if( this.rotate ) {
                  this._rotate( this.rotate );
                }
            },
            draw:function(){
                    
                this._setStages();

                this._initModule();                        //初始化模块  
    
                this._startDraw();                         //开始绘图
    
                this._drawEnd();                           //绘制结束，添加到舞台
                
            },
            _initData  : function( data , opt ){
                var d = dataFormat.apply( this , arguments );
                _.each( d.yAxis.field , function(field , i){
                    if( !_.isArray( field ) ){
                        field = [field];
                        d.yAxis.org[ i ] = [ d.yAxis.org[ i ] ];
                    }
                } );
                return d;
            },
            _initModule:function(){
                this._xAxis  = new xAxis(this.xAxis , this.dataFrame.xAxis);
                this._yAxis  = new yAxis(this.yAxis , this.dataFrame.yAxis);
                this._back   = new Back(this.back);
                this._tip    = new Tip(this.tips, this.canvax.getDomContainer());

                //因为tips放在graphs中，so 要吧tips的conf传到graphs中
                this._graphs = new Graphs(
                    this.graphs , 
                    this
                );
            },
            _startDraw : function( opt ){
                var w = (opt && opt.w) || this.width;
                var h = (opt && opt.h) || this.height;
                var y = parseInt( h - this._xAxis.h );
                
                //绘制yAxis
                this._yAxis.draw({
                    pos : {
                        x : 0,
                        y : y
                    },
                    yMaxHeight : y 
                });

                var _yAxisW = this._yAxis.w;

                //绘制x轴
                this._xAxis.draw({
                    graphh :   h,
                    graphw :   w,
                    yAxisW :   _yAxisW
                });
                if( this._xAxis.yAxisW != _yAxisW ){
                    //说明在xaxis里面的时候被修改过了。那么要同步到yaxis
                    this._yAxis.resetWidth( this._xAxis.yAxisW );
                    _yAxisW = this._xAxis.yAxisW;
                };

                var _graphsH = this._yAxis.yGraphsHeight;
                //绘制背景网格
                this._back.draw({
                    w    : this._xAxis.xGraphsWidth,
                    h    : _graphsH,
                    xAxis:{
                        data : this._yAxis.layoutData
                    },
                    yAxis:{
                        data : this._xAxis.layoutData
                    },
                    pos  : {
                        x : _yAxisW,
                        y : y
                    }
                });

                //绘制主图形区域
                this._graphs.draw( this._trimGraphs() , {
                    w    : this._xAxis.xGraphsWidth,
                    h    : this._yAxis.yGraphsHeight,
                    pos  : {
                         x : _yAxisW ,
                         y : y
                    },
                    yDataSectionLen : this._yAxis.dataSection.length
                });
            },
            
            //把这个点位置对应的x轴数据和y轴数据存到tips的info里面
            //方便外部自定义tip是的content
            _setXaxisYaxisToTipsInfo : function( e ){
                e.tipsInfo.xAxis = {
                    field : this.dataFrame.xAxis.field,
                    value : this.dataFrame.xAxis.org[0][ e.tipsInfo.iGroup ]
                }
                var me = this;
                _.each( e.tipsInfo.nodesInfoList , function( node , i ){
                    if(_.isArray(me.dataFrame.yAxis.field[node.iNode])){
                        node.field = me.dataFrame.yAxis.field[node.iNode][node.iLay];
                    }else{
                        node.field = me.dataFrame.yAxis.field[node.iNode]
                    }
                } );
            },
            _trimGraphs:function( _xAxis , _yAxis ){
                _xAxis || ( _xAxis = this._xAxis );
                _yAxis || ( _yAxis = this._yAxis );
                var xArr     = _xAxis.data;
                var yArr     = _yAxis.dataOrg;
                var hLen     = yArr.length; //bar的横向分组length
                
                var xDis1    = _xAxis.xDis1;
                //x方向的二维长度，就是一个bar分组里面可能有n个子bar柱子，那么要二次均分
                var xDis2    = xDis1 / (hLen+1);
    
                //知道了xDis2 后 检测下 barW是否需要调整
                this._graphs.checkBarW && this._graphs.checkBarW( xDis2 );
    
                var maxYAxis = _yAxis.dataSection[ _yAxis.dataSection.length - 1 ];
                var tmpData  = [];
                for( var b = 0 ; b < hLen ; b ++ ){
                    !tmpData[b] && (tmpData[b] = []);
                    _.each( yArr[b] , function( subv , v ){
                        !tmpData[b][v] && (tmpData[b][v] = []);
                        _.each( subv , function( val , i ){
                            var x = xArr[i].x - xDis1/2 + xDis2 * (b+1);
                            var y = -(val-_yAxis._bottomNumber) / (maxYAxis - _yAxis._bottomNumber) * _yAxis.yGraphsHeight;
                            if( v > 0 ){
                                y += tmpData[b][v-1][i].y
                            };
                            tmpData[b][v].push({
                                value : val,
                                x     : x,
                                y     : y
                            });
                        } );
                    } );
                }
                return tmpData;
            },
            _drawEnd:function(){
                this.stageBg.addChild(this._back.sprite)
    
                this.core.addChild(this._xAxis.sprite);
                this.core.addChild(this._graphs.sprite);
                this.core.addChild(this._yAxis.sprite);
               
                this.stageTip.addChild(this._tip.sprite);

                //执行生长动画
                this._graphs.grow();

                this.bindEvent();
            },
            bindEvent : function(){
                var me = this;
                this._graphs.sprite.on( "panstart mouseover" ,function(e){
                    me._setXaxisYaxisToTipsInfo(e);
                    me._tip.show( e );
                });
                this._graphs.sprite.on( "panstart mousemove" ,function(e){
                    me._setXaxisYaxisToTipsInfo(e);
                    me._tip.move( e );
                });
                this._graphs.sprite.on( "panstart mouseout" ,function(e){
                    me._tip.hide( e );
                });
            }
        });
    }
);
