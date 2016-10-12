
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroCCobro;
var _btnConsultaCCobro;
var _btnAgregarProductoListaCCobro;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroCCobro;
var accionUsuario;
var lista_productos_cuenta_cobro;
function iniciar_contexto_cuenta_cobro(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroCCobro="btnCrearCCobro";
     _btnConsultaCCobro="btnBuscarProductoCCobro";
     _btnAgregarProductoListaCCobro="btnAgregarProductoListaCCobro";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroCCobro="formRegistrarCCobro";
     
    
    
   agregarEvento(_btnRegistroCCobro,"click",registrarContextoCCobro);
   agregarEvento(_btnConsultaCCobro,"click",consultarContextoProductoCCobro);
   agregarEvento(_btnAgregarProductoListaCCobro,"click",agregarProductoListaCCobro);
   agregarEvento("numCantidadCCobro","change",calcularValorCC);
   agregarEvento("txtNumeroCedulaClienteCCobro","change",buscarClienteCCobro);
   //Elemento del sub menu
   /*agregarEvento("elementoBuscarSubMenu","click",cambiarAccion);
   agregarEvento("elementoEditarSubMenu","click",cambiarAccion);
   agregarEvento("elementoeliminarSubMenu","click",cambiarAccion);*/
   agregarEvento("crearCCobro","click",iniciar_contexto);//menu principal
   
}

/* INSERTAR CONTEXTO*/    
function registrarContextoCCobro(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroCCobro);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            codigo_ccobro:"",
            id_cliente:vf.Hidden[0],
            id_empleado:obtener_id_usuario(),
            lista_cuenta_cobro:lista_productos_cuenta_cobro
            
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,validarCreacionCCobro);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function validarCreacionCCobro(datos){
    if(datos.respuesta){
        mostrarMensaje(datos);
        limpiarFormulario(_formRegistroCCobro);
    }else{
        mostrarMensaje(datos);
    }
}

/* CONSULTAR CONTEXTO */    
function consultarContextoProductoCCobro(){
    
    var vf=obtener_valores_formulario(_formRegistroCCobro);
    if(vf){
        var dat={valor:vf.Texto[2]};
            consultarDatos("producto","consultarPorValor",dat,dibujar_producto_resultado_cuenta_cobro);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_producto_resultado_cuenta_cobro(datos){
    var hdIdProductoFactura=document.getElementById("hdIdProductoCCobro");
    var d=eval(datos.valores_consultados);
    hdIdProductoFactura.value=d[0].IdProducto;
    var txtPrecioProductoFactura=document.getElementById("txtPrecioProductoCCobro");
    txtPrecioProductoFactura.value=d[0].ValorVenta;//No existe en la BD
    var hNombreProductoFactura=document.getElementById("hNombreProductoCCobro");
    hNombreProductoFactura.innerHTML=d[0].NombreProducto;
    
}
var lista_productos_cuenta_cobro=[];
function agregarProductoListaCCobro(){
    var hdIdProductoFactura=document.getElementById("hdIdProductoCCobro");
    
    if(hdIdProductoFactura.value!="0"){
        var numCantidad=document.getElementById("numCantidadCCobro");
        var txtPrecioProductoFactura=document.getElementById("txtPrecioUnidadCCobro");
        var hNombreProductoFactura=document.getElementById("hNombreProductoCCobro");
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
            lista_productos_cuenta_cobro.push(p);
            dibujar_lista_cuenta_cobro();
            numCantidad.value="0";
            txtPrecioProductoFactura.value="";
            hNombreProductoFactura.innerHTML="";
            hNombreProductoFactura.value="";
            hdIdProductoFactura.value="0";
            
    }else{
        mostrarMensaje("Error al agregar el producto");
    }
    
    
}
function dibujar_lista_cuenta_cobro(){
    var lista=document.getElementById("liListaProductosCuentaCobro");
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
    for(var f in lista_productos_cuenta_cobro){
        console.log(lista_productos_cuenta_cobro[f]);
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        celda.innerHTML=lista_productos_cuenta_cobro[f].nombre;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML=lista_productos_cuenta_cobro[f].cantidad;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML="$ "+formato_numero(lista_productos_cuenta_cobro[f].precio,"0",".",",");
        fila.appendChild(celda);
        sumTotal+=Number(lista_productos_cuenta_cobro[f].precio);
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
function calcularValorCC(){
    var txtPrecioProductoFactura=document.getElementById("txtPrecioProductoCCobro");
    if(txtPrecioProductoFactura.value!=""){
        var precio=new Number(txtPrecioProductoFactura.value);
        var valor=precio*this.value;
        document.getElementById("txtPrecioUnidadCCobro").value=valor;
    }else{
        mostrarMensaje("Por favor ingresa un  precio");
    }
}
function buscarClienteCCobro(){
    
    if(this.value!=""){
        var dat={valor:this.value};
            consultarDatos("cliente","consultarPorValor",dat,llenar_datos_usuario_ccobro);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
}
function llenar_datos_usuario_ccobro(datos){
    var d=eval(datos.valores_consultados);
    var hdIdClienteFactura=document.getElementById("hdIdClienteCCobro");
    hdIdClienteFactura.value=d[0].IdCliente;
    var txtNombreClienteFactura=document.getElementById("txtNombreClienteCCobro");
    txtNombreClienteFactura.value=d[0].NombreCliente+" "+d[0].ApellidoCliente;
}