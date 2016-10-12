<?php

class Solicitudes extends ModeloBaseDeDatos{
    private $TABLA='solicitudes';
    public $id_solicitud;
    public $numero_solicitud;
    public $fecha_solicitud;
    public $nombre_cliente;
    public $correo_cliente;
    public $telefono_cliente;
    public $lista_solicitud=array();


    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_solicitud('$this->numero_solicitud','$this->fecha_solicitud','$this->nombre_cliente','$this->correo_cliente','$this->telefono_cliente') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_solicitud=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    
    function registro_detalle_solicitud($id_producto,$cantidad){
        $this->sentencia_sql="SELECT fun_crear_detalle_solicitud_producto('$this->id_solicitud','$id_producto','$cantidad') as respuesta";
                
        if($this->insertar_registro()){
            
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_solicitudes()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_valor($valor){
        $this->sentencia_sql="CALL  pa_consultar_solicitudes_por_estado('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_detalle_solicitud($valor){
        $this->sentencia_sql="CALL  pa_consultar_detalle_solicitud('$valor')";
        
        
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
    function obtener_registro_todos_los_registros_contacto_web(){
        
        $this->sentencia_sql="CALL pa_consultar_contactos_web()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_todos_los_registros_suscritos(){
        
        $this->sentencia_sql="CALL pa_consultar_suscripciones()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
}
