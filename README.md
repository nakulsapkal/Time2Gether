Project Title: Time2Gether
==============================================================================================
Project Description:
A social app to find people nearby/same city for activities to do together. Local business owners can post promos for group users from the app.
Example Route: User Login -> Creates a post for activity -> list up the detials for the post (eg: hikes, social meeet ups) --> locations info google api --> categories sorting similar intrest people depending upon similar intrests
==============================================================================================
Target Audience : App usefull all age group for connecting socially
==============================================================================================
Team Members: Cecilia, Nakul, Andrew
==============================================================================================
Features:
Activities/Events Around: Something like event creation onfacebook or just dropping a post in sort of forum  -- Core
Friend List: User can send and accept friends  -- Stretch
Live chat(dynamic tool): between all user -- Stretch
Promotions : all promotions for the location -- Core 
Authentication - User Login/Signup  --> Business Owners Login/Signup (Actual owner need to register with some license) -- Core
Admin Control & Permission: different permissions to each user (Business) -- Core 
CURD operations(to modify or delete each record and add new ones.) -- Core
Payments: if user takes a subscription -- Stretch
API Integrations: --
==============================================================================================
Stack Choices: 
Back-End: 
    1. Express - Node Application Framework
    2. Axios - Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser 
    Webpack - Module Bundler (**)
    3. Cors - (**)
    4. Morgan -
Front - End: 
    1. CSS Frame Works: BootStrap, Foundation, Bulma
    2. React - View Library
    3. Redux - State Manager / Context Hook
    4. Passport - Authentication Framework(used by Facebook, google etc..) -- For Stretch Part (**)
    5. FontAwesome - Icons
Data Base:
    1. PostgreSql - Relational Database
    2. React Notifications Component - Notification System stretch(**)
Extra Dependencies:
    1. ESLint - Code Linter
    2. Prettier


User cases
1. Feature: Authentication - Login/signup/auth (two forms one for registration, login, no passwords)
    1, Users can register an account using email and password(*). 
    2, Users can log in once sign up is done.
    3, Social media login —— Stretch (registering with your existing account i.e google, facebook etc..) (**)
    Note: 
    Routes:
    1. get  /login -- show the form
    2. post /login -- submiting the form with creds
    3. get  /signup -- getting signup form
    4. post /signup -- submit the form for account creation
=========================================================================
2. CRUD operations(to modify or delete each record and add new ones.) 
    1, Users can browse activities with or without login  -- Core
    2, Users can click an activity to a detail page with or without login  -- Core
    3, Users can create/modify/delete an activity once loged In  -- Core
    4, Users can join/drop an activity once login  -- Core (*)  *** Note: No routes for this as we are just insert or delete the activity from user_activity table.***
    5, Users can save/cancel(Favourite) an activity for later once login -- Stretch (**) *** Note : No routes for this as we are just insert or delete the activity from user_activity table.***
    6, Users can review joined and saved activities by user -- Stretch (**)
    7, Users can update profile -- Stretch (*)
    8, Users can browse others' profile-- Stretch (*)
    9, User can see number of people joined the activity created by userhost -- Stretch (*)
    10, User can see his history of activities  -- Stretch(**)
    work flow: 
    Routes:
    1. get / --> homepage of app which would show all activities .
    2. get /activities/:id --> details for certain activity user selected
    3. get /activities/new  --> gets a form for creating new activity
    4. post /activities  --> creates a new activity
    5. get /activities/:id/edit  --> Display a form for editing an activity
    6. put/patch /activities/:id  --> updates the activity
    7. delete /activities/:id --> delete the activity    
    8. get /users/{id}/activities/created --> get you all the created activities for the user
    9. get /users/{id}/activities/upcoming --> get you all the upcoming activities for the user
    10. get /users/{id}/activities/history --> get you all the history activities for the user Stretch (*)
    11. get /users/{id}/activities/fav --> get you all the fav activities for the user Stretch (*)
    12. get /users/:id --> get details for user profile to edit Stretch (*)
    
=========================================================================
3. App Interaction Features --  
    Activities Filter: - Core (*)
        1, Users can filter activities by date, city, and category with or without login (*)
        2, Users can see nearby activities once allow sharing location or input a postal code -- Stretch (*)
        3, Users can see nearby(instead use current location) activities at a google map —— Stretch (**)
    Friend List & Live chat(dynamic tool): (**)
        1, Users can live chat with another user who is loged in. —— 
        2, Users can send a friend-me-request to another user 
        3, Users can unfriend a friend 
        4, Users can add joined activities to google calendar —— Stretch
        5, Users can make voice or video call with another user —— Stretch 
4. Business Owners Promotion —— Stretch(*)
    1, Owners can apply for identity verification by providing official ownership docs
    2, Admins can verify applications manually and inform owners of the result by email
    3, Owners can CRUD promotion activities once approved by admins
    4, Owners can require upfront payment or deposit




workflow 
1, 