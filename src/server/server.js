import fetch from 'node-fetch';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
const KEY = process.env.TRELLO_API_KEY;
const TOKEN = process.env.TRELLO_API_TOKEN;

const server = express();

const allowedOrigins = ["http://localhost:1234"];

server.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

server.get("/api", (req, res) => {
    console.log(`key: ${KEY}`);
    res.json({ message: "Hello from server!" });    
});

server.get("/boards", async (req, res) => {

    const url =  `https://api.trello.com/1/members/me/boards?key=${KEY}&token=${TOKEN}`;

    const response  = await fetch(url);
    const json = await response.json();
    res.send(json);

});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});