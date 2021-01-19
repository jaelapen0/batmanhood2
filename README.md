# README

# Overview
Batmanhood is a full stack web app that imitates the qualities and features of Robinhood. The purpose of Batmanhiid is to showcase the same functionalities of Robinhood such as simulating trades or managing portfolios, while using APIs to dynamically fetch real time data and Recharts to graph it out. The money used in this application is imaginery, and we are not regulated by financial institutions :) 


# Site

* https://batmanhood-aa.herokuapp.com/
 ![alt text](https://github.com/jaelapen0/batmanhood2/blob/main/app/assets/images/batmanhood480.gif?raw=true)

# Under the Hood
* This full stack application was built on the Ruby on Rails framework, utilizing PSQL as the database, ruby for backend and React/HTML/CsSS for 

# Frontend
* React-Redux
* HTML
* CSS

# Backend
* PSQL
* Ruby

# External Libraries / APIs
* Recharts (for graphing out data)
* NewsApi (News API for stock specific news)
* Financial Model Prep API (company profile data)
* IEXCloud API (real time data)
* GNews API 

# Challenges

* One of the challenges was figuring out how to reduce the amount of API requests, especially on the home page (while logged in), for every stock in the users portfolio/watchlist.  For stocks in the watchlist, I checked to see if the same stock was in the portfolio list as well, then reuse the data if possible. If not then make a fresh API request.



# Upcoming
* Adding historical information for Weekly, Monthly, Yearly
