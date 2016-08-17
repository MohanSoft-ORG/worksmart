<?php

class Factura extends ModeloBaseDeDatos{
    private $TABLA='factura';
    public $id_factura;
    public $codigo_factura;
    public $fecha_factura;
    public $id_cliente;
    public $id_empleado;


    public function __construct() {
        
    }
    

    function crear_registro(){
        
         $this->sentencia_sql="SELECT fun_crear_factura('$this->codigo_factura',"
                    . "'$this->fecha_factura',"
                    . "'$this->id_cliente',"
                    . "'$this->id_empleado') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_factura=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    
    
    function crear_registro_detalle_factura_producto($id_producto,$cantidad_vendida,$valor_facturado){
        
         $this->sentencia_sql="SELECT fun_crear_detalle_factura_producto('$this->id_factura','$id_producto','$cantidad_vendida','$valor_facturado') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_factura=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function crear_registro_detalle_factura_servicio($id_servicio,$cantidad_vendida,$valor_facturado){
        
        $this->sentencia_sql="SELECT fun_crear_detalle_factura_servicio('$this->id_factura','$id_servicio','$cantidad_vendida','$valor_servicio') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_factura=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_facturas()";
        
        
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
