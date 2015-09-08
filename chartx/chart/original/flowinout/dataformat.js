define(
    'chartx/chart/original/flowinout/dataformat',
    [
    ],
    function( ){
        return function( data , opt ){
            var dataFrame = {
                org     : data,
                maxLinks: 0,
                nodes   : {},
                edges   : {},
                group   : {
                    left   : [],
                    middle : [],
                    right  : []
                }  //把nodes进行一次分组，得到left middle right三部分
            };
            var titles = data.shift();

            _.each( data , function( row , i ){
                var rowObj = {
                };
                _.each(titles , (function(t,ii){
                    rowObj[t] = row[ii];
                }));
                dataFrame.nodes[ rowObj.node ] = rowObj;

                if( rowObj.link ){
                    var linksLen = _.keys(rowObj.link).length;
                    if( linksLen > dataFrame.maxLinks ){
                        dataFrame.maxLinks   = linksLen;
                        dataFrame.maxLinkSNode = rowObj;
                    };

                    dataFrame.maxLinks = Math.max( dataFrame.maxLinks , _.keys(rowObj.link).length );
                    _.each( rowObj.link , function( val , l ){
                        var edgeName = rowObj.node+"_"+l;
                        var edge = {
                            value : val
                        };
                        
                        dataFrame.edges[edgeName] = edge;
                    } );
                }
            } );

            //设置edges中每个edge的from 和 to
            _.each( dataFrame.edges , function( edge , name ){
                edge.from = dataFrame.nodes[name.split(/[_-]/)[0]];
                edge.to   = dataFrame.nodes[name.split(/[_-]/)[1]];
                edge.to.from = edge.from;
            } );

            //分组
            _.each( dataFrame.nodes , function( node , i ){
                
                if( !node.link ){
                    dataFrame.group.right.push( node );
                } else if( node.link && node.from ) {
                    dataFrame.group.middle = node;
                } else {
                    dataFrame.group.left.push( node );
                }
            } );

            return dataFrame;
        }
    }
);

