agregarEventoLoad(iniciar_contexto_filtro);
var _contextoFiltro;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/

var _btnConsultaFiltro;
var _btnConsultarActualizarFiltro;
var _btnConsultarEliminarFiltro;
var _btnCarro;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/

var _formConsultaFiltro;


function iniciar_contexto_filtro(){
   
     _contextoFiltro="producto";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     
     _btnConsultaFiltro="btnBuscarFiltro";
     /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     
     _formConsultaFiltro="formFiltro";
     _btnCarro="liCarro";
    var s=obtener_session_storage("ssListaCarrito");
    if(s!=false){
        carrito_compras=s;
    }
   
   agregarEvento(_btnConsultaFiltro,"click",consultarContexto);
   agregarEvento(_btnCarro,"click",mostrarCarrito);
   consultarContextoInicial(); 
   
}
/* CONSULTAR CONTEXTO */    
function consultarContexto(){
    var vf=obtener_valores_formulario(_formConsultaFiltro);
    
    if(vf){
        var marca=document.getElementsByName("marca");
        var m_arreglo=[];
        var categoria=document.getElementsByName("categoria");
        var ca_arreglo=[];
        var color=document.getElementsByName("color");
        var co_arreglo=[];
        for(var m in  marca){
            console.log(marca[m].value);
            console.log(marca[m].checked);
            if(marca[m].value!=undefined && marca[m].checked){
                m_arreglo.push(marca[m].value);
            }
             
        }
        
        for(var ca in categoria){
            console.log(categoria[ca].value);
            if(categoria[ca].value!=undefined && categoria[ca].checked){
                ca_arreglo.push(categoria[ca].value);
            }
            
        }
        
        for(var co in color){
            console.log(color[co].value);
            if(color[co].value!=undefined && color[co].checked){
                co_arreglo.push(color[co].value);
            }
            
        }
        
        
        var d={
            marcas:m_arreglo,
            categorias:ca_arreglo,
            colores:co_arreglo
        };
        consultarDatos(_contextoFiltro,"consultarFiltro",d,dibujar_resultado_filtro);   
    }else{
        mostrarMensaje("por favor selecciona una opcion del filtro");
    }
    
}
function consultarContextoInicial(){
   
        var marca=document.getElementsByName("marca");
        var m_arreglo=[];
        var categoria=document.getElementsByName("categoria");
        var ca_arreglo=[];
        var color=document.getElementsByName("color");
        var co_arreglo=[];
        for(var m in  marca){
            console.log(marca[m].value);
            console.log(marca[m].checked);
            if(marca[m].value!=null){
                m_arreglo.push(marca[m].value);
            }  
             
            
             
        }
        
        for(var ca in categoria){
            console.log(categoria[ca].value);
            if(categoria[ca].value!=null){
                ca_arreglo.push(categoria[ca].value);
            }
            
            
            
        }
        
        for(var co in color){
            console.log(color[co].value);
            if(color[co].value!=null){
               //co_arreglo.push(color[co].value); 
            }
            
            
            
        }
        
        
        var d={
            marcas:m_arreglo,
            categorias:ca_arreglo,
            colores:co_arreglo
        };
        consultarDatos(_contextoFiltro,"consultarFiltro",d,dibujar_resultado_filtro);   
    
}
function dibujar_resultado_filtro(d){
    if(d.respuesta){
        var datos=eval(d.valores_consultados);
        var lista=document.getElementById("liResultadoFiltro");
        lista.innerHTML="";
        for(var d in datos){
            lista_productos.push(datos[d]);
            var li=document.createElement("li");
            li.setAttribute("id",datos[d].IdProducto);
            var marca=document.createElement("h2");
            marca.innerHTML=datos[d].NombreMarca;
            li.appendChild(marca);
            var nombre=document.createElement("li");
            nombre.innerHTML=datos[d].NombreProducto;
            li.appendChild(nombre);
            var img=document.createElement("img");
           if(datos[d].imagenes!=undefined){
                img.src=datos[d].imagenes[0].DireccionMultimedia;
                console.log(datos[d]);            
                console.log(datos[d].imagenes[0]);
           }else{
               img.src="Estilos/Imagenes/LogoFot.png";
           }
            li.appendChild(img);            
            var tipoFuncional=document.createElement("h4");
            tipoFuncional.innerHTML=datos[d].TipoProducto;
            li.appendChild(tipoFuncional);
            var velocidad=document.createElement("h4");
            velocidad.innerHTML="Velocidad Impresion:"+datos[d].Ppm+" ppm";
            li.appendChild(velocidad);
            var color=document.createElement("h4");
            color.innerHTML="Impreme a: "+datos[d].Color;
            li.appendChild(color);
            var inpVerCaracteristicas=document.createElement("input");
            inpVerCaracteristicas.setAttribute("type","button");
            inpVerCaracteristicas.setAttribute("value","Caracteristicas");
            inpVerCaracteristicas.setAttribute("onclick","verCaracteristicas('"+datos[d].IdProducto+"');");
            li.appendChild(inpVerCaracteristicas);
            var agregarCarrito=document.createElement("input");
            agregarCarrito.setAttribute("type","button");
            agregarCarrito.setAttribute("value","Agregar Cotizacion");
            agregarCarrito.setAttribute("onclick","agregarAlCarrito("+datos[d].IdProducto+")");
            li.appendChild(agregarCarrito);
            
            
            
            var mas=document.createElement("input");
            mas.setAttribute("type","button");
            mas.setAttribute("value","+");
            mas.setAttribute("onclick","sumarCantidad("+datos[d].IdProducto+")");
            li.appendChild(mas);
            
            var cant=document.createElement("input");
            cant.setAttribute("type","text");
            cant.setAttribute("value",1);
            cant.setAttribute("id","cant_"+datos[d].IdProducto);            
            li.appendChild(cant);
            
            var menos=document.createElement("input");
            menos.setAttribute("type","button");
            menos.setAttribute("value","-");
            menos.setAttribute("onclick","restarCantidad("+datos[d].IdProducto+")");
            li.appendChild(menos);
            
            
            
            var listaCaracteristica=document.createElement("ul");
            listaCaracteristica.setAttribute("id","liCar_"+datos[d].IdProducto);
            listaCaracteristica.style.display="none";
            var ca=datos[d].caracteristicas;
            //console.log(ca);
            if(ca!=undefined){
                for(var c in ca){
                    console.log(ca[c]);
                    var lis=document.createElement("li");

                    lis.innerHTML=ca[c].DescripcionCaracteristica;
                    listaCaracteristica.appendChild(lis);

                }
            }
            
            
            li.appendChild(listaCaracteristica);
            lista.appendChild(li);
            console.log(lista);
       }
        
        
    }else{
        mostrarMensaje("No hay productos con la especificacion que buscas");
    }
}


function verCaracteristicas(id){
    
    for(var c in lista_productos){
        if(lista_productos[c].IdProducto==id){
            mostrarCaracteristicas(lista_productos[c]);
            break;
        }
    }
}
function mostrarCaracteristicas(d){
    
   var ul=document.getElementById("liCar_"+d.IdProducto);
   console.log(ul);
   if(ul.style.display=='none'){
   
       ul.style.display='block';
   }else{
   
        ul.style.display='none';
   }
       
}
 

function agregarAlCarrito(id){
    for(var c in lista_productos){
        if(lista_productos[c].IdProducto==id){
            console.log(lista_productos[c]);
            agregarProductoACarro(lista_productos[c]);
            document.getElementById("cant_"+id).value="1";
        }
    }
}

function agregarProductoACarro(d){
    var agregar=true;
    for(var c in carrito_compras){
        if(carrito_compras[c].IdProducto==d.IdProducto){
            agregar=false;
            break;
        }
    }
    if(agregar){
        carrito_compras.push(d);
        agregar_session_storage("ssListaCarrito",carrito_compras);
    }else{
        mostrarMensaje({mensaje:"Ya has agregado este producto al carrito"});
    }
}
function mostrarCarrito(repintar){
    
    if(obtener_session_storage("ssListaCarrito")!=false){
        var lista=document.getElementById("liListaCarro");
        lista.innerHTML="";
        if(repintar!=true){
            if(lista.style.display=='none'){
                lista.style.display='';
            }else{
                lista.style.display='none';
            }
        }
        console.log(carrito_compras);
        for(var c in carrito_compras){
            var li=document.createElement("li");
            li.innerHTML="Nombre producto:"+carrito_compras[c].NombreProducto;
            lista.appendChild(li);
            var li=document.createElement("li");
            li.innerHTML="Cantidad Solictada: "+carrito_compras[c].CantidadSolicitada;
            var inp=document.createElement("input");            
            inp.setAttribute("type","number");
            inp.setAttribute("id","nCant_"+carrito_compras[c].IdProducto);
            inp.setAttribute("value",carrito_compras[c].CantidadSolicitada);
            inp.setAttribute("onchange","cambiarCantidadSolicitada("+carrito_compras[c].IdProducto+");");
            li.appendChild(inp);
            
            var quitar=document.createElement("input");
            quitar.setAttribute("type","button");
            quitar.setAttribute("value","X");
            quitar.setAttribute("onclick","quitarProducto("+carrito_compras[c].IdProducto+")");
            li.appendChild(quitar);            
            
            
            
            
            
            lista.appendChild(li);


        }

            var li=document.createElement("li");
            var i=document.createElement("input");
            i.setAttribute("id","txtNombreSolicitudCarrito");
            i.setAttribute("type","text");
            i.setAttribute("placeholder","Tu nombre");
            li.appendChild(i);
            lista.appendChild(li);

            var i=document.createElement("input");
            i.setAttribute("id","txtCorreoSolicitudCarrito");
            i.setAttribute("type","text");
            i.setAttribute("placeholder","Tu correo");
            li.appendChild(i);
            lista.appendChild(li);

            var i=document.createElement("input");
            i.setAttribute("id","txtTelefonoSolicitudCarrito");
            i.setAttribute("type","text");
            i.setAttribute("placeholder","Tu telefono ");
            li.appendChild(i);
            lista.appendChild(li);


            var i=document.createElement("input");
            i.setAttribute("type","button");
            i.setAttribute("value","Enviar Solicitud");
            i.setAttribute("onclick","solicitarListaCarro()");
            li.appendChild(i);
            
            var i=document.createElement("input");
            i.setAttribute("type","button");
            i.setAttribute("value","Eliminar Solicitud");
            i.setAttribute("onclick","eliminarListaCarro()");
            li.appendChild(i);
            
            lista.appendChild(li);
        }
        else{
            mostrarMensaje("por favor agrega un producto al carrito");
        }
    
}
function solicitarListaCarro(){
    var nom=document.getElementById("txtNombreSolicitudCarrito");
    var corr=document.getElementById("txtCorreoSolicitudCarrito");
    var tel=document.getElementById("txtTelefonoSolicitudCarrito");
    if(nom.value!="" && corr.value!=""){
        var c=obtener_session_storage("ssListaCarrito");
        console.log(c);
        var dat={
            nombre_cliente:nom.value,
            correo_cliente:corr.value,
            telefono_cliente:tel.value,
            lista_carrito:c
        };
        registrarDato("solicitudes","crear",dat,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingresa al menos tu nombre y correo"});
    }
    
}
function sumarCantidad(id){
    
    var c=document.getElementById("cant_"+id);
    var n=new Number(c.value);
    c.value=n+1;
    for(var l in lista_productos){
        if(lista_productos[l].IdProducto==id){
            lista_productos[l].CantidadSolicitada=c.value;
            break;
        }
    }
    
}
function restarCantidad(id){
    var c=document.getElementById("cant_"+id);
    var n=new Number(c.value);
    c.value=n-1;
    for(var l in lista_productos){
        if(lista_productos[l].IdProducto==id){
            lista_productos[l].CantidadSolicitada=c.value;
            break;
        }
    }
    
}
function cambiarCantidadSolicitada(id){

    
    for(var c in carrito_compras){
        if(carrito_compras[c].IdProducto==id){
            carrito_compras[c].CantidadSolicitada=document.getElementById("nCant_"+id).value; 
            break;
        }
    }
    agregar_session_storage("ssListaCarrito",carrito_compras);
}
function eliminarListaCarro(){
    eliminar_session_storage("ssListaCarrito");
}
function quitarProducto(id){
    var s=false;
    for(var q in carrito_compras){
        if(carrito_compras[q].IdProducto==id){
            var i=carrito_compras.indexOf(carrito_compras[q]);
            carrito_compras.splice(i,1);
            s=true;
            break;
        }
        
    }
    if(s){
        agregar_session_storage("ssListaCarrito",carrito_compras);
        mostrarCarrito(true);
    }
    
    
}