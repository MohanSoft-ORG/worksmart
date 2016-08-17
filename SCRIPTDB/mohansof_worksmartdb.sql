-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 17-08-2016 a las 00:14:20
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.5.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `mohansof_worksmartdb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE  PROCEDURE `pa_consultar_archivos_producto`(IN `id_producto` INT)
    NO SQL
SELECT * FROM archivos_adicionales WHERE Fk_Id_Producto=id_producto$$

CREATE  PROCEDURE `pa_consultar_caracteristicas_producto`(IN `id_producto` INT)
    NO SQL
SELECT * FROM vw_vista_caracteristicas WHERE Fk_Id_Caracteristica_Producto=id_producto$$

CREATE  PROCEDURE `pa_consultar_categoria_por_identificacion`(IN `valor` VARCHAR(55))
    NO SQL
SELECT * FROM categoria_producto WHERE NombreCategoria LIKE valor$$

CREATE  PROCEDURE `pa_consultar_cita_por_cliente`(IN `id_cliente` INT)
    NO SQL
SELECT * FROM vw_vista_agenda WHERE Fk_Id_Cliente = id_cliente$$

CREATE  PROCEDURE `pa_consultar_cita_por_empleado`(IN `id_empleado` INT)
    NO SQL
SELECT * FROM vw_vista_agenda WHERE Fk_Id_Empleado = id_empleado$$

CREATE  PROCEDURE `pa_consultar_cita_por_fecha`(IN `fecha` DATETIME)
    NO SQL
SELECT * FROM vw_vista_agenda WHERE FechaInicioServicio LIKE fecha$$

CREATE  PROCEDURE `pa_consultar_cita_por_servicio`(IN `id_servicio` INT)
    NO SQL
SELECT * FROM vw_vista_agenda WHERE Fk_Id_Servicio = id_servicio$$

CREATE  PROCEDURE `pa_consultar_cliente_por_identificacion`(IN `valor` INT)
    NO SQL
SELECT * FROM vw_vista_clientes WHERE DocumentoUsuario=valor$$

CREATE  PROCEDURE `pa_consultar_empleado_por_documento`(IN `valor` VARCHAR(20))
    NO SQL
SELECT * FROM vw_vista_empleados WHERE DocumentoUsuario=valor OR NombreEmpleado=valor$$

CREATE  PROCEDURE `pa_consultar_entradas`()
    NO SQL
SELECT * FROM entrada$$

CREATE  PROCEDURE `pa_consultar_facturas`()
    NO SQL
SELECT * FROM vw_vista_facturas$$

CREATE  PROCEDURE `pa_consultar_facturas_por_codigo`(IN `cod` VARCHAR(20))
    NO SQL
SELECT * FROM factura WHERE NumeroFactura = cof$$

CREATE  PROCEDURE `pa_consultar_factura_por_fecha`(IN `fecha_inical` DATETIME, IN `fecha_final` DATETIME)
    NO SQL
SELECT * FROM factura WHERE FechaFactura >= fecha_inicial AND FechaFactura <= fecha_final$$

CREATE  PROCEDURE `pa_consultar_hoja_de_vida`(IN `serial` VARCHAR(55))
    NO SQL
SELECT * FROM vw_vista_hoja_de_vida WHERE Serial = serial$$

CREATE  PROCEDURE `pa_consultar_ingreso_aplicacion`(IN `nombre_usuario` VARCHAR(55), IN `clave` VARCHAR(256))
    NO SQL
SELECT * FROM vw_vista_ingreso_aplicacion WHERE DocumentoUsuario = nombre_usuario OR CorreoUsuario = nombre_usuario AND Clave=clave$$

CREATE  PROCEDURE `pa_consultar_items_factura_productos`(IN `id_factura` INT)
    NO SQL
SELECT * FROM vw_vista_factura_productos WHERE Fk_Id_Factura=id_factura$$

CREATE  PROCEDURE `pa_consultar_items_factura_servicio`(IN `id_factura` INT)
    NO SQL
SELECT * FROM vw_vista_factura_servicios WHERE Fk_Id_Factura=id_factura$$

CREATE  PROCEDURE `pa_consultar_multimedia_producto`(IN `id` INT)
    NO SQL
SELECT * FROM multimedia_producto WHERE Fk_Id_Producto_Multimedia = id$$

CREATE  PROCEDURE `pa_consultar_productos_por_codigo`(IN `codigo` VARCHAR(55))
    NO SQL
SELECT * FROM vw_vista_producto_electronico WHERE CodigoProducto LIKE codigo$$

CREATE  PROCEDURE `pa_consultar_producto_insumo_por_codigo`(IN `valor` VARCHAR(55))
    NO SQL
SELECT * FROM vw_vista_producto_insumos WHERE NombreProducto LIKE valor OR CodigoProducto=valor$$

CREATE  PROCEDURE `pa_consultar_producto_insumo_por_id_producto`(IN `id_producto` INT)
    NO SQL
SELECT * FROM producto_insumo WHERE Fk_Id_Producto_Insumo=id_producto$$

CREATE  PROCEDURE `pa_consultar_producto_todos_los_insumo`()
    NO SQL
SELECT * FROM vw_vista_producto_insumos$$

CREATE  PROCEDURE `pa_consultar_proveedores_por_documento`(IN `valor` VARCHAR(55))
    NO SQL
SELECT * FROM proveedor WHERE  DocumentoProveedor = valor OR NombreProveedor = valor$$

CREATE  PROCEDURE `pa_consultar_salidas`()
    NO SQL
SELECT * FROM salida$$

CREATE  PROCEDURE `pa_consultar_servicio_por_codigo`(IN `valor` VARCHAR(55))
    NO SQL
SELECT * FROM servicio WHERE CodigoServicio=valor OR NombreServicio=valor$$

CREATE  PROCEDURE `pa_consultar_solicitudes`()
    NO SQL
SELECT * FROM solicitudes$$

CREATE  PROCEDURE `pa_consultar_todas_las_categorias`()
    NO SQL
SELECT * FROM categoria_producto$$

CREATE  PROCEDURE `pa_consultar_todas_las_citas`()
    NO SQL
SELECT * FROM vw_vista_agenda$$

CREATE  PROCEDURE `pa_consultar_todos_los_clientes`()
    NO SQL
SELECT * FROM vw_vista_clientes$$

CREATE  PROCEDURE `pa_consultar_todos_los_empleados`()
    NO SQL
SELECT * FROM vw_vista_empleados$$

CREATE  PROCEDURE `pa_consultar_todos_los_productos`()
    NO SQL
SELECT * FROM producto$$

CREATE  PROCEDURE `pa_consultar_todos_los_proveedores`()
    NO SQL
SELECT * FROM proveedor$$

CREATE  PROCEDURE `pa_consultar_todos_los_servicio`()
    NO SQL
SELECT * FROM servicio$$

CREATE  PROCEDURE `pa_consultar_todos_los_usuarios`()
    NO SQL
SELECT * FROM usuario$$

CREATE  PROCEDURE `pa_consultar_usuario_por_campo`(IN `campo` INT)
    NO SQL
SELECT * FROM usuario WHERE DocumentoUsuario=campo OR CorreoUsuario=campo$$

CREATE  PROCEDURE `pa_consultar_validar_fecha`(IN `id_empleado` INT, IN `fecha` DATE, IN `hora` TIME)
    NO SQL
SELECT * FROM vw_vista_agenda WHERE FechaInicioServicio=fecha AND Hora_Inicio=hora AND Fk_Id_Empleado=id_empleado$$

--
-- Funciones
--
CREATE  FUNCTION `fun_actualizar_agenda`(`id_agenda` INT, `fecha_asignacion` DATETIME, `fecha_inicio_servicio` DATETIME, `id_cliente` INT, `id_empleado` INT, `id_servicio` INT, `direccion_servicio` VARCHAR(256), `coordenadas` VARCHAR(256), `comentario_inicial` VARCHAR(256)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM agenda WHERE IdAgenda=id_agenda) THEN 
	UPDATE agenda SET 
    FechaAsignacion=fecha_asignacion,
    FechaInicioServicio=fecha_inicio_servicio,
    Fk_Id_Cliente=id_cliente,
    Fk_Id_Empleado=id_empleado,
    Fk_id_Servicio=id_servicio,
    DireccionServicio=direccion_servicio,
    Coordenadas=coordenadas,
    ComentarioInicial=comentario_inicial
    WHERE IdAgenda=id_Agenda;
    RETURN id_Agenda;
	
ELSE 
 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_actualizar_archivo`(`id_recurso` INT, `id_producto` INT, `nuevo_nombre` VARCHAR(125), `nueva_descripcion` VARCHAR(256), `nueva_url` VARCHAR(100)) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM archivos_adicionales WHERE Id_Recurso=id_recurso) THEN 
 UPDATE archivos_adicionales SET Fk_Id_Producto=id_producto,
 					NombreArchivo=nuevo_nombre,
                    DescripcionArchivo 	= nueva_descripcion,
                    UrlArchivo=nueva_url
                    WHERE Id_Recurso=id_recurso LIMIT 1;
                    
                    RETURN id_recurso;

ELSE
RETURN 0;
END IF$$

CREATE  FUNCTION `fun_actualizar_arriendo`(`id_arriendo` INT, `id_equipo` INT, `fecha` DATE, `comentario` VARCHAR(256)) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM arriendo WHERE IdArriendo=id_arriendo) THEN 
	UPDATE `arriendo` SET `Fk_Id_Equipo`= id_equipo,`FechaInicioAlquiler`=fecha,`ComentarioInicial`=comentario WHERE IdArriendo=id_arriendo;
    RETURN id_arriendo;

ELSE 


 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_actualizar_caracteristica`(`id_caracteristica` INT, `descripcion` VARCHAR(256)) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM producto_caracteristica WHERE IdCarcteristica=id_caracteristica)THEN 
  UPDATE producto_caracteristica SET DescripcionCacateristica=descripcion
  WHERE IdCaracetristica=id_caracteristica;
  
  RETURN id_caracteristica;
ELSE 

 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_actualizar_categoria`(`id_categoria` INT, `nuevo_nombre` VARCHAR(55), `nueva_descripcion` VARCHAR(256), `nueva_imagen` VARCHAR(55)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM categoria_producto WHERE IdCategoriaProducto=id_categoria) THEN
    UPDATE categoria_producto SET NombreCategoria=nuevo_nombre,DescripcionCategoria=nueva_descripcion,ImagenCategoria=nueva_imagen
    WHERE IdCategoriaProducto=id_categoria LIMIT 1;
    RETURN id_categoria;
ELSE 
  RETURN 0;


END IF$$

CREATE  FUNCTION `fun_actualizar_cliente`(`id_usuario` INT, `nuevo_nombre` VARCHAR(55), `nuevo_apellido` VARCHAR(55), `nuevo_contacto_cliente` VARCHAR(30), `nuevo_telefono` VARCHAR(20), `nueva_direccion` VARCHAR(30)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM cliente WHERE Fk_Id_Usuario_Cliente=id_usuario) THEN 
	
    UPDATE cliente SET NombreCliente=nuevo_nombre,ApellidoCliente=nuevo_apellido,NombreContactoCliente = nuevo_contacto_cliente,TelefonoContactoCliente=nuevo_telefono,DireccionContactoCliente=nueva_direccion
    WHERE Fk_Id_Usuario_Cliente=id_usuario LIMIT 1;
    
     RETURN id_usuario;

ELSE 
  RETURN 0;


END IF$$

CREATE  FUNCTION `fun_actualizar_empleado`(`id_usuario` INT, `nuevo_nombre` VARCHAR(55), `nuevo_apellido` VARCHAR(55), `telefono` VARCHAR(55)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM empleado WHERE Fk_Id_Usuario_Empleado=id_usuario) THEN 
	
    UPDATE empleado SET 
    NombreEmpleado=nuevo_nombre,
    ApellidoEmpleado=nuevo_apellido,
    Telefono=telefono
    WHERE Fk_Id_Usuario_Empleado=id_usuario LIMIT 1;
    
    RETURN id_usuario;

ELSE 
  RETURN 0;


END IF$$

CREATE  FUNCTION `fun_actualizar_producto`(`id_producto` INT, `nuevo_codigo` VARCHAR(55), `nuevo_nombre` VARCHAR(256), `nueva_descripcion` VARCHAR(256), `nueva_marca` INT, `nuevo_modelo` VARCHAR(55), `id_categoria` INT, `tipo` VARCHAR(55), `color` VARCHAR(20), `ppm` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM producto WHERE IdProducto = id_producto) THEN 
   UPDATE producto SET CodigoProducto=nuevo_codigo,
   							 NombreProducto=nuevo_nombre, 
                             DescripcionProducto=nueva_descripcion,
                             Marca=nueva_marca,
                             Modelo=nuevo_modelo,
                             Fk_Id_Categoria_Producto=id_categoria,
                             TipoProducto=tipo,
                             Color=color,
                             Ppm=ppm
                             WHERE IdProducto=id_producto;
   
  RETURN id_producto;        
                                                                                   
                             
ELSE
	RETURN 0;


END IF$$

CREATE  FUNCTION `fun_actualizar_producto_insumo`(`id_producto` INT, `codigo_insumo` VARCHAR(55), `nombre_insumo` VARCHAR(256), `descripcion_insumo` VARCHAR(256), `marca` VARCHAR(256), `valor_venta` VARCHAR(256)) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM producto_insumo WHERE IdProducto=id_producto) THEN 
   UPDATE producto_insumo SET 
   CodigoInsumo=codigo_insumo,NombreInsumo=nombre_insumo,DescripcionInsumo=descripcion_insumo,Marca=marca,ValorVenta=valor_venta
                            WHERE Id_Producto_Insumo=id_producto;
   RETURN id_producto;
  ELSE 
  
  RETURN 0;
  END IF$$

CREATE  FUNCTION `fun_actualizar_proveedor`(`id_proveedor` INT, `nuevo_documento_proveedor` VARCHAR(25), `nuevo_nombre_proveedor` VARCHAR(55), `nuevo_contacto_proveedor` VARCHAR(55), `nuevo_telefono_contacto_proveedor` VARCHAR(20), `nuevo_correo_contacto_proveedor` VARCHAR(55)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM proveedor WHERE IdProveedor=id_proveedor) THEN 
	UPDATE proveedor SET DocumentoProveedor=nuevo_documento_proveedor,
    						NombreProveedor=nuevo_nombre_proveedor,
                            NombreContactoProveedor=nuevo_contacto_proveedor,
                            TelefonoContactoProveedor=nuevo_telefono_contacto_proveedor,
                            CorreoContactoProveedor=nuevo_correo_contacto_proveedor WHERE IdProveedor=id_proveedor LIMIT 1;


  RETURN id_proveedor;
ELSE 
  RETURN 0;

END IF$$

CREATE  FUNCTION `fun_actualizar_rol`(`id_usuario` INT, `id_rol` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM ingreso_aplicacion WHERE Fk_Id_Usuario=id_usuario) THEN
	UPDATE ingreso_aplicacion SET Fk_Id_Rol = id_rol WHERE Fk_Id_Usuario=id_usuario;
    RETURN id_usuario;
ELSE 
RETURN 0;
END IF$$

CREATE  FUNCTION `fun_actualizar_servicio`(`nuevo_codigo` VARCHAR(55), `nuevo_nombre` VARCHAR(55), `nueva_descripcion` VARCHAR(256), `nueva_imagen` VARCHAR(55), `nuevo_valor` DECIMAL, `id_servicio` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM servicio WHERE IdServicio=id_servicio) 
THEN 
   UPDATE servicio SET CodigoServicio=nuevo_codigo,
   						NombreServicio=nuevo_nombre,
                        DescripcionServicio=nueva_descripcion,
                        ImagenServicio=nueva_imagen,
                        ValorServicio=nuevo_valor
                        WHERE IdServicio=id_servicio;
                 RETURN id_servicio;       
ELSE 
	RETURN 0;

END IF$$

CREATE  FUNCTION `fun_actualizar_ultima_actividad`(`id_usuario` INT, `ultima_actividad` DATETIME) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=id_usuario) THEN 

	UPDATE ingreso_aplicacion 
    SET UltimaActividad=ultima_actividad 
    WHERE Fk_Id_Usuario=id_usuario;
    
    RETURN id_usuario;


ELSE
 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_actualizar_usuario`(`id_usuario` INT, `nuevo_documento` VARCHAR(55), `nuevo_correo` VARCHAR(55)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM usuario WHERE IdUsuario=id_usuario) THEN 
	UPDATE usuario SET DocumentoUsuario=nuevo_documento,CorreoUsuario=nuevo_correo
    WHERE IdUsuario=id_usuario LIMIT 1;
	RETURN id_usuario;
ELSE 

 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_agregar_archivo_descargas`(`id_producto` INT, `nombre_archivo` VARCHAR(125), `descripcion_archivo` VARCHAR(256), `url_archivo` VARCHAR(100), `tam` INT, `categoria` ENUM('manuales','drivers','otros')) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM producto WHERE Idproducto=id_producto) THEN
 INSERT INTO archivos_adicionales (Fk_Id_Producto,NombreArchivo,DescripcionArchivo,UrlArchivo,Tam,categoria_archivo)
 VALUES(id_producto,nombre_archivo,descripcion_archivo,url_archivo,tam,categoria);
 RETURN LAST_INSERT_ID();
ELSE
 RETURN 0;
END IF$$

CREATE  FUNCTION `fun_agregar_multimedia_producto`(`id_producto` INT, `tipo` ENUM('Video','Imagen'), `direccion` VARCHAR(256)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM producto WHERE IdProducto=id_producto) THEN 
	INSERT INTO multimedia_producto (NombreMultimedia, DireccionMultimedia, Fk_Id_Producto_Multimedia) 
VALUES(tipo,direccion,id_producto);
    RETURN LAST_INSERT_ID();

ELSE 

RETURN 0;
END IF$$

CREATE  FUNCTION `fun_cambiar_clave`(`id_usuario` INT, `nueva_clave` VARCHAR(256), `ultima_actividad` DATETIME) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM usuario WHERE IdUsuario=id_usuario) THEN 
 UPDATE ingreso_aplicacion SET Clave=nueva_clave , UltimaActividad=ultima_actividad
 WHERE Fk_Id_Usuario=id_usuario;
 RETURN id_usuario;
 ELSE
RETURN 0;

END IF$$

CREATE  FUNCTION `fun_cancelar_arriendo`(`id_arriendo` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM arriendo WHERE IdArriendo=id_arriendo) THEN 
	UPDATE arriendo SET EstadoArriendo =  'Cancelado' WHERE IdArriendo=id_arriendo;
    RETURN id_arriendo;

ELSE 
	RETURN 0;

END IF$$

CREATE  FUNCTION `fun_cancelar_cita`(`id_agenda` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM agenda WHERE IdAgenda=id_agenda) THEN 
		UPDATE agenda SET EstadoProgramado='C' WHERE IdAgenda=id_agenda LIMIT 1;
 	RETURN   id_agenda;     

 ELSE 
RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_agenda`(`id_empleado` INT, `id_cliente` INT, `fecha_programacion` DATETIME, `fecha_inicio_servicio` DATE, `comentario_inicial` VARCHAR(256), `id_servicio` INT, `codigo_cita` VARCHAR(20), `direccion` INT, `coordenadas` INT, `hora_inicio` TIME) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT * FROM agenda WHERE FechaInicioServicio=fecha_inicio_servicio AND Hora_Inicio=hora_inicio AND Fk_Id_Empleado=ID_empleado) THEN 
  INSERT INTO agenda (FK_Id_Servicio,Fk_Id_Empleado,Fk_Id_Cliente,FechaInicioServicio,Hora_Inicio,ComentarioInicial,CodigoCita,DireccionServicio,Coordenadas) 
   VALUES (id_servicio,id_empleado,id_cliente,fecha_inicio_servicio,hora_inicio,comentario_inicial,codigo_cita,direccion,coordenadas);
   RETURN LAST_INSERT_ID();
                

ELSE 
	RETURN 0;
END IF$$

CREATE  FUNCTION `fun_crear_arriendo`(`id_cliente` INT, `id_equipo` INT, `id_servicio` INT, `fecha_inicio` DATE, `fecha_fin` DATE, `comentario` VARCHAR(256)) RETURNS int(11)
    NO SQL
IF NOT  EXISTS (SELECT * FROM arriendo WHERE Fk_Id_Equipo=id_equipo AND EstadoArriendo='Activo') THEN 
	INSERT INTO `arriendo`(`Fk_Id_Equipo`, `Fk_Id_Cliente`, `FechaInicioAlquiler`, `FechaFinAlquiler`, `ComentarioInicial`, `Fk_Id_Servicio`)
    VALUES(id_equipo,id_cliente,fecha_inicio,fecha_fin,comentario,id_servicio);
    RETURN LAST_INSERT_ID();


ELSE
	
 RETURN 0;
END IF$$

CREATE  FUNCTION `fun_crear_categoria`(`nombre_categoria` VARCHAR(55), `descripcion_categoria` VARCHAR(256), `imagen_categoria` VARCHAR(55)) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT * FROM categoria_producto WHERE NombreCategoria = nombre_categoria ) THEN
	INSERT INTO categoria_producto (NombreCategoria,DescripcionCategoria,ImagenCategoria)
    		VALUES(nombre_categoria,descripcion_categoria,imagen_categoria);
            
            RETURN LAST_INSERT_ID();
ELSE 
		RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_cliente`(`nombre_cliente` VARCHAR(55), `apellido_cliente` VARCHAR(55), `tipo_cliente` ENUM('EMPRESA','EMPRENDEDOR'), `nombre_contacto_cliente` VARCHAR(30), `telefono_contacto` VARCHAR(20), `direccion_contacto` VARCHAR(30), `id_usuario` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=id_usuario) THEN 
	INSERT INTO cliente (NombreCliente,ApellidoCliente,TipoCliente,NombreContactoCliente,TelefonoContactoCliente,DireccionContactoCliente,Fk_Id_Usuario_Cliente)
       VALUES(nombre_cliente,apellido_cliente,tipo_cliente,nombre_contacto_cliente,telefono_contacto,direccion_contacto,id_usuario);
       RETURN LAST_INSERT_ID();


ELSE 
RETURN 0;


END IF$$

CREATE  FUNCTION `fun_crear_contacto`(`nombre` VARCHAR(55), `telefono` VARCHAR(55), `email` VARCHAR(55), `observaciones` VARCHAR(512), `fecha_contacto` DATETIME) RETURNS int(11)
    NO SQL
IF NOT EXISTS(SELECT * FROM contacto WHERE Email=email) THEN 
INSERT INTO contacto (NombreContacto,TelefonoContacto,Email,Observaciones,FechaContacto)
VALUES(nombre,telefono,email,observaciones,fecha_contacto);
RETURN LAST_INSERT_ID();

ELSE 

INSERT INTO contacto (NombreContacto,TelefonoContacto,Email,Observaciones,FechaContacto)
VALUES(nombre,telefono,email,observaciones,fecha_contacto);
RETURN LAST_INSERT_ID();


END IF$$

CREATE  FUNCTION `fun_crear_detalle_factura_producto`(`id_factura` INT, `id_producto` INT, `cantidad_vendida` INT, `valor_facturado` DECIMAL) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM factura WHERE IdFactura=id_factura) THEN 
  INSERT INTO detalle_factura_producto (Fk_Id_Factura,Fk_Id_Producto,CantidadVendida,ValorFacturado)
  VALUES (id_factura,id_producto,cantidad_vendida,valor_facturado);
  
  UPDATE producto SET ExistenciasTienda = ExistenciasTienda-cantidad_vendida
  	WHERE IdProducto=id_producto;
  
  
  RETURN LAST_INSERT_ID();
ELSE 
 RETURN 0;
END IF$$

CREATE  FUNCTION `fun_crear_detalle_factura_servicio`(`id_factura` INT, `id_servicio` INT, `cantidad_vendida` INT, `valor_servicio` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM factura WHERE IdFactura=id_factura) THEN 
 INSERT INTO detalle_factura_servicio (Fh_Id_Factura,Fk_Id_Servicio,CantidadVendida,ValorServicioFactura)
 VALUES(id_factura,id_servicio,cantidad_vendida,valor_servicio);
 RETURN LAST_INSERT_ID();
ELSE
RETURN 0;
END IF$$

CREATE  FUNCTION `fun_crear_detalle_solicitud_producto`(`id_solicitud` INT, `id_producto` INT, `cantidad_solicitada` INT) RETURNS int(11)
IF EXISTS (SELECT * FROM solicitudes WHERE IdSolicitud=id_solicitud) THEN 
INSERT INTO detalle_solicitud_producto (Fk_Id_Solicitud,Fk_Id_Producto,CantidadSolicitada)
  VALUES (id_solicitud,id_producto,cantidad_solicitada);
  
  
  
  RETURN LAST_INSERT_ID();
  ELSE 
 RETURN 0;
END IF$$

CREATE  FUNCTION `fun_crear_empleado`(`nombre_empleado` VARCHAR(100), `apellido_empleado` VARCHAR(100), `id_usuario` INT, `telefono` VARCHAR(55)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM usuario WHERE IdUsuario=id_usuario) THEN 

	INSERT INTO empleado (NombreEmpleado,ApellidoEmpleado,Fk_Id_Usuario_Empleado,Telefono)
 VALUES(nombre_empleado,apellido_empleado,id_usuario,telefono);
 RETURN LAST_INSERT_ID();
ELSE 


  RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_entrada`(`codigo_entrada` VARCHAR(20), `fecha_entrada` DATETIME, `id_proveedor` INT) RETURNS int(11)
    NO SQL
IF  NOT EXISTS (SELECT * FROM entrada WHERE CodigoEntrada=codigo_entrada) THEN 
	INSERT INTO entrada (CodigoEntrada,FechaEntrada,Fk_Id_Proveedor)
    		VALUES(codigo_entrada,fecha_entrada,id_proveedor);
            
            RETURN LAST_INSERT_ID();

ELSE 
RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_entrada_devolucion`(`id_entrada` INT, `id_detalle_factura` INT, `comentario` VARCHAR(256), `cantidad` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM entrada WHERE IdEntrada=id_entrada) THEN
  INSERT INTO entrada_devolucion (Fk_Id_Entrada,Fk_Id_Detalle_Factura,Comentario,Cantidad)
  VALUES (id_entrada,id_detalle_factura,comentario,cantidad);
     
   
  
   UPDATE producto SET ExistenciasBodega=ExistenciasBodega+cantidad
   WHERE IdProducto=id_producto;
       
  
 RETURN LAST_INSERT_ID();  	
   
   
  
 
ELSE 

RETURN 0;


END IF$$

CREATE  FUNCTION `fun_crear_entrada_otros`(`id_entrada` INT, `id_producto` INT, `cantidad` INT, `comentario` VARCHAR(512)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM entrada WHERE IdEntrada=id_entrada) THEN
  INSERT INTO entrada_otros (Fk_Id_Entrada,Fk_Id_Producto,Cantidad,Comentario)
  VALUES (id_entrada,id_producto,cantidad,comentario);
  
   
 
   
   UPDATE producto SET ExistenciasBodega=ExistenciasBodega+cantidad
   WHERE IdProducto=id_producto;
    
   
  
 RETURN LAST_INSERT_ID();  	
   
   
  
 
ELSE 

RETURN 0;


END IF$$

CREATE  FUNCTION `fun_crear_entrada_pedido`(`id_entrada` INT, `id_producto` INT, `cantidad` INT, `comentario` VARCHAR(256)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM entrada WHERE IdEntrada=id_entrada) THEN
  INSERT INTO entrada_pedido (Fk_Id_Entrada,Fk_Id_Producto,Cantidad,Comentario)
  VALUES (id_entrada,id_producto,cantidad,comentario);
   
   UPDATE producto SET ExistenciasBodega=ExistenciasBodega+cantidad
   WHERE IdProducto=id_producto;
  
 RETURN LAST_INSERT_ID();  	
 
ELSE 

RETURN 0;


END IF$$

CREATE  FUNCTION `fun_crear_factura`(`codigo_factura` VARCHAR(55), `fecha_factura` DATETIME, `id_cliente` INT, `id_empleado` INT) RETURNS int(11)
    NO SQL
IF NOT  EXISTS (SELECT * FROM factura WHERE NumeroFactura = codigo_factura) THEN 
  INSERT INTO factura (NumeroFactura,FechaFactura,Fk_Id_Usuario_Cliente_Factura,Fk_Id_Empleado_Factura)
  VALUES (codigo_factura,fecha_factura,id_cliente,id_empleado);
  RETURN LAST_INSERT_ID();

ELSE 
 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_hoja_de_vida`(`id_producto` INT, `serial` VARCHAR(55), `fecha` DATETIME) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM producto WHERE IdProducto=id_producto) THEN 
	 INSERT INTO `hoja_de_vida`( `Fk_Id_Producto`, `Serial`, `Fecha_Inicio`)
     VALUES(id_producto,serial,fecha);
     RETURN LAST_INSERT_ID();


ELSE

 RETURN 0;
END IF$$

CREATE  FUNCTION `fun_crear_ingreso_aplicacion`(`id_usuario` INT, `id_rol` INT, `clave` INT, `ultima_actividad` INT) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT * FROM ingreso_aplicacion WHERE Fk_Id_Usuario=id_usuario) THEN 
	INSERT INTO ingreso_aplicacion (Fk_Id_Usuario,Clave,UltimaActividad,Fk_Id_Rol)
    VALUES(id_usuario,clave,ultima_actividad,id_rol);
    RETURN LAST_INSERT_ID();

ELSE 
 RETURN 0;


END IF$$

CREATE  FUNCTION `fun_crear_mantenimiento`(`id_equipo` INT, `fecha` DATETIME, `id_tecnico` INT, `descripcion` VARCHAR(256)) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM hoja_de_vida WHERE IdHojaVida=id_equipo) THEN 
  INSERT INTO `mantenimiento`( `Fk_Id_Equipo`, `FechaMatenimiento`, `Fk_Id_Tecnico`, `DescripcionMantenimiento`) VALUES 
(id_equipo,fecha,id_tecnico,descripcion);
RETURN LAST_INSERT_ID();
ELSE
 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_producto`(`codigo_producto` VARCHAR(25), `nombre_producto` VARCHAR(55), `descripcion_producto` VARCHAR(255), `marca` VARCHAR(256), `modelo` VARCHAR(256), `serie` VARCHAR(256), `id_categoria` INT, `color` ENUM('Blanco y Negro','Color'), `ppm` INT, `tipo` VARCHAR(55)) RETURNS int(11)
IF NOT EXISTS (SELECT * FROM producto WHERE CodigoProducto = codigo_producto) THEN 
	   INSERT INTO producto (CodigoProducto,NombreProducto,DescripcionProducto,Marca,Modelo,Serie,Fk_Id_Categoria_Producto,Color,Ppm,TipoProducto)
    			VALUES (codigo_producto,nombre_producto,descripcion_producto,marca,modelo,serie,id_categoria,color,ppm,tipo);
       RETURN LAST_INSERT_ID();
ELSE
	RETURN 0;
END IF$$

CREATE  FUNCTION `fun_crear_producto_insumo`(`codigo_insumo` VARCHAR(256), `marca` VARCHAR(256), `nombre_insumo` VARCHAR(256), `descripcion_insumo` VARCHAR(512), `valor_venta` DECIMAL, `id_producto` INT) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT * FROM producto_insumo WHERE CodigoInsumo=codigo_insumo) THEN
  	INSERT INTO producto_insumo (CodigoInsumo,Marca,NombreInsumo,DescripcionInsumo,ValorVenta,Fk_Id_Producto_Insumo)  VALUES(codigo_insumo,marca,nombre_insumo,descripcion_insumo,valor_venta,id_producto);
  RETURN LAST_INSERT_ID();
ELSE
 RETURN 0;
END IF$$

CREATE  FUNCTION `fun_crear_proveedor`(`documento_proveedor` INT, `nombre_proveedor` VARCHAR(55), `contacto_proveedor` VARCHAR(55), `telefono_contacto` VARCHAR(55), `correo_contacto` VARCHAR(55)) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT * FROM proveedor WHERE DocumentoProveedor=documento_proveedor) THEN
	
    INSERT INTO `proveedor`( `DocumentoProveedor`, `NombreProveedor`, `NombreContactoProveedor`, `TelefonoContactoProveedor`, `CorreoContactoProveedor`) VALUES(documento_proveedor,nombre_proveedor,contacto_proveedor,telefono_contacto,correo_contacto);
    RETURN LAST_INSERT_ID();
ELSE 
RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_salida`(`codigo_salida` VARCHAR(20), `fecha_salida` DATETIME, `id_empleado` INT) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT * FROM salida WHERE CodigoSalida=codigo_salida) THEN 
 INSERT INTO salida (CodigoSalida,FechaSalida,Fk_Id_Empleado_Salida)
	VALUES (codigo_salida,fecha_salida,id_empleado);
 
 RETURN LAST_INSERT_ID();


ELSE 

 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_salida_bodega_a_venta`(`id_producto` INT, `cantidad_salida` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM producto WHERE IdProducto=id_producto) THEN 
 UPDATE producto
 SET ExistenciasTienda=ExistenciasTienda+cantidad_salida,
 	ExistenciasBodega=ExistenciasBodega-cantidad_salida
    WHERE IdProducto=id_producto;
    RETURN id_producto;

ELSE 
 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_salida_obsequio`(`id_producto` INT, `id_salida` INT, `id_cliente` INT, `cantidad` INT, `comentario` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM salida WHERE IdSalida=id_salida) THEN
 INSERT INTO salida_obsequio(Fk_Id_Salida,Fk_Id_Producto_Salida_Obsequio,Fk_Id_Cliente_Salida_Obsequio,Cantidad,Comentario)

VALUES(id_salida,id_producto,id_cliente,cantidad,comentario);

   UPDATE producto SET ExistenciasBodega=ExistenciasBodega - cantidad
   WHERE IdProducto=id_producto;
    
 
 RETURN LAST_INSERT_ID();

ELSE 

  RETURN 0;


END IF$$

CREATE  FUNCTION `fun_crear_salida_venta`(`id_factura` INT, `id_salida` INT) RETURNS int(11)
IF EXISTS (SELECT * FROM factura WHERE IdFactura=id_factura ) THEN 
INSERT INTO salida_venta (Fk_Id_Salida,Fk_Id_Factura)
  VALUES(id_salida,id_factura);
	
    RETURN LAST_INSERT_ID();


ELSE

  RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_servicio`(`codigo_servicio` VARCHAR(55), `nombre_servicio` VARCHAR(55), `descripcion_servicio` VARCHAR(55), `imagen_servicio` VARCHAR(55), `valor_servicio` DECIMAL, `id_categoria` INT) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT * FROM servicio WHERE CodigoServicio = codigo_servicio) THEN 
	INSERT INTO servicio (CodigoServicio,NombreServicio,DescripcionServicio,ImagenServicio,ValorServicio,IdCategoriaServicio) VALUES(codigo_servicio,nombre_servicio,descripcion_servicio,imagen_servicio,valor_servicio,id_categoria);
    RETURN LAST_INSERT_ID();
ELSE
  RETURN 0;
END IF$$

CREATE  FUNCTION `fun_crear_solicitud`(`codigo_solicitud` VARCHAR(55), `fecha_solicitud` DATETIME, `nombre_cliente` VARCHAR(100), `correo` VARCHAR(55), `telefono` VARCHAR(55)) RETURNS int(11)
IF NOT  EXISTS (SELECT * FROM solicitudes WHERE NumeroSolicitud = codigo_solicitud) THEN 
  INSERT INTO solicitudes (NumeroSolicitud,FechaSolicitud,NombreCliente,CorreoCliente,TelefonoCliente)
  VALUES (codigo_solicitud,fecha_solicitud,nombre_cliente,correo,telefono);
  RETURN LAST_INSERT_ID();

ELSE 
 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_crear_usuario`(`documento` VARCHAR(30), `correo_usuario` VARCHAR(55)) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT * FROM usuario WHERE DocumentoUsuario=documento OR  CorreoUsuario=correo_usuario) THEN 

	INSERT INTO usuario (DocumentoUsuario,CorreoUsuario)
    	   VALUES(documento,correo_usuario);
           
           
           RETURN LAST_INSERT_ID();
           



ELSE 
  RETURN 0;

END IF$$

CREATE  FUNCTION `fun_eliminar_archivo`(`id_recurso` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM archivos_adicionales WHERE Id_Recurso=id_recurso) THEN 
	
    DELETE FROM  archivos_adicionales 
    WHERE Id_Recurso=id_recurso; 
    RETURN id_recurso;
ELSE 

RETURN 0;
END IF$$

CREATE  FUNCTION `fun_eliminar_caracteristica`(`id_caracteristica` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM IdCaracteristica = id_caracteristica) THEN 
	DELETE FROM caracetristica WHERE IdCaracteristica=id_caracteristica;
    RETURN id_caracateristica;
ELSE 
 RETURN 0;
END IF$$

CREATE  FUNCTION `fun_eliminar_categoria`(`id_categoria` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM categoria_producto WHERE IdCategoriaProducto=id_categoria) THEN 

	IF((SELECT EstadoCategoria FROM categoria_producto WHERE      		IdCategoriaProducto=id_categoria)=1)
    THEN
     UPDATE categoria_producto SET EstadoCategoria=0
     WHERE IdCategoriaProducto=id_categoria LIMIT 1;
     RETURN id_categoria;
  
  ELSE 
    	UPDATE categoria_producto SET EstadoCategoria=1
     	WHERE IdCategoriaProducto=id_categoria LIMIT 1;
    	RETURN id_categoria;
    END IF;
ELSE
RETURN 0;
END IF$$

CREATE  FUNCTION `fun_eliminar_imagen`(`id_imagen` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM multimedia_producto WHERE IdMultimediaProducto = id_imagen) THEN 
 DELETE FROM multimedia_producto WHERE IdMultimediaProducto=id_imagen;
 RETURN id_imagen;
ELSE 
	RETURN 0;

END IF$$

CREATE  FUNCTION `fun_eliminar_producto`(`id_producto` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM producto WHERE IdProducto=id_producto) THEN 

    IF ((SELECT Estado_Producto FROM producto WHERE IdProducto=id_producto)=1) THEN 
	UPDATE producto SET Estado_Producto = 0 WHERE IdProducto=id_producto;    
    
    RETURN id_producto;
ELSE
	UPDATE producto SET Estado_Producto = 1 WHERE IdProducto=id_producto;
    RETURN id_producto;
END IF;
ELSE 
 RETURN 0; 
END IF$$

CREATE  FUNCTION `fun_eliminar_proveedor`(`id_proveedor` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM proveedor WHERE IdProveedor=id_proveedor) THEN 

	IF((SELECT EstadoProveedor FROM proveedor WHERE      		IdProveedor=id_proveedor)=1)
    THEN
     UPDATE proveedor SET EstadoProveedor=0
     WHERE IdProveedor=id_proveedor LIMIT 1;
     RETURN id_proveedor;
  
  ELSE 
    	UPDATE proveedor SET EstadoProveedor=1
     	WHERE IdProveedor= id_proveedor  LIMIT 1;
    	RETURN id_proveedor;
    END IF;
ELSE
RETURN 0;
END IF$$

CREATE  FUNCTION `fun_eliminar_servicio`(`id_servicio` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM servicio WHERE IdServicio=id_servicio) THEN 

	IF((SELECT EstadoServicio FROM servicio WHERE      		IdServicio=id_servicio)=1)
    THEN
     UPDATE servicio SET EstadoServicio=0
     WHERE IdServicio=id_servicio;
     RETURN id_servicio;
  
  ELSE 
    	UPDATE servicio SET EstadoServicio=1
     	WHERE IdServicio=id_servicio;
    	RETURN id_servicio;
    END IF;
ELSE
RETURN 0;
END IF$$

CREATE  FUNCTION `fun_eliminar_usuario`(`id_usuario` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=id_usuario) THEN
	IF ((SELECT EstadoUsuario FROM usuario WHERE IdUsuario=id_usuario)=1)THEN 
    	UPDATE usuario SET EstadoUsuario = 0
        WHERE IdUsuario=id_usuario LIMIT 1;
    	RETURN     id_usuario;
    ELSE 
    	UPDATE usuario SET EstadoUsuario = 1
        WHERE IdUsuario=id_usuario LIMIT 1;
		RETURN     id_usuario;
    END IF;


ELSE 

 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_finalizar_arriendo`(`id_arriendo` INT, `comentario_final` VARCHAR(256), `fecha_final` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM arriendo WHERE IdArriendo=id_arriendo) THEN 

	UPDATE arriendo SET EstadoArriendo='Finalizado' ,
    					FechaFinAlquiler=fecha_final,
                        ComentarioFinal=comentario_final
                        WHERE IdArriendo=id_arriendo;
                        
                        RETURN id_arriendo;

ELSE 

	RETURN 0;

END IF$$

CREATE  FUNCTION `fun_habilitar_archivo`(`id_recurso` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT * FROM archivos_adicionales WHERE Id_Recurso=id_recurso) THEN 


UPDATE archivos_adicionales SET EstadoArchivo=1
        WHERE Id_Recurso=id_recurso LIMIT 1;
        
        
        
        RETURN id_recurso;
ELSE 
RETURN 0;
END IF$$

CREATE  FUNCTION `fun_registrar_agenda`(`id_servicio` INT, `id_empleado` INT, `id_cliente` INT, `fecha_asignacion` DATETIME, `fecha_inicio_servicio` DATETIME, `comentario_inicial` VARCHAR(512)) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT * FROM agenda WHERE Fk_Id_Empleado=id_empleado AND FechaInicioServicio=fecha_inicio_servicio) THEN
INSERT INTO agenda (Fk_Id_Servicio,Fk_Id_Empleado,Fk_Id_Cliente,FechaAsignacion,FechaInicioServicio,ComentarioInicial)
VALUES (id_servicio,id_empleado,id_cliente,fecha_asignacion,fecha_inicio_servicio,comentario_inicial);

RETURN LAST_INSERT_ID();
 ELSE 
 RETURN 0;
 END IF$$

CREATE  FUNCTION `fun_registrar_caracteristica`(`id_producto` INT, `descripcion_caracteristica` VARCHAR(512), `tipo` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM producto WHERE IdProducto=id_producto) THEN 
INSERT INTO producto_caracteristica (Fk_Id_Caracteristica_Producto,DescripcionCaracteristica,Fk_Id_Tipo_Descripcion)
VALUES(id_producto,descripcion_caracteristica,tipo);

RETURN LAST_INSERT_ID();

ELSE 
 RETURN 0;

END IF$$

CREATE  FUNCTION `fun_reprogramar_agenda`(`id_agenda` INT, `id_servicio` INT, `id_empleado` INT, `id_cliente` INT, `fecha_inicio_servicio` DATETIME, `comentario_final` VARCHAR(256), `codigo_cita` VARCHAR(20)) RETURNS int(11)
BEGIN
IF EXISTS (SELECT * FROM agenda WHERE IdAgenda=id_agenda) THEN 
  UPDATE agenda SET EstadoAgenda='R',
                ComentarioFinal=comentario_final,
                FechaFinServicio=fecha_cancelacion
                WHERE IdAgenda=id_agenda LIMIT 1;
 
                               
   INSERT INTO agenda (FK_Id_Servicio,Fk_Id_Empleado,Fk_Id_Cliente,FechaInicioServicio,ComentarioInicia,CodigoCita) 
   VALUES (id_servicio,id_empleado,id_cliente,fecha_inicio_servicio,comentario_final,codigo_cita);
                
                RETURN LAST_INSERT_ID();
                

ELSE 
	RETURN 0;
END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

CREATE TABLE IF NOT EXISTS `agenda` (
`IdAgenda` int(11) NOT NULL,
  `Fk_Id_Servicio` int(11) NOT NULL,
  `Fk_Id_Empleado` int(11) NOT NULL,
  `Fk_Id_Cliente` int(11) NOT NULL,
  `FechaAsignacion` datetime NOT NULL,
  `FechaInicioServicio` date NOT NULL,
  `Hora_Inicio` time NOT NULL,
  `FechaFinServicio` date NOT NULL,
  `Hora_Fin` time NOT NULL,
  `ComentarioInicial` varchar(512) NOT NULL,
  `ComentarioFinal` varchar(512) NOT NULL,
  `EstadoAgenda` enum('P','C','R') NOT NULL DEFAULT 'P' COMMENT '''P''=>PROGRAMADO,''C''=>CANCELADO,''R''=>REPROGRAMADO',
  `CodigoCita` varchar(20) NOT NULL,
  `DireccionServicio` varchar(256) NOT NULL,
  `Coordenadas` varchar(55) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `agenda`
--

INSERT INTO `agenda` (`IdAgenda`, `Fk_Id_Servicio`, `Fk_Id_Empleado`, `Fk_Id_Cliente`, `FechaAsignacion`, `FechaInicioServicio`, `Hora_Inicio`, `FechaFinServicio`, `Hora_Fin`, `ComentarioInicial`, `ComentarioFinal`, `EstadoAgenda`, `CodigoCita`, `DireccionServicio`, `Coordenadas`) VALUES
(1, 1, 1, 1, '2016-07-12 00:00:00', '0000-00-00', '00:00:00', '2016-07-12', '00:00:00', '0', '', 'C', '', '', ''),
(2, 2, 2, 2, '2016-07-13 00:00:00', '2016-07-13', '00:00:00', '2016-07-13', '00:00:00', '', '', 'P', '', '', ''),
(4, 1, 1, 1, '2016-07-12 00:00:00', '2016-07-12', '00:00:00', '0000-00-00', '00:00:00', '0', '', 'P', '', '', ''),
(5, 1, 1, 1, '2016-07-12 00:00:01', '2016-07-12', '00:00:00', '0000-00-00', '00:00:00', '0', '', 'P', '', '', ''),
(6, 3, 1, 4, '0000-00-00 00:00:00', '2016-12-11', '07:14:00', '0000-00-00', '00:00:00', 'ninguno', '', 'P', '5', '222', '333'),
(7, 3, 1, 4, '0000-00-00 00:00:00', '2016-12-11', '15:59:00', '0000-00-00', '00:00:00', '', '', 'P', '6', '222', '65111'),
(8, 3, 1, 4, '0000-00-00 00:00:00', '2016-11-11', '12:59:00', '0000-00-00', '00:00:00', '', '', 'P', '7', '222', '65111'),
(9, 3, 1, 4, '0000-00-00 00:00:00', '2016-11-10', '12:59:00', '0000-00-00', '00:00:00', '', '', 'P', '8', '222', '65111'),
(10, 3, 6, 4, '0000-00-00 00:00:00', '2016-11-10', '12:59:00', '0000-00-00', '00:00:00', '', '', 'P', '9', '222', '65111');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos_adicionales`
--

CREATE TABLE IF NOT EXISTS `archivos_adicionales` (
`Id_Recurso` int(11) NOT NULL,
  `Fk_Id_Producto` int(11) NOT NULL,
  `NombreArchivo` varchar(125) NOT NULL,
  `DescripcionArchivo` varchar(256) NOT NULL,
  `UrlArchivo` varchar(125) NOT NULL,
  `EstadoArchivo` int(11) NOT NULL DEFAULT '1',
  `Tam` int(11) NOT NULL,
  `categoria_archivo` enum('drivers','manuales','otros') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `archivos_adicionales`
--

INSERT INTO `archivos_adicionales` (`Id_Recurso`, `Fk_Id_Producto`, `NombreArchivo`, `DescripcionArchivo`, `UrlArchivo`, `EstadoArchivo`, `Tam`, `categoria_archivo`) VALUES
(49, 48, 'Guia de uso', '', 'FS-1040_FS-1041...S-1061DN_ES.pdf', 1, 3530097, 'drivers'),
(50, 48, 'Quick guide instalation', '', 'FS-1040_FS-1041...1DN_QIG_MUL.pdf', 1, 3398442, 'drivers'),
(51, 48, 'DataSheet', '', 'FS-1041_datasheet.pdf', 1, 1152582, 'drivers'),
(61, 52, 'Guia de uso', '', 'FS-1040_FS-1041...S-1061DN_ES.pdf', 1, 3530097, 'drivers'),
(62, 52, 'Quick Guide Instalation', '', 'FS-1040_FS-1041...1DN_QIG_MUL.pdf', 1, 3398442, 'drivers'),
(63, 52, 'DataSheet', '', 'FS-1041_datasheet.pdf', 1, 1152582, 'drivers'),
(71, 56, 'Guia de uso', '', 'FS-1020MFP_FS-1220MFP_ES.pdf', 1, 7701992, 'drivers'),
(72, 56, 'Quick Guide Instalation', '', 'FS-1025MFP_FS-1...P_QIG_(MUL).pdf', 1, 6005010, 'drivers'),
(73, 57, 'Manual Operaciones', '', 'Mxm264nManualOperaciones.PDF', 1, 1866636, 'drivers'),
(74, 57, 'Hoja Caracteristicas', '', 'pdf_DS_Datasheet_MXM264N_es_es.pdf', 1, 983505, 'drivers'),
(78, 59, 'Quick Start Guide', '', 'cop_qguide_MX4100N_4101N_5001N.pdf', 1, 5884938, 'drivers'),
(79, 59, 'Software Setup Guide', '', 'cop_man_MX4100N_4101N_5001N_software_setup.pdf', 1, 2042731, 'drivers'),
(80, 59, 'Safety Guide', '', 'cop_man_MX4100N_4101N_5001N_safetyguide.pdf', 1, 940814, 'drivers'),
(81, 60, 'Manual de operaciones (ENG)', '', 'sharp-mx-5111n-operation-manual-121345.pdf', 1, 1753233, 'drivers'),
(82, 61, 'Guia de inicio rapido', '', 'Virgo2_QSG_ES_v2.pdf', 1, 2399081, 'drivers'),
(83, 61, 'Caracteristicas', '', 'pdf_DS_Datasheet_MX5140N_es_es.pdf', 1, 892474, 'drivers'),
(84, 62, 'Guia rapida ', '', 'MX2610N-3110N-3610N_OM_Quick-Guide_ES.pdf', 1, 14762365, 'drivers'),
(85, 62, 'Caracteristicas', '', 'MX_2610_3110_3610_Brochure.pdf', 1, 4944685, 'drivers'),
(86, 63, 'Caracteristicas', '', 'MX-2610N.pdf', 1, 7652145, 'drivers'),
(87, 63, 'Guia rapida', '', 'MX2610N-3110N-3610N_OM_Quick-Guide_ES.pdf', 1, 14762365, 'drivers'),
(88, 66, 'Manual operaciones', '', 'toshiba-e-studio-4520c-operators-manual-121649.pdf', 1, 1663873, 'drivers'),
(92, 80, 'UNO', '', 'IMG_20160121_182557[1].jpg', 1, 467537, 'manuales'),
(93, 80, 'Dos', '', 'IMG_20160203_231249_768.jpg', 1, 295395, 'drivers'),
(94, 80, 'Tres', '', 'IMG_20160108_221227.jpg', 1, 692907, 'otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `arriendo`
--

CREATE TABLE IF NOT EXISTS `arriendo` (
`IdArriendo` int(11) NOT NULL,
  `Fk_Id_Equipo` int(11) NOT NULL,
  `Fk_Id_Cliente` int(11) NOT NULL,
  `FechaInicioAlquiler` date NOT NULL,
  `FechaFinAlquiler` date NOT NULL,
  `ComentarioInicial` varchar(512) NOT NULL,
  `ComentarioFinal` varchar(512) NOT NULL,
  `Fk_Id_Servicio` int(11) NOT NULL,
  `EstadoArriendo` enum('Activo','Cancelado','Finalizado') NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `arriendo`
--

INSERT INTO `arriendo` (`IdArriendo`, `Fk_Id_Equipo`, `Fk_Id_Cliente`, `FechaInicioAlquiler`, `FechaFinAlquiler`, `ComentarioInicial`, `ComentarioFinal`, `Fk_Id_Servicio`, `EstadoArriendo`) VALUES
(2, 1, 4, '2016-01-30', '0000-00-00', '☻', 'jajaj', 1, 'Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_producto`
--

CREATE TABLE IF NOT EXISTS `categoria_producto` (
`IdCategoriaProducto` int(11) NOT NULL,
  `NombreCategoria` varchar(55) NOT NULL,
  `DescripcionCategoria` varchar(125) NOT NULL,
  `ImagenCategoria` varchar(55) NOT NULL,
  `EstadoCategoria` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='Tabla ';

--
-- Volcado de datos para la tabla `categoria_producto`
--

INSERT INTO `categoria_producto` (`IdCategoriaProducto`, `NombreCategoria`, `DescripcionCategoria`, `ImagenCategoria`, `EstadoCategoria`) VALUES
(1, 'Alto Volumen', 'Multifuncionales', 'N/A', 1),
(2, 'Mediano Volumen', '', '', 1),
(3, 'Bajo Volumen', '', '', 1),
(4, '1', '2', 'default.png', 1),
(5, '2', '2', '2', 1),
(6, '6', '6', 'default.png', 1),
(7, '677', '77', 'default.png', 1),
(8, '677t', '77', 'default.png', 1),
(9, '123', '1234', 'N/A', 1),
(10, '12', '0.2', 'N/A', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_servicio`
--

CREATE TABLE IF NOT EXISTS `categoria_servicio` (
`IdCtaegoriaServicio` int(11) NOT NULL,
  `NombeCategoria` varchar(55) NOT NULL,
  `EstadoCategoriaServicio` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
`IdCliente` int(11) NOT NULL,
  `NombreCliente` varchar(55) NOT NULL,
  `ApellidoCliente` varchar(55) DEFAULT NULL,
  `TipoCliente` enum('EMPRESA','EMPRENDEDOR') NOT NULL,
  `NombreContactoCliente` varchar(30) NOT NULL,
  `TelefonoContactoCliente` varchar(20) NOT NULL,
  `DireccionContactoCliente` varchar(30) NOT NULL,
  `Fk_Id_Usuario_Cliente` int(11) NOT NULL,
  `CoordenadasCliente` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Taabla que contiene la informacion de los clientes ';

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`IdCliente`, `NombreCliente`, `ApellidoCliente`, `TipoCliente`, `NombreContactoCliente`, `TelefonoContactoCliente`, `DireccionContactoCliente`, `Fk_Id_Usuario_Cliente`, `CoordenadasCliente`) VALUES
(1, 'Staline Jose', 'Chacon Cueto', 'EMPRENDEDOR', 'satlin cahcon', '9014826-3114461157', 'Carrera 103 # 33-16 Cinjunto a', 2, ''),
(2, 'MohanSoft', NULL, 'EMPRESA', 'Edgar Guzman', '7323251', 'calle 9 # 10-21 ', 1, ''),
(3, 'Carlos ', 'Guzman', 'EMPRENDEDOR', 'carlos j guzman', '73232561', 'calle 9 # 10-21 sur', 6, ''),
(4, 'Dos ', '2', 'EMPRENDEDOR', 'Jairo', '122', '222', 14, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE IF NOT EXISTS `contacto` (
`IdContacto` int(11) NOT NULL,
  `NombreContacto` varchar(55) NOT NULL,
  `TelefonoContacto` varchar(55) DEFAULT NULL,
  `Email` varchar(256) NOT NULL,
  `Observaciones` varchar(512) DEFAULT NULL,
  `FechaContacto` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`IdContacto`, `NombreContacto`, `TelefonoContacto`, `Email`, `Observaciones`, `FechaContacto`) VALUES
(1, 'Jose', '7323251', 'edgar.guzman21@gmail.com', 'nada', '2016-08-05 22:08:48'),
(2, 'Edgar Guzman', '3171669546', 'edgar.guzman21@gmail.com', 'umm', '2016-08-05 22:10:08'),
(3, 'Edgar Guzman', '3171669546', 'edgar.guzman21@gmail.com', 'Otra vexz yto', '2016-08-05 22:10:21'),
(4, 'Edgar Guzman', '3171669546', 'edgar.guzman21@gmail.com', 'Chupelo', '2016-08-05 22:15:02'),
(5, '', '', '', '', '2016-08-05 22:26:08'),
(6, 'OneSACRRN', '55555', 'edgar.guzman21@gmail.com', 'AJJAJA', '2016-08-05 23:25:36'),
(7, 'OneSACRRN', '55555', 'edgar.guzman21@gmail.com', 'AJJAJA', '2016-08-05 23:25:37'),
(8, 'Hola', '7323251', 'edgar.guzman21@gmail.com', 'una observacion', '2016-08-16 23:04:01'),
(9, 'Hola', '7625222', 'edgar.guzman21@gmail.com', 'Que mi peces', '2016-08-16 23:05:26'),
(10, 'umm', 'jjj', 'jj', 'j', '2016-08-16 23:06:32'),
(11, 'jaja', 'jajaj', 'jaja', 'jaja', '2016-08-16 23:09:35'),
(12, 'servicio', '911', 'edgar.guzman21@gmail.com', 'Un contacto desde header servicio', '2016-08-16 23:19:24'),
(13, 'Edgar Guzman', '3171669546', 'edgar.guzman21@gmail.com', 'Un saludo desde footer servicio', '2016-08-16 23:20:41'),
(14, 'Eddi van helen', '75412', 'edgar.guzman21@gmail.com.co', 'Desde header onescreen', '2016-08-16 23:25:51'),
(15, 'Desgar', '745896', 'edgar.guzman21@gmail.com.es', 'desde header fotocopias', '2016-08-16 23:33:46'),
(16, 'Edgar Guzman', '3171669546', 'edgar.guzman21@gmail.com', 'Desde footer fotocopias', '2016-08-16 23:34:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura_producto`
--

CREATE TABLE IF NOT EXISTS `detalle_factura_producto` (
`IdDetalleProducto` int(11) NOT NULL,
  `Fk_Id_Factura` int(11) NOT NULL,
  `Fk_Id_Producto` int(11) NOT NULL,
  `CantidadVendida` int(11) NOT NULL,
  `ValorFacturado` decimal(10,0) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion del detalle de productos en la factura';

--
-- Volcado de datos para la tabla `detalle_factura_producto`
--

INSERT INTO `detalle_factura_producto` (`IdDetalleProducto`, `Fk_Id_Factura`, `Fk_Id_Producto`, `CantidadVendida`, `ValorFacturado`) VALUES
(4, 9, 80, 2, '24000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura_servicio`
--

CREATE TABLE IF NOT EXISTS `detalle_factura_servicio` (
`IdDetalleFacturaServicio` int(11) NOT NULL,
  `Fk_Id_Factura` int(11) NOT NULL,
  `Fk_Id_Servicio` int(11) NOT NULL,
  `Cantidadvendida` int(11) NOT NULL,
  `ValorServicioFactura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_solicitud_producto`
--

CREATE TABLE IF NOT EXISTS `detalle_solicitud_producto` (
`IdDetalleSolicitudProducto` int(11) NOT NULL,
  `Fk_Id_Solicitud` int(11) NOT NULL,
  `Fk_Id_Producto` int(11) NOT NULL,
  `CantidadSolicitada` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion del detalle de productos en la factura';

--
-- Volcado de datos para la tabla `detalle_solicitud_producto`
--

INSERT INTO `detalle_solicitud_producto` (`IdDetalleSolicitudProducto`, `Fk_Id_Solicitud`, `Fk_Id_Producto`, `CantidadSolicitada`) VALUES
(1, 4, 47, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE IF NOT EXISTS `empleado` (
`IdEmpleado` int(11) NOT NULL,
  `NombreEmpleado` varchar(100) NOT NULL,
  `ApellidoEmpleado` varchar(100) NOT NULL,
  `EstadoEmpleado` int(11) NOT NULL DEFAULT '1',
  `Fk_Id_Usuario_Empleado` int(11) NOT NULL,
  `Telefono` varchar(55) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`IdEmpleado`, `NombreEmpleado`, `ApellidoEmpleado`, `EstadoEmpleado`, `Fk_Id_Usuario_Empleado`, `Telefono`) VALUES
(1, 'guzman bejarano', '7654321', 1, 3, ''),
(2, 'Empleado888', 'DoSes', 1, 4, '7458962'),
(3, 'Barbara ', 'Vargas', 1, 5, ''),
(4, 'Solis', '666555', 1, 8, ''),
(6, 'Edgar', 'Guzman', 1, 10, '7323251');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidades`
--

CREATE TABLE IF NOT EXISTS `entidades` (
`IdEntidad` int(11) NOT NULL,
  `NombreEntidad` varchar(15) NOT NULL,
  `IdCrear` varchar(15) NOT NULL,
  `IdConsultar` varchar(15) NOT NULL,
  `IdActualizar` varchar(15) NOT NULL,
  `IdEliminar` varchar(15) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `entidades`
--

INSERT INTO `entidades` (`IdEntidad`, `NombreEntidad`, `IdCrear`, `IdConsultar`, `IdActualizar`, `IdEliminar`) VALUES
(1, 'producto', 'crearProd', 'buscarUsu', '', ''),
(2, 'categoria', '', '', '', ''),
(3, 'usuario', 'crearUsu', 'buscarUsu', 'editarUsu', 'eliminarUsu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada`
--

CREATE TABLE IF NOT EXISTS `entrada` (
`IdEntrada` int(11) NOT NULL,
  `CodigoEntrada` varchar(20) NOT NULL,
  `FechaEntrada` datetime NOT NULL,
  `Fk_Id_Proveedor` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la e¡informacion de las entradas';

--
-- Volcado de datos para la tabla `entrada`
--

INSERT INTO `entrada` (`IdEntrada`, `CodigoEntrada`, `FechaEntrada`, `Fk_Id_Proveedor`) VALUES
(1, '123', '0000-00-00 00:00:00', 1),
(3, '1', '2016-08-15 18:30:33', 6),
(4, '3', '2016-08-15 18:34:01', 6),
(5, '4', '2016-08-15 18:34:23', 6),
(6, '5', '2016-08-15 18:38:42', 6),
(7, '6', '2016-08-15 18:39:53', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada_devolucion`
--

CREATE TABLE IF NOT EXISTS `entrada_devolucion` (
  `IdEntradaDevolucion` int(11) NOT NULL,
  `Fk_Id_Entrada` int(11) NOT NULL,
  `Fk_Id_Detalle_Factura` int(11) NOT NULL,
  `Comentario` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las las entradas de tipo de volucion';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada_otros`
--

CREATE TABLE IF NOT EXISTS `entrada_otros` (
  `IdEntradaOtros` int(11) NOT NULL,
  `Fk_Id_Entrada` int(11) NOT NULL,
  `Fk_Id_Producto` int(11) NOT NULL,
  `Comentario` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada_pedido`
--

CREATE TABLE IF NOT EXISTS `entrada_pedido` (
`IdEntradaPedido` int(11) NOT NULL,
  `Fk_Id_Producto` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Comentario` varchar(256) NOT NULL,
  `Fk_Id_Entrada` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las entradasde tipo obsequio y cambios';

--
-- Volcado de datos para la tabla `entrada_pedido`
--

INSERT INTO `entrada_pedido` (`IdEntradaPedido`, `Fk_Id_Producto`, `Cantidad`, `Comentario`, `Fk_Id_Entrada`) VALUES
(1, 1, 2, 'BUEN ESTADPO', 1),
(3, 80, 12, 'buene estado', 3),
(4, 80, 12, 'buene estado', 4),
(5, 0, 5, '5', 4),
(6, 80, 12, 'buene estado', 5),
(7, 0, 5, '5', 5),
(8, 80, 3, 'nada', 6),
(9, 80, 2, '', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE IF NOT EXISTS `factura` (
`IdFactura` int(11) NOT NULL,
  `NumeroFactura` varchar(20) NOT NULL,
  `FechaFactura` datetime NOT NULL,
  `Fk_Id_Usuario_Cliente_Factura` int(11) NOT NULL,
  `Fk_Id_Empleado_factura` int(11) NOT NULL,
  `EstadoFactura` enum('Sin pagar','Cancelada') NOT NULL DEFAULT 'Sin pagar'
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las facturas';

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`IdFactura`, `NumeroFactura`, `FechaFactura`, `Fk_Id_Usuario_Cliente_Factura`, `Fk_Id_Empleado_factura`, `EstadoFactura`) VALUES
(9, '1', '2016-08-15 22:38:06', 4, 4, 'Sin pagar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hoja_de_vida`
--

CREATE TABLE IF NOT EXISTS `hoja_de_vida` (
`IdHojaVida` int(11) NOT NULL,
  `Fk_Id_Producto` int(11) NOT NULL,
  `Serial` varchar(256) NOT NULL,
  `Fecha_Inicio` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hoja_de_vida`
--

INSERT INTO `hoja_de_vida` (`IdHojaVida`, `Fk_Id_Producto`, `Serial`, `Fecha_Inicio`) VALUES
(1, 80, '123abc-1', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso_aplicacion`
--

CREATE TABLE IF NOT EXISTS `ingreso_aplicacion` (
`IdIngreso` int(11) NOT NULL,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `Clave` varchar(256) NOT NULL,
  `UltimaActividad` datetime NOT NULL,
  `Token` varchar(256) DEFAULT NULL,
  `Fk_Id_Rol` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ingreso_aplicacion`
--

INSERT INTO `ingreso_aplicacion` (`IdIngreso`, `Fk_Id_Usuario`, `Clave`, `UltimaActividad`, `Token`, `Fk_Id_Rol`) VALUES
(1, 4, '12345', '2016-08-13 09:33:35', 'abc123.', 2),
(2, 3, '1234', '2016-07-28 00:00:00', '65431', 1),
(3, 8, '1', '2016-08-05 23:11:35', NULL, 1),
(5, 10, '123', '0000-00-00 00:00:00', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento`
--

CREATE TABLE IF NOT EXISTS `mantenimiento` (
`IdMantenimiento` int(11) NOT NULL,
  `Fk_Id_Equipo` int(11) NOT NULL,
  `FechaMatenimiento` datetime NOT NULL,
  `Fk_Id_Tecnico` int(11) NOT NULL,
  `DescripcionMantenimiento` varchar(256) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mantenimiento`
--

INSERT INTO `mantenimiento` (`IdMantenimiento`, `Fk_Id_Equipo`, `FechaMatenimiento`, `Fk_Id_Tecnico`, `DescripcionMantenimiento`) VALUES
(1, 1, '2016-08-15 15:01:18', 4, 'jaja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE IF NOT EXISTS `marcas` (
`IdMarcas` int(11) NOT NULL,
  `NombreMarca` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`IdMarcas`, `NombreMarca`) VALUES
(1, 'Kyocera'),
(2, 'Sharp'),
(3, 'Toshiba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimedia_producto`
--

CREATE TABLE IF NOT EXISTS `multimedia_producto` (
`IdMultimediaProducto` int(11) NOT NULL,
  `NombreMultimedia` enum('Video','Imagen') NOT NULL,
  `DireccionMultimedia` varchar(256) NOT NULL,
  `EstadoMultimedia` enum('0','1') NOT NULL,
  `Fk_Id_Producto_Multimedia` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `multimedia_producto`
--

INSERT INTO `multimedia_producto` (`IdMultimediaProducto`, `NombreMultimedia`, `DireccionMultimedia`, `EstadoMultimedia`, `Fk_Id_Producto_Multimedia`) VALUES
(38, 'Imagen', 'GaleriaProductos/1040.png', '0', 48),
(42, 'Imagen', 'GaleriaProductos/1040.png', '0', 52),
(46, 'Imagen', 'GaleriaProductos/1020mfp.jpg', '0', 56),
(47, 'Imagen', 'GaleriaProductos/mxm264n.jpg', '0', 57),
(49, 'Imagen', 'GaleriaProductos/MX5001N_DSPF-1K_Full_slant.jpe', '0', 59),
(50, 'Imagen', 'GaleriaProductos/Sharp_MX-5111N_2733848.gif', '0', 60),
(51, 'Imagen', 'GaleriaProductos/mx-5140n-4ks-tandem-front-960.jpg', '0', 61),
(52, 'Imagen', 'GaleriaProductos/mx3610.jpg', '0', 62),
(53, 'Imagen', 'GaleriaProductos/e2830.jpg', '0', 64),
(54, 'Imagen', 'GaleriaProductos/e4520c-big.jpg', '0', 66);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE IF NOT EXISTS `permisos` (
`IdPermiso` int(11) NOT NULL,
  `Fk_Id_Entidad` int(11) NOT NULL,
  `Fk_Id_Rol_Permisos` int(11) NOT NULL,
  `Crear` int(11) NOT NULL,
  `Eliminar` int(11) NOT NULL,
  `Actualizar` int(11) NOT NULL,
  `Consultar` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`IdPermiso`, `Fk_Id_Entidad`, `Fk_Id_Rol_Permisos`, `Crear`, `Eliminar`, `Actualizar`, `Consultar`) VALUES
(1, 1, 1, 1, 1, 1, 1),
(2, 2, 1, 1, 1, 1, 1),
(3, 1, 2, 1, 1, 1, 1),
(4, 2, 2, 1, 1, 1, 1),
(5, 3, 2, 1, 1, 1, 1),
(6, 3, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE IF NOT EXISTS `producto` (
`IdProducto` int(11) NOT NULL,
  `CodigoProducto` varchar(55) NOT NULL,
  `NombreProducto` varchar(125) NOT NULL,
  `DescripcionProducto` varchar(256) NOT NULL,
  `Estado_Producto` int(11) NOT NULL DEFAULT '1',
  `Marca` int(11) DEFAULT NULL,
  `Serie` varchar(256) NOT NULL,
  `Modelo` varchar(256) NOT NULL,
  `ExistenciasBodega` int(11) NOT NULL,
  `ExistenciasTienda` int(11) NOT NULL,
  `Fk_Id_Categoria_Producto` int(11) NOT NULL,
  `Color` enum('Blanco y Negro','Color') NOT NULL,
  `Ppm` int(11) NOT NULL,
  `TipoProducto` varchar(55) NOT NULL,
  `ValorVenta` decimal(10,0) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de los productos';

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`IdProducto`, `CodigoProducto`, `NombreProducto`, `DescripcionProducto`, `Estado_Producto`, `Marca`, `Serie`, `Modelo`, `ExistenciasBodega`, `ExistenciasTienda`, `Fk_Id_Categoria_Producto`, `Color`, `Ppm`, `TipoProducto`, `ValorVenta`) VALUES
(48, '123456789', 'Impresora Laser FS 1040', '', 1, 1, '', 'FS 1040', 0, 0, 3, 'Blanco y Negro', 21, 'Impresora', '0'),
(52, '987654', 'Impresora Laser FS 1060', '', 1, 1, '', 'FS 1060', 0, 0, 3, 'Blanco y Negro', 26, 'Impresora', '0'),
(56, '987456', 'Multifuncional FS 1020', '', 1, 1, '', 'FS 1020', 0, 0, 2, 'Blanco y Negro', 21, 'Multifuncional', '0'),
(57, '741258', 'Impresora, copiadora, escáner y fax MX-M264N', '', 1, 2, '', 'MX-M264N', 0, 0, 2, 'Color', 26, 'Multifuncional', '0'),
(59, '456321', 'Multifuncional MX 5001N', '', 1, 2, '', 'MX 5001N', 0, 0, 1, 'Color', 600, 'Multifuncional', '0'),
(60, '745896', 'Multifuncional MX 5111', '', 1, 2, '', 'MX 5111', 0, 0, 1, 'Color', 51, 'Multifuncional', '0'),
(61, '7459632', 'Multifuncional MX-5140N', '', 1, 2, '', 'MX-5140N', 0, 0, 1, 'Color', 51, 'Multifuncional', '0'),
(62, '74582', 'Multifuncional MX-3610N', '', 1, 2, '', 'MX-3610N', 0, 0, 2, 'Color', 36, 'Multifuncional', '0'),
(63, '7458962', 'Multifuncional MX 2610', '', 1, 2, '', 'MX 2610', 0, 0, 2, 'Color', 26, 'Multifuncional', '0'),
(64, '456222', 'Multifuncional e2830', '', 1, 3, '', 'e2830', 0, 0, 2, 'Color', 28, 'Multifuncional', '0'),
(65, '74563', 'Multifuncional 3530', '', 1, 3, '', '3530', 0, 0, 2, 'Color', 28, 'Multifuncional', '0'),
(66, '78951', 'Multifuncional 4520', '', 1, 3, '', '4520', 0, 0, 1, 'Color', 45, 'Multifuncional', '0'),
(80, '123abc', 'Multiplexora x1000', '', 0, 1, '', 'x1000', 41, -6, 1, 'Color', 12, 'Multifuncional', '12000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_caracteristica`
--

CREATE TABLE IF NOT EXISTS `producto_caracteristica` (
`IdCaracteristica` int(11) NOT NULL,
  `DescripcionCaracteristica` varchar(512) NOT NULL,
  `Fk_Id_Caracteristica_Producto` int(11) NOT NULL,
  `Fk_Id_Tipo_Descripcion` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las caracteristicas de los productos';

--
-- Volcado de datos para la tabla `producto_caracteristica`
--

INSERT INTO `producto_caracteristica` (`IdCaracteristica`, `DescripcionCaracteristica`, `Fk_Id_Caracteristica_Producto`, `Fk_Id_Tipo_Descripcion`) VALUES
(79, 'Tipo impresion : Laser', 48, 1),
(80, 'VELOCIDAD DE IMPRESIÓN : Carta: 21 ppm, Legal: 13 ppm, A4: 20 ppm', 48, 1),
(81, 'RESOLUCIÓN DE IMPRESIÓN : 600 x 600 dpi, Modo Fast: 1200 (1800 x 600 dpi)', 48, 1),
(82, 'MEMORIA : 32 MB', 48, 1),
(83, 'IMPRESORA CARTUCHOS : Toner inicial 700 segundos 2500', 48, 1),
(84, 'Conectividad : USB 2.0 HS', 48, 1),
(103, 'TIPO DE IMPRESIÓN : Láser', 52, 1),
(104, 'VELOCIDAD DE IMPRESIÓN : Carta: 26 ppm, Legal: 20 ppm, A4: 25 ppm, Duplex: 15 ppm', 52, 1),
(105, 'RESOLUCIÓN DE IMPRESIÓN : 600 x 600 dpi, Modo Fast: 1200 (1800 x 600 dpi)', 52, 1),
(106, 'MEMORIA : 32 MB', 52, 1),
(107, 'IMPRESORA CARTUCHOS : Toner inicial 1000 segundos 3000', 52, 1),
(108, 'Conectividad : USB 2.0 HS', 52, 1),
(121, 'TIPO DE IMPRESIÓN : Inyección', 56, 1),
(122, 'FUNCIONES : Copiadora, Escaner, Impresora', 56, 1),
(123, 'RESOLUCIÓN DE IMPRESIÓN : 600 x 600 dpi', 56, 1),
(124, 'RESOLUCIÓN DEL ESCANER : 600 x 600 dpi', 56, 1),
(125, 'Conectividad : USB 2.0 HS', 56, 1),
(126, 'Capacidad de papel : 1.100 hojas estándar, 2.100 hojas máxima', 57, 1),
(127, 'Tamaño del papel: : Mín.-Máx.	A3-A5', 57, 1),
(128, 'Capacidad de papel: : Estándar (hojas)	1100', 57, 1),
(129, 'Capacidad de papel: : Máxima (hojas)	2100', 57, 1),
(130, 'Tiempo de calentamiento (seg.) : 20', 57, 1),
(131, 'Capacidad del disco duro (GB) : 320', 57, 1),
(138, 'Control de cuentas: : Hasta 1.000 usuarios. Es compatible con la autenticación de número de usuario (en el dispositivo), nombre de usuario / contraseña (en el dispositivo) o login nombre / contraseña (en el dispositivo a través de LDAP).', 59, 1),
(139, 'Modos de color : Selección automática del color (ACS), completa el modo de color, blanco y negro (B / W), 2 Modo de color, Modo de color individual', 59, 1),
(140, 'Tipo de compresión - Fax: : JBIG, MMR, MR, MH', 59, 1),
(141, 'Tipo de compresión - Escanear documentos: : Escaneado monocromo: comprimir, G3 (MH), G4 (MR / MMR) Color / Escala de grises: JPEG (, medio, bajo alta) Modo de fax por Internet: MH / MMR (opcional)', 59, 1),
(142, 'Copia Continua:	Max. : 999 copias', 59, 1),
(143, 'Disco duro: : 80 GB de disco duro; 38 GB para el sistema de archivo de documentos electrónicos y clasificación', 59, 1),
(144, 'Impresion Duplex Automatica : Si', 60, 1),
(145, 'Capacidad Maxima Salida : 1000 Hojas', 60, 1),
(146, 'Vertical Resolución de impresión (color) : 1.200 dpi', 60, 1),
(147, 'Horizontal Resolución de impresión (color) : 1.200 dpi', 60, 1),
(148, 'El rendimiento total del cartucho : 58.000 páginas', 60, 1),
(149, 'Detalles de visualización : 10.1 "de alta resolución del panel táctil inclinable (medida diagonal) de matriz de puntos de color. 1024 x 600 puntos (W-SVGA)', 60, 1),
(150, 'Bandejas totales : 3', 60, 1),
(151, 'Capacidad Bandeja : 100', 60, 1),
(152, 'Bandeja 2 Capacidad : 1000', 60, 1),
(153, 'Bandeja 3 Capacidad : 500', 60, 1),
(154, 'Capacidad de papel : 1.100 hojas estándar y 6.600 hojas máxima', 61, 1),
(155, 'Funciones : Impresora, Copiadora, Escáner, Fax y Archivo Documental', 61, 1),
(156, 'Panel táctil : LCD color de 10.1" multi táctil', 61, 1),
(157, 'Disco duro : STD', 61, 1),
(158, 'Capacidad del disco duro (GB) : 320', 61, 1),
(159, 'Tamaño del papel : Mín.-Máx.	A5R - A3W', 61, 1),
(160, 'Panel de control : LCD de 10.1”.', 62, 1),
(161, 'Disco Duro (GB) : 160', 62, 1),
(162, 'Teclado : Retráctil.', 62, 1),
(163, 'Resolución : 1200 X1200.', 62, 1),
(164, 'Funciones : impresora, escáner y copiadora;', 63, 1),
(165, 'Tamaño máximo hoja : A3', 63, 1),
(166, 'Automatica doble cara : Si', 63, 1),
(167, 'Enviar imágenes como e-mail : Sí', 63, 1),
(168, 'Número máximo de copias por ciclo : 999', 63, 1),
(169, 'Capacidad del disco duro (GB): : 160', 63, 1),
(170, 'Información de la pantalla: : LCD color ,7 pulgadas;', 63, 1),
(171, 'Escanear : 57spm', 64, 1),
(172, 'Disco Duro (GB) : 80', 64, 1),
(173, 'Memoria Ram (GB) : 1', 64, 1),
(174, 'Imprime y copia : en duplex', 64, 1),
(175, 'Impresión desde USB : imágenes alta calidad fotmatos TIFF, PDF Y JPG.', 64, 1),
(176, 'Resolución de copiado : 600x 600 dpi Color / 2400 x 600 dpi', 65, 1),
(177, 'Tamaño y peso papel aceptable : Desde 8.5 x 5.5” hasta 47 x 12”, de 17 a 140 lbs.', 65, 1),
(178, 'Reducción/Ampliación: : 25% A 400%.', 65, 1),
(179, 'Memoria Ram (GB) : 1', 65, 1),
(180, 'Disco Duro : 80+ GB HDD', 65, 1),
(181, 'Copia / impresión Resolución : 600 x 600 ppp (2400 x 600 dpi B & W)', 66, 1),
(182, 'Panel de control : 8.5 "LCD inclinable WVGA de panel táctil, tecla superior', 66, 1),
(183, 'Suministro de papel estándar : 550 x 2 cajones; 100 hojas pila de papel "inteligente" bypass; Opcional LCF 2.500 hojas', 66, 1),
(184, 'Ciclo de trabajo : 70.000 copias', 66, 1),
(240, 'Uno : Dos', 80, 1),
(241, 'Tres : Cuatro', 80, 1),
(242, 'Cinco : Seis', 80, 1),
(243, 'Siete : Ocho', 80, 1),
(244, 'Nueve : Diez', 80, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_insumo`
--

CREATE TABLE IF NOT EXISTS `producto_insumo` (
`Id_Producto_Insumo` int(11) NOT NULL,
  `Marca` varchar(55) NOT NULL,
  `NombreInsumo` varchar(256) NOT NULL,
  `DescripcionInsumo` varchar(512) NOT NULL,
  `ValorVenta` int(11) NOT NULL,
  `Fk_Id_Producto_Insumo` int(11) NOT NULL,
  `CodigoInsumo` varchar(256) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de los insumos';

--
-- Volcado de datos para la tabla `producto_insumo`
--

INSERT INTO `producto_insumo` (`Id_Producto_Insumo`, `Marca`, `NombreInsumo`, `DescripcionInsumo`, `ValorVenta`, `Fk_Id_Producto_Insumo`, `CodigoInsumo`) VALUES
(1, '2', '2', '2', 2, 80, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE IF NOT EXISTS `proveedor` (
`IdProveedor` int(11) NOT NULL,
  `DocumentoProveedor` varchar(25) NOT NULL,
  `NombreProveedor` varchar(55) NOT NULL,
  `NombreContactoProveedor` varchar(55) NOT NULL,
  `TelefonoContactoProveedor` varchar(20) NOT NULL,
  `CorreoContactoProveedor` varchar(55) NOT NULL,
  `EstadoProveedor` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de los proveedores';

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`IdProveedor`, `DocumentoProveedor`, `NombreProveedor`, `NombreContactoProveedor`, `TelefonoContactoProveedor`, `CorreoContactoProveedor`, `EstadoProveedor`) VALUES
(6, '1', 'Bodega worksmart', 'bodega', '', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE IF NOT EXISTS `rol` (
`IdRol` int(11) NOT NULL,
  `NombreRol` varchar(20) NOT NULL,
  `DescripcionRol` varchar(55) NOT NULL,
  `EstadoRol` enum('0','1') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de los roles de la aplicacion';

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`IdRol`, `NombreRol`, `DescripcionRol`, `EstadoRol`) VALUES
(1, 'Administardor', 'Rol para los administardores', '1'),
(2, 'Empleado', 'Rol para os empleados', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida`
--

CREATE TABLE IF NOT EXISTS `salida` (
`IdSalida` int(11) NOT NULL,
  `CodigoSalida` int(11) NOT NULL,
  `FechaSalida` int(11) NOT NULL,
  `Fk_Id_Empleado_Salida` int(11) NOT NULL,
  `TipoSalida` enum('VENTA','OBSEQUIO','DEVOLUCION') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las salidas';

--
-- Volcado de datos para la tabla `salida`
--

INSERT INTO `salida` (`IdSalida`, `CodigoSalida`, `FechaSalida`, `Fk_Id_Empleado_Salida`, `TipoSalida`) VALUES
(1, 0, 2147483647, 4, 'VENTA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_devolucion`
--

CREATE TABLE IF NOT EXISTS `salida_devolucion` (
`IdSalidaDevolucion` int(11) NOT NULL,
  `Fk_Id_Salida` int(11) NOT NULL,
  `Fk_Id_Detalle_Producto_Proveedor` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Comentario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las salidas de tipo devolucion';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_obsequio`
--

CREATE TABLE IF NOT EXISTS `salida_obsequio` (
`IdSalidaObsequio` int(11) NOT NULL,
  `Fk_Id_Salida` int(11) NOT NULL,
  `Fk_Id_Producto_Salida_Obsequio` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Comentario` int(11) NOT NULL,
  `Fk_Id_Cliente_Salida_Obsequio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las salidas de tipo obsequio';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_venta`
--

CREATE TABLE IF NOT EXISTS `salida_venta` (
`IdSaildaVentas` int(11) NOT NULL,
  `Fk_Id_Salida` int(11) NOT NULL,
  `Fk_Id_Factura` int(11) NOT NULL,
  `Valor` decimal(10,0) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las salidas de tipo venta';

--
-- Volcado de datos para la tabla `salida_venta`
--

INSERT INTO `salida_venta` (`IdSaildaVentas`, `Fk_Id_Salida`, `Fk_Id_Factura`, `Valor`) VALUES
(1, 1, 9, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE IF NOT EXISTS `servicio` (
`IdServicio` int(11) NOT NULL,
  `CodigoServicio` varchar(15) NOT NULL,
  `NombreServicio` varchar(55) NOT NULL,
  `DescripcionServicio` varchar(512) NOT NULL,
  `ImagenServicio` varchar(20) NOT NULL,
  `ValorServicio` decimal(10,0) NOT NULL,
  `EstadoServicio` int(11) NOT NULL,
  `IdCategoriaServicio` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de los servicios';

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`IdServicio`, `CodigoServicio`, `NombreServicio`, `DescripcionServicio`, `ImagenServicio`, `ValorServicio`, `EstadoServicio`, `IdCategoriaServicio`) VALUES
(1, '0001', 'Arriendo Mensual', '', '', '44000', 0, 0),
(2, '0002', 'Arriendo Numero de copias', '', '', '25000', 1, 0),
(3, '0003', 'Visita tecnica', '', '', '0', 1, 0),
(4, '0004', 'Capacitacion', '', '', '0', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE IF NOT EXISTS `solicitudes` (
`IdSolicitud` int(11) NOT NULL,
  `NumeroSolicitud` varchar(20) NOT NULL,
  `FechaSolicitud` datetime NOT NULL,
  `NombreCliente` varchar(100) NOT NULL,
  `CorreoCliente` varchar(100) NOT NULL,
  `TelefonoCliente` varchar(55) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las facturas';

--
-- Volcado de datos para la tabla `solicitudes`
--

INSERT INTO `solicitudes` (`IdSolicitud`, `NumeroSolicitud`, `FechaSolicitud`, `NombreCliente`, `CorreoCliente`, `TelefonoCliente`) VALUES
(3, '', '2016-08-11 19:34:48', '1', '2', '2'),
(4, '2', '2016-08-13 00:56:56', 'Edgar', '4444', '555');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_descripcion`
--

CREATE TABLE IF NOT EXISTS `tipo_descripcion` (
`IdTipoDescripcion` int(11) NOT NULL,
  `NombreTipoDescripcion` varchar(55) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_descripcion`
--

INSERT INTO `tipo_descripcion` (`IdTipoDescripcion`, `NombreTipoDescripcion`) VALUES
(1, 'Funciones'),
(2, 'Color'),
(3, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
`IdUsuario` int(11) NOT NULL,
  `DocumentoUsuario` varchar(30) NOT NULL,
  `CorreoUsuario` varchar(55) DEFAULT NULL,
  `EstadoUsuario` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene la informacion de las usuarios de la aplicacion';

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `DocumentoUsuario`, `CorreoUsuario`, `EstadoUsuario`) VALUES
(1, '1073684233', 'edgar@mohansoft.com', 1),
(2, '80793167', 'stalin@mohansoft.com', 1),
(3, 'jose2@mohansoft.com', '', 1),
(4, '98765', 'empleadodos@mohansoft.co', 1),
(5, '20584312', 'barbarita@mohansoft.com', 1),
(6, '3032046', 'carl@mohansoft.com', 1),
(8, 'micorreo@mio.com', '733251', 1),
(10, '6667', 'edgar.guzman21@gmail.com', 1),
(14, '654123', 'hmendez@mio.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agenda`
--
ALTER TABLE `agenda`
 ADD PRIMARY KEY (`IdAgenda`), ADD KEY `Fk_Id_Servicio` (`Fk_Id_Servicio`), ADD KEY `Fk_Id_Empleado` (`Fk_Id_Empleado`), ADD KEY `Fk_Id_Cliente` (`Fk_Id_Cliente`);

--
-- Indices de la tabla `archivos_adicionales`
--
ALTER TABLE `archivos_adicionales`
 ADD PRIMARY KEY (`Id_Recurso`), ADD KEY `Fk_Id_Producto` (`Fk_Id_Producto`);

--
-- Indices de la tabla `arriendo`
--
ALTER TABLE `arriendo`
 ADD PRIMARY KEY (`IdArriendo`), ADD KEY `Fk_Id_Equipo` (`Fk_Id_Equipo`), ADD KEY `Fk_Id_Cliente` (`Fk_Id_Cliente`);

--
-- Indices de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
 ADD PRIMARY KEY (`IdCategoriaProducto`), ADD KEY `FK_Estado_Categoria` (`EstadoCategoria`);

--
-- Indices de la tabla `categoria_servicio`
--
ALTER TABLE `categoria_servicio`
 ADD PRIMARY KEY (`IdCtaegoriaServicio`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
 ADD PRIMARY KEY (`IdCliente`), ADD KEY `Fk_Id_Usuario` (`Fk_Id_Usuario_Cliente`), ADD KEY `Fk_Id_Usuario_Cliente` (`Fk_Id_Usuario_Cliente`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
 ADD PRIMARY KEY (`IdContacto`);

--
-- Indices de la tabla `detalle_factura_producto`
--
ALTER TABLE `detalle_factura_producto`
 ADD PRIMARY KEY (`IdDetalleProducto`), ADD KEY `Fk_Id_Factura` (`Fk_Id_Factura`,`Fk_Id_Producto`), ADD KEY `Fk_Id_Producto` (`Fk_Id_Producto`);

--
-- Indices de la tabla `detalle_factura_servicio`
--
ALTER TABLE `detalle_factura_servicio`
 ADD PRIMARY KEY (`IdDetalleFacturaServicio`), ADD KEY `Fk_Id_Factura` (`Fk_Id_Factura`), ADD KEY `Fk_Id_Servicio` (`Fk_Id_Servicio`);

--
-- Indices de la tabla `detalle_solicitud_producto`
--
ALTER TABLE `detalle_solicitud_producto`
 ADD PRIMARY KEY (`IdDetalleSolicitudProducto`), ADD KEY `Fk_Id_Factura` (`Fk_Id_Solicitud`,`Fk_Id_Producto`), ADD KEY `Fk_Id_Producto` (`Fk_Id_Producto`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
 ADD PRIMARY KEY (`IdEmpleado`), ADD KEY `Fk_Id_Usuario_Empleado` (`Fk_Id_Usuario_Empleado`);

--
-- Indices de la tabla `entidades`
--
ALTER TABLE `entidades`
 ADD PRIMARY KEY (`IdEntidad`);

--
-- Indices de la tabla `entrada`
--
ALTER TABLE `entrada`
 ADD PRIMARY KEY (`IdEntrada`);

--
-- Indices de la tabla `entrada_pedido`
--
ALTER TABLE `entrada_pedido`
 ADD PRIMARY KEY (`IdEntradaPedido`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
 ADD PRIMARY KEY (`IdFactura`), ADD KEY `Fk_Id_Empleado_factura` (`Fk_Id_Empleado_factura`), ADD KEY `Fk_Id_Usuario_Cliente_Factura` (`Fk_Id_Usuario_Cliente_Factura`);

--
-- Indices de la tabla `hoja_de_vida`
--
ALTER TABLE `hoja_de_vida`
 ADD PRIMARY KEY (`IdHojaVida`);

--
-- Indices de la tabla `ingreso_aplicacion`
--
ALTER TABLE `ingreso_aplicacion`
 ADD PRIMARY KEY (`IdIngreso`), ADD KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`), ADD KEY `Fk_Id_Rol` (`Fk_Id_Rol`);

--
-- Indices de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
 ADD PRIMARY KEY (`IdMantenimiento`), ADD KEY `Fk_Id_Equipo` (`Fk_Id_Equipo`), ADD KEY `Fk_Id_Tecnico` (`Fk_Id_Tecnico`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
 ADD PRIMARY KEY (`IdMarcas`);

--
-- Indices de la tabla `multimedia_producto`
--
ALTER TABLE `multimedia_producto`
 ADD PRIMARY KEY (`IdMultimediaProducto`), ADD KEY `Fk_Id_Producto_Multimedia` (`Fk_Id_Producto_Multimedia`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
 ADD PRIMARY KEY (`IdPermiso`), ADD KEY `Fk_Id_Entidad` (`Fk_Id_Entidad`), ADD KEY `Fk_Id_Rol` (`Fk_Id_Rol_Permisos`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
 ADD PRIMARY KEY (`IdProducto`), ADD KEY `Fk_Id_Categoria_Producto` (`Fk_Id_Categoria_Producto`), ADD KEY `Marca` (`Marca`);

--
-- Indices de la tabla `producto_caracteristica`
--
ALTER TABLE `producto_caracteristica`
 ADD PRIMARY KEY (`IdCaracteristica`), ADD KEY `Fk_Id_Caracteristica_Producto` (`Fk_Id_Caracteristica_Producto`), ADD KEY `Fk_Id_Tipo_Descripcion` (`Fk_Id_Tipo_Descripcion`);

--
-- Indices de la tabla `producto_insumo`
--
ALTER TABLE `producto_insumo`
 ADD PRIMARY KEY (`Id_Producto_Insumo`), ADD KEY `Fk_Id_Producto_Insumo` (`Fk_Id_Producto_Insumo`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
 ADD PRIMARY KEY (`IdProveedor`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
 ADD PRIMARY KEY (`IdRol`);

--
-- Indices de la tabla `salida`
--
ALTER TABLE `salida`
 ADD PRIMARY KEY (`IdSalida`);

--
-- Indices de la tabla `salida_devolucion`
--
ALTER TABLE `salida_devolucion`
 ADD PRIMARY KEY (`IdSalidaDevolucion`);

--
-- Indices de la tabla `salida_obsequio`
--
ALTER TABLE `salida_obsequio`
 ADD PRIMARY KEY (`IdSalidaObsequio`);

--
-- Indices de la tabla `salida_venta`
--
ALTER TABLE `salida_venta`
 ADD PRIMARY KEY (`IdSaildaVentas`), ADD KEY `Fk_Id_Salida` (`Fk_Id_Salida`), ADD KEY `Fk_Id_Factura` (`Fk_Id_Factura`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
 ADD PRIMARY KEY (`IdServicio`), ADD KEY `IdCategoriaServicio` (`IdCategoriaServicio`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
 ADD PRIMARY KEY (`IdSolicitud`), ADD KEY `Fk_Id_Empleado_factura` (`CorreoCliente`), ADD KEY `Fk_Id_Usuario_Cliente_Factura` (`NombreCliente`);

--
-- Indices de la tabla `tipo_descripcion`
--
ALTER TABLE `tipo_descripcion`
 ADD PRIMARY KEY (`IdTipoDescripcion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
 ADD PRIMARY KEY (`IdUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agenda`
--
ALTER TABLE `agenda`
MODIFY `IdAgenda` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `archivos_adicionales`
--
ALTER TABLE `archivos_adicionales`
MODIFY `Id_Recurso` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=95;
--
-- AUTO_INCREMENT de la tabla `arriendo`
--
ALTER TABLE `arriendo`
MODIFY `IdArriendo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
MODIFY `IdCategoriaProducto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `categoria_servicio`
--
ALTER TABLE `categoria_servicio`
MODIFY `IdCtaegoriaServicio` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
MODIFY `IdCliente` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
MODIFY `IdContacto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `detalle_factura_producto`
--
ALTER TABLE `detalle_factura_producto`
MODIFY `IdDetalleProducto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `detalle_factura_servicio`
--
ALTER TABLE `detalle_factura_servicio`
MODIFY `IdDetalleFacturaServicio` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `detalle_solicitud_producto`
--
ALTER TABLE `detalle_solicitud_producto`
MODIFY `IdDetalleSolicitudProducto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
MODIFY `IdEmpleado` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `entidades`
--
ALTER TABLE `entidades`
MODIFY `IdEntidad` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `entrada`
--
ALTER TABLE `entrada`
MODIFY `IdEntrada` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `entrada_pedido`
--
ALTER TABLE `entrada_pedido`
MODIFY `IdEntradaPedido` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
MODIFY `IdFactura` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `hoja_de_vida`
--
ALTER TABLE `hoja_de_vida`
MODIFY `IdHojaVida` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `ingreso_aplicacion`
--
ALTER TABLE `ingreso_aplicacion`
MODIFY `IdIngreso` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
MODIFY `IdMantenimiento` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
MODIFY `IdMarcas` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `multimedia_producto`
--
ALTER TABLE `multimedia_producto`
MODIFY `IdMultimediaProducto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
MODIFY `IdPermiso` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
MODIFY `IdProducto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT de la tabla `producto_caracteristica`
--
ALTER TABLE `producto_caracteristica`
MODIFY `IdCaracteristica` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=245;
--
-- AUTO_INCREMENT de la tabla `producto_insumo`
--
ALTER TABLE `producto_insumo`
MODIFY `Id_Producto_Insumo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
MODIFY `IdProveedor` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
MODIFY `IdRol` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `salida`
--
ALTER TABLE `salida`
MODIFY `IdSalida` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `salida_devolucion`
--
ALTER TABLE `salida_devolucion`
MODIFY `IdSalidaDevolucion` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `salida_obsequio`
--
ALTER TABLE `salida_obsequio`
MODIFY `IdSalidaObsequio` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `salida_venta`
--
ALTER TABLE `salida_venta`
MODIFY `IdSaildaVentas` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
MODIFY `IdServicio` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
MODIFY `IdSolicitud` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tipo_descripcion`
--
ALTER TABLE `tipo_descripcion`
MODIFY `IdTipoDescripcion` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agenda`
--
ALTER TABLE `agenda`
ADD CONSTRAINT `Fk_AgendaCliente` FOREIGN KEY (`Fk_Id_Cliente`) REFERENCES `cliente` (`IdCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Agenda_Empleado` FOREIGN KEY (`Fk_Id_Empleado`) REFERENCES `empleado` (`IdEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Agenda_Servicio` FOREIGN KEY (`Fk_Id_Servicio`) REFERENCES `servicio` (`IdServicio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `archivos_adicionales`
--
ALTER TABLE `archivos_adicionales`
ADD CONSTRAINT `Fk_archivos_adiciones_producto` FOREIGN KEY (`Fk_Id_Producto`) REFERENCES `producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `arriendo`
--
ALTER TABLE `arriendo`
ADD CONSTRAINT `Fk_Id_Cliente_Arriendo` FOREIGN KEY (`Fk_Id_Cliente`) REFERENCES `cliente` (`IdCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Id_HV_Arriendo` FOREIGN KEY (`Fk_Id_Equipo`) REFERENCES `hoja_de_vida` (`IdHojaVida`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
ADD CONSTRAINT `Fk_Cliente_Usuario` FOREIGN KEY (`Fk_Id_Usuario_Cliente`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_factura_producto`
--
ALTER TABLE `detalle_factura_producto`
ADD CONSTRAINT `FK_Detalle_Producto_Factura` FOREIGN KEY (`Fk_Id_Factura`) REFERENCES `factura` (`IdFactura`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Detalle_Factura_Producto` FOREIGN KEY (`Fk_Id_Producto`) REFERENCES `producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_factura_servicio`
--
ALTER TABLE `detalle_factura_servicio`
ADD CONSTRAINT `Fk_Detalle_Factura_Servicio` FOREIGN KEY (`Fk_Id_Servicio`) REFERENCES `servicio` (`IdServicio`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Detalle_Factura_Servicio_Factura` FOREIGN KEY (`Fk_Id_Factura`) REFERENCES `factura` (`IdFactura`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
ADD CONSTRAINT `Fk_Empleado_Usuario` FOREIGN KEY (`Fk_Id_Usuario_Empleado`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
ADD CONSTRAINT `Fk_FacturaCliente` FOREIGN KEY (`Fk_Id_Usuario_Cliente_Factura`) REFERENCES `cliente` (`IdCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk__Factura_Empleado` FOREIGN KEY (`Fk_Id_Empleado_factura`) REFERENCES `empleado` (`IdEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingreso_aplicacion`
--
ALTER TABLE `ingreso_aplicacion`
ADD CONSTRAINT `Fk_Usuario_Ingreso_Aplicacion` FOREIGN KEY (`Fk_Id_Usuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Usuario_Rol` FOREIGN KEY (`Fk_Id_Rol`) REFERENCES `rol` (`IdRol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
ADD CONSTRAINT `Fk_Id_Equipo_Mantenimiento` FOREIGN KEY (`Fk_Id_Equipo`) REFERENCES `hoja_de_vida` (`IdHojaVida`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Id_Tecnico_Mantenimiento` FOREIGN KEY (`Fk_Id_Tecnico`) REFERENCES `empleado` (`IdEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `multimedia_producto`
--
ALTER TABLE `multimedia_producto`
ADD CONSTRAINT `Fk_id_Multimedia_Caracteristica` FOREIGN KEY (`Fk_Id_Producto_Multimedia`) REFERENCES `producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `permisos`
--
ALTER TABLE `permisos`
ADD CONSTRAINT `Fk_Id_Permisos_Entidad` FOREIGN KEY (`Fk_Id_Entidad`) REFERENCES `entidades` (`IdEntidad`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Id_Permisos_Rol` FOREIGN KEY (`Fk_Id_Rol_Permisos`) REFERENCES `rol` (`IdRol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
ADD CONSTRAINT `Fk_Categoria_Producto` FOREIGN KEY (`Fk_Id_Categoria_Producto`) REFERENCES `categoria_producto` (`IdCategoriaProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Marcas_producto` FOREIGN KEY (`Marca`) REFERENCES `marcas` (`IdMarcas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto_caracteristica`
--
ALTER TABLE `producto_caracteristica`
ADD CONSTRAINT `Fk_Id_TipoDescripcionCaracteristica` FOREIGN KEY (`Fk_Id_Tipo_Descripcion`) REFERENCES `tipo_descripcion` (`IdTipoDescripcion`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Id_caracteristicas_produtco` FOREIGN KEY (`Fk_Id_Caracteristica_Producto`) REFERENCES `producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto_insumo`
--
ALTER TABLE `producto_insumo`
ADD CONSTRAINT `Fk_Insumo_Producto` FOREIGN KEY (`Fk_Id_Producto_Insumo`) REFERENCES `producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
