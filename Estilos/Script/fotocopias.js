$(document).ready(function(){
    $('section').css({"height":$(window).height() + "px"});    
    var scroll;
    
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
            if(scroll > 100) {
                $('#imgLogoToshiba').css({"visibility":"visible","margin-left":"100px"});
            }
            else {  
                $('#imgLogoToshiba').css({"visibility":"hidden","margin-left":"-500px"});
            }
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
            if(scroll > 100) {
                $('#imgToshiba').css({"visibility":"visible","margin-right":"100px"});
            }
            else {  
                $('#imgToshiba').css({"visibility":"hidden","margin-right":"-2500px"});
            }
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
            if(scroll > 100) {
                $('#btnImgToshiba').css({"visibility":"visible","margin-top":"-200px"});
            }
            else {  
                $('#btnImgToshiba').css({"visibility":"hidden","margin-top":"500px"});
            }
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
            if(scroll > 700) {
                $('#imgSharp').show('slow');
            }
            else {  
                $('#imgSharp').fadeOut('fast');
            }
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
            if(scroll > 800) {
                $('#imgLogoSharp').fadeIn('slow');
            }
            else {  
                $('#imgLogoSharp').fadeOut('fast');
            }
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
            if(scroll > 900) {
                $('#btnImgSharp').css({"visibility":"visible","margin-top":"-200px"});
            }
            else {  
                $('#btnImgSharp').css({"visibility":"hidden","margin-top":"500px"});
            }
    });
     
   agregarEvento("btnImgKyocera","click",enviarConsulta);
   agregarEvento("btnImgSharp","click",enviarConsulta);
   agregarEvento("btnImgToshiba","click",enviarConsulta);
    
    
});

function enviarConsulta(){
    console.log(this);
    console.log(this.id);
    var v=this.id.slice(6,this.id.length);
    redireccionar("consulta.html?m="+v);
    
    
}
