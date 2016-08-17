<?php

class Categoria extends ModeloBaseDeDatos{
    private $TABLA='categoria_producto';
    public $id_categoria;
    public $nombre_categoria;
    public $descripcion_categoria;
    public $imagen_categoria;
    


    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_categoria('$this->nombre_categoria','$this->descripcion_categoria','$this->imagen_categoria') as respuesta";
                
        if($this->insertar_registro()){
            $this->id_categoria=$this->respuesta_funcion->respuesta;
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    

    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_todas_las_categorias()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_valor($valor){
         $this->sentencia_sql="CALL pa_consultar_categoria_por_identificacion('$valor%')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function eliminar_recurso(){
        $this->sentencia_sql="SELECT fun_eliminar_categoria('$this->id_categoria') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_categoria('$this->id_categoria','$this->nombre_categoria','$this->descripcion_categoria','$this->imagen_categoria') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
}
