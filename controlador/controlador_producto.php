<?php
header('Content-type: application/json');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Producto();//Mi clase  modelo 
   
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
            $objeto->codigo_producto=trim($post->datos->codigo_producto);
            $objeto->nombre_producto=rim($post->datos->nombre_producto);
            $objeto->descripcion_producto=trim($post->datos->descripicion_categoria);
            $objeto->marca=trim($post->datos->marca);
            $objeto->modelo=trim($post->datos->modelo);
            $objeto->serie=trim($post->datos->serie);
            $objeto->caracteristicas=$post->datos->caracteristicas;
            $r=$objeto->crear_registro();
            
            
            if($r["respuesta"]){
                for($i=0;$i<=$post->datos->num_numArchivos;$i++){
                    if(isset($_FILES["miArchivo".$i])){
                        $arc=new Archivos();
                        $r2=$arc->mover_archivo("../Archivos/Productos/", $_FILES["miArchivo".$i]);

                        
                    }   
                }
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
            $objeto->id_producto=trim($post->datos->id_producto);
            $objeto->codigo_producto=trim($post->datos->codigo_producto);
            $objeto->nombre_producto=trim($post->datos->nombre_producto);
            $objeto->descripcion_producto=trim($post->datos->descripcion_producto);
            $objeto->marca=trim($post->datos->marca);
            $objeto->modelo=trim($post->datos->modelo);
            $objeto->serie=trim($post->datos->serie);
            
            $r=$objeto->actualizar_recurso();
            if($r["respuesta"]){
                for($i=0;$i<=$post->datos->num_numArchivos;$i++){
                    if(isset($_FILES["miArchivo".$i])){
                        $arc=new Archivos();
                        $r2=$arc->mover_archivo("../Archivos/Productos/", $_FILES["miArchivo".$i]);

                        
                    }   
                }
                echo json_encode($r);       
            }else{
                echo json_encode($r);
            }
            break;
        case "actualizarCaracteristica":
            echo json_encode($objeto->actualizar_caracteristica($post->datos->id_caracteristica, $post->datos->descripcion_caracteristica));
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
            
            $np=  new Producto();
            $np2=new Producto();
            $np3=new Producto();
            $i=0;
            $respuesta_arreglo=array();
            $r=$objeto->obtener_registro_todos_los_registros();
            if($r["respuesta"]){
                foreach ($objeto->filas as $key => $value) {
                    $respuesta_arreglo[$i]=$value;
                    $r2=$np->obtener_caracteristicas_producto($value["IdProducto"]);
                    if($r2["respuesta"]){
                       $respuesta_arreglo[$i]["caracteristicas"]=$np->filas;
                    }
                    
                    $r3=$np2->obtener_archivos_producto($value["IdProducto"]);
                    if($r3["respuesta"]){
                        $respuesta_arreglo[$i]["archivos"]=$np2->filas;
                    }
                    $r4=$np3->obtener_registro_por_id_insumos($value["IdProducto"]);
                    if($r4["respuesta"]){
                        $respuesta_arreglo[$i]["insumos"]=$np3->filas;
                    }
                }
                
                
            }
            echo json_encode(array("respuesta"=>TRUE,"valores_consultados"=>$respuesta_arreglo));
            break;
        case "consultarPorValor":
            $np=  new Producto();
            $np2=new Producto();
            $np3=new Producto();
            $i=0;
            $respuesta_arreglo=array();
            $r=$objeto->obtener_registro_por_valor($post->datos->valor);
            if($r["respuesta"]){
                foreach ($objeto->filas as $key => $value) {
                    $respuesta_arreglo[$i]=$value;
                    $r2=$np->obtener_caracteristicas_producto($value["IdProducto"]);
                    if($r2["respuesta"]){
                       $respuesta_arreglo[$i]["caracteristicas"]=$np->filas;
                    }
                    
                    $r3=$np2->obtener_archivos_producto($value["IdProducto"]);
                    if($r3["respuesta"]){
                        $respuesta_arreglo[$i]["archivos"]=$np2->filas;
                    }
                    $r4=$np3->obtener_registro_por_id_insumos($value["IdProducto"]);
                    if($r4["respuesta"]){
                        $respuesta_arreglo[$i]["insumos"]=$np3->filas;
                    }
                }
                
                
            }
            echo json_encode(array("respuesta"=>TRUE,"valores_consultados"=>$respuesta_arreglo));
            break;
        case "consultarTodosLosInsumos":
            echo json_encode($objeto->obtener_registro_todos_los_registros_insumos());
            break;
        case "consultarInsumoPorValor":
            echo json_encode($objeto->obtener_registro_por_valor_insumos($post->datos->valor));
            break;
        
            
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}