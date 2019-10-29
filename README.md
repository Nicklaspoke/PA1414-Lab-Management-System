# PA1414 - Lab Management System

This is the frontend application of my individual project in the course PA1414 at [BTH](https://bth.se)

The purpose of this application is to provide a frontend interface for student and admins to book equipment at the SERL Room at BTH.

# How to set up and run this

To run and set up this application. You will need the following prerequisites
* nodejs 8.10 or higher
* My [backend API](https://github.com/Nicklaspoke/PA1414-Lab-Management-System-Backend-API)
* My [database setup](https://github.com/Nicklaspoke/PA1414-Lab-Management-System-Database-SQL) (also requiered for the backend)

## Install the application
To after downloading or cloning this repo. In the same folder as the **Package.json** file run the following command `npm install` to install all the reqiured packages.

After the installation, run the command `npm run build`, to build the files the application will use

## Configure the application
The only configuration that needs to be done is to change the **config.json** file in the **config** folder. Change the entry in apiAddr to the address or ip that the backend is running on.

## How to run it
To run the application you have two chooices.
1. Just use the command `npm run start`, this will start the application on the default port 3000.
2. If you want the application to run on a different port use the following commnd `PORT=3030 npm run start-port` to make it run on the port you set the variable **PORT** to in the command
