<?php
header('Content-type: application/json');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Proveedor();//Mi clase  modelo 
   
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
            $objeto->documento_proveedor=trim($post->datos->documento_proveedor);
            $objeto->nombre_proveeedor=trim($post->datos->nombre_proveedor);
            $objeto->nombre_contacto_proveedor=trim($post->datos->nombre_contacto_proveedor);
            $objeto->correo_contacto_proveedor=trim($post->datos->correo_contacto_proveedor);
            $objeto->telefono_contacto_proveedor=trim($post->datos->telefono_contacto_proveedor);
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
            $objeto->id_proveedor=$post->datos->id_proveedor;
            $objeto->documento_proveedor=trim($post->datos->documento_proveedor);
            $objeto->nombre_proveeedor=trim($post->datos->nombre_proveedor);
            $objeto->nombre_contacto_proveedor=trim($post->datos->nombre_contacto_proveedor);
            $objeto->correo_contacto_proveedor=trim($post->datos->correo_contacto_proveedor);
            $objeto->telefono_contacto_proveedor=trim($post->datos->telefono_contacto_proveedor);
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
            $objeto->id_proveedor=trim($post->datos->id_proveedor);
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