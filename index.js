import express from "express"
import bodyParser from "body-parser";
import {dirname} from "path"
import { fileURLToPath } from "url";




const app = express();
const port = 3000;
let __dirname = dirname(fileURLToPath(import.meta.url));
let Posts = [{id:1,title:"programming",content:"i love programming"}];
let id = 2;


app.use(bodyParser.urlencoded({extended:true}));

function createPost(req){
    let obj = {};
    
    obj["id"] = id++;
    obj["title"] = req.body.title;
    obj["content"] = req.body.content;
    Posts.push(obj);
    
    
}








app.get("/",(req,res)=>{
    if(Posts.length>0){
    res.locals.Posts = Posts}
    res.render("index.ejs")
})


app.get("/posts/:postId",(req,res)=>{
    let id = req.params.postId;
    let exist = false
    for(let i = 0 ; i<Posts.length;i++){
        if(Posts[i]["id"]==id){
            exist = true
            
            res.render("post.ejs",{post:Posts[i]})
        }
    }
    if(!exist){
        res.status(404)
        res.send("404 post does not exist")
    }
    
    

})


app.get("/posts",(req,res)=>{
    let id = req.query.postId;
    let exist = false
    for(let i = 0 ; i<Posts.length;i++){
        if(Posts[i]["id"]==id){
            exist = true
            
            res.render("post.ejs",{post:Posts[i]})
        }
    }
    if(!exist){
        res.status(404)
        res.send("404 post does not exist")
    }
    
    

})


app.get("/delete/:postId",(req,res)=>{
    let id = req.params.postId
    let exist = false
    for(let i = 0 ; i<Posts.length;i++){
        if(Posts[i]["id"]==id){
            exist = true
            Posts.splice(i,1)
            res.redirect("/")
        }
    }
    if(!exist){
        res.status(404)
        res.send("404 post does not exist")
    }

}
)


app.post("/",(req,res)=>{
    createPost(req);
    res.locals.Posts = Posts;
    
    
    res.render("index.ejs")

})

app.listen(port,()=>{
    console.log(`app is listing on port ${port} ...`)
})


