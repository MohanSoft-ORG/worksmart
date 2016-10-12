<?php
header('Content-type: application/json');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new SalidaContable();//Mi clase  modelo 
   
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
            
            $objeto->id_tipo=trim($post->datos->id_tipo);
            $objeto->fecha=trim($post->hora_cliente);
            $objeto->valor=trim($post->datos->valor);
            $objeto->id_usuario=trim($post->datos->id_usuario);
            echo json_encode($objeto->crear_registro());
            
            break;
        case "crearTipoSalida":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            echo json_encode($objeto->crear_registro_tipo_salida($post->datos->nombre,$post->datos->descripcion));
            
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
            $objeto->id_salida_contable;
            $objeto->id_tipo;
            $objeto->fecha;
            $objeto->valor;
            $objeto->id_usuario;
            echo json_encode($objeto->actualizar_recurso());
            break;
        case "actualizarTipoSalida":
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA ACTUALIZAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            echo json_encode($objeto->actualizar_recurso_tipo_salida($post->datos->id_tipo,$post->datos->nombre,$post->datos->descripcion));
            break;
        case "eliminar":
            
            /*
             * AQUI DOY VALOR DEL ISD QUE DESEO ELIMINAR
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->id_salida_contable;
            echo json_encode($objeto->eliminar_recurso());
            break;
        case "eliminarTipoSalida":
            
            /*
             * AQUI DOY VALOR DEL ISD QUE DESEO ELIMINAR
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            echo json_encode($objeto->eliminar_recurso_tipo_salida($post->datos->id_tipo));
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        case "consultarTipoSalida":
            echo json_encode($objeto->obtener_registro_todos_los_registros_tipo_salida());
            break;
        case "consultarPorFecha":
            echo json_encode($objeto->obtener_registro_por_fecha($post->datos->fecha));
            break;
        case "consultarPorTipo":
            echo json_encode($objeto->obtener_registro_por_tipo($post->datos->tipo));
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}