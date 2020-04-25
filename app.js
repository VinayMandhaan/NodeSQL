const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : 'root',
    database : 'nodemysql'
});

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('MYSQL')
})

const app = express();

app.get('/createposttable', (req,res)=>{
    let sql = 'CREATE TABLE post(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))'
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }
        res.send('POST TABLE Created')
        console.log(result)
    })
})

app.get('/addpost2', (req,res)=>{
    let post = {
        title : 'Post2',
        body : 'This is post 2'
    }
    let sql = 'INSERT INTO post SET ? '
    let query = db.query(sql,post,(err,result)=>{
        if(err){
            console.log(err)
        }
        res.send('POST created')
        console.log(result)
    })
})

app.get('/getpost',(req,res)=>{
    let sql = 'SELECT * FROM post'
    db.query(sql, (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
        console.log(result)
    })
})

app.get('/getpost/:id',(req,res)=>{
    let sql = `SELECT * FROM post WHERE id= ${req.params.id}`;
    db.query(sql, (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
        console.log(result)
    })
})

app.get('/updatepost/:id',(req,res)=>{
    let newTitle = 'This is new post'
    let sql = `UPDATE post SET body = '${newTitle}' WHERE id= ${req.params.id}`;
    db.query(sql, (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send('POST UPDATED')
        console.log(result)
    })
})


app.get('/deletepost/:id',(req,res)=>{
    let newTitle = 'This is new post'
    let sql = `DELETE FROM post WHERE id= ${req.params.id}`;
    db.query(sql, (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send('POST DELETED')
        console.log(result)
    })
})

app.listen('3000', ()=>{
    console.log('Server Started On Port 3000')
})