ALTER TABLE Recipes add hashId varchar(32) DEFAULT NULL;

ALTER TABLE RecipeOrders add `productionStatus` enum('NEW','RECEIVED','REQUESTED','SUBMITTED','PAID','PROCESSING','CANCELLED','SHIPPED','DELIVERED','COMPLETED') DEFAULT 'NEW';

ALTER TABLE Recipes DROP `productionStatus`;

ALTER TABLE Recipes DROP `totalDrops`;

ALTER TABLE `Users` ADD (
  `birthday` datetime DEFAULT NULL,
  `phone1` varchar(255) DEFAULT NULL,
  `phone2` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL
);
