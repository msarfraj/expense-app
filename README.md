# exp-mgmt app
Tables:
1. 
CREATE TABLE employee_data (
    Mobile int NOT NULL,
    Password varchar(255) NOT NULL,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
   
);

2. 
insert INTO employee_data (Mobile,PASSWORD) VALUES (9650863399,'1234')

3.
CREATE TABLE stockpnl (
    Stock varchar(255) NOT NULL,
    EntryPrice int NOT NULL,
    ExitPrice int NOT NULL,
    Date date,
    BookedAmmount int NOT NULL,
    PNLType varchar(5),
    Comment varchar(255)
   
);