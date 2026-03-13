let currentUser=""

function register(){

currentUser = regUser.value

fetch("/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
username:regUser.value,
password:regPass.value
})
})
.then(r=>r.json())
.then(d=>alert(d.message))
}

function login(){

currentUser = loginUser.value

fetch("/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
username:loginUser.value,
password:loginPass.value
})
})
.then(r=>r.json())
.then(d=>alert(d.message))
}

function createPost(){

fetch("/post",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
username:currentUser,
content:postContent.value
})
})
.then(()=>loadPosts())
}

function loadPosts(){

fetch("/posts")
.then(r=>r.json())
.then(data=>{

posts.innerHTML=""

data.forEach((p,i)=>{

posts.innerHTML+=`

<div class="post">

<div class="post-header">
<div class="avatar">${p.username.charAt(0).toUpperCase()}</div>
<b>${p.username}</b>
</div>

<p>${p.content}</p>

<button onclick="likePost(${i})">❤️ ${p.likes}</button>

<input id="c${i}" placeholder="Write comment">

<button onclick="commentPost(${i})">Comment</button>

<div>
${p.comments.map(c=>`<div class="comment">${c}</div>`).join("")}
</div>

</div>

`

})

})

}

function likePost(i){

fetch("/like",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({index:i})
})
.then(()=>loadPosts())

}

function commentPost(i){

let text = document.getElementById("c"+i).value

fetch("/comment",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
index:i,
comment:text
})
})
.then(()=>loadPosts())

}

loadPosts()