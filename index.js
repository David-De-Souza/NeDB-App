const express = require("express");
const Datastore = require("nedb");
const app = express();

app.listen("18000", () => console.log("Listening at 18000"));
app.use(express.static("Public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/api/user-data", (request, response) => {
    console.log("Request recieved");
    const data = request.body;
    database.insert(request.body);
    response.json({
        status: "Success",
        name: data.name,
        mobile: data.mobile,
        email: data.email
    });
    response.end();
});

app.get("/api/user-data", (request, response) => {
    database.find({}, (error, data) => {
        if (error) {
            response.end();
            return;
        }
        response.json(data);
    })
});