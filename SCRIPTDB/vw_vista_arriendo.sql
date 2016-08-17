-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 17-08-2016 a las 00:20:53
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
-- Estructura para la vista `vw_vista_arriendo`
--

CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `vw_vista_arriendo` AS select `a`.`IdArriendo` AS `IdArriendo`,`a`.`Fk_Id_Equipo` AS `Fk_Id_Equipo`,`a`.`Fk_Id_Cliente` AS `Fk_Id_Cliente`,`a`.`FechaInicioAlquiler` AS `FechaInicioAlquiler`,`a`.`FechaFinAlquiler` AS `FechaFinAlquiler`,`a`.`ComentarioInicial` AS `ComentarioInicial`,`a`.`ComentarioFinal` AS `ComentarioFinal`,`a`.`Fk_Id_Servicio` AS `Fk_Id_Servicio`,`a`.`EstadoArriendo` AS `EstadoArriendo`,`c`.`IdCliente` AS `IdCliente`,`c`.`NombreCliente` AS `NombreCliente`,`c`.`ApellidoCliente` AS `ApellidoCliente`,`c`.`TipoCliente` AS `TipoCliente`,`c`.`NombreContactoCliente` AS `NombreContactoCliente`,`c`.`TelefonoContactoCliente` AS `TelefonoContactoCliente`,`c`.`DireccionContactoCliente` AS `DireccionContactoCliente`,`c`.`Fk_Id_Usuario_Cliente` AS `Fk_Id_Usuario_Cliente`,`hv`.`IdHojaVida` AS `IdHojaVida`,`hv`.`Fk_Id_Producto` AS `Fk_Id_Producto`,`hv`.`Serial` AS `Serial`,`hv`.`Fecha_Inicio` AS `Fecha_Inicio`,`s`.`IdServicio` AS `IdServicio`,`s`.`CodigoServicio` AS `CodigoServicio`,`s`.`NombreServicio` AS `NombreServicio`,`s`.`DescripcionServicio` AS `DescripcionServicio`,`s`.`ImagenServicio` AS `ImagenServicio`,`s`.`ValorServicio` AS `ValorServicio`,`s`.`EstadoServicio` AS `EstadoServicio`,`s`.`IdCategoriaServicio` AS `IdCategoriaServicio` from (((`arriendo` `a` join `cliente` `c` on((`c`.`IdCliente` = `a`.`Fk_Id_Cliente`))) join `hoja_de_vida` `hv` on((`hv`.`IdHojaVida` = `a`.`Fk_Id_Equipo`))) join `servicio` `s` on((`s`.`IdServicio` = `a`.`Fk_Id_Servicio`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
