<?php
header('Content-Type:text/html; Charset="UTF-8"');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Usuario();//Mi clase  modelo 
   
    switch($operacion){
        case "crearEmpleado":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->documento=trim($post->datos->documento);
            $objeto->correo=  trim($post->datos->correo);
            $r=$objeto->crear_registro();
            if($r["respuesta"]){
                $r2=$objeto->crear_registro_usuario_empleado(trim($post->datos->nombre), trim($post->datos->apellido),trim($post->datos->telefono));
                if($r2["respuesta"]){
                    $r3=$objeto->crear_registro_ingreso_aplicacion($post->datos->rol, $post->datos->clave, $post->hora_cliente);
                    if($r3["respuesta"]){
                        echo json_encode(array("respuesta"=>TRUE,"mensaje"=>"usuario registrado correctamente"));
                    }else{
                        echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"No se ha podido agregar el usuario a el ingreso de la aplicacion"));
                    }
                    
                }else{
                    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"No se ha podido crear un usuario de tipo empleado "));
                    
                    
                }
            }else{
                echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"No se ha podido crear el usuario"));
            }
            
            
            
            
            break;
        case "actualizarEmpleado":
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA ACTUALIZAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->id_usuario=trim($post->datos->id_usuario);
            $objeto->correo=trim($post->datos->correo);
            $objeto->documento=trim($post->datos->documento);
            $r=$objeto->actualizar_recurso();
            if($r["respuesta"]){
                $r2=$objeto->actualizar_registro_usuario_empleado(trim($post->datos->nombre), trim($post->datos->apellido),trim($post->datos->telefono));
                if($r2["respuesta"]){
                    $r3=$objeto->actualizar_rol($post->datos->rol);
                    if($r3["respuesta"] && $post->datos->clave!=""){
                        $r4=$objeto->id_usuario=$post->datos->id_usuario;
                        $objeto->actualizar_clave($post->datos->clave, $post->hora_cliente);
                    }
                    if($r4["respuesta"]){
                        echo json_encode(array("respuesta"=>TRUE,"mensaje"=>"Usuario actualizado exitosamente"));
                    }else{
                        echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Ha ocurrido un eror al actualziar el usuario por favor comunicate con tu administrador"));
                    }
                    
                }else{
                    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"No se ha podido actualizar los datos del empleado"));
                }
            }else{
                echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"No se ha podido actualizar los datos del usuario"));
            }
            
            break;
        case "actualizarPerfilUsuario":
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA ACTUALIZAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->id_usuario=trim($post->datos->id_usuario);
            $objeto->correo=trim($post->datos->correo);
            $objeto->documento=trim($post->datos->documento);
            $r=$objeto->actualizar_recurso();
            if($r["respuesta"]){
                $r2=$objeto->actualizar_registro_usuario_empleado(trim($post->datos->nombre), trim($post->datos->apellido),trim($post->datos->telefono));
                if($r2["respuesta"]){
                    $r3=$objeto->actualizar_rol($post->datos->rol);
                    if($r3["respuesta"]){
                        if($post->datos->clave!=""){
                            $objeto->actualizar_clave($post->datos->clave, $post->hora_cliente);
                        }
                        
                        echo json_encode(array("respuesta"=>TRUE,"mensaje"=>"Usuario actualizado exitosamente"));
                    }
                    
                }else{
                    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"No se ha podido actualizar los datos del empleado"));
                }
            }else{
                echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"No se ha podido actualizar los datos del usuario"));
            }
            
            break;
        case "eliminar":
            
            /*
             * AQUI DOY VALOR DEL ID QUE DESEO ELIMINAR
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->id_usuario=  trim($post->datos->id_usuario);
            echo json_encode($objeto->eliminar_recurso());
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        case "consultarTodosLosEmpleados":
            echo json_encode($objeto->consultar_todos_los_registros_usuario_empleado());
            break;
        case "consultarEmpleadoPorValor":
            echo json_encode($objeto->consultar_registro_usuario_empleado($post->datos->valor));
            break;
        case "login":
            echo json_encode($objeto->consultar_ingreso_aplicacion(trim($post->datos->nombre_usuario), trim($post->datos->clave)));
            break;
        case "cerrarSesion":
            $objeto->id_usuario=trim($post->datos->id_usuario);
            $r=$objeto->actualizar_ultima_actividad($post->hora_cliente);
            if($r["respuesta"]){
                $r["mensaje"]="Hasta pronto";
            }
            echo json_encode($r);
            break;
        case "contactar":
            $con=new Contacto();
            $con->nombre_contacto=trim($post->datos->nombre_contacto);
            $con->telefono_contacto=trim($post->datos->telefono);
            $con->correo_contacto=trim($post->datos->correo);
            $con->observacion=trim($post->datos->observaciones);
            $con->fecha_contacto=trim($post->hora_cliente);
            $m=new Mail();
            $mensajeMail="Hola soy "
                    .$con->nombre_contacto
                    ." me pueden contactar al numero de telefono"
                    .$con->telefono_contacto
                    ." o al correo "
                    .$con->correo_contacto
                    ."\nEstoy interesado en\n :"
                    .$con->observacion;
            
            $m->enviarMailAmigo("contacto@worksmart.com.co", "contacto pagina web", $mensajeMail);
            
            echo json_encode($con->crear_registro());
            break;
        case "suscripcion":
            $con=new Contacto();
           
            
            $con->correo_contacto=trim($post->datos->correo);
          
            $con->fecha_contacto=trim($post->hora_cliente);
            
            echo json_encode($con->crear_registro_suscripcion());
            break;
        case "cancelar_suscripcion":
            $con=new Contacto();
           
            
            $con->correo_contacto=trim($post->datos->correo);
          
            
            
            echo json_encode($con->eliminar_suscripcion());
            break;
        case "consularRol":
            echo json_encode($objeto->consultar_menu_rol($post->datos->id_rol));
            break;
        case "consultarTodosLosEmpleados":
            echo json_encode($objeto->consultar_todos_los_registros_usuario_empleado());
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion"));
}