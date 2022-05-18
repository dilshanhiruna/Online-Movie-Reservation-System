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

First you need to install all the dependencies
STEPS:
1. be in the root directory (eg: C:\<location>\Online-Movie-Reservation-System)
2. cd services/server
3. npm i (will install the dependencies of internal web services)
4. npm run dep (will install the dependencies of external web services and client)


To run the client and all the internal and external web services
you can use a single command
STEPS:
1. be in the root directory (eg: C:\<location>\Online-Movie-Reservation-System )
2. cd services/server
3. npm run all

This should run the client and all the internal and external web services

NOTE: please make sure to run the integrated web services using WSO2 EI (workspace: intergration)





For enabaling cors in WSO2 EI for data services
https://docs.wso2.com/display/EI640/Enabling+CORS+for+Data+Services

if cors problem exists, please check the following
run the following command to open Chrom with web security in the "Run"
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security