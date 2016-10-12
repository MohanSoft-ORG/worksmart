<?php

class Salida extends ModeloBaseDeDatos{
    private $TABLA='salida';
    public $id_salida;
    public $codigo_salida;
    public $fecha_salida;
    public $id_empleado;


    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_salida('$this->codigo_salida','$this->fecha_salida','$this->id_empleado') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_salida=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    

    function crear_registro_bodega_a_venta($id_producto,$cantidad){
        
        $this->sentencia_sql="SELECT fun_crear_salida_bodega_a_venta('$this->id_salida','$id_producto','$cantidad') as respuesta";
                
        if($this->insertar_registro()){
      
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function crear_registro_salida_obsequio($id_producto,$id_cliente,$cantidad,$comentario){
        
        $this->sentencia_sql="SELECT fun_crear_salida_obsequio('$id_producto','$this->id_salida','$id_cliente','$cantidad','$comentario') as respuesta";
                
        if($this->insertar_registro()){
      
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function crear_registro_salida_venta($id_factura,$valor){
        
        $this->sentencia_sql="SELECT fun_crear_salida_venta('$id_factura','$this->id_salida') as respuesta";
                
        if($this->insertar_registro()){
      
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_salidas()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_valor($valor){
        $this->sentencia_sql="CALL  ('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    
    function eliminar_recurso(){
        $this->sentencia_sql="SELECT () as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT () as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
}
