-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 17-08-2016 a las 00:18:18
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
-- Estructura para la vista `vw_vista_producto_electronico`
--

CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `vw_vista_producto_electronico` AS select `p`.`IdProducto` AS `IdProducto`,`p`.`CodigoProducto` AS `CodigoProducto`,`p`.`NombreProducto` AS `NombreProducto`,`p`.`DescripcionProducto` AS `DescripcionProducto`,`p`.`Estado_Producto` AS `Estado_Producto`,`p`.`Marca` AS `Marca`,`p`.`Serie` AS `Serie`,`p`.`Modelo` AS `Modelo`,`p`.`ExistenciasBodega` AS `ExistenciasBodega`,`p`.`ExistenciasTienda` AS `ExistenciasTienda`,`p`.`Fk_Id_Categoria_Producto` AS `Fk_Id_Categoria_Producto`,`p`.`Color` AS `Color`,`p`.`Ppm` AS `Ppm`,`p`.`TipoProducto` AS `TipoProducto`,`p`.`ValorVenta` AS `ValorVenta`,`cp`.`IdCategoriaProducto` AS `IdCategoriaProducto`,`cp`.`NombreCategoria` AS `NombreCategoria`,`cp`.`DescripcionCategoria` AS `DescripcionCategoria`,`cp`.`ImagenCategoria` AS `ImagenCategoria`,`cp`.`EstadoCategoria` AS `EstadoCategoria`,`m`.`IdMarcas` AS `IdMarcas`,`m`.`NombreMarca` AS `NombreMarca` from ((`producto` `p` join `categoria_producto` `cp` on((`p`.`Fk_Id_Categoria_Producto` = `cp`.`IdCategoriaProducto`))) join `marcas` `m` on((`p`.`Marca` = `m`.`IdMarcas`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
