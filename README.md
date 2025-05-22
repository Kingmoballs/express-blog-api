# Blog API (Express.js + MongoDB)

This is a RESTful Blog API built with **Node.js**, **Express.js**, and **MongoDB** via **Mongoose**. It supports full CRUD operations and stores data in a cloud MongoDB database.

---

##  Project Structure

blog-api/
├── controllers/ # Logic handlers (controllers)
│ └── postController.js
│
├── models/ # Mongoose schema definitions
│ └── Post.js
│
├── routes/ # Express route definitions
│ └── posts.js
│
├── .env # Environment variables (Mongo URI)
├── app.js # Main server file
└── package.json



---

##  Features

- Get all blog posts
- Search posts by title using query parameters
- Get a single post by ID
- Create a new post
- Update an existing post
- Delete a post

---

##  Technologies Used

- Node.js
- Express.js
- MongoDB (via MongoDB Atlas)
- Mongoose
- Postman (for testing)
- dotenv (for managing env variables)
- Nodemon (for development)


---

##  Installation

1. Clone the repository:

bash
git clone https://github.com/kingmoballs/blog-api.git
cd blog-api

2. Install dependencies:

npm install

3. Set up your .env file:
Create a .env file in the root with the following:
MONGO_URI=your_mongodb_connection_string


4. Run the app with Nodemon:

npm run dev

---

##  API Endpoints

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/posts`                 | Get all posts         |
| GET    | `/posts?title=yourQuery` | Filter posts by title |
| GET    | `/posts/:id`             | Get post by ID        |
| POST   | `/posts`                 | Create a new post     |
| PUT    | `/posts/:id`             | Update a post by ID   |
| DELETE | `/posts/:id`             | Delete a post by ID   |



---

## Sample Request (POST)

URL: http://localhost:3000/posts
Method: POST
Body (JSON):
{
  "title": "My First Blog Post",
  "content": "This is the content of my first post."
}

---

## Notes

The project now uses MongoDB Atlas for data persistence.

You must add a valid MONGO_URI in your .env file to run the server.

File-based storage (posts.json) has been removed in favor of a real database.

---

## Future Improvements

Implement authentication and authorization

Add user accounts and relationships

Include timestamps and categories

Add pagination and sorting

Deploy to Render / Railway / Vercel


---

##   Author
Mobolaji_Samuel – https://github.com/Kingmoballs

---

##  License
This project is open-source and available under the MIT License.

