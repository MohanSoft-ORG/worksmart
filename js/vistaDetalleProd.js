$(document).ready(function (){
    $('.cerrar').click(function(){
        $('.mascara').fadeOut('fast');
    });
    $('#cerrarL').click(function(){
        $('.login').fadeOut('fast');
    });
    $('#cerrar1').click(function(){
        $('.mascara1').fadeOut('fast');
    });
    $('.busCaracProd').click(function(){        
        $('#detalleProd').fadeIn('slow');
    });
    $('.item').click(function(){        
        $('#vistaProd').fadeIn('slow');
    });
    
    $('#log').click(function(){
        $('.login').fadeIn('slow');
    });
    
    
    $('#btnDescarga').click(function(){
        $('#resultadoDes').fadeIn('slow');
    });
});