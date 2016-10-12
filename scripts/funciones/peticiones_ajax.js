function funPeticion(){
    
    var datos=JSON.stringify(this);//convierte a una cadena de texto
    //console.log(datos);
    this.respuestaServidor=$.ajax({
        url:"controlador/controlador_"+this.url+".php",
        data:{datos:datos},
        type:"post",
        dataType:'json'
    });
   // console.log(this.respuestaServidor);
   
}
/*
 *{datos}=>estructura que se va a enviar al servidor 
 */
function funPeticionUpload(datos){
				     	        
       
       
       
		this.respuestaServidor = $.ajax({
			data:datos,
			url: "controlador/controlador_"+this.url+".php",
			type:'post',
                        dataType:"json",
			//Requeridos para subir archivo
			cache:false,
			contentType:false,
			processData:false
			
		});		
}

