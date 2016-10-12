<?php

class Agenda extends ModeloBaseDeDatos{
    private $TABLA='agenda';
    public $id_agenda;
    public $codigo_cita;
    public $id_servicio;
    public $id_empleado;
    public $id_cliente;
    public $fecha_asignacion;
    public $fecha_inicio_servicio;
    public $fecha_fin_servicio;
    public $comentario_inicial;
    public $comentario_final;
    public $direccion;
    public $coordenadas;
    public $hora_inicio;
    public $hora_final;

    public function __construct() {
        
    }
    

    function crear_registro(){
        
       $this->sentencia_sql="SELECT fun_crear_agenda('$this->id_empleado',"
                . "'$this->id_cliente',"
                . "'$this->fecha_asignacion',"
                . "'$this->fecha_inicio_servicio',"
                . "'$this->comentario_inicial',"
                . "'$this->id_servicio',"
                . "'$this->codigo_cita',"
                . "'$this->direccion',"
                . "'$this->coordenadas','$this->hora_inicio') as respuesta";
                
        if($this->insertar_registro()){
            return array("mensaje"=>"Se ha creado una nueva cita con el codigo ".$this->codigo_cita,
                "respuesta"=>TRUE,
                "nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    

    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_todas_las_citas()";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_para_validacion($id_empleado,$fecha,$hora){
        $this->sentencia_sql="CALL pa_consultar_validar_fecha('$id_empleado','$fecha','$hora')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_fecha($valor){
        $this->sentencia_sql="CALL pa_consultar_cita_por_fecha('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_empleado($valor){
        $this->sentencia_sql="CALL pa_consultar_cita_por_empleado('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_cliente($valor){
        $this->sentencia_sql="CALL pa_consultar_cita_por_cliente('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_servicio($valor){
        $this->sentencia_sql="CALL pa_consultar_cita_por_servicio('$valor')";
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_filtro($fltro){
        $this->sentencia_sql="SELECT * FROM vw_vista_agenda WHERE ".$fltro;
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>"Parece que no hay citas con los parametros que buscas" ,"respuesta"=> FALSE);
        }
        
    }
    function cancelar_cita(){
        $this->sentencia_sql="SELECT fun_cancelar_cita('$this->id_agenda') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function finalizar_cita(){
        $this->sentencia_sql="SELECT fun_finalizar_cita('$this->id_agenda') as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_agenda('$this->id_agenda','$this->fecha_asignacion','$this->fecha_inicio_servicio','$this->id_cliente','$this->id_empleado','$this->id_servicio','$this->direccion','$this->coordenadas','$this->comentario_inicial') as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function repogramar_cita(){
        
          $this->sentencia_sql="SELECT fun_reprogramar_agenda('$this->id_agenda',"
                                                    . "'$this->id_servicio',"
                                                    . "'$this->id_empleado',"
                                                    . "'$this->id_cliente',"
                                                    . "'$this->fecha_inicio_servicio',"
                                                    . "'$this->comentario_inicial',"
                                                    . "'$this->codigo_cita',"
                                                    . "'$this->fecha_fin_servicio','$this->hora_inicio' ) as respuesta";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
}
