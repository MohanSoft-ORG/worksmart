<?php
header('Content-type: application/json');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Usuario();//Mi clase  modelo 
   
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
            $objeto->documento=trim($post->datos->documento);
            $objeto->correo=trim($post->datos->correo);
            $r=$objeto->crear_registro();
            if($r["respuesta"]){
                echo json_encode($objeto->crear_registro_usuario_cliente($post->datos->nombre, $post->datos->apellido, $post->datos->tipo, $post->datos->nombre_contacto, $post->datos->telefono, $post->datos->direccion));
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
            $objeto->documento=trim($post->datos->documento);
            $objeto->correo=trim($post->datos->correo);
            $objeto->id_usuario=trim($post->datos->id_cliente);
            $r=$objeto->actualizar_recurso();
            if($r["respuesta"]){
                echo json_encode($objeto->actualizar_registro_usuario_cliente($post->datos->nombre, $post->datos->apellido, $post->datos->nombre_contacto, $post->datos->telefono, $post->datos->direccion));
            }else{
                echo json_encode($r);
            }
            
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
            $objeto->id_usuario=trim($post->datos->id_cliente);
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