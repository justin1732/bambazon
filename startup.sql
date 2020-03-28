create database bamazon;
use bamazon;

create table products (
id integer auto_increment not null,
product varchar(45) not null,
department varchar(45) not null,
price decimal(10,4) not null,
stock integer(10) not null,
primary key (id)
); 