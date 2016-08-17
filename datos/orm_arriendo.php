<?php

class Arriendo extends ModeloBaseDeDatos{
    private $TABLA='arriendo';
    public $id_arriendo;
    public $id_cliente;
    public $id_equipo;
    public $id_servicio;
    public $fecha_inicial;
    public $fecha_final;
    public $comentario;


    public function __construct() {
        
    }
    

    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_crear_arriendo('$this->id_cliente',"
                . "'$this->id_equipo',"
                . "'$this->id_servicio',"
                . "'$this->fecha_inicial',"
                . "'$this->fecha_final',"
                . "'$this->comentario') as respuesta";
                
        if($this->insertar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    

    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL ()";
        
        
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
    function obtener_registro_filtro($filtro){
        $this->sentencia_sql="SELECT * FROM vw_vista_arriendo WHERE ".$filtro;
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  "Lo sentimos no hay arriendo con la especificacion que buscas","respuesta"=> FALSE);
        }
    }
    
    function eliminar_recurso(){
        $this->sentencia_sql="SELECT fun_cancelar_arriendo('$this->id_arriendo') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function finalizar_arriendo(){
        echo $this->sentencia_sql="SELECT fun_finalizar_arriendo('$this->id_arriendo',"
                . " '$this->comentario','$this->fecha_final') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_arriendo('$this->id_arriendo',"
                                                    . "'$this->id_equipo',"
                                                    . "'$this->fecha_inicial',"
                                                    . "'$this->comentario') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    
}
