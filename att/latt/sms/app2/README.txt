******************************************************************************************
* Licensed by AT&T under 'Software Development Kit Tools Agreement.' 2012
* TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION: http://developer.att.com/sdk_agreement/
* Copyright 2012 AT&T Intellectual Property. All rights reserved. http://developer.att.com
* For more information contact developer.support@att.com<mailto:developer.support@att.com>
******************************************************************************************
  AT&T API Platform Samples - SMS app2
 -----------------------------

This file describes how to set-up, configure and run the PHP Applications using AT&T API Platform services.
It covers all steps required to register the application on DevConnect and, based on the generated API keys and secrets, 
create and run one's own full-fledged sample applications.

  1. Configuration
  2. Installation
  3. Parameters


1. Configuration

  Configuration consists of a few steps necessary to get an application registered on DevConnect with the proper services and 
  endpoints, depending on the type of client-side application (autonomous/non-autonomous). 

  To register an application, go to https://devconnect-api.att.com/ and login with your valid username and password.
  Next, choose "My Apps" from the bar at the top of the page and click the "Setup a New Application" button. 

  Fill in the form, in particular all fields marked as "required". 

  Be careful while filling in the "OAuth Redirect URL" field. It should contain the URL that the oAuth provider will redirect
  users to when he/she successfully authenticates and authorizes your application.

  Having your application registered, you will get back an important pair of data: an API key and Secret key. They are 
  necessary to get your applications working with the AT&T API Platform. See 'Adjusting parameters' below to learn how to use 
  these keys.

  Initially your newly registered application is restricted to the "Sandbox" environment only. To move it to production,
  you may promote it by clicking the "Promote to production" button. Notice that you will get a different API key and secret,
  so these values in your application should be adjusted accordingly.

  Depending on the kind of authentication used, an application may be based on either the Autonomous Client or the Web-Server 
  Client OAuth flow (see https://devconnect-api.att.com/docs/oauth20/autonomous-client-application-oauth-flow or
  https://devconnect-api.att.com/docs/oauth20/web-server-client-application-oauth-flow respectively).


2. Installation

   Requirements:
     Apache web server
     PHP 5.2+
     Apache and PHP configured, on most Linux systems if installed using packages this will be done automatically.

   Installation:
     Copy the sample application folder to Apache web root folder, for example /var/www/html.
 

3. Parameters

   Each application contains a config.php file. It holds the following configurable parameters and defaults 
   
    $api_key                                : Client API key
    $secret_key                             : Client secret key
    $short_code                             : Short code 
    $FQDN = "https://api.att.com";          : Endpoint 
    $oauth_file = "/tmp/sms2oauthtoken.php"; : Oauth Token persistance location,should be writable by apache server  
    $scope = "SMS";                         : Oauth scope ( SMS ) 



