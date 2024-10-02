const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { authenticated } = require('./router/auth_users.js');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    const username = req.body.username;
    const password = req.body.password;
    
    // Check for missing username or password
    if (!username || ! password) {
        return res.status(404).json({ message: "Error logging in"});
    }

    // Authenticate the user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged into the service");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check your username and password"})
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
