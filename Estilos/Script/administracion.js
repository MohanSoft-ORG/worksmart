$(document).ready(function(){
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
    
    
    $('#buscarAge, #editarAge, #eliminarAge').click(function(){
        
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
     });
    $('#repoSalida').click(function(){
        $('#crudRep').fadeOut('fast');
    });
    $('#repoSolicitud').click(function(){
        $('#crudRep').fadeOut('fast');
    });
    
});