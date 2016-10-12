
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroFactura;
var _btnConsultaFactura;
var _btnAgregarProductoListaFactura;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroFactura;
var accionUsuario;
var lista_productos_factura;
function iniciar_contexto_factura(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroFactura="btnCrearFactura";
     _btnConsultaFactura="btnBuscarProductoFactura";
     _btnAgregarProductoListaFactura="btnAgregarProductoListaFactura";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroFactura="formRegistrarFactura";
     
    
    
   agregarEvento(_btnRegistroFactura,"click",registrarContextoFactura);
   agregarEvento(_btnConsultaFactura,"click",consultarContextoProductoFactura);
   agregarEvento(_btnAgregarProductoListaFactura,"click",agregarProductoListaFactura);
   agregarEvento("numCantidad","change",calcularValor);
   agregarEvento("txtNumeroCedulaCliente","change",buscarCliente);
   //Elemento del sub menu
   agregarEvento("elementoBuscarSubMenu","click",cambiarAccion);
   agregarEvento("elementoEditarSubMenu","click",cambiarAccion);
   agregarEvento("elementoeliminarSubMenu","click",cambiarAccion);
   agregarEvento("crearFac","click",iniciar_contexto);//menu principal
   
}

/* INSERTAR CONTEXTO*/    
function registrarContextoFactura(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroFactura);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            codigo_factura:"",
            id_cliente:vf.Hidden[0],
            id_empleado:obtener_id_usuario(),
            lista_factura:lista_productos_factura
            
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,validarCreacionFactura);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function validarCreacionFactura(datos){
    if(datos.respuesta){
        mostrarMensaje(datos);
        limpiarFormulario(_formRegistroFactura);
    }else{
        mostrarMensaje(datos);
    }
}

/* CONSULTAR CONTEXTO */    
function consultarContextoProductoFactura(){
    
    var vf=obtener_valores_formulario(_formRegistroFactura);
    if(vf){
        var dat={valor:vf.Texto[2]};
            consultarDatos("producto","consultarPorValor",dat,dibujar_producto_resultado);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_producto_resultado(datos){
    var hdIdProductoFactura=document.getElementById("hdIdProductoFactura");
    var d=eval(datos.valores_consultados);
    hdIdProductoFactura.value=d[0].IdProducto;
    var txtPrecioProductoFactura=document.getElementById("txtPrecioProductoFactura");
    txtPrecioProductoFactura.value=d[0].ValorVenta;//No existe en la BD
    var hNombreProductoFactura=document.getElementById("hNombreProductoFactura");
    hNombreProductoFactura.innerHTML=d[0].NombreProducto;
    
}
var lista_productos_factura=[];
function agregarProductoListaFactura(){
    var hdIdProductoFactura=document.getElementById("hdIdProductoFactura");
    
    if(hdIdProductoFactura.value!="0"){
        var numCantidad=document.getElementById("numCantidad");
        var txtPrecioProductoFactura=document.getElementById("txtPrecioUnidad");
        var hNombreProductoFactura=document.getElementById("hNombreProductoFactura");
        var tipo=document.getElementsByName("tipo");
        var tp;
        console.log(tipo);
        for(var t in tipo){
            console.log(tipo[t]);
                if(tipo[t].type=="radio"){
                    tp=tipo[t].value;
                    console.log(tipo.value);
                }
            }

            var p={
                id_producto: hdIdProductoFactura.value,
                precio:txtPrecioProductoFactura.value,
                cantidad:numCantidad.value,
                nombre:hNombreProductoFactura.innerHTML,
                tipo:tp
            };
            lista_productos_factura.push(p);
            dibujar_lista_factura();
            numCantidad.value="0";
            txtPrecioProductoFactura.value="";
            hNombreProductoFactura.innerHTML="";
            hNombreProductoFactura.value="";
            hdIdProductoFactura.value!="0";
    }
    
    
}
function dibujar_lista_factura(){
    var lista=document.getElementById("liListaProductosFactura");
    lista.innerHTML="";
    var tabla=document.createElement("table");
    var sumTotal=new Number();
    
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        celda.innerHTML="Nombre producto";
        fila.appendChild(celda);
        
        
        var celda=document.createElement("td");
        celda.innerHTML="Cantidad";
        fila.appendChild(celda);
    
        
        var celda=document.createElement("td");
        celda.innerHTML="Precio";
        fila.appendChild(celda);
        tabla.appendChild(fila);
    for(var f in lista_productos_factura){
        console.log(lista_productos_factura[f]);
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        celda.innerHTML=lista_productos_factura[f].nombre;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML=lista_productos_factura[f].cantidad;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="$ "+formato_numero(lista_productos_factura[f].precio,"0",".",",");
        fila.appendChild(celda);
        sumTotal+=Number(lista_productos_factura[f].precio);
        tabla.appendChild(fila);
    }
    lista.appendChild(tabla);
    var hSTotal=document.getElementById("hSubTotal");
    var hTotal=document.getElementById("hTotal");
    hSTotal.value=sumTotal;
    hSTotal.innerHTML="Subtotal: "+formato_numero(sumTotal,"0",".",",");
    var iva=new Number();
    iva=sumTotal*0.16;
    console.log(iva);
    var t=Number(sumTotal)+iva;
    hTotal.value=t;
    hTotal.innerHTML="Total: "+formato_numero(t,"0",".",",");
}
function calcularValor(){
    var txtPrecioProductoFactura=document.getElementById("txtPrecioProductoFactura");
    if(txtPrecioProductoFactura.value!=""){
        var precio=new Number(txtPrecioProductoFactura.value);
        var valor=precio*this.value;
        document.getElementById("txtPrecioUnidad").value=valor;
    }else{
        mostrarmensjae("Por favor ingresa un  precio");
    }
}
function buscarCliente(){
    
    if(this.value!=""){
        var dat={valor:this.value};
            consultarDatos("cliente","consultarPorValor",dat,llenar_datos_usuario);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
}
function llenar_datos_usuario(datos){
    var d=eval(datos.valores_consultados);
    var hdIdClienteFactura=document.getElementById("hdIdClienteFactura");
    hdIdClienteFactura.value=d[0].IdCliente;
    var txtNombreClienteFactura=document.getElementById("txtNombreClienteFactura");
    txtNombreClienteFactura.value=d[0].NombreCliente+" "+d[0].ApellidoCliente;
}