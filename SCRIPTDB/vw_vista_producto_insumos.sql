-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 17-08-2016 a las 00:18:02
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
-- Estructura para la vista `vw_vista_producto_insumos`
--

CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `vw_vista_producto_insumos` AS select `producto_insumo`.`Id_Producto_Insumo` AS `Id_Producto_Insumo`,`producto_insumo`.`Marca` AS `Marca`,`producto_insumo`.`NombreInsumo` AS `NombreInsumo`,`producto_insumo`.`DescripcionInsumo` AS `DescripcionInsumo`,`producto_insumo`.`ValorVenta` AS `ValorVenta`,`producto_insumo`.`Fk_Id_Producto_Insumo` AS `Fk_Id_Producto_Insumo`,`producto_insumo`.`CodigoInsumo` AS `CodigoInsumo` from `producto_insumo`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
