
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroProducto;
var _btnConsultaProducto;
var _btnConsultarProductoHV;
var _btnSeleccionarActualizarProducto;
var _btnBuscarEliminarProducto;
var _btnEliminarProducto;
var _btnEditarProducto;
var _btnCrearHojaDeVida;
var _btnCrearMantenimiento;
var _btnBuscarHV;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroProducto;
var _formConsultaProducto;
var _formRegistroHojaDeVida;
var _formEliminarProducto;
var _formEdicionProducto;
var _formCrearMantenimiento;
var _formConsultarHV;

var objCrearProducto={
    codigo_producto:"",
    nombre_producto:"",
    descripicion_producto:"",
    tipo_producto:"",
    marca:"",
    categoria:"",
    modelo:"",
    serie:"",
    caracteristicas:[],
    archivos:[],
    imagenes:[],
    color:"",
    ppm:""
};

function iniciar_contexto_producto(){
        
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroProducto="btnCrearProducto";
     _btnConsultaProducto="btnBuscarProducto";
     _btnConsultarProductoHV="btnBuscarProdHv";
     _btnEditarProducto="btnEditarProducto";
     _btnCrearHojaDeVida="btnCrearHojaDeVida";
     _btnCrearMantenimiento="btnCrearMantenimiento";
     _btnBuscarHV="btnBuscarHV";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroProducto="formCrearProducto";
     _formConsultaProducto="formBuscarProducto";
     _formRegistroHojaDeVida="formRegistrarHojaDeVida";
     _formEdicionProducto="formEditarProducto"; 
     _formCrearMantenimiento="formRegistrarMantenimiento";
     _formConsultarHV="formBuscarHV";
    
   agregarEvento(_btnRegistroProducto,"click",registrarContextoProducto);
   agregarEvento(_btnEditarProducto,"click",editarContextoProductoMas);
   agregarEvento("btnAgregarCaracteristica","click",agregarCaracteristica);
   agregarEvento("btnAgregarCaracteristicaEdicion","click",agregarCaracteristica);
   agregarEvento(_btnConsultaProducto,"click",consultarContextoProducto);
   agregarEvento("flArchivoProducto","change",subirArchivosProducto);
   agregarEvento("flArchivoProductoEditar","change",subirArchivosProducto);
   agregarEvento("buscarProd","click",cambiarAccion);
   agregarEvento("editarProd","click",cambiarAccion);
   agregarEvento("eliminarProd","click",cambiarAccion);
   agregarEvento(_btnCrearHojaDeVida,"click",crearHojaDeVida);
   agregarEvento(_btnCrearMantenimiento,"click",crearMantenimiento);
   agregarEvento("prod","click",iniciar_contexto); 
   agregarEvento("flvImagenesProducto","change",subirArchivosImagenProducto);
   agregarEvento("flvImagenesProductoEdicion","change",subirArchivosImagenProducto);
   agregarEvento("btnSubirImgenHojDeVida","click",subirImagenHojaDeVida);
   agregarEvento("crearIns","click",consultar_todos_los_productos);
   agregarEvento("btnCrearInsumo","click",crearInsumo);
   agregarEvento(_btnBuscarHV,"click",consultarHojaDeVida);
   agregarEvento("btnAgregarArchivoGrande","click",agregarArchivoMayorTam);
   agregarEvento("btnAgregarArchivoEdicion","click",agregarArchivoEdicion);
   
   agregarEvento("selArchiivosSubidos","click",consultarArchivosSubidos);
   agregarEvento("selArchiivosSubidosEdicion","click",consultarArchivosSubidosEdicion);
   agregarEvento("txtValidarSerialHV","change",validarSerialEquipoHV);
   agregarEvento("txtSerialMant","change",validarSerialEquipoMan);
   consultarDatos("producto","consultar",{},generar_objetos);   
                        
}

/* INSERTAR CONTEXTO*/    
function registrarContextoProducto(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroProducto);   
    console.log(vf);
    if(vf!=false){
        //Creo el objeto que voy a enviar con datos a la peticion
        var car=[];
        var img=[];
        var arc=[];
        var v;
        
        for(var h in vf.Hidden){
            v=vf.Hidden[h].split("*");
              switch(v[0]){
                
                case "img":
                    if(v[1]!=""){
                        img.push(v[1]);
                    }
                    break;
                case "car":
                    car.push(v[1]);
                    break;
            }
        }
        
        
        
        
            objCrearProducto.codigo_producto=vf.Texto[1];
            objCrearProducto.nombre_producto=vf.Texto[0];
            objCrearProducto.descripicion_producto="";
            objCrearProducto.tipo_producto=vf.Select[2];
            objCrearProducto.marca=vf.Select[0];
            objCrearProducto.categoria=vf.Select[1];
            objCrearProducto.modelo=vf.Texto[2];
            objCrearProducto.serie="";
            objCrearProducto.caracteristicas=car;
            objCrearProducto.imagenes=img;
            objCrearProducto.color=vf.Radio[0];
            objCrearProducto.ppm=vf.Texto[3];
            
        
        
        console.log(objCrearProducto);
        //Invoco mi funcion
        
        registrarDato(_contexto,"crear",objCrearProducto,verificar_resultado);
        
        }
    else{
        mostrarMensaje({mensaje:"por favor ingresa valores "});
    }
    
}
function verificar_resultado(d){
    
    
    if(d.respuesta==true){
        mostrarMensaje(d);
        limpiarFormulario(_formRegistroProducto);
        limpiarFormulario("formCrearProductoInsumo");
        var c=document.getElementsByName("car");
        var a=document.getElementsByName("arc");
        for(var i in c){
            c[i].innerHTML="";
        }
        for(var i in a){
            a[i].innerHTML="";
        }
        
        limpiar_lista("liCaracteristicas"); 
        limpiar_lista("liImagenesProducto");
    }else{
        mostrarMensaje(d);
    }
}
function limpiar_lista(id){
    
    var lista=document.getElementById(id);
    lista.innerHTML="";
    console.log(lista.childNodes.length);
    var l=lista.childNodes.length;
    for(var i =5; i<l;i++){
        lista.removeChild(lista.childNodes[i]);
    }
    console.log(lista);   
}
/* CONSULTAR CONTEXTO */    
function consultarContextoProducto(){
    var vf=obtener_valores_formulario(_formConsultaProducto);
    if(vf){
           var tp=document.getElementsByName("tipo_busqueda_producto");
           console.log(vf);
           var tipo;
           for(var i in tp){
               if(tp[i].checked==true){
                   tipo=tp[i].value;
               }
           }

           switch(tipo){
               case "P":
                     if(vf.Texto[0]=="*"){
                        consultarDatos(_contexto,"consultar",{},dibujar_resultado_tabla_producto);   
                    }else{
                        consultarDatos(_contexto,"consultarPorValor",{valor:vf.Texto[0]},dibujar_resultado_tabla_producto);   
                    }
                   break;
               case "PI":
                   //INSUMOS
                   
                        

                   
                   if(vf.Texto[0]=="*"){
                        consultarDatos(_contexto,"consultarTodosLosInsumos",{},dibujar_resultado_tabla_producto_insumos);   
                    }else{
                        consultarDatos(_contexto,"consultarInsumoPorValor",{valor:vf.Texto[0]},dibujar_resultado_tabla_producto_insumos);   
                    }
                break;
           }
    
        
    }else{
        mostrarMensaje({mensaje:"Por favor ingresa valores"});
    }
    
}
function dibujar_resultado_tabla_producto(datos){
    $('#resultadoProd').fadeIn(500);
    $('#mascara').fadeOut('fast');
    $('#resultadoProd').css({"visibility":"visible"});
    var d=eval(datos.valores_consultados);
    console.log(d);
    if(datos.respuesta){
        var tabla=document.getElementById("tblRespuestaProd");
        tabla.innerHTML="";
        
        var fila=document.createElement("tr");
        
        var celda=document.createElement("td");
        celda.innerHTML="Codigo Producto";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Nombre Producto";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Marca Producto";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Modelo Producto";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Color Producto";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Velocidad impresion";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Tipo Producto";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Categoria";
        fila.appendChild(celda);
        
        
        tabla.appendChild(fila);        
        for(var e in d){
            
            var fila=document.createElement("tr");
            fila.setAttribute("id","prod_"+d[e].CodigoProducto);
            
            switch(accionUsuario){
                case "consulta":
                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].CodigoProducto;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].NombreProducto;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].NombreMarca;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Modelo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Color;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Ppm+" PPM";
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].TipoProducto;
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].NombreCategoria;
                    fila.appendChild(celda);

            
                    break;
                case "editar":
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CodigoProducto);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreProducto);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    var select=document.createElement("select");
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","1");
                    opt.innerHTML="Kyocera";
                    if(d[e].Marca=="1"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","2");
                    opt.innerHTML="Sharp";
                    if(d[e].Marca=="2"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","3");
                    opt.innerHTML="Toshiba";
                    if(d[e].Marca=="3"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                                        
                    
                    
                    celda.appendChild(select);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Modelo);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Color);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Ppm);
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var select=document.createElement("select");
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","Impresora");
                    opt.innerHTML="Impresora";
                    if(d[e].TipoProducto=="Impresora"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","Fotocopiadora");
                    opt.innerHTML="Fotocopiadora";
                    if(d[e].TipoProducto=="Fotocopiadora"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","Multifuncional");
                    opt.innerHTML="Multifuncional";
                    if(d[e].TipoProducto=="Multifuncional"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                    
                    celda.appendChild(select);
                    
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var select=document.createElement("select");
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","3");
                    opt.innerHTML="Bajo Volumen";
                    if(d[e].TipoProducto=="3"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","2");
                    opt.innerHTML="Mediano Volumen";
                    if(d[e].Marca=="2"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","1");
                    opt.innerHTML="Alto Volumen";
                    if(d[e].Marca=="1"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                    
                    celda.appendChild(select);
                    
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","button");
                    inp.setAttribute("value","Editar");
                    inp.setAttribute("onclick","editarContextoProducto('"+d[e].CodigoProducto+"',"+d[e].IdProducto+");");
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","button");
                    inp.setAttribute("value","Mas");
                    inp.setAttribute("onclick","mostrarProductoEditable('"+d[e].CodigoProducto+"','"+d[e].IdProducto+"')");
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    break;
                case "eliminar":
                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].CodigoProducto;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].NombreProducto;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].NombreMarca;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Modelo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Color;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Ppm+" PPM";
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].TipoProducto;
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].NombreCategoria;
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","button");
                    if(d[e].Estado_Producto=="1"){
                        inp.setAttribute("value","Deshabilitar");
                    }else{
                        inp.setAttribute("value","Habilitar");
                    }
                    inp.setAttribute("onClick","eliminarContextoProducto('"+d[e].IdProducto+"');");
                    
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    break;    
                default:
                    mostrarMensaje({mensaje:"Por favor defina un accion para el usuario"});
                    break;
            }
            
            tabla.appendChild(fila);
        }
    }
    else{
        mostrarMensaje(datos);
    }
}

function dibujar_resultado_tabla_producto_insumos(datos){
    $('#resultadoProd').fadeIn(500);
    $('#mascara').fadeOut('fast');
    $('#resultadoProd').css({"visibility":"visible"});
    var d=eval(datos.valores_consultados);
    console.log(d);
    if(datos.respuesta){
        var tabla=document.getElementById("tblRespuestaProd");
        tabla.innerHTML="";
        
        var fila=document.createElement("tr");
        
        var celda=document.createElement("td");
        celda.innerHTML="Producto Padre";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Codigo Producto Insumo";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Nombre Producto Insumo";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Marca Producto Insumo";
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="Valor Producto";
        fila.appendChild(celda);
        
        
        
        
        tabla.appendChild(fila);        
        for(var e in d){
            
            var fila=document.createElement("tr");
            fila.setAttribute("id","prodins_"+d[e].CodigoInsumo);
            console.log(d[e]);
            console.log(accionUsuario);
            switch(accionUsuario){
                
                case "consulta":
                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].CodigoProducto+" "+d[e].NombreProducto;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].CodigoInsumo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].NombreInsumo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].MarcaInsumo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].ValorVentaInsumo;
                    fila.appendChild(celda);

                    
            
                    break;
                case "editar":
                
                    var celda=document.createElement("td");
                    
        
                    var select=document.createElement("select");
                    
                    var opt=document.createElement("option");
                    opt.innerHTML="--Seleccione un producto--";
                    opt.value="0";  
                    select.appendChild(opt);
                    
                    for(var p in productos){
                        console.log(productos[p]);    
                        var opt=document.createElement("option");
                        opt.innerHTML=productos[p].NombreProducto;
                        opt.value=productos[p].IdProducto;
                        if(d[e].Fk_Id_Producto_Insumo==productos[p].IdProducto){
                            opt.setAttribute("selected",true);
                        }
                        select.appendChild(opt);


                    }
                    celda.appendChild(select);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CodigoInsumo);
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreInsumo);
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].MarcaInsumo);
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ValorVentaInsumo);
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","button");
                    inp.setAttribute("value","Editar");
                    inp.setAttribute("onclick","editarContextoProductoInsumo('"+d[e].CodigoInsumo+"','"+d[e].Id_Producto_Insumo+"');");
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    
                    break;
                case "eliminar":
                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].CodigoProducto+" "+d[e].NombreProducto;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].CodigoInsumo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].NombreInsumo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].MarcaInsumo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].ValorVentaInsumo;
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","button");
                    console.log(d[e].EstadoInsumo);
                    if(d[e].EstadoInsumo=="1"){
                        inp.setAttribute("value","Deshabilitar");
                    }else{
                        inp.setAttribute("value","Habilitar");
                    }
                    inp.setAttribute("onClick","eliminarContextoProductoInsumo('"+d[e].Id_Producto_Insumo+"');");
                    
                    celda.appendChild(inp);
                    fila.appendChild(celda);
                    
                    break;    
                default:
                    mostrarMensaje({mensaje:"Por favor defina un accion para el usuario"});
                    break;
            }
            
            tabla.appendChild(fila);
        }
    }
    else{
        mostrarMensaje(datos);
    }
}



function agregarCaracteristica(){
    
    if(this.id=="btnAgregarCaracteristicaEdicion"){
        var div=document.getElementById("liEdicionCaracteristicas");
        var txtCaracteristica=document.getElementById("txtEdicionCaracteristica");
        var txtTipoCaracteristica=document.getElementById("txtEdicionTipoCaracteristica");
        if(txtCaracteristica.value!="" && txtTipoCaracteristica.value!=""){
            var li=document.createElement("li");
            li.setAttribute("name","car");
            var h=document.createElement("h4");
            var hid=document.createElement("input");
            hid.setAttribute("type","hidden");
            hid.setAttribute("value","car*"+txtTipoCaracteristica.value.trim()+" : "+txtCaracteristica.value.trim());
            h.innerHTML=txtTipoCaracteristica.value.trim()+" : "+txtCaracteristica.value.trim();
            li.appendChild(hid);
            li.appendChild(h);
            div.appendChild(li);
            txtCaracteristica.value="";
            txtTipoCaracteristica.value="";
        }
        else{
            mostrarMensaje("Por favor ingresa una caracteristica para agregarla");
        }
    }else{
        var div=document.getElementById("caracteristicas");
        var txtCaracteristica=document.getElementById("txtCaracteristica");
        var txtTipoCaracteristica=document.getElementById("txtTipoCaracteristica");
        if(txtCaracteristica.value!="" && txtTipoCaracteristica.value!=""){
            var li=document.createElement("li");
            li.setAttribute("name","car");
            var h=document.createElement("h4");
            var hid=document.createElement("input");
            hid.setAttribute("type","hidden");
            hid.setAttribute("value","car*"+txtTipoCaracteristica.value.trim()+" : "+txtCaracteristica.value.trim());
            h.innerHTML=txtTipoCaracteristica.value.trim()+" : "+txtCaracteristica.value.trim();
            li.appendChild(hid);
            li.appendChild(h);
            div.appendChild(li);
            txtCaracteristica.value="";
            txtTipoCaracteristica.value="";
        }
        else{
            mostrarMensaje("Por favor ingresa una caracteristica para agregarla");
        }
    }
}
function subirArchivosProducto(){
        
    
        if(this.id=="flArchivoProductoEditar"){
            var vf=obtener_valores_formulario(_formEdicionProducto);
            var dat={};
            var archivo=document.getElementById("flArchivoProductoEditar");

            //var archivo=vf.Archivo[1];
            console.log(archivo);
            console.log(archivo.files);
            //console.log(archivo.files[0]);
            //console.log(archivo.files[0].size);
            if(archivo.files.length>0){
                console.log(archivo[0]);
                if(archivo.files[0].size<=15728639){
                    registrarDatoArchivo(_contexto,"subirArchivo",dat,archivo.files[0],agregar_archivo_lista_edicion);     
                }else{
                    mostrarMensaje({mensaje:"Lo sentimos pero este archivo es muy pesado"});
                }
            }
            
        }else{
            
            var vf=obtener_valores_formulario(_formRegistroProducto);
            var dat={};
            var archivo=document.getElementById("flArchivoProducto");

            //var archivo=vf.Archivo[1];
            console.log(archivo);
            console.log(archivo.files);
            console.log(archivo.files[0]);
            console.log(archivo.files[0].size);
            console.log(archivo[0]);
            if(archivo.files[0].size<=15728639){
                registrarDatoArchivo(_contexto,"subirArchivo",dat,archivo.files[0],agregar_archivo_lista);     
            }else{
                mostrarMensaje({mensaje:"Lo sentimos pero este archivo es muy pesado"});
            }
            
        }
        
       
    
}

function agregar_archivo_lista(datos){
    if(datos.respuesta){
        
        var div=document.getElementById("materialDescargable");
        var nombre=document.getElementById("txtNombreArchivo");
        var flArchivoProducto=document.getElementById("flArchivoProducto");
        var selTipoArchivo=document.getElementById("selTipoArchivo");
        console.log(flArchivoProducto);
        console.log(flArchivoProducto.value);
        var d={
            nombre_archivo:nombre.value,
            direccion:flArchivoProducto.value.split("\\")[2],
            categoria_archivo:selTipoArchivo.value
        }
        objCrearProducto.archivos.push(d);
        
        
        if(flArchivoProducto.value!=""){
            var li=document.createElement("li");
            li.setAttribute("name","arc");

            var hid=document.createElement("input");
            hid.setAttribute("type","hidden");        
            hid.setAttribute("value",flArchivoProducto.value.split("\\")[2]);

            var hid2=document.createElement("input");
            hid2.setAttribute("type","hidden");        
            hid2.setAttribute("value",nombre.value);

            var h=document.createElement("h4");
            h.innerHTML=flArchivoProducto.value.split("\\")[2];
            var h2=document.createElement("h4");
            h2.innerHTML=nombre.value;
            nombre.value="";
            var a=document.createElement("a");
            a.setAttribute("download",flArchivoProducto.value.split("\\")[2]);
            a.setAttribute("href","Archivos/Productos/"+flArchivoProducto.value.split("\\")[2]);
            a.innerHTML="Descargar";
            li.appendChild(hid);
            li.appendChild(hid2);
            li.appendChild(h2);
            li.appendChild(h);
            li.appendChild(a);
            div.appendChild(li);        
        }
        else{
            mostrarMensaje("Por favor ingresa un archivo para agregarlo");
        }
    }
}
function agregar_archivo_lista_edicion(datos){
    if(datos.respuesta){
        
        var div=document.getElementById("materialDescargableEdicion");
        var nombre=document.getElementById("txtEdicionNombreArchivo");
        var flArchivoProducto=document.getElementById("flArchivoProductoEditar");
        var selTipoArchivo=document.getElementById("selTipoArchivoEdicion");
        console.log(flArchivoProducto);
        console.log(flArchivoProducto.value);
        var d={
            nombre_archivo:nombre.value,
            direccion:flArchivoProducto.value.split("\\")[2],
            categoria_archivo:selTipoArchivo.value
        }
        objCrearProducto.archivos.push(d);
        
        
        if(flArchivoProducto.value!=""){
            var li=document.createElement("li");
            li.setAttribute("name","arc");

            var hid=document.createElement("input");
            hid.setAttribute("type","hidden");        
            hid.setAttribute("value","arc*"+flArchivoProducto.value.split("\\")[2]);

            var hid2=document.createElement("input");
            hid2.setAttribute("type","hidden");        
            hid2.setAttribute("value","nom*"+nombre.value);

            var h=document.createElement("h4");
            h.innerHTML=flArchivoProducto.value.split("\\")[2];
            var h2=document.createElement("h4");
            h2.innerHTML=nombre.value;
            nombre.value="";
            var a=document.createElement("a");
            a.setAttribute("download",flArchivoProducto.value.split("\\")[2]);
            a.setAttribute("href","Archivos/Productos/"+flArchivoProducto.value.split("\\")[2]);
            a.innerHTML="Descargar";
            li.appendChild(hid);
            li.appendChild(hid2);
            li.appendChild(h2);
            li.appendChild(h);
            li.appendChild(a);
            div.appendChild(li);        
        }
        else{
            mostrarMensaje("Por favor ingresa un archivo para agregarlo");
        }
    }
}

function subirArchivosImagenProducto(){
    
    
    if(this.id=="flvImagenesProductoEdicion"){
        var vf=document.getElementById("flvImagenesProductoEdicion");
    console.log(vf);
    console.log(vf);
    console.log(vf.files);
    console.log(vf.files[0]);
    console.log(vf.value);
    
    if(vf){
        var dat={};
        if(vf.files[0].size<=15728639){
            registrarDatoArchivo(_contexto,"subirArchivoImagenProducto",dat,vf.files[0],agregar_imagen_lista_sin_imagen_edicion);     
        }else{
             mostrarMensaje({mensaje:"Lo sentimos pero este archivo es muy pesado"});
        }
       //registrarDatoArchivo(_contexto,"subirArchivoImagenProducto",dat,vf.files[0],agregar_imagen_lista);     
    }
        
        
    }else{
        var vf=document.getElementById("flvImagenesProducto");
        console.log(vf);
        console.log(vf);
        console.log(vf.files);
        console.log(vf.files[0]);
        console.log(vf.value);

        if(vf){
            var dat={};
            if(vf.files[0].size<=15728639){
                registrarDatoArchivo(_contexto,"subirArchivoImagenProducto",dat,vf.files[0],agregar_imagen_lista_sin_imagen);     
            }else{
                 mostrarMensaje({mensaje:"Lo sentimos pero este archivo es muy pesado"});
            }
           //registrarDatoArchivo(_contexto,"subirArchivoImagenProducto",dat,vf.files[0],agregar_imagen_lista);     
        }
    }
    
}
function agregar_imagen_lista_sin_imagen(){
    var div=document.getElementById("liImagenesProducto");
    var flArchivoProducto=document.getElementById("flvImagenesProducto");
    console.log(flArchivoProducto);
    console.log(flArchivoProducto.value);
    if(flArchivoProducto.value!=""){
        var li=document.createElement("li");
        li.setAttribute("name","arc");
        var h=document.createElement("h4");
        var hidden=document.createElement("input");
        hidden.setAttribute("type","hidden");
        hidden.setAttribute("value","img*"+flArchivoProducto.value.split("\\")[2]);
        /*var img=document.createElement("img");
        
        img.width='100';
        img.height='100';
        img.setAttribute("src","GaleriaProductos/"+flArchivoProducto.value.split("\\")[2]);
        li.appendChild(img);*/
        h.innerHTML=flArchivoProducto.value.split("\\")[2];
        
        
        
        li.appendChild(hidden);
        li.appendChild(h);
        
        div.appendChild(li);        
    }else{
        mostrarMensaje("Por favor ingresa un archivo para agregarlo");
    }
}
function agregar_imagen_lista_sin_imagen_edicion(){
    var div=document.getElementById("liEdicionImagenesProducto");
    var flArchivoProducto=document.getElementById("flvImagenesProductoEdicion");
    console.log(flArchivoProducto);
    console.log(flArchivoProducto.value);
    if(flArchivoProducto.value!=""){
        var li=document.createElement("li");
        li.setAttribute("name","arc");
        var h=document.createElement("h4");
        var hidden=document.createElement("input");
        hidden.setAttribute("type","hidden");
        hidden.setAttribute("value","img*"+flArchivoProducto.value.split("\\")[2]);
        /*var img=document.createElement("img");
        
        img.width='100';
        img.height='100';
        img.setAttribute("src","GaleriaProductos/"+flArchivoProducto.value.split("\\")[2]);
        li.appendChild(img);*/
        h.innerHTML=flArchivoProducto.value.split("\\")[2];
        
        
        
        li.appendChild(hidden);
        li.appendChild(h);
        
        div.appendChild(li);        
    }else{
        mostrarMensaje("Por favor ingresa un archivo para agregarlo");
    }
}
function agregar_imagen_lista_con_imagen(){
    var div=document.getElementById("liImagenesProducto");
    var flArchivoProducto=document.getElementById("flvImagenesProducto");
    console.log(flArchivoProducto);
    console.log(flArchivoProducto.value);
    if(flArchivoProducto.value!=""){
        var li=document.createElement("li");
        li.setAttribute("name","arc");
        var h=document.createElement("h4");
        var hidden=document.createElement("input");
        hidden.setAttribute("type","hidden");
        hidden.setAttribute("value","img*"+flArchivoProducto.value.split("\\")[2]);
        var img=document.createElement("img");
        
        img.width='100';
        img.height='100';
        img.setAttribute("src","GaleriaProductos/"+flArchivoProducto.value.split("\\")[2]);
        h.innerHTML=flArchivoProducto.value.split("\\")[2];
        
        
        li.appendChild(img);
        li.appendChild(hidden);
        li.appendChild(h);
        
        div.appendChild(li);        
    }else{
        mostrarMensaje("Por favor ingresa un archivo para agregarlo");
    }
}


function subirImagenHojaDeVida(){
   
    var vf=document.getElementById("flvSubirArchivoImagenesHojaDeVida");
    console.log(vf);
    console.log(vf);
    console.log(vf.files);
    console.log(vf.files[0]);
    console.log(vf.value);

    if(vf){
        var dat={};
        if(vf.files[0].size<=15728639){
            registrarDatoArchivo(_contexto,"subirArchivoHojaDeVidaProducto",dat,vf.files[0],agregar_imagen_lista_hoja_de_vida);     
        }else{
             mostrarMensaje({mensaje:"Lo sentimos pero este archivo es muy pesado"});
        }
       //registrarDatoArchivo(_contexto,"subirArchivoImagenProducto",dat,vf.files[0],agregar_imagen_lista);     
    }



}
function agregar_imagen_lista_hoja_de_vida(){
    var div=document.getElementById("divMisImagenes");
    var flArchivoProducto=document.getElementById("flvSubirArchivoImagenesHojaDeVida");
    console.log(flArchivoProducto);
    console.log(flArchivoProducto.value);
    if(flArchivoProducto.value!=""){
        var li=document.createElement("li");
        li.setAttribute("name","arc");
        var h=document.createElement("h4");
        var hidden=document.createElement("input");
        hidden.setAttribute("type","hidden");
        hidden.setAttribute("value","img*"+flArchivoProducto.value.split("\\")[2]);
        var img=document.createElement("img");
        
        img.width='100';
        img.height='100';
        img.setAttribute("src","HojasDeVida/"+flArchivoProducto.value.split("\\")[2]);
        h.innerHTML=flArchivoProducto.value.split("\\")[2];
        
        
        li.appendChild(img);
        li.appendChild(hidden);
        li.appendChild(h);
        
        div.appendChild(li);      
        
        var d={
            url:flArchivoProducto.value.split("\\")[2],
            tam:flArchivoProducto.files[0].size
        };
        objCrearProducto.imagenes.push(d);
    }else{
        mostrarMensaje("Por favor ingresa un archivo para agregarlo");
    }
}
/*EDITAR CONTEXTO*/
function editarContextoProducto(cod,id){
    console.log(id);
    var val=obtener_valores_filas_tabla("prod_"+cod);
    console.log(val);
    if(val.length > 0){
        var datos={
            id_producto:id,
            codigo_producto:val[0],
            nombre_producto:val[1],
            descripcion_producto:"",
            marca:val[2],            
            color:val[4],
            modelo:val[3],
            Ppm:val[5],
            tipoProducto:val[6],
            categoria:val[7]
        
        };
        editarDato(_contexto,"actualizar",datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
function mostrarProductoEditable(cod,id){
   
    var val=obtener_valores_filas_tabla(cod);
    if(val.length > 0){
        var datos={
            valor:cod
                    
        
        };
        objCrearProducto.id_producto=id;
        
        editarDato(_contexto,"consultarPorValor",datos,dibujarProductoEditable);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
function dibujarProductoEditable(datos){
    var d=eval(datos.valores_consultados);
    $('#crudProd').fadeOut('fast');
    $('#editarProductoE').toggle('puff');
    
    if(datos.respuesta){
        /**
         * AQUI CARGAR DATOS PRODUCTO
         * 
         * */
        for(var p in d){
            console.log(d[p]);
            document.getElementById("selMarcaEdicion").value=d[p].Marca;
            document.getElementById("selEditarCategoriaProducto").value=d[p].Fk_Id_Categoria_Producto;
            document.getElementById("selEdicionTipoProducto").value=d[p].TipoProducto;
            document.getElementById("txtEdicionNombreProducto").value=d[p].NombreProducto;
            document.getElementById("txtEdicionCodigoProducto").value=d[p].CodigoProducto;
            document.getElementById("txtEdicionModelo").value=d[p].Modelo;
            document.getElementById("txtEdicionPPM").value=d[p].Ppm;
            if(d[p].Color="Color"){
                document.getElementById("rdBN").checked=true;
            }else{
                document.getElementById("rdColor").checked=true;
            }
            
            
            
            var listaImg=document.getElementById("liEdicionImagenesProducto");
            for(var i in d[p].imagenes){
                console.log(d[p].imagenes);
                var li=document.createElement("li");
                var img=document.createElement("img");
                var h4=document.createElement("h4");
                h4.innerHTML="Quitar";
                h4.setAttribute("onClick","quitarImagen('"+d[p].imagenes[i].IdMultimediaProducto+"')");
                img.src=d[p].imagenes[i].DireccionMultimedia;
                img.width="100";
                img.heigth="100";
                li.appendChild(img);
                li.appendChild(h4);
                listaImg.appendChild(li);
            }
            
            var listaArchivosDescargables=document.getElementById("listaArchivosDescargables");
            for(var ar in d[p].archivos){
                console.log(d[p].archivos[ar].UrlArchivo);
                var li=document.createElement("li");
                var h4=document.createElement("h4");
                h4.innerHTML=d[p].archivos[ar].NombreArchivo;
                li.appendChild(h4);
                var h4=document.createElement("h4");
                h4.innerHTML=d[p].archivos[ar].categoria_archivo;
                li.appendChild(h4);
                var h4=document.createElement("h4");
                h4.innerHTML=d[p].archivos[ar].Tam;
                li.appendChild(h4);
                var a=document.createElement("a");
                a.setAttribute("download",d[p].archivos[ar].UrlArchivo);
                a.setAttribute("href",d[p].archivos[ar].UrlArchivo);
                a.innerHTML="↓";
                li.appendChild(a);
                var h4=document.createElement("h4");
                h4.innerHTML="Quitar";
                h4.setAttribute("onClick","quitarArchivo('"+d[p].archivos[ar].Id_Recurso+"')");
                li.appendChild(h4);
                listaArchivosDescargables.appendChild(li);
            }
            
            var liEdicionCaracteristicas=document.getElementById("liEdicionCaracteristicas");
            for(var c in d[p].caracteristicas){
                console.log(d[p].caracteristicas[c]);
                var li=document.createElement("li");
                var h4=document.createElement("h4");
                h4.innerHTML=d[p].caracteristicas[c].DescripcionCaracteristica;
                li.appendChild(h4);
                var h4=document.createElement("h4");
                h4.innerHTML="Quitar";
                h4.setAttribute("onClick","quitarCaracteristica('"+d[p].caracteristicas[c].IdCaracteristica+"')");
                li.appendChild(h4);
                liEdicionCaracteristicas.appendChild(li);
            }
        
        
        
        }
        
        
        
        
    }else{mostrarMensaje({mensaje:"Error al cargar datos dle usuario"})}
    
    
}
function editarContextoProductoMas(){
    
    
    var vf=obtener_valores_formulario(_formEdicionProducto);   
    console.log(vf);
    if(vf!=false){
        //Creo el objeto que voy a enviar con datos a la peticion
        var car=[];
        var img=[];
        var arc=[];
        var v;
        
        for(var h in vf.Hidden){
            v=vf.Hidden[h].split("*");
            
            switch(v[0]){
                case "arc":
                    if(v[1]!=""){
                        arc.push(v[1]);
                    }
                    break;
                case "img":
                    if(v[1]!=""){
                        img.push(v[1]);
                    }
                    break;
                case "car":
                    car.push(v[1]);
                    break;
            }
        }
        
        
        
           
            objCrearProducto.codigo_producto=vf.Texto[1];
            objCrearProducto.nombre_producto=vf.Texto[0];
            objCrearProducto.descripicion_producto="";
            objCrearProducto.tipo_producto=vf.Select[2];
            objCrearProducto.marca=vf.Select[0];
            objCrearProducto.categoria=vf.Select[1];
            objCrearProducto.modelo=vf.Texto[2];
            objCrearProducto.serie="";
            objCrearProducto.caracteristicas=car;
            objCrearProducto.imagenes=img;
            objCrearProducto.color=vf.Radio[0];
            objCrearProducto.ppm=vf.Texto[3];
            
        
        
        console.log(objCrearProducto);
        //Invoco mi funcion
        
        editarDato(_contexto,"actualizarMas",objCrearProducto,verificar_resultado_edicion);
        
        }
    else{
        mostrarMensaje({mensaje:"por favor ingresa valores "});
    }
    
}
function verificar_resultado_edicion(d){
    
    
    if(d.respuesta==true){
        mostrarMensaje(d);
        limpiarFormulario(_formEdicionProducto);
        var c=document.getElementsByName("car");
        var a=document.getElementsByName("arc");
        for(var i in c){
            c[i].innerHTML="";
        }
        for(var i in a){
            a[i].innerHTML="";
        }
        
        limpiar_lista("liEdicionImagenesProducto"); 
        limpiar_lista("listaArchivosDescargables");
        limpiar_lista("liEdicionCaracteristicas");
    }else{
        mostrarMensaje(d);
    }
}
function quitarImagen(id){
    if(confirm("desea quitar esta imagen")){
        editarDato(_contexto,"quitarImagen",{id:id},mostrarMensaje);
    }
}
function quitarCaracteristica(id){
    if(confirm("desea quitar esta caracteristica")){
        
        editarDato(_contexto,"quitarCaracteristica",{id:id},mostrarMensaje);
    }
}
function quitarArchivo(id){
    if(confirm("desea quitar este archivo")){
        editarDato(_contexto,"quitarArchivo",{id:id},mostrarMensaje);
    }
}
function editarContextoProductoInsumo(cod,id){
    console.log(id);
    var val=obtener_valores_filas_tabla("prodins_"+cod);
    console.log(val);
    if(val.length > 0){
        var datos={
            id_producto:id,
            codigo_producto:val[1],
            nombre_producto:val[2],
            marca:val[3],            
            valor:val[4],
            producto_padre:val[0]
        
        };
        editarDato(_contexto,"actualizarInsumo",datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}

/* ELIMINAR CONTEXTO*/
function eliminarContextoProducto(id){
   
    if(id!=undefined){
        eliminarDato(_contexto,"eliminar",{id_producto:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
function eliminarContextoProductoInsumo(id){
   
    if(id!=undefined){
        eliminarDato(_contexto,"eliminarInsumo",{id_producto:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/*function consultarContextoProductoHojaVida(){
    var vf=obtener_valores_formulario(_formRegistroHojaDeVida);
    console.log(vf);
    if(vf){
        consultarDatos(_contexto,"consultarPorValor",{valor:vf.Texto[0]},dibujar_resultado_consulta_h_v);   
    }else{
        mostrarMensaje({mensaje:"Por favor ingresa valores"});
    }
}*/

function dibujar_resultado_consulta_h_v(datos){
    $('#formCrearHojaVida').css({"visibility":"visible"});
    var d=eval(datos.valores_consultados);
    console.log(d);
    var hNombreProducto=document.getElementById("hNombreProducto");
    var hdIdProducto=document.getElementById("hdIdProducto");
    hNombreProducto.innerHTML=d[0].NombreProducto;
    hdIdProducto.value=d[0].IdProducto;
    
    
}
function crearHojaDeVida(){
    var vf=obtener_valores_formulario(_formRegistroHojaDeVida);   
    console.log(vf);
    if(vf!=false && vf.Texto.length>0 && vf.Select.length>0){
        var dat={
            id_producto:vf.Select[0],
            serial:vf.Texto[0],
            imagenes:objCrearProducto.imagenes
        };
        
        //Creo el objeto que voy a enviar con datos a la peticion
        registrarDato(_contexto,"crearHojaDeVida",dat,validarHojaDeVida,_formRegistroHojaDeVida);
        
        }
    else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function validarHojaDeVida(d){
    if(d.respuesta){
        limpiar_elemento("divMisImagenes");
        mostrarMensaje(d);
    }else{
        mostrarMensaje(d);
    }
}
function crearMantenimiento(){
    console.log("formCrearMantenimiento");
    var vf=obtener_valores_formulario(_formCrearMantenimiento);   
    console.log(vf);
    console.log(vf.Archivo);
    console.log(vf.Archivo[0][0]);
    //console.log(vf.Archivo[0].files[0]);
    if(vf!=false){
        var dat={
            codigo_producto:vf.Texto[0],
            descripcion:vf.Texto[1],
            id_empleado:obtener_id_usuario(),
            hora_cliente:horaCliente()
        };
        
        //Creo el objeto que voy a enviar con datos a la peticion
        
        registrarDatoArchivo(_contexto,"crearMantenimiento",dat,vf.Archivo[0][0],mostrarMensaje,_formCrearMantenimiento);
        
        }
    else{
        mostrarMensaje({mensaje:"por favor ingresa valores "});
    }
}
function subirImagenMantenimiento(){
    var vf=document.getElementById("flArchivoMantenimiento");
    console.log(vf);
    console.log(vf);
    console.log(vf.files);
    console.log(vf.files[0]);
    console.log(vf.value);

    if(vf){
        var dat={};
        if(vf.files[0].size<=15728639){
            registrarDatoArchivo(_contexto,"subirArchivoMantenimientoProducto",dat,vf.files[0],agregar_documento_lista_mantenimiento);     
        }else{
             mostrarMensaje({mensaje:"Lo sentimos pero este archivo es muy pesado"});
        }
       //registrarDatoArchivo(_contexto,"subirArchivoImagenProducto",dat,vf.files[0],agregar_imagen_lista);     
    }
}
function agregar_documento_lista_mantenimiento(){
    var div=document.getElementById("divMiListaArchivoMantenimiento");
    var flArchivoProducto=document.getElementById("flArchivoMantenimiento");
    console.log(flArchivoProducto);
    console.log(flArchivoProducto.value);
    var lista=document.createElement("ul");
    if(flArchivoProducto.value!=""){
        var li=document.createElement("li");
        li.setAttribute("name","arc");
        var h=document.createElement("h4");
        var hidden=document.createElement("input");
        hidden.setAttribute("type","hidden");
        hidden.setAttribute("value","arc_man*"+flArchivoProducto.value.split("\\")[2]);
        var img=document.createElement("img");
        
        img.width='100';
        img.height='100';
        img.setAttribute("src","Mantenimientos/"+flArchivoProducto.value.split("\\")[2]);
        h.innerHTML=flArchivoProducto.value.split("\\")[2];
        
        
        li.appendChild(img);
        li.appendChild(hidden);
        li.appendChild(h);
        
        lista.appendChild(li);      
        div.appendChild(lista);
        
    }else{
        mostrarMensaje("Por favor ingresa un archivo para agregarlo");
    }
}
function consultar_todos_los_productos(){
    
    consultarDatos(_contexto,"consultar",{},crear_select_productos_insumos);   
    
}
function crear_select_productos(id){
    if(productos!=undefined){
        
        
       //console.log(colorActivo);
       //console.log(colorInactivo);
       var select=document.getElementById(id);
       select.innerHTML="";
       var opt=document.createElement("option");
       opt.innerHTML="--Seleccione un producto--";
       opt.value="0";  
       select.appendChild(opt);
       for(var d in productos){

           var opt=document.createElement("option");
           opt.innerHTML=productos[d].NombreProducto;
           opt.value=productos[d].IdProducto;
           select.appendChild(opt);


       }
    }else{
       var select=document.getElementById("selProductosInsumo");
       select.innerHTML="";
       var opt=document.createElement("option");
       opt.innerHTML="--No hay productos registrados--";
       opt.value="0";  
       select.appendChild(opt);
        
    }
}
function crear_select_productos_insumos(dat){
    if(dat.respuesta){
        var datos=eval(dat.valores_consultados);
        console.log(datos);
       //console.log(colorActivo);
       //console.log(colorInactivo);
       var select=document.getElementById("selProductosInsumo");
       select.innerHTML="";
       var opt=document.createElement("option");
       opt.innerHTML="--Seleccione un producto--";
       opt.value="0";  
       select.appendChild(opt);
       for(var d in datos){

           var opt=document.createElement("option");
           opt.innerHTML=datos[d].NombreProducto;
           opt.value=datos[d].IdProducto;
           select.appendChild(opt);


       }
    }else{
       var select=document.getElementById("selProductosInsumo");
       select.innerHTML="";
       var opt=document.createElement("option");
       opt.innerHTML="--No hay productos registrados--";
       opt.value="0";  
       select.appendChild(opt);
        
    }
}
function crearInsumo(){
    var vf=obtener_valores_formulario("formCrearProductoInsumo");   
    console.log(vf);
    if(vf!=false){
        //Creo el objeto que voy a enviar con datos a la peticion
        //Invoco mi funcion
        var dat={
            codigo:vf.Texto[0],
            marca:vf.Texto[1],
            nombre_insumo:vf.Texto[2],
            descripcion:vf.Texto[3],
            valor_venta:vf.Texto[4],
            id_producto:vf.Select[0]
        };
        registrarDato(_contexto,"crearInsumo",dat,verificar_resultado);
        
        }
    else{
        mostrarMensaje({mensaje:"por favor ingresa valores "});
    }
}
function consultarHojaDeVida(){
    var vf=obtener_valores_formulario(_formConsultarHV);
    console.log(vf);
    if(vf){
        consultarDatos(_contexto,"consultarHojaVida",{serial:vf.Texto[0]},dibujar_resultado_consulta_producto_h_v);   
    }else{
        mostrarMensaje({mensaje:"Por favor ingresa valores"});
    }
}
function dibujar_resultado_consulta_producto_h_v(datos){
    console.log(datos);
    
    $('#resultadoHV').fadeIn(500);
    $('#mascara').fadeOut('fast');
    $('#resultadoHV').css({"visibility":"visible"});
    
    if(datos.respuesta){
        
        
        var d=eval(datos.valores_consultados);
        var lista=document.getElementById("liRespuestaHV");
        lista.innerHTML="";
        for(var i in d){
            console.log(d[i]);
            var li=document.createElement("li");            
            var h2=document.createElement("h2");
            h2.innerHTML="Serial Producto: "+d[i].Serial;
            li.appendChild(h2);
            lista.appendChild(li);
            
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="Codigo Producto: "+d[i].CodigoProducto;
            li.appendChild(h2);
            lista.appendChild(li);
            
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="Nombre Producto: "+d[i].NombreProducto;
            li.appendChild(h2);
            lista.appendChild(li);
            
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="Modelo Producto: "+d[i].Modelo;
            li.appendChild(h2);
            lista.appendChild(li);
            
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="Marca: "+d[i].NombreMarca;
            li.appendChild(h2);
            lista.appendChild(li);
            
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="Categoria: "+d[i].NombreCategoria;
            li.appendChild(h2);
            lista.appendChild(li);
            
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="Tipo: "+d[i].TipoProducto;
            li.appendChild(h2);
            lista.appendChild(li);
            
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="Color:"+d[i].Color;
            li.appendChild(h2);
            lista.appendChild(li);
            
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="Velocidad PPM"+d[i].Ppm;
            li.appendChild(h2);
            lista.appendChild(li);
            
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="CARACTERISTICAS";
            li.appendChild(h2);
            lista.appendChild(li);
            
            var h2=document.createElement("h2");
            h2.innerHTML="";
            li.appendChild(h2);
            lista.appendChild(li);
            
            for(var car in d[i].caracteristicas){
                
                var h2=document.createElement("h2");
                h2.innerHTML=" - "+d[i].caracteristicas[car].DescripcionCaracteristica;
                li.appendChild(h2);
                lista.appendChild(li);
                
            }
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="INSUMOS";
            li.appendChild(h2);
            lista.appendChild(li);
            
            var h2=document.createElement("h2");
            h2.innerHTML="";
            li.appendChild(h2);
            lista.appendChild(li);
                
            for(var ins in d[i].insumos){
                console.log(d[i].insumos[ins]);
                console.log(d[i].insumos[ins].NombreInsumo);
                
                if(d[i].insumos[ins].NombreInsumo!=undefined){
                    var h2=document.createElement("h2");
                    h2.innerHTML=" - "+d[i].insumos[ins].NombreInsumo;
                    li.appendChild(h2);
                    lista.appendChild(li);
                }
                
            }
            
            var li=document.createElement("li");
            for(var img in d[i].imagenes){
                var h2=document.createElement("h2");
                h2.innerHTML=" - "+d[i].imagenes[i].NombreMultimedia;
                li.appendChild(h2);
                //lista.appendChild(li);
            }
                var li=document.createElement("li");
                var h2=document.createElement("h2");
                h2.innerHTML="ARCHIVOS";
                li.appendChild(h2);
                lista.appendChild(li);

                var h2=document.createElement("h2");
                h2.innerHTML="";
                li.appendChild(h2);
                lista.appendChild(li);
            
            for(var arc in d[i].archivos){
                var h2=document.createElement("h2");
                h2.innerHTML=" - "+d[i].archivos[arc].NombreArchivo;
                li.appendChild(h2);
                
                var h2=document.createElement("h2");
                h2.innerHTML="↓";
                li.appendChild(h2);
                
                lista.appendChild(li);
            }
            var li=document.createElement("li");
            var h2=document.createElement("h2");
            h2.innerHTML="MANTENIMIENTOS";
            li.appendChild(h2);
            lista.appendChild(li);
            
            var h2=document.createElement("h2");
            h2.innerHTML="";
            li.appendChild(h2);
            lista.appendChild(li);
            
            for(var man in d[i].mantenimientos){
                var h2=document.createElement("h2");
                h2.innerHTML="Fecha: - "+d[i].mantenimientos[man].FechaMatenimiento;
                li.appendChild(h2);
                
                var h2=document.createElement("h2");
                h2.innerHTML="Tarea realizada: - "+d[i].mantenimientos[man].DescripcionMantenimiento;
                li.appendChild(h2);
                
                var h2=document.createElement("h2");
                h2.innerHTML="Tecnico responsable - "+d[i].mantenimientos[man].NombreEmpleado+" "+d[i].mantenimientos[man].ApellidoEmpleado;
                li.appendChild(h2);
                
                var a=document.createElement("a");
                a.setAttribute("href","Archivos/Mantenimientos/"+d[i].mantenimientos[man].urlHojaServicio);
                a.setAttribute("download",d[i].mantenimientos[man].urlHojaServicio.split('/')[1]);
                a.innerHTML="Hoja de servicio - ";
                li.appendChild(a);
                
                lista.appendChild(li);
            }

        }
    limpiarFormulario(_formConsultarHV);    
        
    }else{mostrarMensaje("Lo sentimos pero no existe una hoja de vida para este serial");}
    
}
function agregarArchivoMayorTam(){
    var txtNombreArchivoGrande=document.getElementById("txtNombreArchivoGrande");
    var selTipoArchivoGrande=document.getElementById("selTipoArchivoGrande");
    if(txtNombreArchivoGrande.value != "" && selTipoArchivoGrande.value != "0" && document.getElementById("selArchiivosSubidos").value != "0"){
        
        consultarDatos(_contexto,"moverArchivos",{mi_archivo:document.getElementById("selArchiivosSubidos").value},mostrarMensaje);   
        
        var d={
            categoria_archivo:selTipoArchivoGrande.value,
            direccion:document.getElementById("selArchiivosSubidos").value,
            nombre_archivo:txtNombreArchivoGrande.value
        };
        objCrearProducto.archivos.push(d);
        
        
        
        var liMiListaArchivos=document.getElementById("liMiListaArchivos");
        var h=document.createElement("input");
        h.setAttribute("type","hidden");
        h.setAttribute("value","arc*"+document.getElementById("selArchiivosSubidos").value);
        liMiListaArchivos.appendChild(h);
        
        var h=document.createElement("input");
        //h.setAttribute("name","arc");
        h.setAttribute("type","hidden");
        h.setAttribute("value","nom*"+txtNombreArchivoGrande.value);
        liMiListaArchivos.appendChild(h);
        
        var h4=document.createElement("h4");
        h4.innerHTML=txtNombreArchivoGrande.value;
        liMiListaArchivos.appendChild(h4);
        var h4=document.createElement("h4");
        h4.innnerHTML=document.getElementById("selArchiivosSubidos").value;
        liMiListaArchivos.appendChild(h4);
        var a=document.createElement("a");
        a.setAttribute("href","Archivos/Productos/"+document.getElementById("selArchiivosSubidos").value);
        a.setAttribute("download",document.getElementById("selArchiivosSubidos").value);
        a.innerHTML="↓";
        liMiListaArchivos.appendChild(a);
        
        selTipoArchivoGrande.value="0";
        txtNombreArchivoGrande="";
        document.getElementById("selArchiivosSubidos").value="0";
    }else{
        mostrarMensaje("Por favor selecciona un tipo de archivo y dale un nombre");
    }
}
function consultarArchivosSubidos(){
    if(this.value=="0"){
       consultarDatos(_contexto,"consultarArchivosSubidos",{},dibujar_resultado_archivos_subidos);     
    }
   
}  
function dibujar_resultado_archivos_subidos(datos){
    if(datos.respuesta){
            var sel=document.getElementById("selArchiivosSubidos");
            sel.innerHTML="";
            var da=eval(datos.valores_consultados);
            var opt=document.createElement("option");
            opt.setAttribute("value","0");
            opt.innerHTML="Selecciona un archivo";
            sel.appendChild(opt);    
            for(var a in da){
                var opt=document.createElement("option");
                opt.setAttribute("value",da[a]);
                opt.innerHTML=da[a];
                sel.appendChild(opt);
            }
    }else{
        mostrarMensaje(datos);
    }
}
function agregarArchivoEdicion(){
    var txtNombreArchivoGrande=document.getElementById("txtEdicionNombreArchivo");
    var selTipoArchivoGrande=document.getElementById("selTipoArchivoEdicion");
    if(txtNombreArchivoGrande.value != "" && selTipoArchivoGrande.value != "0" && document.getElementById("selArchiivosSubidosEdicion").value != "0"){
        
        consultarDatos(_contexto,"moverArchivos",{mi_archivo:document.getElementById("selArchiivosSubidosEdicion").value},mostrarMensaje);   
        
        var d={
            categoria_archivo:selTipoArchivoGrande.value,
            direccion:document.getElementById("selArchiivosSubidosEdicion").value,
            nombre_archivo:txtNombreArchivoGrande.value
        };
        objCrearProducto.archivos.push(d);
        
        
        
        var liMiListaArchivos=document.getElementById("liMiListaArchivosEdicion");
        var h=document.createElement("input");
        h.setAttribute("type","hidden");
        h.setAttribute("value","arc*"+document.getElementById("selArchiivosSubidosEdicion").value);
        liMiListaArchivos.appendChild(h);
        
        var h=document.createElement("input");
        //h.setAttribute("name","arc");
        h.setAttribute("type","hidden");
        h.setAttribute("value","nom*"+txtNombreArchivoGrande.value);
        liMiListaArchivos.appendChild(h);
        
        var h4=document.createElement("h4");
        h4.innerHTML=txtNombreArchivoGrande.value;
        liMiListaArchivos.appendChild(h4);
        var h4=document.createElement("h4");
        h4.innnerHTML=document.getElementById("selArchiivosSubidosEdicion").value;
        liMiListaArchivos.appendChild(h4);
        var a=document.createElement("a");
        a.setAttribute("href","Archivos/Productos/"+document.getElementById("selArchiivosSubidosEdicion").value);
        a.setAttribute("download",document.getElementById("selArchiivosSubidosEdicion").value);
        a.innerHTML="↓";
        liMiListaArchivos.appendChild(a);
        
        selTipoArchivoGrande.value="0";
        txtNombreArchivoGrande="";
        document.getElementById("selArchiivosSubidosEdicion").value="0";
    }else{
        mostrarMensaje("Por favor selecciona un tipo de archivo y dale un nombre");
    }
}
function consultarArchivosSubidosEdicion(){
    if(this.value=="0"){
       consultarDatos(_contexto,"consultarArchivosSubidos",{},dibujar_resultado_archivos_subidos_edicion);     
    }
   
}  
function dibujar_resultado_archivos_subidos_edicion(datos){
    if(datos.respuesta){
            var sel=document.getElementById("selArchiivosSubidosEdicion");
            sel.innerHTML="";
            var da=eval(datos.valores_consultados);
            var opt=document.createElement("option");
            opt.setAttribute("value","0");
            opt.innerHTML="Selecciona un archivo";
            sel.appendChild(opt);    
            for(var a in da){
                var opt=document.createElement("option");
                opt.setAttribute("value",da[a]);
                opt.innerHTML=da[a];
                sel.appendChild(opt);
            }
    }else{
        mostrarMensaje(datos);
    }
}
var productos;
function generar_objetos(datos){
    console.log(datos);
    if(datos.respuesta){
        productos=eval(datos.valores_consultados);
        console.log(datos.valores_devueltos);
        console.log(productos);
        
        
        crear_select_productos("selProductosHojaDeVida");
    }
}
function validarSerialEquipoHV(){
    if(this.value!=""){
        consultarDatos(_contexto,"validarSerialHV",{serial:this.value},mostarMensajeSerialValido);   
    }
}
function validarSerialEquipoMan(){
    if(this.value!=""){
        consultarDatos(_contexto,"validarSerialHV",{serial:this.value},mostarMensajeSerialValidoMan);   
    }
}
function mostarMensajeSerialValido(d){
    if(d.respuesta){
        mostrarMensaje("Este serial ya esta en uso");
        document.getElementById("txtValidarSerialHV").style.borderColor='red';
       
    }else{
        document.getElementById("txtValidarSerialHV").style.borderColor='green';
       
    }
}
function mostarMensajeSerialValidoMan(d){
    if(!d.respuesta){
        mostrarMensaje("Este serial No existe por favor ingrese un serial valido");
        document.getElementById("txtSerialMant").style.borderColor='red';
    }else{
        document.getElementById("txtSerialMant").style.borderColor='green';
    }
}