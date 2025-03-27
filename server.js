const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
let posts = [];
app.get("/", (req, res) => {
    res.render("index", { posts });
});
app.post("/add", (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        posts.push({ title, content, date: new Date().toLocaleString() });
    }
    res.redirect("/");
});
// Handle comment form submission
document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload on form submit

    // Get values from the form fields
    const name = document.getElementById('comment-name').value;
    const message = document.getElementById('comment-message').value;

    // Create a new comment element
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    
    // Add the comment content
    commentDiv.innerHTML = `
        <p class="author">${name} says:</p>
        <p>${message}</p>
    `;

    // Append the comment to the comments list
    document.getElementById('comments-list').appendChild(commentDiv);

    // Clear the form inputs
    document.getElementById('comment-name').value = '';
    document.getElementById('comment-message').value = '';
});

app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT} `);
});
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname,"public/js")));
