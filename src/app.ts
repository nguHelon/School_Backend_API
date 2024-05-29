import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("hello");
    res.status(200).json("welcome to backend");
})

export default app;