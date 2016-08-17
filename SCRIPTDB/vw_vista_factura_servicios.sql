-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 17-08-2016 a las 00:19:30
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
-- Estructura para la vista `vw_vista_factura_servicios`
--

CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `vw_vista_factura_servicios` AS select `dfs`.`IdDetalleFacturaServicio` AS `IdDetalleFacturaServicio`,`dfs`.`Fk_Id_Factura` AS `Fk_Id_Factura`,`dfs`.`Fk_Id_Servicio` AS `Fk_Id_Servicio`,`dfs`.`Cantidadvendida` AS `Cantidadvendida`,`dfs`.`ValorServicioFactura` AS `ValorServicioFactura`,`s`.`IdServicio` AS `IdServicio`,`s`.`CodigoServicio` AS `CodigoServicio`,`s`.`NombreServicio` AS `NombreServicio`,`s`.`DescripcionServicio` AS `DescripcionServicio`,`s`.`ImagenServicio` AS `ImagenServicio`,`s`.`ValorServicio` AS `ValorServicio`,`s`.`EstadoServicio` AS `EstadoServicio` from (`detalle_factura_servicio` `dfs` join `servicio` `s` on((`dfs`.`Fk_Id_Servicio` = `s`.`IdServicio`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
