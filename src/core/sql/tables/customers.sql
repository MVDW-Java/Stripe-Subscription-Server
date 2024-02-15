CREATE TABLE IF NOT EXISTS `customers2` (
  `id` varchar(64) NOT NULL PRIMARY KEY,
  `city` varchar(32) NOT NULL,
  `country` varchar(2) NOT NULL,
  `line1` varchar(32) NOT NULL,
  `line2` varchar(32) NOT NULL,
  `postal_code` varchar(6) NOT NULL,
  `state` varchar(32) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `phone` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
