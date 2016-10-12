<?php

class CuentaCobro extends ModeloBaseDeDatos{
    private $TABLA='cuenta_cobro';
    public $id_cuenta_cobro;
    public $codigo_cuenta_cobro;
    public $fecha_cuenta_cobro;
    public $id_cliente;
    public $id_empleado;


    public function __construct() {
        
    }
    

    function crear_registro(){
        
         $this->sentencia_sql="SELECT fun_crear_cuenta_cobro('$this->codigo_cuenta_cobro',"
                    . "'$this->fecha_cuenta_cobro',"
                    . "'$this->id_cliente',"
                    . "'$this->id_empleado') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_cuenta_cobro=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    
    
    function crear_registro_detalle_cuenta_cobro_producto($id_producto,$cantidad_vendida,$valor_cuenta_cobrodo){
        
         $this->sentencia_sql="SELECT fun_crear_detalle_cuenta_cobro_producto('$this->id_cuenta_cobro','$id_producto','$cantidad_vendida','$valor_cuenta_cobrodo') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_cuenta_cobro=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function crear_registro_detalle_cuenta_cobro_servicio($id_servicio,$cantidad_vendida,$valor_cuenta_cobrodo){
        
        $this->sentencia_sql="SELECT fun_crear_detalle_cuenta_cobro_servicio('$this->id_cuenta_cobro','$id_servicio','$cantidad_vendida','$valor_servicio') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_cuenta_cobro=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_cuenta_cobro()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_valor($valor){
        $this->sentencia_sql="CALL  pa_consultar_cuentas_de_cobro_por_codigo('$valor')";
        
        
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
