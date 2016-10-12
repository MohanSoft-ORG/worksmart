<?php
header('Content-type: application/json');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Arriendo();//Mi clase  modelo 
   
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
            $objeto->id_equipo=trim($post->datos->id_equipo);
            $objeto->id_cliente=trim($post->datos->id_cliente);
            $objeto->id_servicio=trim($post->datos->id_servicio);
            $objeto->fecha_inicial=trim($post->datos->fecha_inicial);
            $objeto->fecha_final=trim($post->datos->fecha_final);
            $objeto->comentario=trim($post->datos->comentario);
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
            $objeto->id_arriendo=trim($post->datos->id_arriendo);
            $objeto->id_equipo=trim($post->datos->id_equipo);
            $objeto->fecha_inicial=trim($post->datos->fecha_inicial);
            $objeto->fecha_final=trim($post->datos->fecha_final);
            $objeto->comentario=trim($post->datos->comentario);
                    
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
            $objeto->id_arriendo=$post->datos->id_arriendo;
            echo json_encode($objeto->eliminar_recurso());
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        case "consultarPorValor":
            echo json_encode($objeto->obtener_registro_por_valor());
            break;
        case "consultarArriendo":
            $filtro="";
            if($post->datos->cedula!=""){
                $c=$post->datos->cedula;
                $filtro.="DocumentoUsuario = '$c' AND ";
            }
            
            if($post->datos->serial){
                $s=$post->datos->serial;
                $filtro.=" Serial = '$s' AND ";
            }
            $e=$post->datos->estado;
            $filtro.="EstadoArriendo='$e'";
            
            //echo $filtro;
            echo json_encode($objeto->obtener_registro_filtro($filtro));
            break;
            
        case "finalizar":
            $objeto->id_arriendo=$post->datos->id_arriendo;
            $objeto->fecha_final=$post->datos->fecha;
            $objeto->comentario=$post->datos->comentario;
            
            echo json_encode($objeto->finalizar_arriendo());
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}