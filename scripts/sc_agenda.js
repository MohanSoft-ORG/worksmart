
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroAgenda;
var _btnConsultaAgenda;

/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroAgenda;
var _formConsultaAgenda;
var accionUsuario;

function iniciar_contexto_agenda(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroAgenda="btnCrearAgenda";
     _btnConsultaAgenda="btnBuscarCita";

    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroAgenda="formRegistrarAgenda";
     _formConsultaAgenda="formBuscarAgenda";
    
    
   agregarEvento(_btnRegistroAgenda,"click",registrarContextoAgenda);
   agregarEvento(_btnConsultaAgenda,"click",consultarContextoAgenda);
   agregarEvento("txtDocumentoClienteAgenda","change",consultarClienteAgenda); 
   agregarEvento("dtHoraAgenda","change",validarHora);
   //Elemento del sub menu
   agregarEvento("buscarAge","click",cambiarAccion);
   agregarEvento("editarAge","click",cambiarAccion);
   agregarEvento("eliminarAge","click",cambiarAccion);
   agregarEvento("age","click",iniciar_contexto);//menu principal
   
   var dt=horaCliente().split(" ")[0].split("-");
   var f=dt[2]+"/"+dt[1]+"/"+dt[0];
   document.getElementById("dtFechaAgenda").value=f;
   //alert(f);
   //alert(document.getElementById("dtFechaAgenda").value);
   consultarEmpleados();
}

/* INSERTAR CONTEXTO*/    
function registrarContextoAgenda(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroAgenda);   
    console.log(vf);
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            codigo_cita:"",
            fecha_inicio:vf.Fecha[0],
            hora:vf.Otros[0]+":00",
            comentario:vf.Texto[4],
            id_servicio:vf.Select[1],
            id_cliente:vf.Hidden[0],
            id_empleado:vf.Select[0],
            direccion:vf.Texto[2],
            coordenadas:vf.Texto[3]
        };
        //Invoco mi funcion 
        console.log(datos);
        registrarDato(_contexto,"crear",datos,validarCreacionAgenda);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

function validarCreacionAgenda(datos){
    if(datos.respuesta){
        limpiarFormulario(_formRegistroAgenda);
        mostrarMensaje(datos);
    }else{
        mostrarMensaje(datos);
    }
}

/* CONSULTAR CONTEXTO */    
function consultarContextoAgenda(){
    
    var vf=obtener_valores_formulario(_formConsultaAgenda);
    console.log(vf);
    if(vf){
        var dat={codigo_cita:vf.Texto[0],fecha_cita:vf.Fecha[0],estado:vf.Select[0]};
            consultarDatos(_contexto,"consultarPorValor",dat,dibujar_tabla_resultado_agenda);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_tabla_resultado_agenda(datos){
    $('#crudAge').fadeOut(500);
    $('#resultadoCita').fadeIn(500);
    $('#mascara').fadeOut('fast');
    
     var d=eval(datos.valores_consultados);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaCita");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre cliente"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Direccion cliente"; 
         fila.appendChild(celda);         
         
         var celda=document.createElement("td");
         celda.innerHTML="Coordenadas cliente"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Telefono cliente"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Fecha Cita"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Hora Cita"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Fecha Fin servicio"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Comentario";
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre empleado"; 
         fila.appendChild(celda);
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id",d[e].IdAgenda);        
             
             console.log(accionUsuario);           
             switch(accionUsuario){
                 case "reprogramarCita":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCliente+" "+d[e].ApellidoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].DireccionContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Coordenadas);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].TelefonoContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","date");
                    inp.setAttribute("value",d[e].FechaInicioServicio); 
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","time");
                    inp.setAttribute("value",d[e].Hora_Inicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaFinServicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ComentarioInicial);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreEmpleado+" "+d[e].ApellidoEmpleado);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                        
                    var celda=document.createElement("td");  
                    
                    var sel=document.createElement("select");
                    var op=document.createElement("option");
                    op.setAttribute("value","3");
                    op.innerHTML="Visita tecnica";
                    if(d[e].Fk_Id_Servicio=="3"){
                        op.setAttribute("selected",true);
                    }
                    sel.appendChild(op);
                    op.setAttribute("value","4");
                    op.innerHTML="Capacitacion";
                    if(d[e].Fk_Id_Servicio=="4"){
                        op.setAttribute("selected",true);
                    }
                    sel.appendChild(op);
                    
                    celda.appendChild(sel);         
                    fila.appendChild(celda);
                    
                    
                      
                      var celda=document.createElement("td");
                      var inpEditar=document.createElement("input");
                      inpEditar.setAttribute("type","button");
                      inpEditar.setAttribute("value","Reprogramar");
                      inpEditar.setAttribute("onclick","reprogramarCita('"+d[e].IdAgenda+"')");
                      celda.appendChild(inpEditar);         
                      fila.appendChild(celda);
                      
                     break;
                 case "cancelarCita":
                      var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCliente+" "+d[e].ApellidoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].DireccionContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Coordenadas);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].TelefonoContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaInicioServicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Hora_Inicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaFinServicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ComentarioInicial);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreEmpleado+" "+d[e].ApellidoEmpleado);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreServicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);  
                      
                        
                        
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoAgenda);
                      if(d[e].EstadoAgenda=="P" || d[e].EstadoAgenda=="R"){
                          inpEliminar.setAttribute("value","Cancelar cita");
                          inpEliminar.setAttribute("onclick","cancelarCita('"+d[e].IdAgenda+"')");
                      }
                      
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
               default :
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCliente+" "+d[e].ApellidoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].DireccionContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].TelefonoContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaInicioServicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaFinServicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ComentarioInicial);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreEmpleado+" "+d[e].ApellidoEmpleado);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    
                   
                   break;
             }
             
             tabla.appendChild(fila);
         }
     }
     else{
         console.log("tblRespuestaAgenda");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}



function consultarClienteAgenda(){
    
    if(this.value!=""){
        var dat={valor:this.value};
        consultarDatos("cliente","consultarPorValor",dat,mostrar_datos_cliente_agenda);   
    }
    
}
function mostrar_datos_cliente_agenda(datos){
    
    
    var txtNombreClienteAgenda=document.getElementById("txtNombreClienteAgenda");
    var hdIdClienteAgenda=document.getElementById("hdIdClienteAgenda");
    var txtDireccionCliente=document.getElementById("txtDireccionClienteAgenda");
    var txtCoordenadas=document.getElementById("txtCoordenadas");
    if(datos.respuesta){
        var d=eval(datos.valores_consultados);
        txtNombreClienteAgenda.value= d[0].NombreCliente+" "+ d[0].ApellidoCliente;
        hdIdClienteAgenda.value=d[0].IdCliente;
        txtDireccionCliente.value=d[0].DireccionContactoCliente;
        txtCoordenadas.value=d[0].CoordenadasCliente;
    }else{
        txtNombreClienteAgenda.value="";
        hdIdClienteAgenda.value="0";
        txtDireccionCliente.value="";
        txtCoordenadas.value="";
    }
    
}
function validarHora(){
    
    if(this.value.split(":")[0]>"08" && this.value.split(":")[0]<"17" ){
        var select=document.getElementById("selEmpleadoAgenda");
        var dtFechaAgenda=document.getElementById("dtFechaAgenda");
        var dat={id_empleado:select.value,fecha:dtFechaAgenda.value,hora:this.value};
        consultarDatos("agenda","validarCita",dat,validarCita);   
    }else{
        mostrarMensaje("Por favor ingresa una hora dentro del horario laboral");
    }
}
function validarCita(datos){
    if(datos.respuesta){
        mostrarMensaje("Por favor ingresa una fecha y hora diferente");
        document.getElementById("dtFechaAgenda").value="";
        document.getElementById("dtHoraAgenda").value="";
        
    }
}
function consultarEmpleados(){

    consultarDatos("usuario","consultarTodosLosEmpleados",{},crear_select_empleados);   
    
}
function crear_select_empleados(dat){
    var datos=eval(dat.valores_consultados);
     console.log(datos);
    //console.log(colorActivo);
    //console.log(colorInactivo);
    var select=document.getElementById("selEmpleadoAgenda");
    select.innerHTML="";
    var opt=document.createElement("option");
    opt.innerHTML="--Seleccione un tecnico--";
    opt.value="0";  
    select.appendChild(opt);
    for(var d in datos){
            
        var opt=document.createElement("option");
        opt.innerHTML=datos[d].NombreEmpleado+" "+datos[d].ApellidoEmpleado;
        opt.value=datos[d].IdEmpleado;
        select.appendChild(opt);
        
        
    }
}

function reprogramarCita(id){
    var val=obtener_valores_filas_tabla(id);
     console.log(val); 
    if(val.length > 0){
        var datos={
          id_agenda:id,
          direccion_cliente:val[1],
          coordenadas:val[2],
          fecha_cita:val[4],
          hora_cita:val[5],
          id_empleado:val[8],
          comentario:val[7],
          id_servicio:val[9]
        };
        editarDato(_contexto,"reprogramarCita",datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
function cancelarCita(id){
     if(id){
        eliminarDato(_contexto,"cancelarCita",{id_agenda:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
    
    
}