# StudentResultMangementSystem

This is a project which has a result management system. This is a part of the coding challenge. 
Below is the Tech stack used for the same:-
Front-end technologies:- HTML/CSS, ReactJS
Back-end technologies:- Java, SpringBoot
Database:- MySQL

# Server
1. Create a new database in MySQL with resultmangement
2. Update the application.properties file with the username and password of your MySQL database.
3. Start the server by starting the spring-boot application.
4. Create a jar using the "mvn clean install" command. The jar file will be created in the target folder.
5. Start the API server by running the "java -jar StudentResultMangementSystem-0.0.1.jar" command.

# Client
1. Run the "npm i" command from the root directory to install all the required packages.
2. In the .env file, replace the value of the "REACT_APP_SERVER_URL" with the server URL.
3. Run the "npm start" command to start the application.

Note:-
If you are facing any error connecting the client and server(CORS error), 
go to StudentResultManagementSystemApplication class which can be found in com.shyftlabs.io package inside the server directory, and set the URL (react app URL) in the allowedOrigins method.
