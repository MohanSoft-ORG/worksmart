<?php
//header('Content-Type:text/html; Charset="UTF-8"');    
header('Content-type: application/json');    
include("../datos/orm_core.php");

if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    
    $operacion=$post->operacion;
    $objeto= new Categoria();//Mi clase  modelo 
   
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
            //var_dump($post->datos);
            $objeto->nombre_categoria=trim($post->datos->nombre_categoria);
            $objeto->descripcion_categoria=trim($post->datos->descripcion_categoria);
            $objeto->imagen_categoria=trim($post->datos->imagen_categoria);
            $r=$objeto->crear_registro();
            if($r["respuesta"]){
                
                if(isset($_FILES["miArchivo"])){
                    $arc=new Archivos();
                    $r2=$arc->mover_archivo("../Archivos/Categorias/", $_FILES["miArchivo"]);

                    if($r2["respuesta"]){
                        echo json_encode($r);
                    }else{
                        echo json_encode($r2);
                    }
                }else{
                    echo json_encode($r);
                }
                
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
            $objeto->id_categoria=$post->datos->id_categoria;
            $objeto->nombre_categoria=trim($post->datos->nombre_categoria);
            $objeto->descripcion_categoria=trim($post->datos->descripcion_categoria);
            $objeto->imagen_categoria=trim($post->datos->imagen_categoria);
            $r=$objeto->actualizar_recurso();
            if($r["respuesta"]){
                
                if(isset($_FILES["miArchivo"])){
                    $arc=new Archivos();
                    $r2=$arc->mover_archivo("../Archivos/Categorias/", $_FILES["miArchivo"]);

                    if($r2["respuesta"]){
                        echo json_encode($r);
                    }else{
                        echo json_encode($r2);
                    }
                }else{
                    echo json_encode($r);
                }
                
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
            $objeto->id_categoria=trim($post->datos->id_categoria);
            echo json_encode($objeto->eliminar_recurso());
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        case "consultarPorValor":
            echo json_encode($objeto->obtener_registro_por_valor($post->datos->valor));
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el switch"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}