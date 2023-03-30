# LitQuest
SENG401: Team Final Project
March 2023

## Group 29

LitQuest is a user based web application that allows users to write and view recommendations on books. It will act as a hub for readers to share their thoughts on books and will be the first place readers go before starting a new book. Users will be able to create their own profile, view all their reviews in a consolidated page, and add books to a personal library for easy tracking. Instead of having to search the web for sparse reviews, LitQuest will consolidate everyone's reviews on one page and display an overall rating for each book making LitQuest a user-friendly application for all users. Additionally, LitQuest will act as a personal reading guide, recommending books based on similar authors for users to enjoy. LitQuest will give book enthusiasts and new readers a platform to review and rate books.

## To Run

# Deployment
We intially planned to deploy using GitHub pages but due to time constraints, the deployment was not able to build in time. However, the gf-pages branch exists if we desire to deploy in the future.

# Backend
Import the SQL database from the DatabaseDump folder into mySQL.
Download LitQuestAPI folder and navigate to LitQuestAPI/appsettings.json. In this file change the DevConnection string pwd to your personal sql password to run the backend.
Run the backend in Visual Studio 2022. If an error occurs, run again and it will work as all the build files need to be recreated for your machine.

# Frontend
Open the view folder in visual studio and create a new terminal. Type in the command, npm install and wait for installation to complete. Then run, npm start and the website should open.

## Technologies
- React
- ASP.net Core
- mySQL
- Visual Studio 2022
- Visual Studio Code

## Testing
All selenium and postman testing was done in google Chrome.
