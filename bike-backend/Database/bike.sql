-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Mar 2020 pada 03.53
-- Versi server: 10.3.16-MariaDB
-- Versi PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bike`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `bike`
--

CREATE TABLE `bike` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `code` varchar(150) NOT NULL,
  `status` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `location` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `bike`
--

INSERT INTO `bike` (`id`, `name`, `code`, `status`, `price`, `location`) VALUES
(1, 'bike blue', 'F01', 'Available', 10000, 'Unknow'),
(2, 'bike red', 'F02', 'Available', 10000, 'Unknow'),
(3, 'bike green', 'G01', 'Available', 10000, 'Unknow');

-- --------------------------------------------------------

--
-- Struktur dari tabel `rent`
--

CREATE TABLE `rent` (
  `id` int(11) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `price` int(11) NOT NULL,
  `fromLocation` varchar(150) NOT NULL,
  `toLocation` varchar(150) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `bikeId` int(11) DEFAULT NULL,
  `standId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `stand`
--

CREATE TABLE `stand` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `location` varchar(150) NOT NULL,
  `status` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `stand`
--

INSERT INTO `stand` (`id`, `name`, `location`, `status`) VALUES
(1, 'stand 1', 'monas', 'open'),
(2, 'stand 2', 'HI', 'open');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `saldo` int(11) NOT NULL,
  `fileId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `saldo`, `fileId`) VALUES
(1, 'bambang', 'bambang', '123456', 50000, 0),
(2, 'junet', 'junet123', '1234567', 20000, 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `bike`
--
ALTER TABLE `bike`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e4a433f76768045f7a2efca66e` (`id`);

--
-- Indeks untuk tabel `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_211f726fd8264e82ff7a2b86ce` (`id`),
  ADD KEY `FK_49296d11229074f058b7274ae2e` (`userId`),
  ADD KEY `FK_3011b065b4361d4464e85485293` (`bikeId`),
  ADD KEY `FK_08d8d9e0153df4b426f0142c3a4` (`standId`);

--
-- Indeks untuk tabel `stand`
--
ALTER TABLE `stand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_f984b8be1e0416b5b559b8d33b` (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_cace4a159ff9f2512dd4237376` (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `bike`
--
ALTER TABLE `bike`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `rent`
--
ALTER TABLE `rent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `stand`
--
ALTER TABLE `stand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `rent`
--
ALTER TABLE `rent`
  ADD CONSTRAINT `FK_08d8d9e0153df4b426f0142c3a4` FOREIGN KEY (`standId`) REFERENCES `stand` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_3011b065b4361d4464e85485293` FOREIGN KEY (`bikeId`) REFERENCES `bike` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_49296d11229074f058b7274ae2e` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
