
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

/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroProducto;
var _formConsultaProducto;
var _formRegistroHojaDeVida;
var _formEliminarProducto;
var _formEdicionProducto;
var _formCrearMantenimiento;

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
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroProducto="formCrearProducto";
     _formConsultaProducto="formBuscarProducto";
     _formRegistroHojaDeVida="formRegistrarHojaDeVida";
     _formEdicionProducto="formEditarProducto"; 
     _formCrearMantenimiento="formRegistrarMantenimiento";
    
   agregarEvento(_btnRegistroProducto,"click",registrarContextoProducto);
   agregarEvento(_btnEditarProducto,"click",editarContextoProductoMas);
   agregarEvento("btnAgregarCaracteristica","click",agregarCaracteristica);
   agregarEvento(_btnConsultaProducto,"click",consultarContextoProducto);
   agregarEvento(_btnConsultarProductoHV,"click",consultarContextoProductoHojaVida);
   //agregarEvento(_btnActualizarProducto,"click",eliminarContextoProducto);
   agregarEvento("flArchivoProducto","change",subirArchivosProducto);
   agregarEvento("flvImagenesProductoEdicion",subirArchivosProducto);
   agregarEvento("buscarProd","click",cambiarAccion);
   agregarEvento("editarProd","click",cambiarAccion);
   agregarEvento("eliminarProd","click",cambiarAccion);
   agregarEvento(_btnCrearHojaDeVida,"click",crearHojaDeVida);
   agregarEvento(_btnCrearMantenimiento,"click",crearMantenimiento);
   agregarEvento("prod","click",iniciar_contexto); 
   agregarEvento("flvImagenesProducto","change",subirArchivosImagenProducto);
   agregarEvento("crearIns","click",consultar_todos_los_productos);
   agregarEvento("btnCrearInsumo","click",crearInsumo);
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
        var v;
        
        for(var h in vf.Hidden){
            v=vf.Hidden[h].split("*");
            if(v[0]=="car" && v[1]!=""){
                car.push(v[1]);
            }else if(v[0]=="img" && v[1]!=""){
                img.push(v[1]);
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
            imagenes=img;
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
    console.log(vf);
    if(vf){
        consultarDatos(_contexto,"consultarPorValor",{valor:vf.Texto[0]},dibujar_resultado_tabla_producto);   
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
            fila.setAttribute("id",d[e].CodigoProducto);
            
            switch(accionUsuario){
                case "consulta":
                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].CodigoProducto;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].NombreProducto;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Marca;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Modelo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Color;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Ppm;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].TipoProducto;
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Fk_Id_Categoria_Producto;
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
                    if(d[e].Marca=="Fotocopiadora"){
                        opt.setAttribute("selected",true);
                    }
                    select.appendChild(opt);
                    
                    var opt=document.createElement("option");
                    opt.setAttribute("value","Multifuncional");
                    opt.innerHTML="Multifuncional";
                    if(d[e].Marca=="Multifuncional"){
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
                    inp.setAttribute("onclick","mostrarProductoEditable('"+d[e].CodigoProducto+"')");
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
                    celda.innerHTML=d[e].Marca;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Modelo;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Color;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Ppm;
                    fila.appendChild(celda);

                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].TipoProducto;
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");
                    celda.innerHTML=d[e].Fk_Id_Categoria_Producto;
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


function agregarCaracteristica(){
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
function subirArchivosProducto(){
    
    
        if(this.id=="flvImagenesProductoEdicion"){
            var vf=obtener_valores_formulario(_formEdicionProducto);
            var dat={};
            var archivo=document.getElementById("flArchivoProductoEditar");

            //var archivo=vf.Archivo[1];
            console.log(archivo);
            console.log(archivo.files);
            console.log(archivo.files[0]);
            console.log(archivo.files[0].size);
            console.log(archivo[0]);
            if(archivo.files[0].size<=15728639){
                registrarDatoArchivo(_contexto,"subirArchivo",dat,archivo.files[0],agregar_archivo_lista_edicion);     
            }else{
                mostrarMensaje({mensaje:"Lo sentimos pero este archivo es muy pesado"});
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

/*EDITAR CONTEXTO*/
function editarContextoProducto(cod,id){
    console.log(id);
    var val=obtener_valores_filas_tabla(cod);
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
function mostrarProductoEditable(id){
   
    var val=obtener_valores_filas_tabla(id);
    if(val.length > 0){
        var datos={
            valor:id
                    
        
        };
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
        var v;
        
        for(var h in vf.Hidden){
            v=vf.Hidden[h].split("*");
            if(v[0]=="car" && v[1]!=""){
                car.push(v[1]);
            }else if(v[0]=="img" && v[1]!=""){
                img.push(v[1]);
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
            imagenes=img;
            objCrearProducto.color=vf.Radio[0];
            objCrearProducto.ppm=vf.Texto[3];
            
        
        
        console.log(objCrearProducto);
        //Invoco mi funcion
        
        editarDato(_contexto,"actualizar",objCrearProducto,verificar_resultado_edicion);
        
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
        editarDatos(_contexto,"quitarImagen",{id:id},mostrarMensaje);
    }
}
function quitarCaracteristica(id){
    if(confirm("desea quitar esta caracteristica")){
        editarDatos(_contexto,"quitarCaracteristica",{id:id},mostrarMensaje);
    }
}

function quitarArchivo(id){
    if(confirm("desea quitar este archivo")){
        editarDatos(_contexto,"quitarArchivo",{id:id},mostrarMensaje);
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
function consultarContextoProductoHojaVida(){
    var vf=obtener_valores_formulario(_formRegistroHojaDeVida);
    console.log(vf);
    if(vf){
        consultarDatos(_contexto,"consultarPorValor",{valor:vf.Texto[0]},dibujar_resultado_consulta_h_v);   
    }else{
        mostrarMensaje({mensaje:"Por favor ingresa valores"});
    }
}

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
    if(vf!=false){
        var dat={
            id_producto:vf.Hidden[0],
            serial:vf.Texto[1]
        };
        
        //Creo el objeto que voy a enviar con datos a la peticion
        registrarDato(_contexto,"crearHojaDeVida",dat,mostrarMensaje,_formRegistroHojaDeVida);
        
        }
    else{
        mostrarMensaje({mensaje:"por favor ingresa valores "});
    }
    
}
function crearMantenimiento(){
    console.log("formCrearMantenimiento");
    var vf=obtener_valores_formulario(_formCrearMantenimiento);   
    console.log(vf);
    if(vf!=false){
        var dat={
            codigo_producto:vf.Texto[0],
            descripcion:vf.Texto[1],
            id_empleado:obtener_id_usuario()
        };
        
        //Creo el objeto que voy a enviar con datos a la peticion
        registrarDato(_contexto,"crearMantenimiento",dat,mostrarMensaje,_formRegistroHojaDeVida);
        
        }
    else{
        mostrarMensaje({mensaje:"por favor ingresa valores "});
    }
}

function consultar_todos_los_productos(){
    
    consultarDatos(_contexto,"consultar",{},crear_select_productos_insumos);   
    
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