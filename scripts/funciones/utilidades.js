/**
 * Variables globales con expresiones regulares
 * 
 * */
var rgxEmail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?: |com.es|com|com.co|net.co|co|org|net|biz|info|mobi|cat|es|ar|futbol|rocks|)$/i;
var rgxNumero=/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;

/**
 * url=//Ubicacion del archivo a consultar en la peticion HTTP
 * data= datos enviado en formato Json
 * type=tipo de metodo en este caso con el metodo POST
 * dataType=formato en que se recibe la informacion
 * */
/*funcion para consultar la hora del cliente*/
function horaCliente(){
    var anio= new Date();
    var mes= new Date();
    var dia=new Date();
    var hora=new Date(); 
    var minuto= new Date();
    var segundo= new Date();
    mes.getUTCMonth();
    var h=hora.getHours();
    if(h<=9){
        h="0"+h;
    }
    var minutos=minuto.getMinutes();
    if(minutos<=9){
        minutos="0"+minutos;
    }
    var segundos=segundo.getSeconds();
    if(segundos<=9){
        segundos="0"+segundos;
    }
    var ultActividad=anio.getFullYear()+"-"+(mes.getMonth()+1)+"-"+dia.getDate()+" "+h+":"+minutos+":"+segundos;
    return ultActividad;
    
}
/*Funcion para limpiar un formulario*/
function limpiarFormulario(idForm){
    var form=document.getElementById(idForm);
    if(form!=null){
            for(var i in form.elements){

            if(form.elements[i].nodeName == "TEXTAREA"){
                form.elements[i].value="";  
            }
            //console.log(form.elements[i].type);
            //console.log(form.elements[i].checked);
            //console.log(form.elements[i].value);


            switch(form.elements[i].type){
                case "text":
                    form.elements[i].value="";
                    break;
                case "email":
                    form.elements[i].value="";
                    break;
                case "number":
                    form.elements[i].value="";
                    break;
                case "password":
                    form.elements[i].value="";
                    break;
                case "select-one":
                    form.elements[i].value="0";
                    break;
                case "checkbox":
                    form.elements[i].checked=false;
                    break;
                case "radio":
                    form.elements[i].checked=false;
                break;
            }
        }
    }
    
    console.log(form);
    console.log(idForm);
    
}
/*Funcion para agregar un evento a un elemento del objeto DOCUMENT*/
function agregarEvento(idElemento,evento,funcion){
    if(document.getElementById(idElemento)!=null){
        
        /*console.log("Nombre evento ");
        console.log(evento);
        console.log("Funcion ");
        console.log(funcion);*/
        
        document.getElementById(idElemento).addEventListener(evento,funcion,false);
         
        
        
        
    }else{
        console.log("ERROR");
        console.log("Nombre evento ");
        console.log(evento);
        console.log("Funcion ");
        console.log(funcion);
        console.log("Elemento");
        console.log(idElemento);
        console.log("el elemento no existe");
    }
    
} 
/*Funcion para agregar una funcion al evento load del objeto WINDOW*/
function agregarEventoLoad(funcion){
    window.addEventListener("load",funcion,false);
    
}
/*Funcion para agregar una funcion al evento page show del objeto WINDOW*/
function agregarEventoPageShow(funcion){
    window.addEventListener("pageshow",funcion,false);
}

function redireccionar(url){
    location.href=url;
}
function imprimir(datos){
    console.log(datos);
    console.log(datos.respuesta);
    console.log(datos.valores_consultados);
    
}
function imprimir_en_documento(datos){
    document.write(JSON.stringify(datos.valores_consultados));
}
function mostrarMensaje(dato){
    console.log(dato.mensaje);
    if(dato.mensaje!=undefined){
        alert(dato.mensaje);
    }else{
        alert(dato);
    }
    
}
function validar_igualdad_campos(id1,id2){
    var v1=document.getElementById(id1);
    var v2=document.getElementById(id2);
    if(v1.value==v2.value){
        return true;
    }
    return false;
}

function abrir_ventana(u,ancho,largo){
    
    var w=window;
    w.fullScreen=true;
    //var ancho= screen.availWidth-19;
    //var largo=screen.availHeight-180;
    if(w.open("administracion.html",u.nombre_usuario,"menubar=no,toolbar=no,width="+ancho+","+"height="+largo+",resizable=no,location=no")==null){
         mostrarMensaje("Parece que tiene desabilitadas las ventanas emergentes en su navegador por favor cambie la configuracion para tener acceso");   
    }else{
        location.href="index.html";
    }


}

function consultar_menu_rol(u){
    consultarDatos("usuario","consularRol",{id_rol:u.rol},dibujar_menu);
    
    
}
function dibujar_menu(d){
    var dat=d.valores_consultados;
    for(var d in dat){
        console.log(dat[d]);
        if(dat[d].Crear==0){
            if(dat[d].IdCrear!=""){
                $("#"+dat[d].IdCrear).hide();
            }

        }

        if(dat[d].Consultar==0){
            if(dat[d].IdConsultar!=""){
                $("#"+dat[d].IdConsultar).hide();
            }
        }

        if(dat[d].Actualizar==0){
            if(dat[d].IdActualizar!=""){
                $("#"+dat[d].IdActualizar).hide();
            }

        }

        if(dat[d].Eliminar==0){
            if(dat[d].IdEliminar!=""){
                $("#"+dat[d].IdEliminar).hide();
            }

        }

    }
    
       
    
    
    
}
function cerrar_ventana(){
    
    eliminar_session_storage();
    window.close();
}


function cambiarAccion(){
    switch(this.id){
        //USUARIO
        case "buscarUsu":
                accionUsuario="consulta";
                document.getElementById("h2TituloTabla").innerHTML="Usuarios Consultados";
            break;
        case "editarUsu":
                accionUsuario="editar";
                document.getElementById("h2TituloTabla").innerHTML="Edicion de usuarios";
             break;
         case "eliminarUsu":
                document.getElementById("h2TituloTabla").innerHTML="Deshabilitar Usuarios";
                accionUsuario="eliminar";
             break;
        //PRODUCTO
        case "buscarProd":
             accionUsuario="consulta";
            break;
         case "eliminarProd":
             accionUsuario="eliminar";
            break;
        case "editarProd":
             accionUsuario="editar";
            break;      
        //SERVICIO
        case "buscarSer":
             accionUsuario="consulta";
            break;
         case "eliminarSer":
             accionUsuario="eliminar";
            break;
        case "editarSer":
             accionUsuario="editar";
            break;      
        //PROVEEDOR
        case "buscarProv":
             accionUsuario="consulta";
            break;
        case "eliminarProv":
             accionUsuario="eliminar";
            break;
        case "editarProv":
             accionUsuario="editar";
            break;
         //CATEGORIA
        case "buscarCat":
             accionUsuario="consulta";
            break;
        case "eliminarCat":
             accionUsuario="eliminar";
            break;
        case "editarCat":
             accionUsuario="editar";
            break;
        //CLIENTE
        case "buscarCli":
             accionUsuario="consulta";
            break;
        case "eliminarCli":
             accionUsuario="eliminar";
            break;
        case "editarCli":
             accionUsuario="editar";
            break;
        //ARRIENDO
        case "buscarArr":
             accionUsuario="consulta";
            break;
        case "eliminarArr":
             accionUsuario="eliminar";
            break;
        case "editarArr":
             accionUsuario="editar";
            break;
        case "finalizarArr":
            accionUsuario='finalizar';
            break;
        //AGENDA
        case "buscarAge":
             accionUsuario="consulta";
            break;
        case "eliminarAge":
             accionUsuario="cancelarCita";
            break;
        case "finalizarAge":
             accionUsuario="finalizarCita";
            break;
        case "editarAge":
             accionUsuario="reprogramarCita";
            break;   
         //SOLICITUDES
         case "buscarSol":
             accionUsuario="consulta";
            break;
        case "contactoWeb":
             accionUsuario="consulta";
            break;
         
         
         //DEFAULT   
         default:
             mostrarMensaje({mensaje:"Por favor agrega una accion para el usuario "+accionUsuario});
             break;
    }
}
function iniciar_contexto(){
    
   switch(this.id){
       case "usu":
           _contexto="usuario";
           break;
       case "prod":
           _contexto="producto";
           break;
       case "ser":
         _contexto="servicio";
           break;
       case "cat":
            _contexto="categoria";
           break;
       case "prov":
            _contexto="proveedor";
           break;
       case "ent":
           _contexto="entrada";
           break;
        case "sal":
            _contexto="salida";
           break;
       case "cli":
           _contexto="cliente";
           break;
       case "crearFac":
           _contexto="factura";
           break;
       case "crearCCobro":
           _contexto="cuenta_cobro";
           break;
       
       case "arr":
           _contexto="arriendo";
           break;
       case "age":
           _contexto="agenda";
           break;  
       case "sol":
           _contexto="solicitudes";
           break;      
       case "rep":
           _contexto="reporte";
           break;
       case "crearETipoContable":
           _contexto="econtable";
            break;
       case "crearEContable":
           _contexto="econtable";
            break;
        case "repoEntrada":
           _contexto="econtable";
            break;
       case "crearSTipoContable":
           _contexto="scontable";
            break;
       case "crearSContable":
           _contexto="scontable";
            break;   
        case "repoSalida":
           _contexto="scontable";
            break;        
       case "elementoMenuPrincipal":
           mostrarMensaje({mensaje:"por favor agrega el elemto a la funcion"});
        break;
       default:
           mostrarMensaje({mensaje:"por favor agrega el elemto a la funcion"});
         break;
   }
   
   console.log(_contexto);
}

function salir(){
    
    if(usuario){
     if(confirm("Desea salir de la aplicacion?")){
            //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            id_usuario:usuario.id_usuario
                     
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"cerrarSesion",datos,cerrar_ventana);
        eliminar_session_storage("ssUsuario");
     }
    }else{
       mostrarMensaje({mensaje:"por favor ingresa correctamente al sistema"});
       location.href="index.html";
    }
}


/*
 * Funcion para convertir los valores enviados por GET 
 * a un array
 * 
 * @returns {recibirValorGet.tmparr}
 */
function recibirValorGet(){
   var url=decodeURIComponent(window.location.search);
    var paramstr = url.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};
    
    for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    } 
    console.log("parametros GET"); 
    console.log(params);
    return params;
      
}