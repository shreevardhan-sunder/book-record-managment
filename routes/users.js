const express = require("express");
const { users } = require("../data/users.json");
const router = express.Router();
/*
route:/users
method:GET
description: get all users
access:public
parameters:none

*/
router.get("/",(req,res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        res.status(404).json({
            success: false,
            messgae: "user not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: user
    });
});
/*
route:/users
method:POST
description: create new users
access:public
parameters:id

*/
router.post("/", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "user already exist"
        });
            
    }
    users.push({
            id,
            name,
            surname,
            email,
            subscriptionType,
            subscriptionDate
            });
        return res.status(201).json({
            success: true,
            data: users,
        });
    
});
/*
route:/users
method:PUT
description: updating a user data
access:public
parameters:id

*/
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);
    if (!user) {
        res.status(404).json({
            success: false,
            messgae: "user not found"
        });
    }

    const Updateduser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            
            }
        }
        return each;
    });
    return res.status(200).json({
        succes: true,
        data: Updateduser,
    });
});
/*
route:/users
method:DELETE
description: updating a user data
access:public
parameters:id

*/
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        res.status(404).json({
            succes: false,
            message: "user to delete not found",
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.status(200).json({
        succes: true,
        data: users
    });
});
// deafult export
module.exports = router;