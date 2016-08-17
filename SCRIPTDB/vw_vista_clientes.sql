-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 17-08-2016 a las 00:20:25
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
-- Estructura para la vista `vw_vista_clientes`
--

CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `vw_vista_clientes` AS select `u`.`IdUsuario` AS `IdUsuario`,`u`.`DocumentoUsuario` AS `DocumentoUsuario`,`u`.`CorreoUsuario` AS `CorreoUsuario`,`u`.`EstadoUsuario` AS `EstadoUsuario`,`c`.`IdCliente` AS `IdCliente`,`c`.`NombreCliente` AS `NombreCliente`,`c`.`ApellidoCliente` AS `ApellidoCliente`,`c`.`TipoCliente` AS `TipoCliente`,`c`.`NombreContactoCliente` AS `NombreContactoCliente`,`c`.`TelefonoContactoCliente` AS `TelefonoContactoCliente`,`c`.`DireccionContactoCliente` AS `DireccionContactoCliente`,`c`.`Fk_Id_Usuario_Cliente` AS `Fk_Id_Usuario_Cliente`,`c`.`CoordenadasCliente` AS `CoordenadasCliente` from (`usuario` `u` join `cliente` `c` on((`u`.`IdUsuario` = `c`.`Fk_Id_Usuario_Cliente`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
