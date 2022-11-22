const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const sanitizeHtml = require("sanitize-html");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function sanitizeString(str) {
  return sanitizeHtml(str, {
    disallowedTagsMode: "escape",
  });
}

const postedComments = [
  {
    username: "Huzaifa",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nostrum accusantium itaque! Repellat, perspiciatis eligendi. Commodi, possimus tenetur ducimus eligendi explicabo minus nobis natus iure voluptates magnam? Est, iure eaque.",
  },
];

function getHtmlWithComments(comments) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> </title>
</head>
<style>
    *{
        margin: 0;
        box-sizing: border-box;
    }
    .page-container{
        margin-top: 50px;
        color:rgb(12, 12, 75);
        margin-left: 30px;
    }
    .container{
        display: flex;
        flex-direction: column;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    h1{
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-style: italic;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .search{
        height: 40px;
        width: 300px;
        border-radius: 5px;
        padding-left: 20px;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .search-btn{
        color:#ffffff;
        font-weight: bold;
        background-color: blueviolet;
        border: none;
        height: 30px;
        width: 300px;
        border-radius: 5px;
        cursor: pointer;
        transition: transform 0.1s ease-in;
        font-size: 18px;
    }
    .search-btn:hover{
        transform: scale(1.1);
    }
    .comment{
        border: 2px solid red;
        padding: 10px;
        width: 50%;
        margin-top: 20px;
    }
    .search[name="comment"]{
        width: 500px;
        height: 100px;
    }
    .comment-text{
        font-family: sans-serif;
        color: rgb(104, 102, 102);
        margin-top: 10px;
    }
</style>
<body>
    <script>

        var API_KEY = "12312J31H2HASD922131231323#$@@2323";
    </script>
    <div class="page-container">
        <div class="container">
            <h1>
                Comments
            </h1>
            <form action="http://localhost:5000/" method="post">
                <input placeholder="Username" type="text" name="username" class="search" id="username">
                <textarea class="search" rows="5" name="comment" placeholder="Comment..."></textarea>
                <button class="search-btn"  name="search" type="submit">Add Comment</button>
            </form>
                `;

  comments.forEach((comment) => {
    html += comment;
  });
  html += `</div>
    </div>
</body>
</html>`;
  return html;
}

const sendPage = (res) => {
  const comments = postedComments.map((comment) => {
    if (comment.comment || comment.username) {
      return `<div class="comment">
        <h3 style="color: rgb(143, 20, 20);">${comment.username}</h3>
        <p class="comment-text">${comment.comment}</p>
      </div>`;
    }
    return "";
  });
  console.log(postedComments.length);
  const html = getHtmlWithComments(comments);
  res.send(html);
};

app.get("/", (req, res) => {
  sendPage(res);
});

app.post("/", (req, res) => {
  const { username, comment } = req.body;
  postedComments.push({
    username: sanitizeString(username),
    comment: sanitizeString(comment),
  });
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("Server is ready to receive requests");
});
