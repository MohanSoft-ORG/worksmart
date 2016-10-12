$(document).ready(function(){
    $('section').css({"height":$(window).height() + "px"});    
    var scroll;
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
            if(scroll > 400) {
                $('#tituloPant').fadeIn(2200);
            }
            else {  
                $('#tituloPant').fadeOut('fast');
            }
        scroll = $(window).scrollTop();
            if(scroll > 430) {
                $('#imgPant').show(1500);
            }
            else {    
                $('#imgPant').fadeOut(500);                
            }
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
    
            if(scroll > 520) {
                $('#parrafoPant').css({"margin-left":"2%"});
            }
            else {
                $('#parrafoPant').css({"margin-left":"-200%"});
            }            
    });
    
    
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
    
            if(scroll > 1200) {
                $('.tituloCat').css({"visibility":"visible"});
            }
            else {
                $('.tituloCat').css({"visibility":"hidden"});
            }            
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
    
            if(scroll > 1200) {
                $('.imgCat').css({"margin-left":"0","visibility":"visible"});
            }
            else {
                $('.imgCat').css({"margin-left":"-50px","visibility":"hidden"});
            }            
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
    
            if(scroll > 1250) {
                $('.subTitCat').css({"visibility":"visible","margin-left":"0"});
            }
            else {
                $('.subTitCat').css({"margin-left":"50px","visibility":"hidden"});
            }            
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
    
            if(scroll > 1850) {
                $('#imgServIzq, #imgServDer').css({"visibility":"visible"});
            }
            else {
                $('#imgServIzq, #imgServDer').css({"visibility":"hidden"});
            }            
    });
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
    
            if(scroll > 1900) {
                $('#parrafoServ').css({"visibility":"visible","margin-top":"50px"});
            }
            else {
                $('#parrafoServ').css({"visibility":"hidden","margin-top":"100px"});
            }            
    });
    
    $('#contactoMen').click(function(){
        $('#formContactoMen').toggle('puff');
    });
    $('#iniLo').click(function(){
        $('#formInicio, #formLogin').toggle('puff');
    });
    $('.salirContacto, .salirCrud, .salirDescarga, .salirTabla').click(function(){
        $('.mascara').fadeOut('fast');
    });
    $('.salirMenu').click(function(){
        $('.formulario, .mascara').fadeOut('fast');
    });
    
    //Crud Usuarios
    $('#usu').click(function(){
        $('#crudUsu').toggle('puff');
    });
    $('#crearUsu').click(function(){
        $('#crudUsu').fadeOut('fast');
        $('#formCrearUsu').toggle('puff');
    });
    $('#buscarUsu, #editarUsu, #eliminarUsu').click(function(){
        $('#crudUsu').fadeOut('fast');
        $('#formBuscarUsu').toggle('puff');
    });
    $('#btnBuscarUsuario').click(function(){
        $('#resultadoUsu').css({"visibility":"visible"});
    });
    
    //Crud Productos
    $('#prod').click(function(){
        $('#crudProd').toggle('puff');
    });
    $('#crearProd').click(function(){
        $('#crudProd').fadeOut('fast');
        $('#crearProductoE').toggle('puff');
    });
    $('#buscarProd, #editarProd, #eliminarProd').click(function(){
       $('#crudProd').fadeOut('fast');
        $('#formBuscarProd').toggle('puff');
    });
    
    //CRUD CATEGORIA
    //Crud Productos
    $('#cat').click(function(){
        $('#crudCat').toggle('puff');
    });
    $('#crearCat').click(function(){
        $('#crudCat').fadeOut('fast');
        
    });
    $('#buscarCat, #editarCat, #eliminarCat').click(function(){
       $('#crudCat').fadeOut('fast');
        $('#formBuscarCat').toggle('puff');
    });
    //CRUD PROVEEDOR
    $('#prov').click(function(){
        $('#crudProv').toggle('puff');
    });
    $('#crearProv').click(function(){
        $('#crudProv').fadeOut('fast');
        $('#crearProveedor').toggle('puff');
        
    });
    $('#buscarProv, #editarProv, #eliminarProv').click(function(){
       $('#crudProv').fadeOut('fast');
        $('#formBuscarProv').toggle('puff');
    });
    ///CRUD ENTRADA
    $('#ent').click(function(){
        $('#crudEnt ').toggle('puff');
    });
    $('#crearEntPed').click(function(){
        $('#crudEnt').toggle('puff');
        $('#crearEntPedido').fadeIn('fast');
    });
    $('#crearEntObs').click(function(){
        $('#crudEnt').toggle('puff');
        $('#crearEntObsequio').fadeIn('fast');
        
    });
    $('#crearEntOtr').click(function(){
        $('#crudEnt').toggle('puff');
        $('#crearEntOtros').fadeIn('fast');
        
    });
    $('#crearEntOtr').click(function(){
        $('#crudEnt').fadeOut('fast');
        
    });
    //CRUD SALIDA
    $('#sal').click(function(){
        $('#crudSal').toggle('puff');
    });
    $('#crearSal').click(function(){
        $('#crudSal').fadeOut('fast');
        $('#crearSalida').fadeIn('fast');
    });
    //CRUD CLIENTE
    $('#cli').click(function(){
        $('#crudCli').toggle('puff');
    });
    $('#crearCli').click(function(){
        $('#crudCli').fadeOut('fast');
        $('#crearCliente').toggle('puff');
    });
    $('#buscarCli, #editarCli, #eliminarCli').click(function(){
       $('#crudCli').fadeOut('fast');
        $('#formBuscarCli').toggle('puff');
    });
    //CRUD FACTURA
    $('#fac').click(function(){
        $('#crudFac').toggle('puff');
    });
    $('#crearFac').click(function(){
        $('#crudFac').fadeOut('fast');
        $('#crearFactura').toggle('puff');
        
    });
    //CRUD ARRIENDO
    $('#arr').click(function(){
        $('#crudArr').toggle('puff');
    });
    $('#crearArr').click(function(){
        $('#crudArr').fadeOut('fast');
    });
    $('#buscarArr, #editarArr, #eliminarArr').click(function(){
       $('#crudArr').fadeOut('fast');
        $('#formBuscarArr').toggle('puff');
    });
    //CRUD AGENDA
    $('#age').click(function(){
        $('#crudAge').toggle('puff');
    });
    $('#crearAge').click(function(){
        $('#crudAge').fadeOut('fast');
        
    });
    $('#buscarAge, #editarAge, #eliminarAge').click(function(){
       $('#crudArr').fadeOut('fast');
        $('#formBuscarArr').toggle('puff');
    });
    //CRUD REPORTE
    $('#rep').click(function(){
        $('#crudRep').toggle('puff');
    });
    $('#repoAgenda').click(function(){
        $('#crudRep').fadeOut('fast');
    });
    $('#repoFactura').click(function(){
        $('#crudRep').fadeOut('fast');
    });
    $('#repoEntrada').click(function(){
        $('#crudRep').fadeOut('fast');
     });
    $('#repoSalida').click(function(){
        $('#crudRep').fadeOut('fast');
    });
    $('#repoSolicitud').click(function(){
        $('#crudRep').fadeOut('fast');
    });
    /*DESCARGAR*/
    $('#descargarMen, #descargarMen2').click(function(){
        $('#ventanaDescarga, #formDescarga').toggle('puff');
    });
    
    


});

