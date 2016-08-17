<?php

class Proveedor extends ModeloBaseDeDatos{
    private $TABLA="proveedor";
    public $id_proveedor;
    public $documento_proveedor;
    public $nombre_proveeedor;
    public $nombre_contacto_proveedor;
    public $telefono_contacto_proveedor;
    public $correo_contacto_proveedor;
    

    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_proveedor('$this->documento_proveedor','$this->nombre_proveeedor','$this->nombre_contacto_proveedor','$this->telefono_contacto_proveedor','$this->correo_contacto_proveedor') as respuesta";
                
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    

    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_todos_los_proveedores()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_valor($valor){
        $this->sentencia_sql="CALL pa_consultar_proveedores_por_documento('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "No hay registros con los terminos buscados","respuesta"=> FALSE);
        }
        
    }
    function eliminar_recurso(){
        $this->sentencia_sql="SELECT fun_eliminar_proveedor('$this->id_proveedor') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_proveedor('$this->id_proveedor','$this->documento_proveedor','$this->nombre_proveeedor','$this->nombre_contacto_proveedor','$this->telefono_contacto_proveedor','$this->correo_contacto_proveedor') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
}
