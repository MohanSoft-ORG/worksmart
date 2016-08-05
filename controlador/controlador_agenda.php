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
            $objeto->codigo_cita=trim($post->datos->codigo_cita);
            $objeto->fecha_asignacion=trim($post->hora_cliente);
            $objeto->fecha_inicio_servicio=trim($post->datos->fecha_inicio_servicio);
            $objeto->comentario_inicial=trim($post->datos->comentario);
            $objeto->id_servicio=trim($post->datos->id_servicio);
            $objeto->id_cliente=trim($post->datos->id_cliente);
            $objeto->id_empleado=trim($post->datos->id_empleado);
            $objeto->direccion=trim($post->datos->direccion);
            $objeto->coordenadas=trim($post->datos->coordenadas);
            echo json_encode($objeto->crear_registro());
            
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
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        case "consultarPorValor":
            echo json_encode($objeto->obtener_registro_por_valor(trim($post->datos->valor)));
            break;
        case "reprogramarCita":
            $objeto->codigo_cita=trim($post->datos->codigo_cita);
            $objeto->fecha_asignacion=trim($post->hora_cliente);
            $objeto->fecha_inicio_servicio=trim($post->datos->fecha_inicio_servicio);
            $objeto->comentario_inicial=trim($post->datos->comentario);
            $objeto->id_servicio=trim($post->datos->id_servicio);
            $objeto->id_cliente=trim($post->datos->id_cliente);
            $objeto->id_empleado=trim($post->datos->id_empleado);
            //$objeto->direccion=trim($post->datos->direccion);
            //$objeto->coordenadas=trim($post->datos->coordenadas);
            $objeto->id_agenda=trim($post->datos->id_agenda);
            
            echo json_encode($objeto->repogramar_cita());
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}