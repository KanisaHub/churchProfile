-- Drop the existing church table
DROP TABLE IF EXISTS `church`;

-- Recreate the church table with the correct schema
CREATE TABLE `church` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`city` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);

