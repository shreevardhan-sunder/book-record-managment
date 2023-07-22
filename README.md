# book-record-managment

this is an application called book record managment/api

## Endpoints

## /users
POST: Create a new user
GET : Get all list of users

## /users/{id}
GET: get a user by their ID
PUT : update a user by ID
DELETE: delete a user by their ID(check if there is fine to collect on issued books)

## /users/subscription-details/{id}
GET: get user subscription details
1. date of subscription 
2. valid till ??
3. fine if any ??

## /books
GET: get all the books
POST: add a new book

## /books/{id}
GET: get a book by the ID
POST: update a book by id


## /books/issued
GET: get all issued books here

## /books/issued/withfine
GET:get all issued books with fine

## /subscription types
basic (3 months)
standard (6 months)
premium (12 months)

if user has an issued book is to be returned at 09-12-22 
if the user missed the date of return ,then user gets a fine of rs.50/-
if the user missed the date to return,and the users subscription also got expired,the user need to pay 150/-

