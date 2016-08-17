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
            $objeto->nombre_producto=trim($post->datos->nombre_producto);
            $objeto->descripcion_producto=trim("");
            $objeto->marca=trim($post->datos->marca);
            $objeto->modelo=trim($post->datos->modelo);
            $objeto->serie=trim($post->datos->serie);
            $objeto->caracteristicas=$post->datos->caracteristicas;
            $objeto->archivos=$post->datos->archivos;
            $objeto->id_categoria=trim($post->datos->categoria);
            $objeto->imagenes=$post->datos->imagenes;
            $objeto->color=$post->datos->color;
            $objeto->ppm=trim($post->datos->ppm);
            $objeto->tipo_producto=trim($post->datos->tipo_producto);
            
            //var_dump($objeto);
            /*
            var_dump($post->datos->imagenes);*/
            //var_dump($post->datos->archivos);
            $r=$objeto->crear_registro();
            if($r["respuesta"]){
                
                /*if(isset($_FILES["miArchivo"])){
                    $arc=new Archivos();
                    $arc->mover_archivo("../Archivos/Productos/", $_FILES["miArchivo"]);
                    echo json_encode($r);
                }else{
                    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Archivo no existe"));
                }*/
                echo json_encode($r);
            }else{
                 echo json_encode($r);
            }
            break;
        case "crearInsumo":
            $objeto->id_producto=$post->datos->id_producto;
            echo json_encode($objeto->crear_producto_insumo($post->datos->codigo, $post->datos->marca, $post->datos->nombre_insumo, $post->datos->descripcion, $post->datos->valor_venta));
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
            $objeto->descripcion_producto=trim("");
            $objeto->marca=trim($post->datos->marca);
            $objeto->modelo=trim($post->datos->modelo);
            $objeto->serie=trim($post->datos->serie);
            $objeto->caracteristicas=$post->datos->caracteristicas;
            $objeto->archivos=$post->datos->archivos;
            $objeto->id_categoria=trim($post->datos->categoria);
            $objeto->imagenes=$post->datos->imagenes;
            $objeto->color=$post->datos->color;
            $objeto->ppm=trim($post->datos->ppm);
            $objeto->tipo_producto=trim($post->datos->tipo_producto);
            
            
            
            $r=$objeto->actualizar_recurso();
            if($r["respuesta"]){
                /*for($i=0;$i<=$post->datos->num_numArchivos;$i++){
                    if(isset($_FILES["miArchivo"])){
                        $arc=new Archivos();
                        $r2=$arc->mover_archivo("../Archivos/Productos/", $_FILES["miArchivo".$i]);

                        
                    }   
                }*/
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
            $objeto->id_producto=trim($post->datos->id_producto);
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
                       $np->filas=array();
                    }
                    
                    $r3=$np2->obtener_archivos_producto($value["IdProducto"]);
                    if($r3["respuesta"]){
                        $respuesta_arreglo[$i]["archivos"]=$np2->filas;
                        $np2->filas=array();
                    }
                    $r4=$np3->obtener_registro_por_id_insumos($value["IdProducto"]);
                    if($r4["respuesta"]){
                        $respuesta_arreglo[$i]["insumos"]=$np3->filas;
                        $np3->filas=array();
                    }
                    $i++;
                }
                
                
            }
            echo json_encode(array("respuesta"=>TRUE,"valores_consultados"=>$respuesta_arreglo));
            break;
        case "consultarPorValor":
            $np=  new Producto();
            $np2=new Producto();
            $np3=new Producto();
            $np4=new Producto();
            $i=0;
            
            $r=$objeto->obtener_registro_por_valor($post->datos->valor);
            $respuesta_arreglo=array();
            if($r["respuesta"]){
                foreach ($objeto->filas as $key => $value) {
                    $respuesta_arreglo[$i]=$value;
                    $r2=$np->obtener_caracteristicas_producto($value["IdProducto"]);
                    if($r2["respuesta"]){
                       $respuesta_arreglo[$i]["caracteristicas"]=$np->filas;
                       $np->filas=array();
                    }
                    
                    $r3=$np2->obtener_archivos_producto($value["IdProducto"]);
                    if($r3["respuesta"]){
                        $respuesta_arreglo[$i]["archivos"]=$np2->filas;
                        $np2->filas=array();
                    }
                    $r4=$np3->obtener_registro_por_id_insumos($value["IdProducto"]);
                    if($r4["respuesta"]){
                        $respuesta_arreglo[$i]["insumos"]=$np3->filas;
                        $np3->filas=array();
                    }
                    $r5=$np4->obtener_multimedia_producto($value["IdProducto"]);
                    if($r5["respuesta"]){
                        $respuesta_arreglo[$i]["imagenes"]=$np4->filas;
                        $np4->filas=array();
                    }
                }
                
                echo json_encode(array("respuesta"=>TRUE,"valores_consultados"=>$respuesta_arreglo));
            }else{
              echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"No hay valores"));  
            }
            
            break;
        case "consultarTodosLosInsumos":
            echo json_encode($objeto->obtener_registro_todos_los_registros_insumos());
            break;
        case "consultarInsumoPorValor":
            echo json_encode($objeto->obtener_registro_por_valor_insumos($post->datos->valor));
            break;
        case "subirArchivo":
            //var_dump($_FILES);
            if(isset($_FILES["miArchivo"])){
                $arc=new Archivos();
                echo json_encode($arc->mover_archivo("../Archivos/Productos/", $_FILES["miArchivo"]));
            }else{
                echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Archivo no existe"));
            } 
            break;    
        case "subirArchivoImagenProducto":
            //var_dump($_FILES);
            if(isset($_FILES["miArchivo"])){
                $arc=new Archivos();
                echo json_encode($arc->mover_archivo("../GaleriaProductos/", $_FILES["miArchivo"]));
            }else{
                echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Archivo no existe"));
            } 
            break;   
        case "consultarFiltro":
            //var_dump($post->datos);
            $stringConsulta="";
            $a="";
            
            for($i=0;$i<count($post->datos->marcas);$i++){
                //echo $post->datos->marcas[$i];
                if($i==count($post->datos->marcas)-1){
                    //echo "{".$a."}";
                    $a.=" Marca = '".$post->datos->marcas[$i]."'";            
                    //echo $r;
                    if(count($post->datos->categorias)>0){
                        $a.=" AND "; 
                    }
                }else{
                    //echo $post->datos->marcas[$i]."br";
                    
                     $a.=$stringConsulta . " Marca = '".$post->datos->marcas[$i]."' OR";            
                     
                }
            }
            
            
                       
            for($i=0;$i<count($post->datos->categorias);$i++){
                if($i==count($post->datos->categorias)-1){
                    
                    
                    $a.=" NombreCategoria = '".$post->datos->categorias[$i]."'";            
                    if(count($post->datos->colores)>0){
                          $a.=" AND "; 
                    }
                }else{
                    
                    $a.=$stringConsulta." NombreCategoria = '".$post->datos->categorias[$i]."' OR";            
                }
            }
            
            
            
            for($i=0;$i<count($post->datos->colores);$i++){
                if($i==count($post->datos->colores)-1){
                    $a.=$stringConsulta." Color= '".$post->datos->colores[$i]."'";            
                }else{
                   $a.=" AND "; 
                    $a.=$stringConsulta." = '".$post->datos->colores[$i]."' OR";            
                }
            }
            //echo $a;
            $r=$objeto->obtener_registro_por_filtro($a);
            
            $np=new Producto();
            $np2=new Producto();
            $np3=new Producto();
            $np4=new Producto();
            $i=0;
            if($r["respuesta"]){
                foreach ($objeto->filas as $key => $value) {
                    $respuesta_arreglo[$i]=$value;
                    $r2=$np->obtener_caracteristicas_producto($value["IdProducto"]);
                    if($r2["respuesta"]){
                       $respuesta_arreglo[$i]["caracteristicas"]=$np->filas;
                       $np->filas=array();
                    }
                    
                    $r3=$np2->obtener_archivos_producto($value["IdProducto"]);
                    if($r3["respuesta"]){
                        $respuesta_arreglo[$i]["archivos"]=$np2->filas;
                        $np2->filas=array();
                    }
                    $r4=$np3->obtener_registro_por_id_insumos($value["IdProducto"]);
                    if($r4["respuesta"]){
                        $respuesta_arreglo[$i]["insumos"]=$np3->filas;
                        $np3->filas=array();
                    }
                    $r5=$np4->obtener_multimedia_producto($value["IdProducto"]);
                    if($r5["respuesta"]){
                        $respuesta_arreglo[$i]["imagenes"]=$np4->filas;
                        $np4->filas=array();
                    }
                    $i++;
                }
                echo json_encode(array("respuesta"=>TRUE,
                    "valores_consultados"=>$respuesta_arreglo));
            }else{
                echo json_encode($r);
            }
            break;
        case "registroCarrito":
            
            break;
        case "buscarArchivoDescarga":
            echo json_encode($objeto->obtener_archivos_producto($post->datos->id_producto));
           
            break;
        case "buscarProductoMarca":
            $marca=$post->datos->marca;
            $filtro="Marca = '$marca'";
            echo json_encode($objeto->obtener_registro_por_filtro($filtro));
            break;
        case "quitarImagen":
            echo json_encode($objeto->eliminar_imagen($post->datos->id));
            break;
        case "quitarCaracteristica":
            echo json_encode($objeto->eliminar_caracteristica($post->datos->id));
            break;
        case "quitarArchivo":
            echo json_encode($objeto->deshabilitar_archivo($post->datos->id));
            break;
        case "crearHojaDeVida":
            $objeto->id_producto=trim($post->datos->id_producto);
            echo json_encode($objeto->crear_registro_hoja_de_vida($post->datos->serial, $post->hora_cliente));
            break;
        case "crearMantenimiento":
                      
             $r=$objeto->obtener_hoja_de_vida_producto($post->datos->codigo_producto);
                if($r["respuesta"]){
                    
                    $id=$objeto->filas["0"]["IdHojaVida"];
                    echo json_encode($objeto->crear_registro_mantenimiento($id, $post->hora_cliente, $post->datos->id_empleado, $post->datos->descripcion));
                }else{
                    echo json_encode($r);
                }
              break;
        case "consultarHojaDeVida":
            echo json_encode($objeto->obtener_hoja_de_vida_producto($post->datos->serial));
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}