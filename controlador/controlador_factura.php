<?php
header('Content-type: application/json');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Factura();//Mi clase  modelo 
   
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
            $objeto->codigo_factura=count($objeto->filas)+1;
            $objeto->fecha_factura=trim($post->hora_cliente);
            $objeto->id_cliente=trim($post->datos->id_cliente);
            $objeto->id_empleado=trim($post->datos->id_empleado);
            
            
            $r=$objeto->crear_registro();
            if($r["respuesta"]){
                $arrP=array();
                $p=0;$s=0;
                $arrS=array();
                foreach ($post->datos->lista_factura as $key => $value) {
                    if($value->tipo=="servicio"){
                        $arrP[$p]=$objeto->crear_registro_detalle_factura_servicio($value->id_servicio, $value->cantidad, $value->precio);
                        $p++;
                    }else{
                       $arrS[$s]=$objeto->crear_registro_detalle_factura_producto($value->id_producto, $value->cantidad, $value->precio);
                       $s++;
                        
                    }
                    
                }
                echo json_encode(array("mensaje"=>$r["mensaje"],"respuesta"=>$r["respuesta"],"servicios"=>$arrS,"productos"=>$arrP));
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
        case "consultarPorValor":
            echo json_encode($objeto->obtener_registro_por_valor($post->datos->valor));
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}