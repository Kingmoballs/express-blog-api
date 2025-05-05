# Blog API (Express.js)

This is a simple RESTful Blog API built with **Node.js** and **Express.js**, storing data in a local `posts.json` file. It supports full CRUD operations.

---

##  Project Structure

blog-api/
│
├── controllers/
│ └── postController.js # Handles all logic for CRUD operations
│
├── routes/
│ └── posts.js # Express router for handling post endpoints
│
├── utils/
│ └── fileHelper.js # Handles reading and writing to JSON file
│
├── posts.json # Simulated database (local file)
├── app.js # Entry point of the app
├── package.json
└── README.md # You're here!


---

##  Features

- Get all blog posts
- Search posts by title using query parameters
- Create a new post
- Update an existing post
- Delete a post

---

##  Technologies Used

- Node.js
- Express.js
- File System (`fs`) module
- Postman (for testing)
- Nodemon (for development)

---

##  Installation

1. Clone the repository:

```bash
git clone https://github.com/kingmoballs/blog-api.git
cd blog-api

2. Install dependencies:

npm install

3. Run the app with Nodemon:

npm run dev

---

###  API Endpoints

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/posts`                 | Get all posts         |
| GET    | `/posts?title=yourQuery` | Filter posts by title |
| POST   | `/posts`                 | Create a new post     |
| PUT    | `/posts/:id`             | Update a post by ID   |
| DELETE | `/posts/:id`             | Delete a post by ID   |


---

### Sample Request (POST)

URL: http://localhost:3000/posts
Method: POST
Body (JSON):
{
  "title": "My First Blog Post",
  "content": "This is the content of my first post."
}

---

### Notes

This project stores data in posts.json, acting like a mock database.

No authentication or database integration is implemented yet — ideal for future upgrades.

---

### Future Improvements

Add database support (MongoDB or PostgreSQL)

Implement authentication and authorization

Add user accounts and relationships

Include timestamps and categories

---

###   Author
Mobolaji_Samuel – https://github.com/Kingmoballs

---

###  License
This project is open-source and available under the MIT License.

