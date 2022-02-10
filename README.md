#MTSS Single Page Application

Peer to peer strategy review portal
Welcome to the Student Strategies portal!

#Usage
This project was created under the principle of boosting collaboration and continuity among key stakeholders processes when capturing, organizing and synthesizing essential data used to promote the academic, behavioral, and social emotional competence of children and youth.

These student strategies will be peer reviewed by teached to provide feedback on the most efficient strategies in aiding children in the classroom. The portal is designed to be used by teachers, parents, and administrators to review strategies and provide feedback on students’ strategies.

#Notes:


• This app does not require any prior knowledge of the strategies being reviewed
• This app also does not require user authentication.
To do
• Parent portal • Messaging • User Authentication • Multi-User role handling • Adding peer review checks on strategy form fields • Ability to check multiple categories and tiers for each strategy • Strategy search • Feed for most recently submitted strategies

#README
How to run the app
cd into ed-tech-spa

Run the app with the following command in the terminal: rail s



You're server will have then started under http://localhost:3000

open or drag index.html in your browser.



#Installation

In your gemfile, please add:
```
ruby '2.6.8'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.4', '>= 6.1.4.1'
# Use postgres as the database for Active Record
gem 'pg'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

```
System dependencies
```Ruby: 2.5.1
Rails: 5.2.3
PostgreSQL: 9.5
RSpec: 3.5.0
Bulma: 0.7.2```
