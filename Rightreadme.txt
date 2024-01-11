# bosta-task

## To install:
  -  git clone https://github.com/yousefshalby/bosta-task.git
  -  cd bosta-task/
  -  npm install  (node version v18.19.0)
  -  postgress DataBase (PostgreSQL) 14.10
       - DB_name :mydatabase
       - DB_user :myuser
       - DB_password :mypassword
  -  to strat your database: -->  npx prisma generate  ---> to Generate Prisma Client
  -  npx prisma migrate dev  --> to Run Database Migrations
  - to run project ---------> nodemon app.js


###################################################### My database schema diagram ###############################################

Table: Book
+------------------+--------------+----------------+
|      Field       |     Type     |     Extra      |
+------------------+--------------+----------------+
| id               | int          | auto_increment |
| title            | varchar(255) |                |
| author           | varchar(255) |                |
| ISBN             | varchar(255) |                |
| quantity         | int          |                |
| shelfLocation    | varchar(255) |                |
| createdAt        | datetime     | CURRENT_TIMESTAMP |
+------------------+--------------+----------------+

Table: Borrowers
+------------------+--------------+----------------+
|      Field       |     Type     |     Extra      |
+------------------+--------------+----------------+
| id               | int          | auto_increment |
| name             | varchar(255) |                |
| email            | varchar(255) |                |
| createdAt        | datetime     | CURRENT_TIMESTAMP |
+------------------+--------------+----------------+

Table: BorrowingProcess
+------------------+--------------+----------------+
|      Field       |     Type     |     Extra      |
+------------------+--------------+----------------+
| id               | int          | auto_increment |
| borrowDate       | datetime     |                |
| dueDate          | datetime     |                |
| returned         | tinyint(1)   | 0              |
| borrowersId      | int          |                |
+------------------+--------------+----------------+

FK: BorrowingProcess -> Book (one-to-many relationship from BorrowingProcess(one) to Book(many).)
FK: BorrowingProcess -> Borrowers(one-to-many relationship from BorrowingProcess(one) to Borrowers(many).)


########################################################  API Documentation ########################################################

## Notes:
# Before and request make basic authentication with username is'user1' & password is 'password1' otherwise it will be 401 status code 
# All base url is http://localhost:3000/api/v1/{ your endpoint that you are testing }

## Middlewares
# Middleware for basic authentication
# Middleware for Handel 404
# Middleware for Validation entity(object of a model) existence in put & delete methods
# Middleware for validation of the existence of booksIds and borrower id in the borrowing Process before making the process

## Rate-Limiter
# for two endpoints:
    -  /books  -- > create books
    -  /borrowers -- > create borrowers

## Exports all overdue borrows of the last month:
    - endpoint --> /export-overdue-borrows
    - Get  request to this endpoint and it will download the file name ---  overdue_borrows.json --- in the controller folder

## Exports all borrowing processes of the last month:
    - endpoint --> /export-borrowing-processes
    - Get  request to this endpoint and it will download the file name --- borrowing_processes.json --- in the controller folder

#################
 
tags:
  name: Books
  description: API endpoints for managing books
 
##################

  path:
    /api/books:
      post:
        summary: Create a new book
        description: Create a new book with the provided details
        tags: [Books]
        parameters:
          - in: body
            name: book
            description: Book object that needs to be created
            required: true
            schema:
              $ref: '#/definitions/Book'
        responses:
          '201':
            description: Successfully created a new book
          '400':
            description: Bad request, invalid input data
          '500':
            description: Internal server error



  path:
    /api/books:
      get:
        summary: Get all books or some of them if there is search param
        description: Retrieve a list of all books or you could search by adding to the endpoint ?title= or ?author= or ?isbn= 
        tags: [Books]
        responses:
          '200':
            description: A successful response with the list of books
          '500':
            description: Internal server error


  path:
    /api/books/{id}:            
      put:
        summary: Update a book by ID
        description: Update the details of a book with the specified ID
        tags: [Books]
        parameters:
          - in: path
            name: id
            description: ID of the book to be updated
            required: true
            type: integer
          - in: body
            name: book
            description: Updated book object
            required: true
            schema:
              $ref: '#/definitions/Book'
        responses:
          '200':
            description: Successfully updated the book
          '400':
            description: Bad request, invalid input data
          '404':
            description: Book not found
          '500':
            description: Internal server error

  path:
    /api/books/{id}:
      delete:
        summary: Delete a book by ID
        description: Delete a book with the specified ID
        tags: [Books]
        parameters:
          - in: path
            name: id
            description: ID of the book to be deleted
            required: true
            type: integer
        responses:
          '204':
            description: Successfully deleted the book
          '404':
            description: Book not found
          '500':
            description: Internal server error



  definitions:
    Book:
      type: object
      properties:
        title:
          type: string
          description: The title of the book
        author:
          type: string
          description: The author of the book
        ISBN:
          type: string
          description: The ISBN of the book
        quantity:
          type: integer
          description: The quantity of the book available
        shelfLocation:
          type: string
          description: The shelf location of the book

#################################################################################################

tags:
    name: Borrowers
    description: API endpoints for managing borrowers

###########


  path:
    /api/borrowers:
      post:
        summary: Create a new borrower
        description: Create a new borrower with the provided details
        tags: [Borrowers]
        parameters:
          - in: body
            name: borrower
            description: Borrower object that needs to be created
            required: true
            schema:
              $ref: '#/definitions/Borrower'
        responses:
          '201':
            description: Successfully created a new borrower
          '400':
            description: Bad request, invalid input data
          '500':
            description: Internal server error

  path:
    /api/borrowers:
      get:
        summary: Get all borrowers
        description: Retrieve a list of all borrowers
        tags: [Borrowers]
        responses:
          '200':
            description: A successful response with the list of borrowers
          '500':
            description: Internal server error


  path:
    /api/borrowers/{id}:
      put:
        summary: Update a borrower by ID
        description: Update the details of a borrower with the specified ID
        tags: [Borrowers]
        parameters:
          - in: path
            name: id
            description: ID of the borrower to be updated
            required: true
            type: integer
          - in: body
            name: borrower
            description: Updated borrower object
            required: true
            schema:
              $ref: '#/definitions/Borrower'
        responses:
          '200':
            description: Successfully updated the borrower
          '400':
            description: Bad request, invalid input data
          '404':
            description: Borrower not found
          '500':
            description: Internal server error
 

  path:
    /api/borrowers/{id}:
      delete:
        summary: Delete a borrower by ID
        description: Delete a borrower with the specified ID
        tags: [Borrowers]
        parameters:
          - in: path
            name: id
            description: ID of the borrower to be deleted
            required: true
            type: integer
        responses:
          '204':
            description: Successfully deleted the borrower
          '404':
            description: Borrower not found
          '500':
            description: Internal server error


  definitions:
    Borrower:
      type: object
      properties:
        name:
          type: string
          description: The name of the borrower
        email:
          type: string
          description: The email of the borrower
 

###################################################################################################
#################
  tags:
    name: Borrowing Processes
    description: API endpoints for managing borrowing processes
################

  path:
    /api/borrow:
      post:
        summary: Create a new borrowing process
        description: Create a new borrowing process with the specified borrower and books
        tags: [Borrowing Processes]
        parameters:
          - in: body
            name: borrowingProcess
            description: Borrowing process object that needs to be created
            required: true
            schema:
              $ref: '#/definitions/BorrowingProcess'
        responses:
          '201':
            description: Successfully created a new borrowing process
          '400':
            description: Bad request, invalid input data
          '500':
            description: Internal server error



  path:
    /api/return/{id}:
      put:
        summary: Return a borrowed book by process ID
        description: Mark a borrowed book as returned with the specified process ID
        tags: [Borrowing Processes]
        parameters:
          - in: path
            name: id
            description: ID of the borrowing process to mark as returned
            required: true
            type: integer
        responses:
          '200':
            description: Successfully marked the book as returned
          '404':
            description: Borrowing process not found
          '500':
            description: Internal server error



  path:
    /api/borrowed/{id}:
      get:
        summary: Get borrowed books by user ID
        description: Retrieve a list of books currently borrowed by the specified user
        tags: [Borrowing Processes]
        parameters:
          - in: path
            name: id
            description: ID of the user to get borrowed books for
            required: true
            type: integer
        responses:
          '200':
            description: A successful response with the list of borrowed books
          '404':
            description: User not found or no borrowed books
          '500':
            description: Internal server error



  path:
    /api/overdue:
      get:
        summary: Get a list of overdue books
        description: Retrieve a list of books that are overdue
        tags: [Borrowing Processes]
        responses:
          '200':
            description: A successful response with the list of overdue books
          '500':
            description: Internal server error
 

  path:
    /api/all-processes:
      get:
        summary: Get all borrowing processes
        description: Retrieve a list of all borrowing processes
        tags: [Borrowing Processes]
        responses:
          '200':
            description: A successful response with the list of all borrowing processes
          '500':
            description: Internal server error
 


  path:
    /api/export-borrowing-processes:
      get:
        summary: Export all borrowing processes
        description: Export all borrowing processes to a file (e.g., CSV, JSON)
        tags: [Borrowing Processes]
        responses:
          '200':
            description: A successful response with the exported data
          '500':
            description: Internal server error



  path:
    /api/export-overdue-borrows:
      get:
        summary: Export overdue borrows
        description: Export overdue borrows to a file (e.g., CSV, JSON)
        tags: [Borrowing Processes]
        responses:
          '200':
            description: A successful response with the exported data
          '500':
            description: Internal server error
 


  definitions:
    BorrowingProcess:
      type: object
      properties:
        books:
          type: array
          items:
            $ref: '#/definitions/Book'
        borrower:
          $ref: '#/definitions/Borrower'
        borrowDate:
          type: string
          format: date-time
          description: The date the borrowing process started
        dueDate:
          type: string
          format: date-time
          description: The due date for returning the books
        returned:
          type: boolean
          description: Indicates whether the books have been returned

 