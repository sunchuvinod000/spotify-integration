const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
const connectDB = require('./connection');
const router = require('./Routes');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const allowedOrigins = ['http://localhost:5000', 'https://accounts.spotify.com']; // Add your allowed origins here

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Allow cookies to be sent
};

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;


// Rate limiter
const limiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 2, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after a minute"
});
// Set hbs as the template engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(limiter);
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();


app.use(router)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
