curl "https://api.att.com/oauth/token" \ 
    --insecure \ 
    --header "Accept: application/x-www-form-urlencoded" \ 
    --header "Content-Type: application/x-www-form-urlencoded" \ 
    --data "client_id=YOUR_APP_KEY&client_secret=YOUR_APP_SECRET&grant_type=client_credentials&scope=SMS" 
    --proxy "https://proxy.if.you.use.one.com:8080" 