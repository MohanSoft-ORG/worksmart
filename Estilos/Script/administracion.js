$(document).ready(function(){
    //Cierra con Tecla ESC
    //evento atento a responder cuando la tecla ya ha si presionada  
    $(document).keyup(function (e){
        if(e.which==27){
            $('.mascara').fadeOut('fast');
        }        
    });
    $('.salirCrud,.salirTabla, .salirContacto').click(function(){
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
    $('#miPerfil').click(function(){
        $('#crudUsu').fadeOut('fast');
        $('#formMiPerfil').toggle('puff');
    });
    $('#buscarUsu, #editarUsu, #eliminarUsu').click(function(){
        $('#crudUsu').fadeOut('fast');
        $('#formBuscarUsu').toggle('puff');
        limpiar_elemento("tblRespuestaUsuario");
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
        limpiar_elemento("tblRespuestaProd");
    });
    $('#crearHojaProd').click(function(){
        $('#crudProd').fadeOut('fast');
        $('#formCrearHojaVida').toggle('puff');
    });
    $('#crearMantenimiento').click(function(){
        $('#crudProd').fadeOut('fast');
        $('#formCrearMantenimiento').toggle('puff');
    });
    $('#crearIns').click(function(){
        $('#crudProd').fadeOut('fast');
        $('#formCrearInsumo').toggle('puff');
    });
    $('#buscarHojaProd').click(function(){
        $('#crudProd').fadeOut('fast');
        $('#formBuscarHojaVida').toggle('puff');
    });
    
    
    //CRUD CATEGORIA
    //Crud Productos
    $('#cat').click(function(){
        $('#crudCat').toggle('puff');
    });
    $('#crearCat').click(function(){
        $('#crudCat').fadeOut('fast');
        $('#crearCategoria').toggle('puff   ');
        
    });
    $('#buscarCat, #editarCat, #eliminarCat').click(function(){
       $('#crudCat').fadeOut('fast');
        $('#formBuscarCat').toggle('puff');
        limpiar_elemento("tblRespuestaCat");
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
        limpiar_elemento("tblRespuestaProv");
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
    $('#crearSalVenta').click(function(){
        $('#crudSal').fadeOut('fast');
        $('#crearSalidaVenta').fadeIn('fast');
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
            limpiar_elemento("tblRespuestaCliente");
    });
    //CRUD FACTURA
    $('#fac').click(function(){
        $('#crudFac').toggle('puff');
    });
    $('#crearFac').click(function(){
        $('#crudFac').fadeOut('fast');
        $('#crearFactura').toggle('puff');
        
    });
    $('#crearCCobro').click(function(){
        $('#crudFac').fadeOut('fast');
            $('#crearDivCCobro').toggle('puff');
        
    });
    //CRUD ARRIENDO
    $('#arr').click(function(){
        $('#crudArr').toggle('puff');
        
    });
    $('#crearArr').click(function(){
        $('#crudArr').fadeOut('fast');
        $('#crearArriendo').fadeIn('fast');
        
    });
    $('#buscarArr, #editarArr, #eliminarArr, #finalizarArr').click(function(){
       $('#crudArr').fadeOut('fast');
       $('#formBuscaArri').fadeIn('fast');
    });
    
    
    
    
    
    //CRUD AGENDA
    $('#age').click(function(){
        $('#crudAge').toggle('puff');
    });
    
    
    
    $('#crearAge').click(function(){
        $('#crudAge').fadeOut('fast');
        $('#crearAgenda').toggle('puff');
    });
    
    
    $('#buscarAge, #editarAge, #eliminarAge, #finalizarAge').click(function(){
        
       $('#crudAge').fadeOut('fast');
        $('#formBuscarAge').toggle('puff');
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
        $('#formBuscarEContable').toggle('puff');
     });
    $('#repoSalida').click(function(){
        $('#crudRep').fadeOut('fast');
         $('#formBuscarSContable').toggle('puff');
    });
    $('#repoSolicitud').click(function(){
        $('#crudRep').fadeOut('fast');
    });
   
    //CRUD SERVICIOS
    //Crud Usuarios
    $('#ser').click(function(){
        
        $('#crudSer').toggle('puff');
    });
    $('#crearSer').click(function(){
        $('#crudSer').fadeOut('fast');
        $('#formCrearSer').toggle('puff');
    });
    $('#buscarSer, #editarSer, #eliminarSer').click(function(){
        $('#crudSer').fadeOut('fast');
        $('#formBuscarSer').toggle('puff');
        limpiar_elemento("tblRespuestaServicio");
    });
    
    //CRUD SOLICITUDES
    //Crud solicitudes
    $('#sol').click(function(){
        $('#crudSol').toggle('puff');
    });
    
    $('#buscarSol').click(function(){
        $('#crudSol').fadeOut('fast');
        $('#formBuscarSol').toggle('puff');
    });
    $('#contactoWeb').click(function(){
        $('#crudConWeb').fadeOut('fast');
        $('#formBuscarConWeb').toggle('puff');
    })
    $('#btnBuscarSolicitud').click(function(){
        $('#resultadoSol').css({"visibility":"visible"});
    });
    $('#suscripciones').click(function(){
        $('#crudConWeb').fadeOut('fast');
        $('#formBuscarSuscripcion').toggle('puff');
             
    });
    //CRUD ENTRADA CONTABLE
    
    $('#crearETipoContable').click(function(){
        $('#crudEnt').fadeOut('fast');
        $('#crearTipoEntContable').toggle('puff');
    });
    $('#crearEContable').click(function(){
        $('#crudEnt').fadeOut('fast');
        $('#crearEntContable').toggle('puff');
    });
    
    //CRUD SALIDA CONTABLE
    $('#crearSTipoContable').click(function(){
        $('#crudSal').fadeOut('fast');
        $('#crearTipoSalContable').toggle('puff');
    });
    $('#crearSContable').click(function(){
        $('#crudSal').fadeOut('fast');
        $('#crearSalContable').toggle('puff');
    });
});

