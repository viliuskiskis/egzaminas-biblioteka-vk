# Library

System user roles and their authorities:

| ROLES | AUTHORITIES |
| --- | --- |
| ADMIN |  add/edit/remove book category; add/edit/remove a book 
| USER | search for a book, reserve it if it is available, add book to favourites |

#### Technologies used: 
- React 17.0.1,  Boostrap 5.1.3
- Spring Boot 2.6.0, Java 11
- Spring security
- H2 database
- Apache Tomcat 9.0.40 server
- Swagger-UI, Maven
- Selenium 3.141.59
- TestNG 

## Getting Started

- Clone the repository `https://github.com/viliuskiskis/egzaminas-biblioteka-vk`

### Run on Tomcat Server

- go to project folder `cd .../egzaminas-biblioteka-vk/back`
- run the application on Tomcat Server (port 8081):
  
```
 mvn clean install org.codehaus.cargo:cargo-maven2-plugin:1.7.7:run -Dcargo.maven.containerId=tomcat9x -Dcargo.servlet.port=8081 -Dcargo.maven.containerUrl=https://repo1.maven.org/maven2/org/apache/tomcat/tomcat/9.0.40/tomcat-9.0.40.zip
 ```
 - the application will start on your browser http://localhost:8081/darzelis

### Run with Spring boot and npm/yarn

- go to project folder `cd .../egzaminas-biblioteka-vk/back`
- Run `mvn spring-boot:run` (application will start on port 8080)
- go to project folder `cd .../egzaminas-biblioteka-vk/front`
- run `npm install` or `yarn install`
- open file `..\egzaminas-biblioteka-vk\front\src\components\10Services\endpoint.js`
- change `const apiEndpoint= process.env.PUBLIC_URL` to `const apiEndpoint = "http://localhost:8080"`
- run `npm run start` or `yarn start`
- application will open on your browser at http://localhost:3000

### Accessing the database

http://localhost:8080/darzelis/console

```
JDBC URL:jdbc:h2:~/tmp/Bees44.db
User Name:sa
Password:

```

### Accessing API documentation

http://localhost:8081/darzelis/swagger-ui/


## Deployment

To make a war file for deployment:
- run `yarn build` while in the project folder `.../egzaminas-biblioteka-vk/front`
- move all files from folder `.../egzaminas-biblioteka-vk/front/build`
to `.../back/source/main/resources/public`
- run `mvn clean install` while in the project folder `.../egzaminas-biblioteka-vk/back`
- `darzelis.war` file will appear in the `..\egzaminas-biblioteka-vk\back\target` folder


## Authors
This project is forked from: https://github.com/viliuskiskis/Darzeliai_Bees_2022
