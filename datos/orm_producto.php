<?php

class Producto extends ModeloBaseDeDatos{
    private $TABLA='producto';
    public $id_producto;
    public $codigo_producto;
    public $nombre_producto;
    public $descripcion_producto;
    public $marca;
    public $modelo;
    public $caracteristicas=array();
    public $serie;


    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_producto('$this->codigo_producto','$this->nombre_producto','$this->descripcion_producto','$this->marca','$this->modelo','$this->serie') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_producto=$this->respuesta_funcion->respuesta;
            
            foreach ($this->caracteristicas as $key => $value) {
                $this->sentencia_sql="SELECT fun_registrar_caracteristica('$this->id_producto','$value') as respuesta";
                $this->insertar_registro();
            }
            
            
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    
    function crear_producto_insumo($codigo_insumo,$marca,$nombre_insumo,$descripcion_insumo,$valor_venta){
            $this->sentencia_sql="SELECT fun_crear_producto_insumo('$codigo_insumo','$marca','$nombre_insumo','$descripcion_insumo','$valor_venta','$this->id_producto') as respuesta";
                
        if($this->insertar_registro()){
            //$this->id_producto=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_todos_los_productos()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_valor($valor){
        $this->sentencia_sql="CALL pa_consultar_productos_por_codigo('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_todos_los_registros_insumos(){
        
        $this->sentencia_sql="CALL pa_consultar_producto_todos_los_insumo()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_valor_insumos($valor){
        $this->sentencia_sql="CALL pa_consultar_producto_insumo_por_codigo('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_id_insumos($valor){
        $this->sentencia_sql="CALL pa_consultar_producto_insumo_por_id_producto('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function eliminar_recurso(){
        $this->sentencia_sql="SELECT fun_eliminar_producto('$this->id_producto') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_producto ('$this->id_producto','$this->codigo_producto','$this->nombre_producto','$this->descripcion_producto','$this->marca','$this->modelo','$this->serie') as respuesta ";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso_insumo($codigo_insumo,$nombre_insumo,$descipcion_insumo,$marca,$valor_venta){
        
        $this->sentencia_sql="SELECT fun_actualizar_producto_insumo ('$this->id_producto','$codigo_insumo','$nombre_insumo','$descipcion_insumo','$marca','$valor') as respuesta ";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_caracteristica($id_caracteristica,$descripcion_caracteristica){
        
        $this->sentencia_sql="SELECT fun_actualizar_caracteristica ('$id_caracteristica','$descripcion_caracteristica') as respuesta ";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
    
    function agregar_archivo_a_producto($nombre_archivo,$descripcion_archivo,$url){
        $this->sentencia_sql="SELECT fun_agregar_archivo_descargas('$this->id_producto','$nombre_archivo','$descripcion_archivo','$url') as respuesta";
        if($this->insertar_registro()){
            return array("mensaje"=>  $this->mensajeDepuracion,
                        "respuesta"=>TRUE,
                            "nuevo_registro"=>  $this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function habilitar_archivo($id_archivo){
        $this->sentencia_sql="SELECT fun_habilitar_archivo('$id_archivo')  as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
    function deshabilitar_archivo($id_archivo){
        $this->sentencia_sql="SELECT fun_deshabilitar_archivo('$id_archivo') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
    function actualizar_archivo($id_recurso,$id_producto,$nombre_archivo,$descripcion_archivo,$url_archivo){
        
        $this->sentencia_sql="SELECT fun_actualizar_archivo ('$id_recurso','$id_producto','$nombre_archivo','$descripcion_archivo','$url_archivo') as respuesta ";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{  
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
    function obtener_caracteristicas_producto($id){
        $this->sentencia_sql="CALL pa_consultar_caracteristicas_producto('$id')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_archivos_producto($id){
        $this->sentencia_sql="CALL pa_consultar_archivos_producto('$id')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    
}
