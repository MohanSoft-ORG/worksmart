<?php
header('Content-type: application/json');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Agenda();//Mi clase  modelo 
   
    switch($operacion){
        case "crear":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->obtener_registro_todos_los_registros();
            $objeto->codigo_cita=count($objeto->filas)+1;
            $objeto->fecha_asignacion=trim($post->hora_cliente);
            $objeto->fecha_inicio_servicio=trim($post->datos->fecha_inicio);
            $objeto->hora_inicio=trim($post->datos->hora);
            $objeto->comentario_inicial=trim($post->datos->comentario);
            $objeto->id_servicio=trim($post->datos->id_servicio);
            $objeto->id_cliente=trim($post->datos->id_cliente);
            $objeto->id_empleado=trim($post->datos->id_empleado);
            $objeto->direccion=trim($post->datos->direccion);
            $objeto->coordenadas=trim($post->datos->coordenadas);
            $r=$objeto->crear_registro();
            if($r["respuesta"]){
                $c= new Usuario();
                $e=new Usuario();
                
                $miEmpleado=$e->consultar_registro_usuario_empleado_id($post->datos->id_empleado);
                //  var_dump($e->filas[0]);
            
                $CorreoEmpleado=$e->filas[0]['CorreoUsuario'];
                $miCliente=$c->consultar_registro_usuario_cliente_id($post->datos->id_cliente);
                $direccionCliente=$post->datos->direccion;
                $cliente=$post->datos->nombre_cliente;
                $correo=new Mail();
                $mensajeMail="Hola, este es un recordatorio para la cita del dia\n fecha ".$objeto->fecha_inicio_servicio
                        ."\nhora ".$objeto->hora_inicio." \n"
                        . "Debes visitar al cliente ".$cliente
                        ."\n El lugar de la visita es ".$direccionCliente."\n"
                        ."Si deseas agregar esta cita a tu calendario da click en en esta direccion \n"
                        . "";
                
                
                $hi=explode(":", $post->datos->hora);
                $evento = array(
                    'titulo' => 'Cita Worksmart',
                    'descripcion' => $post->datos->comentario,
                    'localizacion' => $post->datos->direccion,
                    'fecha_inicio' => $post->datos->fecha_inicio, // Fecha de inicio de evento en formato AAAA-MM-DD
                  'hora_inicio'=>  $hi[0].":".$hi[1], // Hora Inicio del evento
                  'fecha_fin'=>$post->datos->fecha_inicio, // Fecha de fin de evento en formato AAAA-MM-DD
                  'hora_fin'=>'', // Hora final del evento
                  'nombre'=>$post->datos->nombre_cliente, // Nombre del sitio
                  'url'=>'www.worksmart.com.co' // Url de la página
                  );
                $calendario=new CalendarioAPI();                
                $r["urlCalendar"]=$calendario->getGoogleCalendarUrl($evento);
                $correo->enviarMailAmigo($CorreoEmpleado, "Hola tienes una nueva cita para el dia ".$objeto->fecha_inicio_servicio, $mensajeMail.$r['urlCalendar']);
                echo json_encode($r);
            }else{
                echo json_encode($r);
            }
            
            
            break;
        case "actualizar":
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA ACTUALIZAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->codigo_cita=trim($post->datos->codigo_cita);
            $objeto->fecha_asignacion=trim($post->hora_cliente);
            $objeto->fecha_inicio_servicio=trim($post->datos->fecha_inicio_servicio);
            $objeto->comentario_inicial=trim($post->datos->comentario);
            $objeto->id_servicio=trim($post->datos->id_servicio);
            $objeto->id_cliente=trim($post->datos->id_cliente);
            $objeto->id_empleado=trim($post->datos->id_empleado);
            $objeto->direccion=trim($post->datos->direccion);
            $objeto->coordenadas=trim($post->datos->coordenadas);
            $objeto->id_agenda=trim($post->datos->id_agenda);
            echo json_encode($objeto->actualizar_recurso());
            break;
        case "cancelarCita":
            
            /*
             * AQUI DOY VALOR DEL ISD QUE DESEO ELIMINAR
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->id_agenda=trim($post->datos->id_agenda);
            echo json_encode($objeto->cancelar_cita());
        case "finalizarCita":
            
            /*
             * AQUI DOY VALOR DEL ISD QUE DESEO ELIMINAR
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->id_agenda=trim($post->datos->id_agenda);
            echo json_encode($objeto->finalizar_cita());    
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        case "consultarPorValor":
            $filtro="";
            if($post->datos->codigo_cita!=""){
                $filtro.=" CodigoCita = '".$post->datos->codigo_cita."' AND ";
            }
            
            if($post->datos->fecha_cita!=""){
                $filtro.=" FechaInicioServicio = '".$post->datos->fecha_cita."' AND ";
            }
            
            if($post->datos->estado!=""){
                $filtro.=" EstadoAgenda = '".$post->datos->estado."'";
                
            }
            //echo $filtro;
            echo json_encode($objeto->obtener_registro_filtro($filtro));
            break;
        case "reprogramarCita":
            //$objeto->codigo_cita=trim($post->datos->codigo_cita);
            $objeto->fecha_asignacion=trim($post->hora_cliente);
            $objeto->fecha_inicio_servicio=trim($post->datos->fecha_cita);
            $objeto->comentario_inicial=trim($post->datos->comentario);
            $objeto->id_empleado=trim($post->datos->id_empleado);
            $objeto->direccion=trim($post->datos->direccion_cliente);
            $objeto->coordenadas=trim($post->datos->coordenadas);
            $objeto->id_agenda=trim($post->datos->id_agenda);
            $objeto->id_servicio=trim($post->datos->id_servicio);
            $objeto->fecha_fin_servicio=$post->hora_cliente;
            $objeto->id_cliente=trim($post->datos->id_cliente);
            $objeto->hora_inicio=trim($post->datos->hora_cita);
            echo json_encode($objeto->repogramar_cita());
            break;
        case "validarCita":
            echo json_encode($objeto->obtener_registro_para_validacion($post->datos->id_empleado, $post->datos->fecha, $post->datos->hora));
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}