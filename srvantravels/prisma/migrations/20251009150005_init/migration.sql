-- CreateTable
CREATE TABLE `Custom_Itinerary` (
    `custom_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `is_made_by_customer` INTEGER NULL,

    INDEX `is_made_by_customer`(`is_made_by_customer`),
    PRIMARY KEY (`custom_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `customer_ID` INTEGER NOT NULL,
    `payment_ID` INTEGER NOT NULL,
    `number_of_PAX` INTEGER NULL,
    `date_of_travel` DATE NULL,
    `number_of_luggage` INTEGER NULL,
    `ID_Picture` BLOB NULL,

    INDEX `payment_ID`(`payment_ID`),
    PRIMARY KEY (`customer_ID`, `payment_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver` (
    `driver_ID` INTEGER NOT NULL,
    `plate_number` VARCHAR(20) NULL,
    `Availability` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`driver_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `employee_ID` INTEGER NOT NULL,

    PRIMARY KEY (`employee_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Itinerary` (
    `itinerary_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(10, 2) NULL,
    `type` ENUM('PACKAGE', 'CUSTOM') NOT NULL,

    PRIMARY KEY (`itinerary_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Itinerary_Stops` (
    `stop_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `custom_ID` INTEGER NULL,
    `stop_order` INTEGER NULL,
    `location_ID` INTEGER NULL,

    INDEX `custom_ID`(`custom_ID`),
    INDEX `location_ID`(`location_ID`),
    PRIMARY KEY (`stop_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locations` (
    `location_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `location_name` VARCHAR(255) NULL,
    `location_address` VARCHAR(255) NULL,
    `is_custom_made` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`location_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manager` (
    `manager_ID` INTEGER NOT NULL,

    PRIMARY KEY (`manager_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Details` (
    `order_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_ID` INTEGER NULL,
    `payment_ID` INTEGER NULL,
    `driver_ID` INTEGER NULL,
    `itinerary_ID` INTEGER NULL,
    `number_of_PAX` INTEGER NULL,
    `date_of_travel` DATE NULL,
    `time_for_pickup` TIME(0) NULL,
    `time_for_dropoff` TIME(0) NULL,
    `date_of_transaction` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('ACCEPTED', 'REJECTED', 'IN MODIFICATION', 'PENDING') NULL DEFAULT 'PENDING',

    INDEX `customer_ID`(`customer_ID`, `payment_ID`),
    INDEX `driver_ID`(`driver_ID`),
    INDEX `itinerary_ID`(`itinerary_ID`),
    PRIMARY KEY (`order_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Package_Itinerary` (
    `package_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `package_name` VARCHAR(255) NULL,
    `inclusions` VARCHAR(1024) NULL,
    `number_of_PAX` INTEGER NULL,
    `route` VARCHAR(1024) NULL,
    `description` VARCHAR(1024) NULL,
    `is_made_by_manager` INTEGER NULL,
    `is_available` BOOLEAN NULL DEFAULT false,
    `package_picture` VARCHAR(255) NULL,

    INDEX `is_made_by_manager`(`is_made_by_manager`),
    PRIMARY KEY (`package_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `payment_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_method` ENUM('CASH', 'GCASH') NOT NULL,
    `down_payment` DECIMAL(10, 2) NULL,
    `payment_status` ENUM('FULLY PAID', 'PARTIALLY PAID', 'NOT PAID') NOT NULL,

    PRIMARY KEY (`payment_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Person` (
    `person_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `contact_number` VARCHAR(12) NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `contact_number`(`contact_number`),
    PRIMARY KEY (`person_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Van` (
    `plate_number` VARCHAR(20) NOT NULL,
    `driver_ID` INTEGER NULL,
    `customer_ID` INTEGER NULL,
    `payment_ID` INTEGER NULL,
    `passenger_capacity` INTEGER NULL,

    INDEX `customer_ID`(`customer_ID`, `payment_ID`),
    INDEX `driver_ID`(`driver_ID`),
    PRIMARY KEY (`plate_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Custom_Itinerary` ADD CONSTRAINT `Custom_Itinerary_ibfk_1` FOREIGN KEY (`custom_ID`) REFERENCES `Itinerary`(`itinerary_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Custom_Itinerary` ADD CONSTRAINT `Custom_Itinerary_ibfk_2` FOREIGN KEY (`is_made_by_customer`) REFERENCES `Person`(`person_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_ibfk_1` FOREIGN KEY (`customer_ID`) REFERENCES `Person`(`person_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_ibfk_2` FOREIGN KEY (`payment_ID`) REFERENCES `Payment`(`payment_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_ibfk_1` FOREIGN KEY (`driver_ID`) REFERENCES `Employee`(`employee_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_ibfk_1` FOREIGN KEY (`employee_ID`) REFERENCES `Person`(`person_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Itinerary_Stops` ADD CONSTRAINT `Itinerary_Stops_ibfk_1` FOREIGN KEY (`custom_ID`) REFERENCES `Custom_Itinerary`(`custom_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Itinerary_Stops` ADD CONSTRAINT `Itinerary_Stops_ibfk_2` FOREIGN KEY (`location_ID`) REFERENCES `Locations`(`location_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Manager` ADD CONSTRAINT `Manager_ibfk_1` FOREIGN KEY (`manager_ID`) REFERENCES `Employee`(`employee_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Order_Details` ADD CONSTRAINT `Order_Details_ibfk_1` FOREIGN KEY (`customer_ID`, `payment_ID`) REFERENCES `Customer`(`customer_ID`, `payment_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Order_Details` ADD CONSTRAINT `Order_Details_ibfk_2` FOREIGN KEY (`driver_ID`) REFERENCES `Driver`(`driver_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Order_Details` ADD CONSTRAINT `Order_Details_ibfk_3` FOREIGN KEY (`itinerary_ID`) REFERENCES `Itinerary`(`itinerary_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Itinerary` ADD CONSTRAINT `Package_Itinerary_ibfk_1` FOREIGN KEY (`package_ID`) REFERENCES `Itinerary`(`itinerary_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Package_Itinerary` ADD CONSTRAINT `Package_Itinerary_ibfk_2` FOREIGN KEY (`is_made_by_manager`) REFERENCES `Manager`(`manager_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Van` ADD CONSTRAINT `Van_ibfk_1` FOREIGN KEY (`driver_ID`) REFERENCES `Driver`(`driver_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Van` ADD CONSTRAINT `Van_ibfk_2` FOREIGN KEY (`customer_ID`, `payment_ID`) REFERENCES `Customer`(`customer_ID`, `payment_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
