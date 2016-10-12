<?php
header('Content-type: application/json');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Entrada();//Mi clase  modelo 
   
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
            $objeto->fecha_entrada=$post->hora_cliente;
            $objeto->proveedor=trim($post->datos->id_proveedor);
            $objeto->codigo_entrada=trim($post->datos->id_proveedor);
            echo json_encode($objeto->crear_registro());
            
            break;
        case "crearPedido":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->obtener_registro_todos_los_registros();
            $objeto->fecha_entrada=$post->hora_cliente;
            $objeto->proveedor=trim($post->datos->id_proveedor);
            $objeto->codigo_entrada=count($objeto->filas)+1;
            $r=$objeto->crear_registro();
            
            $arr=array();
            
            if($r["respuesta"]){
                $i=0;
                foreach ($post->datos->lista_pedido as $key => $value) {
                    $arr[$i]=$objeto->crear_registro_detalle_entrada_pedido($value->id_producto, $value->cantidad, $value->comentario);
                    $i++;
                }
                echo json_encode(array("mensaje"=>$r["mensaje"],"respuesta"=>TRUE,"valores_insertados"=>$arr));
            }else{
                echo json_encode($r);
            }
            
            
            break;
        case "crearDevolucion":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->fecha_entrada=$post->hora_cliente;
            $objeto->proveedor=trim($post->datos->id_proveedor);
            $objeto->codigo_entrada=trim($post->datos->id_proveedor);
            $r=$objeto->crear_registro();
            $arr=array();
            
            if($r["respuesta"]){
                $i=0;
                foreach ($post->datos->lista_entrada as $key => $value) {
                    $arr[$i]=$objeto->crear_registro_detalle_entrada_devolucion($value->idProducto, $value->cantidad, $value->comentario);
                    $i++;
                }
                echo json_encode(array("mensaje"=>"","respuesta"=>TRUE,"valores_insertados"=>$arr));
            }else{
                echo json_encode($r);
            }
            
            
            break;
        case "crearOtros":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->fecha_entrada=$post->hora_cliente;
            $objeto->proveedor=trim($post->datos->id_proveedor);
            $objeto->codigo_entrada=trim($post->datos->id_proveedor);
            $r=$objeto->crear_registro();
            $arr=array();
            
            if($r["respuesta"]){
                $i=0;
                foreach ($post->datos->lista_entrada as $key => $value) {
                    $arr[$i]=$objeto->crear_registro_detalle_entrada_otros($value->idProducto, $value->cantidad, $value->comentario);
                    $i++;
                }
                echo json_encode(array("mensaje"=>"","respuesta"=>TRUE,"valores_insertados"=>$arr));
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