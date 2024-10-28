# About telegram bot practise 

## 1. about the process:: 
we are using `ngrok` for the server connecting, I have created a server/ account. 

**Running the code** to run the code we are needing to start the server to receive logging data to us that will come from the telegram bot, using:
```bash
ngrok http http://localhost:8080
```
this information is available when you log into your account once created.
once the ngrok server is satrted, there will be a linking url that is needed to be put into the .env file and we will be putting it under `URL_SERVER`

## 2. setting up the telegram bot::
