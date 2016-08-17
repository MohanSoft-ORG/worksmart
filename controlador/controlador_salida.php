<?php
header('Content-type: application/json');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Salida();//Mi clase  modelo 
   
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
            $objeto->codigo_salida=trim($post->datos->codigo_salida);
            $objeto->fecha_salida=$post->hora_cliente;
            $objeto->id_empleado=trim($post->datos->id_empleado);
            echo json_encode($objeto->crear_registro());
            
            break;
        case "crearSalidaBodega":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            
            echo json_encode($objeto->crear_registro_bodega_a_venta($post->datos->id_producto,$post->datos->cantidad));
            
            break;
        case "crearSalidaObsequio":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            
            $objeto->codigo_salida=trim($post->datos->codigo_salida);
            $objeto->fecha_salida=$post->hora_cliente;
            $objeto->id_empleado=trim($post->datos->id_empleado);
            $r=$objeto->crear_registro();
            if($r["respuesta"]){
                echo json_encode($objeto->crear_registro_salida_obsequio($post->datos->id_producto,$post->datos->id_cliente,$post->datos->cantidad,$post->datos->comentario));
            }else{
                echo json_encode($r);
            }
            
            
            
            
            break;
        case "crearSalidaVenta":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->obtener_registro_todos_los_registros();
            $objeto->codigo_salida=count($objeto->filas)+1;
            $objeto->fecha_salida=$post->hora_cliente;
            $objeto->id_empleado=trim($post->datos->id_empleado);
            $r=$objeto->crear_registro();
            if($r["respuesta"]){
                echo json_encode($objeto->crear_registro_salida_venta($post->datos->id_factura));
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
            echo json_encode($objeto->actualizar_recurso());
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
            echo json_encode($objeto->eliminar_recurso());
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        case "consultarporvalor":
            echo json_encode($objeto->obtener_registro_por_valor());
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}