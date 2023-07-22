const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();
/*
route:/users
method:GET
description: get all books
access:public
parameters:none

*/
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});
/*
route:/users
method:GET
description: get all book by id
access:public
parameters:id

*/
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "book not found"
            
        });
    }
    return res.status(200).json({
        success: true,
        data: book
    });
    
});
/*
route:/books/issued/by-user
method:GET
description: get all issued book
access:public
parameters:none

*/
router.get("/issued/by-user", (req, res) => {
    const usersWithissuedbook = users.filter((each) => {
        if (each.issuedBook) {
            return each
        }
    });
    const issuedBooks = [];
    usersWithissuedbook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedby = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;
        issuedBooks.push(book);

    });   
    if (issuedBooks.lenght === 0)
    {
        return res.status(404).json({
            succes: false,
            message: "no books r issued"
        });
    }
    return res.status(200).json({
        succes: true,
        data: issuedBooks,
    });
});
/*
route:/users
method:POST
description: add new book
access:public
parameters:

*/
router.post("/", (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "no data was provided"
        });
    }
    const book = books.find((each) => each.id === data.id);
    
    if (book)
    {
        return res.status(404).json({
            succes: false,
            messgae: "book already wxist with same id"
            
        });
        }

    const allBooks = [...books, data];
    return res.status(200).json({
        succes: true,
        data: allBooks,
    });
});

/*
route:/books/:id
method:PUT
description: updating a book
access:public
parameters:id

*/
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(400).json({
            succes: false,
            message: "book not found with id"
        });
    }
    const UpdatedData = books.map((each) => {
        if (each.id === id) {
            return { ...each, ...data };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: UpdatedData
    });

});
router.get("/subscription-details/:id", (req , res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user not found"
        });
    }
    const getDateInDays = (data = "") => {
        let date;
        //current date
        if (data === "") {
            date = new Date();
        }
        //getting date based on varible
        else {
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };
    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        }
        else if (user.subscriptionType === "Standard") {
            date = date + 180;
        }
        else if (user.subscriptionType === "Premuium") {
            date = date + 365;
        }
        return date;
    };
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);
    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysleftforExpiration: subscriptionExpiration <= currentDate
            ? 0
            : subscriptionExpiration - currentDate,
        fine: returnDate < currentDate
            ? subscriptionExpiration <= currentDate
                ? 200
                : 100
            : 0,
    };
    return res.status(200).json({
        success: true,
        data
    });
});
module.exports = router;