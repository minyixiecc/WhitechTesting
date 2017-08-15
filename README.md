README


1 Completed tasks

  a) Graphql powered Node.js api (./WhitechProject/WhitechApi)

  b) Dockerized Api container and database container, including

      Dockerfile (under both ./WhitechApi and ./WhitechDB)
      docker-compose.yml (build)

  c) Unit testing (./WhitechProject/WhitechApi/test, run "mocha" for testing)

2 Incomplted tasks
  
  a) "yarn" 

  b) "yarn docker-test"

  c) "docker-compose up" (issue: api container cannot access database container; docker hub images: "minyixie/whitechproject_db:firstPush", "minyixie/whitechproject_users-service")

3 Testing steps

  a) Create database container by using mySql 5.6. "sleep" is used to keep this container running

  	$docker run --name db -d -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=users -e MYSQL_USER=users_service -e MYSQL_PASSWORD=123 -p 3306:3306 mysql:5.6 sleep 10000

  b) Access database container and setup 

    $docker exec -it db /bin/bash

    #Install text editor
    $apt-get update
    $apt-get install nano

    #Setup bind address for mysql
    $nano /etc/mysql/my.cnf

    #Adding two lines "[mysqld]" and "bind-address=0.0.0.0" to /etc/mysql/my.cnf
    #This bind address allow outbound access

    $service mysql restart

    $mysql -uroot

    #Run following script in sql terminal 
    #"GRANT ALL PRIVILEGES ON *.* TO 'root'@'172.17.0.1' IDENTIFIED BY 'password' WITH GRANT OPTION;"
    #"SET PASSWORD FOR root@'172.17.0.1' = PASSWORD('123');"
    #"FLUSH PRIVILEGES;"

  c) Create API container under ./WhitechProject/WhitechApi

  	$docker build -t api .

  	$docker run -it -p 5000:5000 --link db:db -e DATABASE_HOST=db api

  d) You can access server by http://localhost:5000, and graphql query by http://localhost:5000/graphql?query={getProduct(id:productId){id}}

