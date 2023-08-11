const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

mongoose.connect("mongodb+srv://admin-harshal:qJZARUUqvSKbdoKJ@cluster0.mx6bkrb.mongodb.net/crudDB", {useNewUrlParser: true})

const articleSchema = {
    title:String,
    content:String
}

const Article = mongoose.model("Article",articleSchema);

// const article1 = new Article({
//     title:"Hello",
//     content:"Kaise ho"
// })

// const article2 = new Article({
//     title:"Hadwdjwkda",
//     content:"afhafaefhaefhaeofehafouahaeohaeodhfaeofhdaeoadufhad"
// })

// const article3 = new Article({
//     title:"asdjakebahkbgfahk",
//     content:"askfhkaegfkhaefbakhfbaehkabgekfhakdagkafkdabfadk"
// })

// article3.save();

// const article4 = new Article({
//     title:"adfbaekjda",
//     content:"adfjahfakjfhnaejldnhaljfadfnhdalfjadanhlfja",
// })
// article4.save();

app.get('/',async(req,res)=>{
    res.render('index');
})

app.get('/data',async(req,res)=>{
    const data = await Article.find({});
    // console.log(data);
    res.render('data',{newlistitem:data});
})

app.post('/',(req,res)=>{
    // console.log(req.body.title);
    // console.log(req.body.content);
    const article5 = new Article({
        title:req.body.title,
        content:req.body.content
    })
    article5.save();
    res.redirect('/');
})

app.get('/delete',(req,res)=>{
    res.render('delete');
})

app.post('/delete',(req,res)=>{
    var id= req.body.checkbox;
    Article.findByIdAndRemove(id).then(function(err){
        if(id===id){
            res.redirect('/delete');
        }else{
            console.log(err);
        }
    })
})

app.get('/update',async (req,res)=>{
    const data = await Article.find({});
    res.render('update',{newListitem:data});
})

app.post('/update',async (req,res)=>{
    var updatedTitle = req.body.title;
    var updatedContent = req.body.content;
    var idOfPost = req.body.idtext;
    const newArticle = await Article.findOneAndUpdate({_id:idOfPost},{$set:{title:updatedTitle,content:updatedContent}});
    res.redirect('/data');
})

// app.delete('/')


app.listen(process.env.PORT||3000,(req,res)=>{
    console.log("Server is running succesfully!!!");
})