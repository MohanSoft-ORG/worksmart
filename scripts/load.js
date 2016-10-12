var usuario;
var _contexto;
agregarEventoLoad(cargarFuncionesMenu);

function cargarFuncionesMenu(){
    usuario=obtener_session_storage("ssUsuario");
    if(usuario){
          iniciar_contexto_categoria();
          iniciar_contexto_producto();
          iniciar_contexto_usuario(); 
          iniciar_contexto_proveedor(); 
          iniciar_contexto_entrada(); 
          iniciar_contexto_salida(); 
          iniciar_contexto_factura();
          iniciar_contexto_cuenta_cobro();
          iniciar_contexto_cliente(); 
          iniciar_contexto_arriendo(); 
          iniciar_contexto_agenda(); 
          iniciar_contexto_servicio();
          iniciar_contexto_solicitud();
          iniciar_contexto_econtable();
          iniciar_contexto_scontable();
          iniciar_contexto_reportes();
          consultar_menu_rol(usuario);
          agregarEvento("salir","click",salir);
    }else{
        console.log(obtener_session_storage("ssUsuario"));
        mostrarMensaje({mensaje:"Por favor inicia sesion correctamente"});
        location.href="index.html";
    }
  
}
