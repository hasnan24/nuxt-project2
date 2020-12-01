-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2020 at 05:49 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `persons2`
--

CREATE TABLE `persons2` (
  `id` int(11) UNSIGNED NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `nis` int(11) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `mail` varchar(200) DEFAULT NULL,
  `dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `persons2`
--

INSERT INTO `persons2` (`id`, `firstName`, `lastName`, `nis`, `gender`, `address`, `phone`, `mail`, `dob`) VALUES
(1, 'hh', 'dd', 15827, 'male', 'Djakarta', '05786578456', 'hh@mail.com', '1999-12-31'),
(2, 'fh', 'uy', 15434, 'male', 'fgh', '0214512415', 'ghjg@mail.com', '0000-00-00'),
(3, 'jhkh', 'iuiu', 65454, 'male', 'hbjkh', '02151231', 'jhbbkh@mail.com', '2020-11-08'),
(4, 'dfg', 'dfg', 24554, 'male', 'fdgd', '0245415465', 'dfgdg@mail.com', '2020-11-01'),
(5, 'gg', 'hh', 546546, 'male', 'gjghjgj', '5464645645645', 'y@m.c', '2020-11-01'),
(6, 'g', 'g', 44444, 'male', 'e', '3333', 'kulo@gmail.com', '2020-11-23'),
(7, 'h', 'h', 55544, 'male', 'ee', '333', 'kulo@mail.com', '2020-11-23'),
(8, 'ttp', 'yyp', 54647, 'female', 'trytrytry', '5464564645', 'o@p.c', '2020-11-29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `persons2`
--
ALTER TABLE `persons2`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `persons2`
--
ALTER TABLE `persons2`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
