This project is developed using MERN stack

MongoDB URL is already defined in the .env file

Back end services are divided in to two groups
1. Internal services
    a) User services
    b) Movie services
    c) Theatre services
    d) Reservation services
2. External services
    a) card payment services
    b) mobile payment services
    c) qr code services
    d) sms services
    e) email services

To run the client and all the internal and external web services
you can use a single command
STEPS:
1. be in the root directory (eg: C:\<location>\Online-Movie-Reservation-System )
2. cd services/server
3. npm run all

This should run the client and all the internal and external web services

NOTE: please make sure to run the integrated web services using WSO2 EI (workspace: intergration)
