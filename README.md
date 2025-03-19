
--------Application Flow--------



Redirect the user to Spotify’s login page.
Get an authorization code after user login.
Exchange the code for an access token (done in backend).
Store the Tracks in mongodb by fetching advices for each track securely.
Get all the tracks when user requested.




//Steps to run the application
Clone the code from Git

----Build container in docker----
docker build -t chillout:v1 . 

-------Run the Docker Image-------


docker run -p 5000:5000 --env-file .env chillout
