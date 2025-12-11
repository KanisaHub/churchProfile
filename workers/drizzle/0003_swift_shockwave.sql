ALTER TABLE `church` ADD `pastor` text NOT NULL;--> statement-breakpoint
ALTER TABLE `church` ADD `establishedDate` text NOT NULL;--> statement-breakpoint
ALTER TABLE `church` ADD `location` text NOT NULL;--> statement-breakpoint
ALTER TABLE `church` ADD `districtId` integer NOT NULL REFERENCES district(id);