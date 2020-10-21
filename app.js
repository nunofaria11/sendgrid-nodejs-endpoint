const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const mailRouter = require('./routes/mail');

const app = express();

dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(" ");

app.use(cors({

    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.length === 0) {
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});
app.use("/mail", mailRouter);

module.exports = app;
