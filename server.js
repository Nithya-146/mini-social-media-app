const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

let users = []
let posts = []

app.post("/register",(req,res)=>{
const {username,password} = req.body
users.push({username,password})
res.json({message:"Registered successfully"})
})

app.post("/login",(req,res)=>{
const {username,password} = req.body
const user = users.find(u=>u.username===username && u.password===password)

if(user){
res.json({message:"Login successful"})
}else{
res.json({message:"Invalid login"})
}
})

app.post("/post",(req,res)=>{
const {username,content} = req.body

posts.unshift({
username,
content,
likes:0,
comments:[]
})

res.json({message:"Post added"})
})

app.get("/posts",(req,res)=>{
res.json(posts)
})

app.post("/like",(req,res)=>{
const {index} = req.body
posts[index].likes++
res.json({message:"Liked"})
})

app.post("/comment",(req,res)=>{
const {index,comment} = req.body
posts[index].comments.push(comment)
res.json({message:"Comment added"})
})

app.listen(3000,()=>{
console.log("Server running on port 3000")
})