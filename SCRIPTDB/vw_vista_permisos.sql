-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 17-08-2016 a las 00:18:38
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
-- Estructura para la vista `vw_vista_permisos`
--

CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `vw_vista_permisos` AS select `r`.`IdRol` AS `IdRol`,`r`.`NombreRol` AS `NombreRol`,`r`.`DescripcionRol` AS `DescripcionRol`,`r`.`EstadoRol` AS `EstadoRol`,`p`.`IdPermiso` AS `IdPermiso`,`p`.`Fk_Id_Entidad` AS `Fk_Id_Entidad`,`p`.`Fk_Id_Rol_Permisos` AS `Fk_Id_Rol_Permisos`,`p`.`Crear` AS `Crear`,`p`.`Eliminar` AS `Eliminar`,`p`.`Actualizar` AS `Actualizar`,`p`.`Consultar` AS `Consultar`,`e`.`IdEntidad` AS `IdEntidad`,`e`.`NombreEntidad` AS `NombreEntidad`,`e`.`IdCrear` AS `IdCrear`,`e`.`IdConsultar` AS `IdConsultar`,`e`.`IdActualizar` AS `IdActualizar`,`e`.`IdEliminar` AS `IdEliminar` from ((`rol` `r` join `permisos` `p` on((`p`.`Fk_Id_Rol_Permisos` = `r`.`IdRol`))) join `entidades` `e` on((`e`.`IdEntidad` = `p`.`Fk_Id_Entidad`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
