## Final Product

!["screenshot of App Main Page"]()
!["screenshot of Activity Details"]()

# Project Title: Time2Gether

Project Description:
A social app to find people nearby/same city for activities to do together. Local business owners can post promos for group users from the app.

# Features:

1. Authentication - Login/signup/auth (Normal Users/ Business Users) (two forms one for registration, login, no passwords)
2. CRUD operations - User can create, modify, edit or delete each activity.
3. Join, Favourite & Search - User can join,favourite and search activities activities.
4. Manage Activity - User can manage all his activities from "My Activities".
5. Activity Details - Chat room for every activity and Google Map for percise address
6. Promotions - User can leverage the promotions and avail discounts for the activity group.
7. Business Owners: Can open a business owner account and create promotions for users of the app and this would help promoting their business

# Project Contributors

Nakul Sapkal, Cecillia Yuan, Andrew Ievdokymenko

# Getting Started

Clone the repo down into a folder.

There are two folders within the root.

Server: The server is a PostgresSQL Database with express nodejs built ontop of it. Its purpose is to handle data, and export a JSON api and chat messages via socket io.

Client: The client folder is a react app built seperately from the server. This is just React.

## Dependencies

- Node.js
- React
- Express
- Axios
- Socket IO
- Google Maps API
- Geocode
- Webpack, Babel

## PSQL- Database

1. Time2Gether

## Setup

Prerequisits
NPM
Node JS & Express Setup
Server:
cd into server folder from root
Install npm: npm install
Start Server: npm start
In your browser: localhost:8001

Client:
cd into /client
npm install
npm start
In your browser: localhost:3002

DataBase:
Create Database Time2Gether
Run schemas files in psql environment

# Demo Link:
