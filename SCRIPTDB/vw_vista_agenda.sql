-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 17-08-2016 a las 00:21:09
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
-- Estructura para la vista `vw_vista_agenda`
--

CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `vw_vista_agenda` AS select `a`.`IdAgenda` AS `IdAgenda`,`a`.`Fk_Id_Servicio` AS `Fk_Id_Servicio`,`a`.`Fk_Id_Empleado` AS `Fk_Id_Empleado`,`a`.`Fk_Id_Cliente` AS `Fk_Id_Cliente`,`a`.`FechaAsignacion` AS `FechaAsignacion`,`a`.`FechaInicioServicio` AS `FechaInicioServicio`,`a`.`FechaFinServicio` AS `FechaFinServicio`,`a`.`ComentarioInicial` AS `ComentarioInicial`,`a`.`ComentarioFinal` AS `ComentarioFinal`,`a`.`CodigoCita` AS `CodigoCita`,`a`.`Hora_Inicio` AS `Hora_Inicio`,`a`.`EstadoAgenda` AS `EstadoAgenda`,`e`.`IdEmpleado` AS `IdEmpleado`,`e`.`NombreEmpleado` AS `NombreEmpleado`,`e`.`ApellidoEmpleado` AS `ApellidoEmpleado`,`e`.`Fk_Id_Usuario_Empleado` AS `Fk_Id_Usuario_Empleado`,`c`.`IdCliente` AS `IdCliente`,`c`.`NombreCliente` AS `NombreCliente`,`c`.`ApellidoCliente` AS `ApellidoCliente`,`c`.`TipoCliente` AS `TipoCliente`,`c`.`NombreContactoCliente` AS `NombreContactoCliente`,`c`.`TelefonoContactoCliente` AS `TelefonoContactoCliente`,`c`.`DireccionContactoCliente` AS `DireccionContactoCliente`,`c`.`Fk_Id_Usuario_Cliente` AS `Fk_Id_Usuario_Cliente`,`a`.`Coordenadas` AS `Coordenadas`,`u`.`DocumentoUsuario` AS `DocumentoUsuarioCliente`,`us`.`DocumentoUsuario` AS `DocumentoUsuarioEmpleado`,`u`.`CorreoUsuario` AS `CorreoUsuarioCliente`,`us`.`CorreoUsuario` AS `CorreoUsuarioEmpleado`,`s`.`NombreServicio` AS `NombreServicio` from (((((`agenda` `a` join `empleado` `e` on((`e`.`IdEmpleado` = `a`.`Fk_Id_Empleado`))) join `cliente` `c` on((`c`.`IdCliente` = `a`.`Fk_Id_Cliente`))) join `usuario` `u` on((`u`.`IdUsuario` = `c`.`Fk_Id_Usuario_Cliente`))) join `usuario` `us` on((`us`.`IdUsuario` = `e`.`Fk_Id_Usuario_Empleado`))) join `servicio` `s` on((`s`.`IdServicio` = `a`.`Fk_Id_Servicio`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
