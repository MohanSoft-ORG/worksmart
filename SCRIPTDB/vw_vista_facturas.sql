-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 17-08-2016 a las 00:16:50
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

-- --------------------------------------------------------

--
-- Estructura para la vista `vw_vista_facturas`
--

CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `vw_vista_facturas` AS select `f`.`IdFactura` AS `IdFactura`,`f`.`NumeroFactura` AS `NumeroFactura`,`f`.`FechaFactura` AS `FechaFactura`,`f`.`Fk_Id_Usuario_Cliente_Factura` AS `Fk_Id_Usuario_Cliente_Factura`,`f`.`Fk_Id_Empleado_factura` AS `Fk_Id_Empleado_factura`,`c`.`IdCliente` AS `IdCliente`,`c`.`NombreCliente` AS `NombreCliente`,`c`.`ApellidoCliente` AS `ApellidoCliente`,`c`.`TipoCliente` AS `TipoCliente`,`c`.`NombreContactoCliente` AS `NombreContactoCliente`,`c`.`TelefonoContactoCliente` AS `TelefonoContactoCliente`,`c`.`DireccionContactoCliente` AS `DireccionContactoCliente`,`c`.`Fk_Id_Usuario_Cliente` AS `Fk_Id_Usuario_Cliente`,`e`.`IdEmpleado` AS `IdEmpleado`,`e`.`NombreEmpleado` AS `NombreEmpleado`,`e`.`ApellidoEmpleado` AS `ApellidoEmpleado`,`e`.`EstadoEmpleado` AS `EstadoEmpleado`,`e`.`Fk_Id_Usuario_Empleado` AS `Fk_Id_Usuario_Empleado`,`e`.`Telefono` AS `Telefono`,`u`.`IdUsuario` AS `IdUsuario`,`u`.`DocumentoUsuario` AS `DocumentoUsuario`,`u`.`CorreoUsuario` AS `CorreoUsuario`,`u`.`EstadoUsuario` AS `EstadoUsuario`,`f`.`EstadoFactura` AS `Estadofactura` from (((`factura` `f` join `cliente` `c` on((`c`.`IdCliente` = `f`.`Fk_Id_Usuario_Cliente_Factura`))) join `empleado` `e` on((`e`.`IdEmpleado` = `f`.`Fk_Id_Empleado_factura`))) join `usuario` `u` on((`u`.`IdUsuario` = `c`.`Fk_Id_Usuario_Cliente`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
