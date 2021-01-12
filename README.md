<h1 align="center">
  <br>
  Vidly Backend API Specifications
  <br>
</h1>

<h4 align="center">Backend API for a movie rental service built on top of <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>.</h4>

 <p align="center">
 <a href="#deployed-version">Demo</a> •
  <a href="#api-usage">API Usage</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#installation">Installation</a> •
  <a href="#build-with">Build With</a> •
  <a href="#npm-packages">NPM Packages</a> •
  <a href="#demonstration">Demonstration</a> •
  <a href="#future-updates">Future Updates</a> • 
  <a href="#known-bugs">Known Bugs</a> • 
</p>

## Deployed Version
Live demo (Feel free to visit) 👉 : https://vidly-rental-api.herokuapp.com

## API Usage

Check [Vidly API Documentation](https://documenter.getpostman.com/view/11050349/TVzRGxzR) for more info.

## Deployment
The website is deployed with git into heroku. Below are the steps taken:
```
git init
git add -A
git commit -m "Commit message"
heroku login
heroku create
heroku config:set CONFIG_KEY=CONFIG_VALUE
git push heroku master
heroku open
```

## Installation
You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the dependencies by running
```
$ npm i
$ npm start
```
## Build With

* [Node.js](https://nodejs.org/en) - JS runtime environment
* [VSCode](https://code.visualstudio.com) - Free source-code editor made by Microsoft
* [Express](http://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
* [Postman](https://www.getpostman.com/) - API testing
* [Git](https://git-scm.com) - Open source distributed version control system
* [MailTrap](https://mailtrap.io) - Email delivery platform
* [Cloudinary](https://cloudinary.com/) - an end-to-end image and video management solution
* [Heroku](https://www.heroku.com/) - Cloud platform


## NPM Packages

- [dotenv](https://github.com/motdotla/dotenv#readme)
- [morgan](https://github.com/expressjs/morgan)
- [multer](https://github.com/expressjs/multer)
- [eslint](https://github.com/eslint/eslint)
- [eslint-config-airbnb](https://github.com/airbnb/javascript)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-import](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)
- [eslint-plugin-prettier](https://github.com/mysticatea/eslint-plugin-node)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [ndb](https://github.com/GoogleChromeLabs/ndb)
- [prettier](https://github.com/prettier/prettier)
- [nodemon](https://github.com/remy/nodemon)
- [chalk](https://github.com/chalk/chalk)
- [slugify](https://github.com/simov/slugify)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [nodemailer](https://nodemailer.com/about)
- [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize#readme)
- [xss-clean](https://github.com/jsonmaur/xss-clean)
- [helmet](https://github.com/helmetjs/helmet)
- [hpp](https://github.com/analog-nico/hpp)
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- [cors](https://github.com/expressjs/cors)
- [validator](https://www.npmjs.com/package/validator)
- [compression](https://www.npmjs.com/package/compression)
- [argon2](https://www.npmjs.com/package/argon2)
- [cloudinary](https://www.npmjs.com/package/cloudinary)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [moment](https://www.npmjs.com/package/moment)
- [sharp](https://www.npmjs.com/package/sharp)
- [streamifier](https://www.npmjs.com/package/streamifier)
- [winston](https://www.npmjs.com/package/winston)

## Demonstration
### 1) Genres
- Get All Genres
  * This route will return all the genres in the database.
  * Anyone can access this route.
- Get Movie
  * This route will return a specific genre's data by providing it's ID.
  * Anyone can access this route.
- Create New Movie
  * This route will allow the user to create new genre by providing name.
  * Only Logged in user can access this route.
- Update Movie
  * This route will allow the user to update a specific genre by providing it's ID.
  * Only Logged in user can access this route.
- Delete Move
  * This route will allow the user to delete a specific genre by providing it's ID.
  * Only Logged in user can access this route.
  
### 2) Customers
- Get All Customers
  * This route will return all the customers in the database.
  * Anyone can access this route.
- Get Movie
  * This route will return a specific customers's data by providing it's ID.
  * Anyone can access this route.
- Create New Movie
  * This route will allow the user to create new customer by providing name, phone and isGold(BOOLEAN true/false) Fields.
  * Only Logged in user can access this route.
- Update Movie
  * This route will allow the user to update a specific customer by providing it's ID.
  * Only Logged in user can access this route.
- Delete Move
  * This route will allow the user to delete a specific customer by providing it's ID.
  * Only Logged in user can access this route.

### 3) Movies
- Get All Movies
  * This route will return all the movies in the database.
  * Anyone can access this route.
- Get Movie
  * This route will return a specific movie's data by providing it's ID.
  * Anyone can access this route.
- Create New Movie
  * This route will allow the user to create new movie by providing it's title, genere ID, year, dailyRentalRate and numberInStock fields (optional fields: directors list / writers list / cast list).
  * Only Logged in user can access this route.
- Update Movie
  * This route will allow the user to update a specific movie by providing it's ID.
  * Only Logged in user can access this route.
- Delete Move
  * This route will allow the user to delete a specific movie by providing it's ID.
  * Only Logged in user can access this route.
  
### 4) Rental
- Get All Rentals
  * This route will return all the rentals in the database.
  * Anyone can access this route.
- Get Rental
  * This route will return a specific rental's data by providing the it's ID.
  * Anyone can access this route.
- Create New Rental
  * This route will allow the user to create new rental by providing the Movie's ID and the Customer's ID.
  * Only Logged in user can access this route.
- Update Rental
  * This route will allow the user to update a specific rental by providing it's ID.
  * Only Logged in user can access this route.
- Delete Rental
  * This route will allow the user to delete a specific rental by providing it's ID.
  * Only Logged in user can access this route.
- Return Rental 
  * Returning a Rental and create a new document in the return collection in the database and update the rental document.
  * Only Logged in user can access this route.
 
### 5) Users & Authentication
- User Login
  * User can login by sending his correct email and password.
  * Plain text password will compare with stored hashed password.
  * JWT and cookie should expire in 30 days.
  * Anyone can access SignIn route.
  * Once logged in, a token will be sent along with a cookie (token = xxx).
- User registration
  * Register as a "user" or "admin"
  * The user should enter the main data which is (name/email/role/password/passwordConfirm).
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Password is going to be hashed and saved into the database.
  * A message sent to the user's own email with the activation token of his email.
- User logout
  * Cookie will be sent to set token = none.
  * Only Logged in user can access this route.
- Fogot Password
  * When the user forget his password he can enter this route.
  * User should send his email.
  * The route will send an message to the user's email contains the reset password link (token).
  * Anyone can access this route.
- Reset Password
  * User can request to reset password.
  * A hashed token will be emailed to the users registered email address.
  * A put request can be made to the generated url to reset password.
  * The token will expire after 10 minutes.
  * Only Valid Tokens will allow the user to reset his password.
- Get current user data
  * Route to get the currently logged in user (via token).
  * Only Logged in user can access this route.
- Update Current User Data
  * This route allow the user to update his email and name only.
  * Only Logged in user can access this route.
- Delete Current User Data
  * This route allow the user to remove himself from the database, so he cannot login again.
  * Only Logged in user can access this route.
- Update user info
  * Separate route to update password.
  * Only Logged in user can access this route.
- Upload Current User Photo.
  * This route allow the user to upload his own avatar to the cloud and the database.
  * Only Logged in user can access this route.
- Delete Current User Photo.
  * This route allow the user to delete his own avatar from the cloud and the database.
  * Only Logged in user can access this route.
- Get User Avatar
  * This route will allow you to get user's avatar by providing user's ID.
- Confirm Email.
  * This route allow the user to active and confirm his Email.
  * Only user who have the confirmation token can active his email.
- User CRUD
  * Admin only can access these routes.

## Future Updates

* Create Front-End design for the api
* Improve authentication and authorization
* And More ! There's always room for improvement!

## Known Bugs
Feel free to email me at mle.mahmoud.yasser@gmail.com if you run into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂
