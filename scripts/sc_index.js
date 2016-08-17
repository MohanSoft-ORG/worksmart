agregarEventoLoad(iniciar_contexto_index);
var _contextoIngresar;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnIngresar;
var _btnContacto;
var _btnContactoDos;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formIngresar;
var _formContactar;
var _formContactarDos;
var _formDescargas;
var _btnDescargas;

function iniciar_contexto_index(){
   
     _contextoIngresar="usuario";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnIngresar="btnIniciarSesion";
     _btnContacto="btnContactar";
     _btnContactoDos="btnContactar2";
     _btnDescargas="btnBuscarDescarga";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formIngresar="formInicioSesion";
    _formContactar="formContactar";
    _formContactarDos="formContactar2";
    _formDescargas="formDescarga";

   agregarEvento(_btnIngresar,"click",consultarIngreso);
   //agregarEvento("pssClave","keyPress",consultarIngreso);
   agregarEvento(_btnContacto,"click",contactar);
   agregarEvento(_btnContactoDos,"click",contactar);
   agregarEvento(_btnDescargas,"click",buscarArchivoDescargar);
   agregarEvento("selMarca","change",buscarProductoMarca);
   agregarEvento("busProd","click",buscar);
}

function buscar(){
    redireccionar("consulta.html");
}

/* CONSULTAR CONTEXTO */    
function consultarIngreso(e){
    var vf=obtener_valores_formulario(_formIngresar);
        if(vf != false && vf.Texto[0]!="" && vf.Clave[0]!=""){
            var dat={
                nombre_usuario:vf.Texto[0],
                clave:vf.Clave[0]
            };
            consultarDatos(_contextoIngresar,"login",dat,redireccionar_usuario);   
        }else{
            mostrarMensaje("por favor ingresa una clave y un usuario");
        }
    
}

function redireccionar_usuario(d){
    if(d.respuesta){
        var v=eval(d.valores_consultados);
        console.log(v);
        var us={
            id_usuario:v[0].IdUsuario,
            nombre_usuario:v[0].NombreUsuario+" "+v[0].ApellidoUsuario,
            correo_usuario:v[0].CorreoUsuario,
            ultima_actividad:horaCliente(),
            rol:v[0].IdRol
        };
        agregar_session_storage("ssUsuario",us);
        
        abrir_ventana(us);
       
        
    }else{
        mostrarMensaje(d);
    }
}
function contactar(){
     if(this.id=="btnContactar"){
            var vf=obtener_valores_formulario(_formContactar);   
            if(vf){
                //Creo el objeto que voy a enviar con datos a la peticion
                var datos={nombre_contacto:vf.Texto[0],telefono:vf.Texto[1],correo:vf.Texto[2],observaciones:vf.Texto[3]};
                //Invoco mi funcion 
                registrarDato(_contextoIngresar,"contactar",datos,mostrarMensaje,_formContactar);
            }else{
               mostrarMensaje({mensaje:"por favor ingresa valores"});
            }   
     }else{
         var vf=obtener_valores_formulario(_formContactarDos);   
        if(vf){
            //Creo el objeto que voy a enviar con datos a la peticion
            var datos={nombre_contacto:vf.Texto[0],telefono:vf.Texto[1],correo:vf.Texto[2],observaciones:vf.Texto[3]};
            //Invoco mi funcion 
            registrarDato(_contextoIngresar,"contactar",datos,mostrarMensaje,_formContactarDos);
        }else{
           mostrarMensaje({mensaje:"por favor ingresa valores"});
        }   
     }
}
function buscarArchivoDescargar(){
    
 var vf=obtener_valores_formulario(_formDescargas);
 console.log(vf);
        if(vf){
            var dat={
                
                id_producto:vf.Select[1]
            };
            consultarDatos("producto","buscarArchivoDescarga",dat,dibujar_archivos_descarga);   
            //var div=document.getElementById("divDescargables");
            //div.innerHTML="";   
        }else{
            console.log(vf);
        }   
}
function dibujar_archivos_descarga(datos){
    console.log(datos);
    if(datos.respuesta){
        $('#divDescargables').fadeIn('puff');

        var div=document.getElementById("divDescargables");
        div.innerHTML="";
        var h=document.createElement("h2");
        h.innerHTML="Archivos";
        div.appendChild(h);
        var tabla=document.createElement("table");
        tabla.className="tablaDescarga";
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        celda.innerHTML="Descripcion";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Tipo";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Tamaño";
        fila.appendChild(celda);
        var celda=document.createElement("td");
        celda.innerHTML="Nombre Archivo";
        fila.appendChild(celda);
        var celda=document.createElement("td");
        celda.innerHTML="Descargar";
        fila.appendChild(celda);
        
        tabla.appendChild(fila);
        div.appendChild(tabla);
        var arc=eval(datos.valores_consultados);
        for(var a in arc){
            console.log(arc[a].UrlArchivo);
            var fila=document.createElement("tr");

            var celda=document.createElement("td");
            celda.innerHTML=arc[a].NombreArchivo;
            fila.appendChild(celda);

            var celda=document.createElement("td");
            celda.innerHTML=arc[a].categoria_archivo;
            fila.appendChild(celda);
            
            var celda=document.createElement("td");
            var t=new Number(arc[a].Tam);
            //var t2=t/1024;
            celda.innerHTML=t+"bytes";
            fila.appendChild(celda);

            var celda=document.createElement("td");
            celda.innerHTML=arc[a].UrlArchivo;
            fila.appendChild(celda);

            var celda=document.createElement("td");
            var an=document.createElement("a");
            an.innerHTML="↓";

            an.setAttribute("download",arc[a].UrlArchivo);
            an.setAttribute("href","Archivos/Productos/"+arc[a].UrlArchivo);
            celda.appendChild(an);
            fila.appendChild(celda);
            tabla.appendChild(fila);

        }
        div.appendChild(tabla);
    }
    else{
        mostrarMensaje("Lo sentimos no hay archivos para descargar");
    }
}
function buscarProductoMarca(){
    var vf=obtener_valores_formulario(_formDescargas);
        if(vf){
            var dat={
                marca:vf.Select[0]
            };
            consultarDatos("producto","buscarProductoMarca",dat,dibujar_select_productos);   
        }
}
function dibujar_select_productos(datos){
    var s=document.getElementById("selProductos");
    s.innerHTML="";
    var d=eval(datos.valores_consultados);
    for(var i in d){
        var pt=document.createElement("option");
        pt.innerHTML=d[i].NombreProducto;
        pt.value=d[i].IdProducto;
        s.appendChild(pt);
    }
    
}