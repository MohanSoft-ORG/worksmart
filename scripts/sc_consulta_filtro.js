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
    var valor=recibirValorGet();
    //console.log(valor);
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
   consultarContextoInicial(valor); 
   
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
                      //console.log(marca[m].value);
                      //console.log(marca[m].checked);
                      if(marca[m].value!=undefined && marca[m].checked){
                          m_arreglo.push(marca[m].value);
                      }

                  }


                  for(var ca in categoria){
                      //console.log(categoria[ca].value);
                      if(categoria[ca].value!=undefined && categoria[ca].checked){
                          ca_arreglo.push(categoria[ca].value);
                      }

                  }

                  for(var co in color){
                      //console.log(color[co].value);
                      if(color[co].value!=undefined && color[co].checked){
                          co_arreglo.push(color[co].value);
                      }

                  }
        
        if(m_arreglo.length == 0 && ca_arreglo.length == 0 && co_arreglo.length == 0){
                  for(var m in  marca){
                      //console.log(marca[m].value);
                      //console.log(marca[m].checked);
                      if(marca[m].value!=undefined ){
                          m_arreglo.push(marca[m].value);
                      }

                  }


                  for(var ca in categoria){
                      //console.log(categoria[ca].value);
                      if(categoria[ca].value!=undefined ){
                          ca_arreglo.push(categoria[ca].value);
                      }

                  }

                  for(var co in color){
                      //console.log(color[co].value);
                      if(color[co].value!=undefined ){
                          co_arreglo.push(color[co].value);
                      }

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
function consultarContextoInicial(valorGet){
        //console.log(valorGet);
        var marca=document.getElementsByName("marca");
        var m_arreglo=[];
        var categoria=document.getElementsByName("categoria");
        var ca_arreglo=[];
        var color=document.getElementsByName("color");
        var co_arreglo=[];
        if(valorGet.m!=undefined){
           switch(valorGet.m){
                    case "Toshiba":
                        m_arreglo.push(3);
                        break;
                    case "Sharp":
                        m_arreglo.push(2);
                        break;    
                    case "Kyocera":
                        m_arreglo.push(1);
                        break;
                    default:
                        console.log("Marca no registrada");
                        m_arreglo.push(1);
                        m_arreglo.push(2);
                        m_arreglo.push(3);
                    break;
                } 
        }else{
            m_arreglo.push(1);
            m_arreglo.push(2);
            m_arreglo.push(3);
            
        }
    
        if(valorGet.c!=undefined){
            console.log(valorGet.c);
           
            
            ca_arreglo.push(valorGet.c);
        }
        
        
        
        /*for(var co in color){
            console.log(color[co].value);
            if(color[co].value!=null){
               co_arreglo.push(color[co].value); 
            }
            
            
            
        }*/
        
       
        var d={
            marcas:m_arreglo,
            categorias:ca_arreglo,
            colores:co_arreglo
        };
        console.log(d);
        consultarDatos(_contextoFiltro,"consultarFiltro",d,dibujar_resultado_filtro);   
    
}
function dibujar_resultado_filtro(d){
    if(d.respuesta){
        var datos=eval(d.valores_consultados);
        var listaGeneral=document.getElementById("divResultadoFiltro");
        listaGeneral.innerHTML="";
        for(var d in datos){
            lista_productos.push(datos[d]);
            var div =document.createElement("div");
            div.className="productos";
            var h3 =document.createElement("h3");
            h3.innerHTML=datos[d].NombreProducto;
            div.appendChild(h3);
            var div2 =document.createElement("div");
            div2.className="imgProducto";
            var img =document.createElement("img");
            if(datos[d].imagenes!=undefined){
                img.src=datos[d].imagenes[0].DireccionMultimedia;
            }else{
                img.src="n/a";
            }
            
            div2.appendChild(img);
            div.appendChild(div2);
            
            var div3 =document.createElement("div");
            div3.className="caracProd";
            var lista =document.createElement("ul");
           
            var li =document.createElement("li");
            li.innerHTML=datos[d].Color;
            lista.appendChild(li);
            
            var li =document.createElement("li");
            li.innerHTML=datos[d].Ppm+" PPM";
            lista.appendChild(li);
            
            var li =document.createElement("li");
            li.innerHTML=datos[d].TipoProducto;
            lista.appendChild(li);
            
           
            div3.appendChild(lista);
            div.appendChild(div3);
            
            var div4 =document.createElement("div");
            div4.className="accionProd";
            var lista =document.createElement("ul");
            var mas =document.createElement("input");
            mas.setAttribute("type","button");
            mas.setAttribute("value","Caracteristicas");
            mas.className="busCaracProd";
            mas.setAttribute("onclick","verCaracteristicas('"+datos[d].IdProducto+"')");
            var cotizar =document.createElement("input");
            cotizar.setAttribute("type","button");
            cotizar.setAttribute("value","Cotizar");
            cotizar.setAttribute("onclick","agregarAlCarrito('"+datos[d].IdProducto+"')");
            div4.appendChild(mas);
            div4.appendChild(cotizar);
            div.appendChild(div4);
            listaGeneral.appendChild(div);
       }    
       console.log(listaGeneral);
        
        
        
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
    
   /*var ul=document.getElementById("liCar_"+d.IdProducto);
   //console.log(ul);
   if(ul.style.display=='none'){
   
       ul.style.display='block';
   }else{
   
        ul.style.display='none';
   }*/
     $('#detalleProd').fadeIn('slow');
     console.log(d);
     //Imagen
     var img=document.getElementById("imgProd");
     if(d.imagenes!=undefined){
         img.src=d.imagenes[0].DireccionMultimedia;
     }else{
         img.src="n/a";
     }
     //Nombre
     var nom=document.getElementById("hNombreProd");
     nom.innerHTML=d.NombreProducto;
     //Descripcion
     var des=document.getElementById("hDescripProd");
     des.innerHTML=d.DescripcionProducto;
     //Caracteristicas
     var car=document.getElementById("liCaracteristicas");
     car.innerHTML="";
     if(d.caracteristicas!=undefined){
         for(var c in d.caracteristicas){
             var l=document.createElement("li");
             l.innerHTML=d.caracteristicas[c].DescripcionCaracteristica;
             car.appendChild(l);
         }
     }
       
}
 
var indice_carro=1;
function agregarAlCarrito(id){
   
    var o={};
    for(var c in lista_productos){
        if(lista_productos[c].IdProducto==id){
            
            //lista_productos[c].CantidadSolicitada=document.getElementById("nCant_"+id).value;
            lista_productos[c].CantidadSolicitada=1;
            o=lista_productos[c];
            break;
            
            //document.getElementById("nCant_"+id).value="1";
        }
    }
    
    agregarProductoACarro(o);
}

function agregarProductoACarro(d){
    
    var agregar=true;
    //console.log(d);
    for(var c in carrito_compras){
        if(carrito_compras[c].IdProducto==d.IdProducto){
            agregar=false;
            console.log(carrito_compras[c]);
            break;
        }
    }
    console.log(d);
    console.log(agregar);
    if(agregar){
        carrito_compras.push(d);
        indice_carro++;
         console.log(indice_carro);
        agregar_session_storage("ssListaCarrito",carrito_compras);
    }else{
        mostrarMensaje({mensaje:"Ya has agregado este producto al carrito"});
    }
    console.log(carrito_compras);
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
        //console.log(carrito_compras);
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
        //console.log(c);
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
    
    var c=document.getElementById("nCant_"+id);
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
    var c=document.getElementById("nCant_"+id);
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