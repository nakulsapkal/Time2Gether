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




Here’s how to break it down:point_down: 1min 
1, Introductions: name & background! (45-60 sec total for the whole group, so 15-20 sec/person)


[ Now, let's spend some time together! ]

2, Inspiration for the project (the User Story/pitch) (30-45 sec)
TIMED: 30 sec
For past 2 years, I have too much personal life but too little social life. With the stay at home order lifted, I’m eager to go out, meet ppl, and have fun. The question is who I can join with and what things to do. To answer that, we have camp up with our app, Time2Gether, which allows you create and join activities happening around you.

3, Walk-through of the main features including tech stack and challenges (120-150 sec)
a) http://localhost:8002/
   This is the landing page available for all users. Once you find anything you would like to join, registeration and login would be required.
b) http://localhost:8002/login (clikc Login)
   We have an account ready. If logins as Mario, the localstorage will store the infomation and then you will see 3 new features: Join, Favourite, and Chat.
c) http://localhost:8002/activities/details
   The chat button gives the possibility to ask the host any question you may have. The socket.io helps with communication and a postgres database saves all the history records as you can see.
   If you are not intested in any of them, don’t worries, just create a new one!
d) http://localhost:8002/activities/create
   If you have a specific interest, for example, game, you can search here.
   If nothing interets you, just create a new one!
e) put  
   Yoga class partner at North York/Markham. 2 ppl 50% off for fist 3 sessions!
   20210814 02pm 04pm
   https://thumbs.dreamstime.com/b/contemporary-interior-yoga-classroom-blank-banner-wall-mats-healthy-lifestyle-concept-mock-up-d-rendering-189474461.jpg
   1865 Leslie St #203A, North York, ON M3B 2M3

Nakul*************************************************
e) http://localhost:8002/user/activities
   After creation, you can manage all your activties.
   The created will give you the ones you created.
   The upcoming will give you the ones you joined.
   The fav will give you your fav list.
   (then show cancel & unfav & edit & delete)

Andraw*************************************************
f) http://localhost:8002/users/promotions
As cecilia mentioned, a group discount will be a big reason why you need more ppl to join. So, another part of our
You can find it here.
g) http://localhost:8002/promotions/details
The time, details, and promo code can be found here.
h) http://localhost:8002/login
Other part of the idea is to offer promotion
adam.goyette@yost.com
1111

4, How you worked as a team (30 sec)
TIMED: 30 sec
We are a small but cohesive team. At the planning phase, we brainstorm and make all decisions together. After the plan has been finalized, we divide the tasks based on our user cases and teammates’ interests. During implementation, we pair coding whenever another person needs support.
To be more specific, we have scrum meeting twice a day to walk through daily tasks and issues. Nakul is our scrum master.

5, Further developments (in the future, we’d like to add this feature, etc.)(30-60 sec)
In the future, we would very much to improve current chatting display by differentiating each person. After that, we want to add a friend-list and real-time voice & video chat features. For the front end, a responsive hamberg sidebar can be implemented for better user experience.


[3MIN]

1, C -> N: Hey Nakul, what's your plan for this weekend?

2, N -> C: No idea. But I don't want to stay home alone.

3, C -> N: Oh, I found a wonderful app you can use

(open web page)
4, C -> N: Does any thing interest you?

5, N -> C: I'd like to check the ball game.

(click ball game)
7, C -> N: how do you like this one? what I can do with it?

(introduce JOIN, FAV, MAP, CHAT)
7, C -> N: how do you like this one?

8, N -> C: Look good but not sure. Can I ask the creator a question? 

9, C -> N: Sure, let's have a chat. What's your question?

QUESTION: Hi, Can I get some info about cost?

(CHAT: send a msg -> open another browser "luigi" to show the msg sent by Mario)

10, C -> N: See, the host has received your msg! Do you feel like to join now?

11, N -> C: yea, why not.

(JOIN: click join -> show myActivites / Upcoming)

12, N -> C: You know what, I have a better idea. Instead of join others, I want to create my own activity for hiking.

(Unjoin: back to detail page)
(bring a filled "activity create" page)

13, C -> N: How about this?

14, N -> C: Look great. Let's do it!

(click create -> home page -> myActivities)

15, C -> N: Now you can manage your activity from here. And I will join you. See you this weekend.

(log out)

*********************************************************

(Now, Nakul is happy. It's time to bring some business to our app.)

A: I just start my own business. Do you have any service for business users?

C: Yes, you can put your ads on our App for free.
A: Sounds good. How can I do that?
C: It's simple. Once signup, log in as a biz user. You can create your own promotions here. 
A: 
All users can see it.
