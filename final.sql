-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2020 at 12:41 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Database: `nodelogin`

-- Table structure for table `order`
CREATE TABLE `order` (                     -- order
  `id` int(10) NOT NULL,
  `customer_name` varchar(255) NOT NULL,   -- customer_mane
  `catagory_name` varchar(255) NOT NULL,   -- catagory_name cake/burger
  `chef_name` varchar(255) NOT NULL,       -- chef_name 
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
);
--ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `order`
INSERT INTO `order` (`id`, `customer_name`, `catagory_name`, `chef_name`, `date`, `time`, `email`, `phone`) VALUES
(6, 'Test', 'Burger', 'Jack', '26/03/2024', '10:43 AM', 'jack@gmail.com', '7865641399'),
(10, 'Test123', 'Cake', 'Miller', '18/03/2024', '1:41 AM', 'miller@gmail.com', '7865641399');


-- Table structure for table `complain`
CREATE TABLE `complain` (
  `id` int(10) NOT NULL,
  `message` varchar(500) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(20) NOT NULL,
  `subject` varchar(50) NOT NULL
);
--ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Dumping data for table `complain`
INSERT INTO `complain` (`id`, `message`, `name`, `email`, `subject`) VALUES
(1, 'wdawdws', 'awdawd', 'awdw', 'adwwd'),
(2, 'Definition of complain. intransitive verb. 1 : to express grief, pain, or discontent complaining about the weather. 2 : to make a formal accusation or charge He threatened to complain of him to the captain.', 'Isaiah L. Smith', 'gmhs13@yopmail.com', 'dafsgd'),
(3, 'redtfyguhijo', 'simanto', 'gmhs13@yopmail.com', 'ytguijopk['),
(4, 'abcabcbacbacbabc', 'Isaiah L. Smith', 'gmhs13@yopmail.com', 'dadsvfbgfng');


-- Table structure for table `catagory`
CREATE TABLE `catagory` (                  -- catagory   cake/ burger
  `id` int(11) NOT NULL,
  `catagory_name` varchar(255) NOT NULL,   -- catagory_name
  `catagory_desc` varchar(255) NOT NULL    -- catagory_desc
);
--ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Dumping data for table `catagory`
INSERT INTO `catagory` (`id`, `catagory_name`, `catagory_desc`) VALUES
(11, 'Cake', 'expertly crafted, moist, rich flavors, artfully decorated, irresistible sweetness, perfect for celebrations, indulgent, fresh, and satisfying.'),
(16, 'Burger', 'Juicy, flavorful burger crafted with premium beef, fresh toppings, melted cheese, and a soft brioche bun, grilled to perfection.'),
(17, 'Pizza', "Delicious, hand-tossed pizzas with fresh toppings, gooey cheese, and bold flavors, served hot and crafted to perfection."),
(18, 'Sushi', 'Fresh and flavorful sushi crafted with premium ingredients, offering diverse rolls, sashimi, and Japanese delicacies in a cozy ambiance.'),
(19, 'Momo', 'Momo, a popular Nepalese dumpling dish, features tender dough filled with spiced meat or vegetables, often served with tangy chutney.'),
(20, 'Pasta', 'Freshly made pasta dishes with rich, authentic sauces, crafted with quality ingredients, served in a cozy, welcoming restaurant atmosphere.');


-- Table structure for table `chef`
CREATE TABLE `chef` (                   -- chef
  `id` int(10) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `image` text NOT NULL,
  `catagory_name` varchar(50) NOT NULL,   -- catagory_name
  `biography` varchar(255) NOT NULL
);
--ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Dumping data for table `chef`
INSERT INTO `chef` (`id`, `first_name`, `last_name`, `email`, `dob`, `gender`, `address`, `phone`, `image`, `catagory_name`, `biography`) VALUES
(39, 'AV', 'Stranger', 'gmhs13@yopmail.com', '18/03/2020', 'male', '3125  Elkview Drive, Miami,33169', '7865641399', 'user-02.jpg', 'Cake', 'dawfesgrthy'),
(41, 'SHAHID AFRIDI', 'ZIHAD', 'gmhs13@yopmail.com', '18/03/2020', 'male', '3125  Elkview Drive, Miami,33169', '7865641399', 'reservation.png', 'Pizza', 'awdsaef');


-- Table structure for table `employee`
CREATE TABLE `employee` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `join_date` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `salary` varchar(10) NOT NULL
);
-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Dumping data for table `employee`
INSERT INTO `employee` (`id`, `name`, `email`, `contact`, `join_date`, `role`, `salary`) VALUES
(18, 'user2', 'gmhs13@yopmail.com', '1568496', '26/03/2020', 'Receptionist', '3000'),
(19, 'abc', 'gmhs13@yopmail.com', '7865641399', '26/03/2020', 'Pharmacist', '3000'),
(20, 'Abc', 'gmhs13@yopmail.com', '0159653', '26/03/2020', 'Pharmacist', '651320');


-- Table structure for table `leaves`
CREATE TABLE `leaves` (
  `id` int(10) NOT NULL,
  `employee` varchar(255) NOT NULL,
  `emp_id` int(10) NOT NULL,
  `leave_type` varchar(255) NOT NULL,
  `date_from` varchar(255) NOT NULL,
  `date_to` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL
);
-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Dumping data for table `leaves`
INSERT INTO `leaves` (`id`, `employee`, `emp_id`, `leave_type`, `date_from`, `date_to`, `reason`) VALUES
(7, 'Isaiah L. Smith', 4, 'Medical Leave', '26/03/2020', '31/03/2020', 'acdsvfbgnh');


-- Table structure for table `login`
CREATE TABLE `login` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
);
-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `login`
INSERT INTO `login` (`id`, `username`, `password`, `email`) VALUES
(1, 'test', 'test', 'gmhs13@yopmail.com');


-- Table structure for table `store`
CREATE TABLE `store` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `m_date` varchar(255) NOT NULL,
  `expire` varchar(255) NOT NULL,
  `expire_end` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL
);
-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Dumping data for table `store`
INSERT INTO `store` (`id`, `name`, `m_date`, `expire`, `expire_end`, `price`, `quantity`) VALUES
(4, 'Cake', '20/03/2024', '2', '22/03/2024', '50', '100'),
(8, 'Pizza', '24/03/2024', '2', '26/03/2024', '100', '200'),
(9, 'Pasta', '24/03/2024', '1 ', '25/03/2024', '200', '20'),
(10, 'Sushi', '11/03/2024', '1 ', '12/03/2024', '250', '100');


-- Table structure for table `temp`
CREATE TABLE `temp` (
  `id` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
);
-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Dumping data for table `temp`
INSERT INTO `temp` (`id`, `email`, `token`) VALUES
(19, 'test555@yopmail.com', '46fn0pl3'),
(19, 'test555@yopmail.com', 'w6pvf2oq'),
(21, 'te555@yopmail.com', '9sfs6gu8');


-- Table structure for table `users`
CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email_status` varchar(20) NOT NULL
);
-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `users`
INSERT INTO `users` (`id`, `username`, `email`, `password`, `email_status`) VALUES
(9, 'zihad', 'zihad.1d@yopmail.com', '123', 'verified'),
(19, 'test', 'test555@yopmail.com', '123', 'verified'),
(20, 'abc', 'gmhs13@yopmail.com', '12345', 'not_verified'),
(21, 'alamin', 'te555@yopmail.com', 'abc', 'verified');


-- Table structure for table `verify`
CREATE TABLE `verify` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
);
-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `verify`
INSERT INTO `verify` (`id`, `username`, `email`, `token`) VALUES
(4, 'zihad', 'zihad.1d@yopmail.com', 'lp5ux5ik'),
(14, 'test', 'test555@yopmail.com', '3udlo9v6'),
(15, 'abc', 'gmhs13@yopmail.com', 'w2px024k'),
(16, 'alamin', 'te555@yopmail.com', 'ix8enxdh');

-- Indexes for dumped tables

-- Indexes for table `order`
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `complain`
ALTER TABLE `complain`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `catagory`
ALTER TABLE `catagory`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `chef`
ALTER TABLE `chef`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `employee`
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `leaves`
ALTER TABLE `leaves`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `login`
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `store`
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `users`
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `verify`
ALTER TABLE `verify`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `complain`
--
ALTER TABLE `complain`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `catagory`
--
ALTER TABLE `catagory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `chef`
--
ALTER TABLE `chef`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `leaves`
--
ALTER TABLE `leaves`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `verify`
--
ALTER TABLE `verify`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

  
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
