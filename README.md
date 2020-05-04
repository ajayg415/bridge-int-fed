# Bridge International Academie

##### Summary
1. Application Details
2. How to setup the application
3. Application Design (Code arch)
4. Assumpations
5. Details of external libraries / plugin used
5. What can be done more

###### 1. Application Details 
This application will be very useful for technicians to check which academy are in a urgent requirement to replace battery in tablets. On home screen you can one card for each academy, each card conatin 3 deatils. Tablets which is using more than 30% of battery per day ware in a need of urgent replacement and wll be shown in **Need Replacement Immediately (redZone)**, tablets consuming between 15% to 30% a day will be shown in **Need Replacement (orangeZone)** and tablets which consuming less than 15% per day of battery are in **Safe Devices (greenZone)**.

###### 2. How to Setup the application in your local
- Clone the repo using ```git clone -b system-test git@github.com:ajayg415/bridge-int-fed.git``` in your command prompt
- Go inside the folder ```cd bridge-int-fed```
- Install npm modules using ```npm install```
- if you want to chekc the test cases type ```npm start test```
- if you want to run the application type ```npm start```. Application will open in your default we browser

###### 3. Application Design (Code arch)
- Application will filter the batteryJson to get the list based on academyId. Below is the final objject we generate using utility function ```src/components/utils/utils.js```. 
```{"academyId":30015,"redZone":5,"orangeZone":3,"greenZone":3,"academyName":"Academy 4"}```
- ```utils.js``` will have Below 5 main methods
    - ***filterAcadamies*** : This is the main function which will receive batteryJson object and call inner functions to filter it.
    - ***getSerailNumData***: This will return an object with battery serial number as its key and all objects with same serial number as its values
    - ***getBatteryDetails***: This method will remove all unneccesary battery informationa nd return only timestamp, battery percentage and timestamp in milliseconds.
    - ***insertCurrObjInSortedOrder***: This method will take array and object as arguments. While inserting the object it will check the proper position in the array and insert it. This will help us to avoid sorting the array at later.
    - ***getAcademyArray***: This method will return the final output which is shown above to generate the cards on main screen. 
    - ***sortByBatteryUsage***: This is final sorting logic, it will sort the device in redZone, orangeZone and greenZone order.

###### 4. Assumpations
- I see the objects are already in sorted order, but for worst case I inserted the objects in sorted way while creating.

###### 5. Details of external libraries / plugin used
- I have used react-create-app bolier plate to generate the application.
- Used enzyme for test cases.
- Added bootstrap for styling.
 
###### 5. What can be done more
- We can add ```react-intl``` module, so it will be help us to Internationalize out application
- I added little bit of accessability features like with keyboard tab button, user can change the focus. But, we can fully incorporate accessability features.
- We can add a modal window and show it when user click son and particular tile. This modal window contain all device details like redZone devices, orangeZone devices and greenZone devices.