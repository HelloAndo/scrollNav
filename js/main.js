var LM = {};
$(function(){
	
	// 手机适配Star
    var body_w = 640;
    function adjustWindowLt640(){
        var IFO = {};
        IFO.windw = $(window).width();
        IFO.bodyw = body_w;
        IFO.scale = Math.ceil(1000 * IFO.windw / IFO.bodyw) / 1000;
        IFO.str = "width=device-width, initial-scale=" + IFO.scale + ", minimum-scale=" + IFO.scale + ",maximum-scale=" + IFO.scale + "";
        $('meta[name=viewport]').attr('content', IFO.str);
    }
    function adjustWindowGt640(){
        var viewport = document.querySelector("meta[name=viewport]");
        var winWidths = $(window).width();
        var densityDpi = body_w / winWidths;
        densityDpi = densityDpi > 1 ? 300 * body_w * densityDpi / body_w: densityDpi;
        if (isWeixin()) {
            viewport.setAttribute('content', 'width=' + body_w + ', target-densityDpi=' + densityDpi + ', maximum-scale=' + 1 + ', user-scalable=no');
        }
        else {
            viewport.setAttribute('content', 'width=' + body_w + ', user-scalable=no');
        }
    }
    function isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == "micromessenger"){
            return true;
        }
        else{
            return false;
        }
    }
    function isIphone(){
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/iphone/i) == "iphone") {
            return true;
        }
        else{
            return false;
        }
    }
    function adjustScreen(){
        if($(window).width() < 640){
            adjustWindowLt640();
        }
        else if($(window).width() > 639){
            adjustWindowGt640();
        }
    }
    adjustScreen();

    $(window).on("orientationchange",function(){
        adjustScreen();
    });
    // 手机适配End   


var cur = 0;
var timer = undefined;
var flag = false;
var $car_ul = $('.carousel ul'),
    $car_li = $car_ul.find('li');

// 初始化
examinFinal(0);

//'dis'—— ul的position偏移距离，icon放大不使用动画方法，不使用css3动画效果
function examin( dis ){

    for( var i=0; i<7; i++){

        var enlarge_scale;
        var thisLi_left = $car_li.eq(i).position().left + dis;
        $car_li.eq(i).find('img').removeClass('scaleAnimate');

        if( thisLi_left > 0 && thisLi_left <= 213 ){

            enlarge_scale = 0.55 + thisLi_left/213*0.3;

            $car_li.eq(i).find('img').css({ transform: 'scale(' + enlarge_scale + ')' });

        }else if( thisLi_left >213 && thisLi_left < 426 ){

            enlarge_scale = 0.55 + (426-thisLi_left)/213*0.3;

            $car_li.eq(i).find('img').css({ transform: 'scale(' + enlarge_scale + ')' });

        }else{

            $car_li.eq(i).find('img').css({ transform: 'scale(0.55)' });
        }
    }
}
// icon放大使用css3动画方法
function examinFinal( dis ){

    for( var i=0; i<7; i++){

        var thisLi_left = $car_li.eq(i).position().left + dis;
        $car_li.eq(i).find('img').addClass('scaleAnimate');

        if( thisLi_left == 213 ){

            $car_li.eq(i).find('img').css({
                                            transform: 'scale(0.85)',
                                            webkitTransform: 'scale(0.85)'
                                        });
        }else{

            $car_li.eq(i).find('img').css({
                                            transform: 'scale(0.55)',
                                            webkitTransform: 'scale(0.55)'
                                        });

        }
    }
}



// touch.on('.carousel li', 'tap', function(ev){
//     ev.preventDefault();
//     if( ev.position.x < 1/2 * $(window).width() ){
//         if( $car_ul.position().left < 213 ){
//             // $car_ul.animate({left: '+=213'}, 400);
//             // console.log( $car_ul.position().left )
//             moveCar( 1 )
//         }
//     }else{
//         if( $car_ul.position().left >= -852 ){
//             // $car_ul.animate({left: '-=213'}, 400);
//             // console.log( $car_ul.position().left )
//             moveCar( -1 )
//         }
//     }
// });
// console.log(touch.on)
// touch.on('.carousel', 'dragstart', function(ev){

//     console.log(ev)

// });

$('.carousel').on('touchstart', function(event){
    if(timer){
        clearInterval(timer); 
        flag = true;
        
    }
    event.preventDefault();
    var $that = $(this),
        mDownX = event.originalEvent.targetTouches[0].pageX,
        mDownTime = +new Date(),
        newLeft = 0,
        moveX = 0,
        stratLeft = $car_ul.position().left;


    $(window).on('touchmove', function(event){
        var mMoveX = event.originalEvent.targetTouches[0].pageX;
        moveX = mMoveX - mDownX;
        newLeft = stratLeft + moveX;
     
        $car_ul.css('left', newLeft);
        examin( newLeft );

    });
    $(window).on('touchend', function(event){

        var mUpX = event.originalEvent.changedTouches[0].pageX,
            mUpTime = +new Date(),
            dis = 0,
            endLeft = 0;
        endLeft = stratLeft + mUpX - mDownX ;
        endLeft = Math.round( endLeft/213 ) * 213;
        if( endLeft < -1065 ){
            endLeft = -1065;
            dis = -1065 - mUpX;
        }else if( endLeft > 213 ){
            endLeft = 213 ;
            dis = 213 - mUpX;
        }else{
            dis = endLeft - mUpX ;
        }
        // if( )
        if( mUpTime > mDownTime+300 ){
            // scroll( mUpX, dis, 200);
            $car_ul.animate( {left: endLeft}, 300 );
            examinFinal( endLeft );
        }else{

            if( Math.abs(moveX) > 180 ){
                moveX > 0 ? moveCar( 5 ) :  moveCar( -5 );
            }else if( Math.abs(moveX) > 150 ){
                moveX > 0 ? moveCar( 4 ) :  moveCar( -4 );
            }else if( Math.abs(moveX) > 120 ){
                moveX > 0 ? moveCar( 3 ) :  moveCar( -3 );
            }else if( Math.abs(moveX) > 90 ){
                moveX > 0 ? moveCar( 2 ) :  moveCar( -2 );
            }else if( Math.abs(moveX) > 60 ){
                moveX > 0 ? moveCar( 1 ) :  moveCar( -1 );
            }else{
                if( !flag ){
                    $car_ul.animate({left: stratLeft}, 300);
                }else{
                    var temp = $car_ul.position().left;
                    temp = Math.round( temp/213 ) * 213;
                    $car_ul.animate( {left: temp}, 300 );
                    examinFinal( temp );
                    flag = false;
                }
            }
        }
       
        $(window).off('touchmove');
        $(window).off('touchend');    
    });

});



var scrollTime = 0;
// console.log( Tween.Quad.easeOut )
function scroll(b, c, d){

    var speed = Math.ceil( Tween.Quad.easeOut( scrollTime, b, c, d) );

    $car_ul.css( 'left', speed );
    examin( $car_ul.position().left );
    
    if( scrollTime < d ){

        scrollTime += 10;
        timer = setTimeout( function(){
            scroll( b, c, d);
        }, 20);
    }
}


function moveCar(num){

    var itemWidth = $car_li.width();
    var beginLeft = $car_ul.position().left;
    var dis = itemWidth * num ; 
    var intLeft = Math.round( (beginLeft + dis) / 213 ) * 213;
    var endLeft = 0;
    scrollTime = 0;

    if( dis > 0 ){
        if( beginLeft + dis > 213 ){
            endLeft = 213 ;
            dis = 213 - beginLeft ;
        }else{
            dis = intLeft - beginLeft;
        }
    }else if( dis < 0){
        if( beginLeft + dis < -1065 ){
            endLeft = -1065 ;
            dis = -1065 -beginLeft ; 
        }else{
            dis = intLeft -beginLeft;
        }
    }

    if( Math.abs(num) ==1 || Math.abs(num) == 2 ){
        scroll( beginLeft, dis, 80);
    }else if( Math.abs(num) ==3 || Math.abs(num) == 4 ){
        scroll( beginLeft, dis, 220);
    }else{
        scroll( beginLeft, dis, 400);
    }
    

}


});
