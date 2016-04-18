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

function examin( dis ){
    for( var i=0; i<7; i++){
        var thisLi_left = $('.carousel li').eq(i).position().left + dis;

        if( thisLi_left > 0 && thisLi_left <= 213 ){

            var enlarge_scale = thisLi_left/213*60;
            var mt_scale = -thisLi_left/213*30;

            $('.carousel li').eq(i).find('img').css({width: 120+enlarge_scale, height: 120+enlarge_scale, marginTop: 40+mt_scale });
        }else if( thisLi_left >213 && thisLi_left < 426 ){

            var enlarge_scale = (426-thisLi_left)/213*60;
            var mt_scale = (426-thisLi_left)/213*30;
            $('.carousel li').eq(i).find('img').css({width: 120+enlarge_scale, height: 120+enlarge_scale, marginTop: 40-mt_scale });
        }
    }
}
  
var timer=setInterval(function(){
    if( $('.carousel').position().left > -2000 ){
        var x=$('.carousel').position().left-20;
    $('.carousel').css('left', x+'px');
    console.log(1)
    examin( $('.carousel').position().left )
}
}, 20);  





var cur = 0;

$('.carousel').on('touchstart', function(event){
    event.preventDefault();
    var $that = $(this),
        mDownX = event.originalEvent.targetTouches[0].pageX,
        mDownTime = +new Date(),
        newLeft = 0,
        moveX = 0,
        stratLeft = $(this).position().left;


    $(window).on('touchmove', function(event){
        var mMoveX = event.originalEvent.targetTouches[0].pageX;
        moveX = mMoveX - mDownX;
        newLeft = stratLeft + moveX;
     
        $that.css('left', newLeft);
        examin( newLeft );

    });
    $(window).on('touchend', function(event){

        var mUpX = event.pageX,
            mUpTime = +new Date(),
            endLeft = 0;

        if( mUpTime > mDownTime+300 ){
            if( moveX > 320 ){
                moveCar( false );
            }else if( moveX < -320 ){
                moveCar( true );
            }else{
                $that.animate({left: stratLeft}, 400);
            }
        }else if( mUpTime < mDownTime + 300 ){

            if( moveX > 50 ){
                moveCar( false );
            }else if( moveX < -50 ){
                moveCar( true );
            }else{
                $that.animate({left: stratLeft}, 400);
            }
        }
        $(window).off('touchmove');
        $(window).off('touchend');    
    });

})

function moveCar(flag){
    var itemWidth = $('.carousel li').width();
    flag ? cur++ : cur-- ;

    $('.carousel').animate({left: -cur*itemWidth }, 400, function(){
        $('.carousel').find('li').removeClass('active')
                                    .eq(cur+1).addClass('active');
    });

}



















});
