/* INSERTAR DATOS
 * {evento_servidor} string que indica la operacion que va a realizar en el servidor
 * {datos} objeto con la estructura que voy a  enviaren la peticion HTTP
 * {funcion_depues} funcion que se realizara despues de recibir la respuesta del servidor
 * {formulario} id formulario que desea limpiar
 *  * */    
function registrarDato(url,evento_server,datos,funcion_despues,formulario){
    
    
    if(datos){
        var miAjax=new miObjetoAjax(url,evento_server,datos);
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
                if(formulario!=undefined){
                    limpiarFormulario(formulario);
                }                 
                 funcion_despues(r);
            
            
        }).fail(function(){});
    
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
   
}
/* INSERTAR DATOS
 * {evento_servidor} string que indica la operacion que va a realizar en el servidor
 * {datos} objeto con la estructura que voy a  enviaren la peticion HTTP
 * {achivo} archivo con la estructura que voy a  enviaren la peticion HTTP
 * {funcion_depues} funcion que se realizara despues de recibir la respuesta del servidor
 * {formulario} id formulario que desea limpiar
 *  * */    
function registrarDatoArchivo(url,evento_server,dat,archivo,funcion_despues,formulario){
    
    
    if(dat){
       var datos={
           operacion:"",
           datos:{}
       };
       var miAjax=new miObjetoAjax(url,evento_server,datos);
       var form_data=new FormData();
       form_data.append("miArchivo",archivo);
       form_data.append("operacion",evento_server);
       datos.operacion=evento_server;
       datos.datos=dat;
       form_data.append("datos",JSON.stringify(datos));
       miAjax.peticion_ajax_upload(form_data);
        
        
        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
                if(formulario!=undefined){
                    limpiarFormulario(formulario);
                }                 
                 funcion_despues(r);
            
            
        }).fail(function(){});
    
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
   
}
/* CONSULTAR DATOS 
 * {evento_servidor} string que indica la operacion que va a realizar en el servidor
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor*/    
function consultarDatos(url,evento_server,datos,funcion_despues){
    
    var miAjax=new miObjetoAjax(url,evento_server,datos);
    miAjax.peticion_ajax();
    
    miAjax.respuestaServidor.success(function(rs){
        var r=devolverValoresServidorConsultar(rs);
        console.log(r.codigo);
        console.log(r.mensaje);
        console.log(r.respuesta);
        console.log(r.valores_consultados);
        //console.log(r.tam);
        //console.log(r.valores_consultados.length);
        funcion_despues(r);
    }).fail(function(){});
    
    
}
/*EDITAR DATOS
 * {evento_servidor} string que indica la operacion que va a realizar en el servidor
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor
 * */
function editarDato(url,evento_server,datos,funcion_despues){
    console.log(datos);
    if(datos){
        
        var miAjax=new miObjetoAjax(url,evento_server,datos);
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
            funcion_despues(r);
        }).fail(function(){});
    
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR DATOS
 * {evento_servidor} string que indica la operacion que va a realizar en el servidor
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor
 *  * 
 * */
function eliminarDato(url,evento_server,datos,funcion_despues){
    
    if(datos){
        var miAjax=new miObjetoAjax(url,evento_server,datos);
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
            funcion_despues(r);
            
        }).fail(function(){});
    
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}