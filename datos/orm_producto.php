<?php

class Producto extends ModeloBaseDeDatos{
    private $TABLA='producto';
    public $id_producto;
    public $codigo_producto;
    public $nombre_producto;
    public $descripcion_producto;
    public $marca;
    public $modelo;
    public $id_categoria;
    public $caracteristicas=array();
    public $archivos=array();
    public $serie;
    public $imagenes=array();
    public  $color;
    public  $ppm;
    public  $tipo_producto;
    public $nombre_archivos=array();


    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_producto('$this->codigo_producto',"
                            . "'$this->nombre_producto',"
                            . "'$this->descripcion_producto',"
                            . "'$this->marca',"
                            . "'$this->modelo',"
                            . "'$this->serie',"
                            . "'$this->id_categoria',"
                            . "'$this->color',"
                            . "'$this->ppm',"
                            . "'$this->tipo_producto') as respuesta";
            
        if($this->insertar_registro()){
            $this->id_producto=$this->respuesta_funcion->respuesta;
            
            foreach($this->archivos as $key => $value){
             
                $tam=filesize("../Archivos/Productos/".$value->direccion);
                    
                $this->agregar_archivo_a_producto($value->nombre_archivo, "", $value->direccion,$tam,$value->categoria_archivo);
                
            }
            
            
            
            
            foreach ($this->caracteristicas as $key => $value) {
                 $this->sentencia_sql="SELECT fun_registrar_caracteristica('$this->id_producto','$value','1') as respuesta";
                $this->insertar_registro();
            }
            
            //var_dump($this->archivos);
            

            foreach($this->imagenes as $key => $value){
            
                $this->agregar_multimedia_a_producto("Imagen", "GaleriaProductos/".$value);
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
    function obtener_registro_por_filtro($filtro){
          $this->sentencia_sql="SELECT * FROM `vw_vista_producto_electronico` WHERE ".$filtro;
        if($this->ejecutar_consulta_sql()){
           return array("respuesta"=>TRUE,"mensaje"=>"Valores consultados","valores_consultados"=> json_encode($this->filas_json));
        }else{
           return array("respuesta"=>FALSE,"mensaje"=>"No hay productos con la expecificacion que buscas");
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
        
        $this->sentencia_sql="SELECT fun_actualizar_producto ('$this->id_producto',"
                                . "'$this->codigo_producto',"
                                . "'$this->nombre_producto',"
                                . "'$this->descripcion_producto',"
                                . "'$this->marca',"
                                . "'$this->modelo',"
                                . "'$this->id_categoria',"
                                . "'$this->tipo_producto',"
                                . "'$this->color',"
                                . "'$this->ppm') as respuesta ";
        if($this->actualizar_registro()){
            $this->id_producto=$this->respuesta_funcion->respuesta;
            
            foreach($this->archivos as $key => $value){
             
                $tam=filesize("../Archivos/Productos/".$value->direccion);
                    
                $this->agregar_archivo_a_producto($value->nombre_archivo, "", $value->direccion,$tam,$value->categoria_archivo);
                
            }
            
            foreach ($this->caracteristicas as $key => $value) {
                 $this->sentencia_sql="SELECT fun_registrar_caracteristica('$this->id_producto','$value','1') as respuesta";
                $this->insertar_registro();
            }
            
            foreach($this->imagenes as $key => $value){
            
                $this->agregar_multimedia_a_producto("Imagen", "GaleriaProductos/".$value);
            }
            
            
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
    function agregar_archivo_a_producto($nombre_archivo,$descripcion_archivo,$url,$tam,$cat){
         $this->sentencia_sql="SELECT fun_agregar_archivo_descargas('$this->id_producto','$nombre_archivo','$descripcion_archivo','$url','$tam','$cat') as respuesta";
        if($this->insertar_registro()){
            return array("mensaje"=>  $this->mensajeDepuracion,
                        "respuesta"=>TRUE,
                            "nuevo_registro"=>  $this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function agregar_multimedia_a_producto($tipo,$url){
         $this->sentencia_sql="SELECT fun_agregar_multimedia_producto('$this->id_producto','$tipo','$url') as respuesta";
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
        $this->sentencia_sql="SELECT fun_eliminar_archivo('$id_archivo') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function eliminar_caracteristica($id){
        $this->sentencia_sql="SELECT fun_eliminar_caracteristica('$id') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
        
        
    }
    function eliminar_imagen($id){
        
        $this->sentencia_sql="SELECT fun_eliminar_imagen('$id') as respuesta";
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
    function obtener_multimedia_producto($id){
        $this->sentencia_sql="CALL pa_consultar_multimedia_producto('$id')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    
    function obtener_hoja_de_vida_producto($serial){
        $this->sentencia_sql="SELECT * FROM vw_vista_hoja_de_vida WHERE Serial = '$serial'";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "No hay valores con el codigo que buscas ".$serial ,"respuesta"=> FALSE);
        }
        
    }
    
    function crear_registro_hoja_de_vida($serial,$fecha){
        
        $this->sentencia_sql="SELECT fun_crear_hoja_de_vida('$this->id_producto',"
                            . "'$serial',"
                            . "'$fecha') as respuesta";
            
        if($this->insertar_registro()){
                      
            
            
            
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    
    function crear_registro_mantenimiento($id,$fecha,$tecnico,$descripcion){
        
        $this->sentencia_sql="SELECT fun_crear_mantenimiento('$id',"
                            . "'$fecha',"
                            . "'$tecnico','$descripcion') as respuesta";
            
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }  
}
