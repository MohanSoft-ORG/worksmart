<?php

class EntradaContable extends ModeloBaseDeDatos{
    private $TABLA='entrada_contable';
    public $id_entrada_contable;
    public $id_tipo;
    public $id_usuario;
    public $fecha;
    public $valor;
    
    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_entrada_contable('$this->id_tipo','$this->id_usuario','$this->valor','$this->fecha') as respuesta";
                
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }   
    function crear_registro_tipo_entrada($nombre,$descripcion){
        
        $this->sentencia_sql="SELECT fun_crear_tipo_entrada_contable('$nombre','$descripcion') as respuesta";
                
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    } 

    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_todas_las_entradas_contables()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "Parece que no hay resultado con los parametros que buscas","respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_todos_los_registros_tipo_entrada(){
        
        $this->sentencia_sql="CALL pa_consultar_todos_los_tipos_de_entrada_contable()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "Parece que no hay resultado con los parametros que buscas","respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_tipo($valor){
        
        $this->sentencia_sql="CALL pa_consultar_entrada_contable_por_tipo('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "Parece que no hay resultado con los parametros que buscas","respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_fecha($valor){
        
        $this->sentencia_sql="CALL pa_consultar_entrada_contable_por_fecha('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "Parece que no hay resultado con los parametros que buscas","respuesta"=> FALSE);
        }
        
    }
    function eliminar_recurso(){
        $this->sentencia_sql="SELECT fun_eliminar_entrada_contable('$this->id_entrada_contable') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function eliminar_recurso_tipo_entrada($id){
        $this->sentencia_sql="SELECT fun_eliminar_tipo_entrada_contable('$id') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_entrada_contable('$this->id_entrada_contable','$this->id_tipo','$this->id_usuario','$this->fecha','$this->valor') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso_tipo_entrada($id_tipo,$nombre,$descripcion){
        
        $this->sentencia_sql="SELECT fun_actualizar_tipo_entrada_contable ('$id_tipo','$nombre','$descripcion') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
}
