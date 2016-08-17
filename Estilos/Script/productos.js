$(document).ready(function(){
    $('section').css({"height":$(window).height() + "px"});    
    var flag = false;
    var scroll;
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
            if(scroll > 150) {
                if(!flag){                
                    $("#sec").css({"background-color":"black"});
                    $("div").addClass("divMov");    
                    flag = true;
                }
            }
            else {  
                if(flag) {
                    $("#sec").css({"background-color":"blue"});
                    $("div").removeClass("divMov"); 
                    flag = false;
                }
            }
    });
});