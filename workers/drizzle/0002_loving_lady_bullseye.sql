CREATE TABLE `district` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`superintendent` text NOT NULL,
	`createdAt` text(9) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text(9) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_church` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`city` text NOT NULL,
	`createdAt` text(9) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text(9) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_church`("id", "name", "city", "createdAt", "updatedAt") SELECT "id", "name", "city", "createdAt", "updatedAt" FROM `church`;--> statement-breakpoint
DROP TABLE `church`;--> statement-breakpoint
ALTER TABLE `__new_church` RENAME TO `church`;--> statement-breakpoint
PRAGMA foreign_keys=ON;