/**
 * {url}=>nombre del controlador
 * {operacion}=>nombre de la operacion que va a realizar en el controlador
 * {datos}=> estructira json que va a enviar al servidor
 * */
function miObjetoAjax(url,operacion,datos){
    this.operacion=operacion;
    this.datos=datos;
    this.url=url;    
    this.respuestaServidor;    
    this.peticion_ajax=funPeticion;    
    this.peticion_ajax_upload=funPeticionUpload;
    this.hora_cliente=horaCliente();
}






