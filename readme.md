# Carnet-smarthome
An alternative solution to the carnet web interface perfect for smarthome displays

## Installing
**Requirements**
* Amazon AWS account
* A carnet-enabled Volkswagen
* Somewhere to host the web interface (eg. XAMPP or external server)
* Your own server for the database (MySQL, XAMPP does not work for this)(optional)

If you don't have your own create a database with amazon aws using [this](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html#CHAP_GettingStarted.Creating.MySQL) tutorial. <br>
Create a table Using the **exact** structure and naming illustrated in table.sql. <br>
Create a new aws Lambda function for the scheduled fetching of data. <br>
Upload `Schedule.py` and the `Modules` directory as a .zip file to the new Lambda function. Don't forget to change the handler to `Schedule.main` and set the timeout to about 2 min. <br>
Enter your Carnet login credentials and database info into the appropriate variables. <br>
Give the function the "Cloudwatch Events" trigger and create a new rule with Schedule expression and an update rate of your choice. I recommend somewhere between 10-20min but you can have up to 1 request every 3 seconds with the free tier. <br>
Go back to the aws console, open API Gateway and create a new API. Give it a name and click "create API".<br>
Click "Actions" and "Create Method" select the "ANY" trigger. <br>
In the setup give it "Lambda Function", "Use Lambda Proxy integration", select your region and function and save. <br>
Second give the Lambda function the "API Gateway" trigger, select the API you just created. Make it "Open". <br>
Now create a second function for fetching the latest database entry. <br>
Upload `FetchDB.py` and the `Modules` directory as a .zip file to the new Lambda function. Don't forget to change the handler to `FetchDB.main` and set the timeout to about 2 min. <br>
Enter your database info into the appropriate variables. <br>
Go back to the aws console, open API Gateway and create a new API. Same as before but with a new name.<br>
Give the Lambda function the "API Gateway" trigger, select the API you just created. Make it "Open". <br>
Install Carnet_http from [here](https://github.com/Strosel/Carnet_http) <br>
To your host, upload the contents of the `Web` directory. <br>
In `Fetch.php` and `Trigger.php` enter the appropriate urls into the variables <br>
Save and you're done!


### Variable key
`Schedule.py`
  db_host - server host url/ RDS endpoint
  db_username - server username
  db_password - server password
  db_name - database name
  tablename - table name, use format \`name\`
  port - connection port
  self.carnet_username - carnet username
  self.carnet_password - carnet password
`FetchDB.py`
  host - server host url/ RDS endpoint
  name - server username
  password - server password
  db_name - database name
  tablename - table name
  index - index of `statustime` (default -1 if you didn't change the order of the fields)
  port - connection port
`Fetch.php`
  fetchDB - API gateway trigger url for the `FetchDB.py` function
`Trigger.php`
  runtask - API gateway trigger url for the [Carnet_http](https://github.com/Strosel/Carnet_http) function
  update - API gateway trigger url for the `Schedule.py` function

## Have an Echo?
Look no further than [here](https://github.com/Strosel/Carnet-alexa) for the Alexa version to complete the smarthome experience.

## Huge Thank you to
@robinostlund: https://github.com/robinostlund/volkswagen-carnet
