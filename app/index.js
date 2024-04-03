const express = require("express");
const logger = require("morgan");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestId = require('express-request-id')();
const compression = require('compression');


const hostname = "0.0.0.0";
const port = 3000;

const app = express();
app.disable("x-powered-by");


/*********************************************************************/
/*  Third-party compression Middleware - Executed for every request  */
/*  It does NOT affect or change the request                         */
/*  It DOES change the response to the client, adding compression    */
/*********************************************************************/
app.use(compression());


/*********************************************************************/
/*  Third-party cors Middleware - Executed for every request         */
/*  It does NOT affect or change the request                         */
/*  It DOES change the response to the client, adding some headers   */
/*********************************************************************/
app.use(
  cors({
    origin: ['http://localhost', 'http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  })
);


/*************************************************************/
/*  Custom Logging Middleware - Executed for every request   */
/*  It does NOT affect or change the request                 */
/*  It does NOT affect or change the response to the client  */
/*  It uses next();                                          */
/*************************************************************/
app.use((req, res, next) => {
  console.log("Access request for " + req.method + " at " + req.url);
  next();
});


/***************************************************************************/
/*  Third-party request-id Middleware - Executed for every request         */
/*  It DOES change the request, adding req.id                              */
/*  It DOES change the response to the client, adding X-Request-Id header  */
/***************************************************************************/
app.use(requestId);


/*****************************************************************/
/*  Third-party Logging Middleware - Executed for every request  */
/*  It does NOT affect or change the request                     */
/*  It does NOT affect or change the response to the client      */
/*****************************************************************/
app.use(logger("short"));


/**********************************************************************/
/*  Third-party body-parser Middlewares - Executed for every request  */
/*  It DOES change the request, adding the req.body field             */
/*  It does NOT affect or change the response to the client           */
/**********************************************************************/
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


/*********************************************************************************/
/*  Authentication Middleware - Executed for every request                       */
/*  It does NOT affect or change the request                                     */
/*  It does NOT affect or change the response to the client                      */
/*  It uses next() conditionally: Raise an error or execute the next middleware  */
/*********************************************************************************/
app.use((req, res, next) => {
  if (!req.headers['api-key']) {
    next({ message: 'Unauthorized', statusCode: 401, level: 'warn', });
  }

  next();
});


/******************************************************************************************/
/*  Express static Middleware - Executed for every existing resource in public directory  */
/*  To send static files like images, CSS, or HTML, which exists in the public directory  */
/*  It does NOT affect or change the request                                              */
/*  It COULD affect or change the response to the client, when the resource exists        */
/*  When matches, it would be the las executed middleware. When dont, next()              */
/******************************************************************************************/
app.use(express.static(path.join(__dirname, 'public')));


/*******************************************************************************************/
/*  EJS Views engine Middleware - Executed for every existing resource in views directory  */
/*  It does NOT affect or change the request                                               */
/*  It COULD affect or change the response to the client, when the resource exists         */
/*  When matches, it would be the las executed middleware. When dont, next()               */
/*******************************************************************************************/
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");


/* Render /about from view about.ejs in the views folder */
app.get("/about", (req, res) => {
  res.render("about", { message: "About me, using EJS view template engine !" });
});


/************************************************************/
/*  Route based Middleware - Executed only for GET at /     */
/*  It does NOT affect or change the request                */
/*  It does affect the response to the client               */
/*  When applies, it would be the last executed middleware  */
/************************************************************/
app.get('/', (req, res) => {
  res.send("¡Hola Mundo con Express!");
});


/************************************************************************************/
/*  Route based Middleware, with params - Executed only for GET at /hello/anything  */
/*  It does NOT affect or change the request                                        */
/*  It does affect the response to the client                                       */
/*  When applies, it would be the last executed middleware                          */
/************************************************************************************/
app.get("/hi/:who", (req, res) => {
  res.end("Hi, " + req.params.who + ".");
});


/**********************************************************************/
/*  Default Route Middleware - Executed for any othe request          */
/*  It does NOT affect or change the request                          */
/*  It does affect the response to the client                         */
/*  When applies, it calls the default error middleware using next()  */
/**********************************************************************/
app.use((req, res, next) => {
  next({ message: 'Error. Route not found', statusCode: 404, level: 'warn', });
});


/***********************************************************************/
/*  Default Error Middleware - Executed only when an error was raised  */
/*  It does NOT affect or change the request                           */
/*  It does affect the response to the client                          */
/*  When applies, it would be the last executed middleware             */
/***********************************************************************/
app.use((err, req, res, next) => {
  const { message, level = 'error', statusCode = 500, } = err;

  res.status(statusCode);
  res.json({ error: true, statusCode, message, });
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});