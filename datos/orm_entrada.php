<?php

class Entrada extends ModeloBaseDeDatos{
    private $TABLA='entrada';
    public $id_entrada;
    public $codigo_entrada;
    public $fecha_entrada;
    public $proveedor;
    public $lista_entrada=array();

    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_entrada('$this->codigo_entrada','$this->fecha_entrada','$this->proveedor') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_entrada=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function crear_registro_detalle_entrada_pedido($idProducto,$cantidad,$comentario){
        $this->sentencia_sql="SELECT fun_crear_entrada_pedido('$this->id_entrada','$idProducto','$cantidad','$comentario') as respuesta";
                
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function crear_registro_detalle_entrada_devolucion($id_detalle_factura,$comentario,$cantidad){
        $this->sentencia_sql="SELECT fun_crear_entrada_devolucion('$this->id_entrada','$id_detalle_factura','$comentario','$cantidad') as respuesta";
                
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function crear_registro_detalle_entrada_otros($idProducto,$cantidad,$comentario){
        $this->sentencia_sql="SELECT fun_crear_entrada_otros('$this->id_entrada','$idProducto','$cantidad','$comentario') as respuesta";
                
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }

    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_entradas()";
        
        
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
