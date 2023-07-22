const express = require("express");

const app = express();

const port = 8081;
//import routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        messgae: "server is running successfully",
       
    });
});
app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
    res.status(500).json({
        message: "the route doesnt exits"
    });
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
