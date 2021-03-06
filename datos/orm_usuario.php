<?php

class Usuario extends ModeloBaseDeDatos{
    private $TABLA='usuario';
    public $id_usuario;
    public $documento;
    public $correo;




    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_usuario('$this->documento','$this->correo') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_usuario=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    

    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_todos_los_usuarios()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_valor($valor){
        $this->sentencia_sql="CALL  pa_consultar_cliente_por_identificacion('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "No hay registros con el documento que buscas","respuesta"=> FALSE);
        }
        
    }
    
    function eliminar_recurso(){
        $this->sentencia_sql="SELECT fun_eliminar_usuario('$this->id_usuario') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_usuario('$this->id_usuario',"
                . "'$this->documento','$this->correo') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }

    function crear_registro_usuario_empleado($nombre,$apellido,$telefono){
        $this->sentencia_sql="SELECT fun_crear_empleado('$nombre','$apellido','$this->id_usuario','$telefono') as respuesta";
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function crear_registro_usuario_cliente($nombre,$apellido,$tipo,$nombre_contacto,$telefono,$direccion,$coordenadas){
        $this->sentencia_sql="SELECT fun_crear_cliente('$nombre','$apellido','$tipo','$nombre_contacto','$telefono','$direccion','$this->id_usuario','$coordenadas') as respuesta";
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function consultar_todos_los_registros_usuario_empleado(){
        $this->sentencia_sql="CALL pa_consultar_todos_los_empleados()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
    }
    function consultar_todos_los_registros_usuario_cliente(){
        $this->sentencia_sql="CALL pa_consultar_todos_los_clientes()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
    }
    function consultar_registro_usuario_empleado($valor){
        $this->sentencia_sql="CALL pa_consultar_empleado_por_documento('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "No hay registros con el valor que busca","respuesta"=> FALSE);
        }
    }
    function consultar_registro_usuario_empleado_id($valor){
        $this->sentencia_sql="CALL pa_consultar_empleado_por_id('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "No hay registros con el valor que busca","respuesta"=> FALSE);
        }
    }
    function consultar_registro_usuario_cliente($valor){
        $this->sentencia_sql="CALL pa_consultar_cliente_por_identificacion('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
    }
    function consultar_registro_usuario_cliente_id($valor){
        $this->sentencia_sql="CALL pa_consultar_cliente_por_id('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
    }
    function actualizar_registro_usuario_empleado($nombre,$apellido,$telefono){
        $this->sentencia_sql="SELECT fun_actualizar_empleado('$this->id_usuario','$nombre','$apellido','$telefono') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }     
    }
    function actualizar_rol($id_rol){
        $this->sentencia_sql="SELECT fun_actualizar_rol('$this->id_usuario','$id_rol') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }     
    }
    function actualizar_registro_usuario_cliente($nombre,$apellido,$nombre_contacto,$telefono,$direccion,$coordenadas){
        $this->sentencia_sql="SELECT fun_actualizar_cliente ('$this->id_usuario','$nombre','$apellido','$nombre_contacto','$telefono','$direccion','$coordenadas') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }        
        
    }
    function crear_registro_ingreso_aplicacion($id_rol,$clave,$ultima_actividad){
        $this->sentencia_sql="SELECT fun_crear_ingreso_aplicacion('$this->id_usuario','$id_rol','$clave','$ultima_actividad') as respuesta";
                
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    
    function consultar_ingreso_aplicacion($nombre_usuario,$clave){
       // $this->sentencia_sql="CALL pa_consultar_ingreso_aplicacion('$nombre_usuario','$clave')";
       $this->sentencia_sql="SELECT * FROM vw_vista_ingreso_aplicacion WHERE DocumentoUsuario = '$nombre_usuario' AND Clave='$clave'";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>"Bienvenido",
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=> "Parece que no estas registrado o tus datos son incorrectos por favor verifica y vueve a intentarlo","respuesta"=> FALSE);
        }
    }
    
    
    function actualizar_clave($nueva_clave,$ultima_actividad){
         $this->sentencia_sql="SELECT fun_cambiar_clave('$this->id_usuario','$nueva_clave','$ultima_actividad') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }        
        
    }
    
    function actualizar_ultima_actividad($ultima_actividad){
        $this->sentencia_sql="SELECT fun_actualizar_ultima_actividad('$this->id_usuario','$ultima_actividad') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }        
        
    }
    
    function consultar_menu_rol($rol){
        $this->sentencia_sql="SELECT * 
                FROM vw_vista_permisos WHERE IdRol = '$rol'";        
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla usuario","respuesta"=>TRUE);
            return array("mensaje"=>  $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
        
    }
}
