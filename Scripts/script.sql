CREATE DATABASE `hoteljavy` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE hoteljavy;

CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `numeroTelefonico` int(11) DEFAULT NULL,
  `cedula` varchar(255) DEFAULT NULL,
  `tipoCedula` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `facturas` (
  `idFactura` int(11) NOT NULL AUTO_INCREMENT,
  `fechaEmision` datetime DEFAULT NULL,
  `condicionVenta` varchar(255) DEFAULT NULL,
  `MedioPago` varchar(255) DEFAULT NULL,
  `totalVenta` int(11) DEFAULT NULL,
  `idReservacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`idFactura`),
  KEY `idReservacion` (`idReservacion`),
  CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`idReservacion`) REFERENCES `reservacions` (`idReservacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `habitacions` (
  `idHabitacion` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) DEFAULT NULL,
  `camasIndividuales` int(11) DEFAULT NULL,
  `camasDobles` int(11) DEFAULT NULL,
  `recomendacionPrecioNacional` int(11) DEFAULT NULL,
  `recomendacionPrecioExtranjero` int(11) DEFAULT NULL,
  PRIMARY KEY (`idHabitacion`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `reservacions` (
  `idReservacion` int(11) NOT NULL AUTO_INCREMENT,
  `cantidadDePersonas` int(11) DEFAULT NULL,
  `checkIn` datetime DEFAULT NULL,
  `checkOut` datetime DEFAULT NULL,
  `comentarios` varchar(255) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `idHabitacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`idReservacion`),
  KEY `idCliente` (`idCliente`),
  KEY `idHabitacion` (`idHabitacion`),
  CONSTRAINT `reservacions_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservacions_ibfk_2` FOREIGN KEY (`idHabitacion`) REFERENCES `habitacions` (`idHabitacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
