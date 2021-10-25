//router 쓰는이유는 계속 하위 로직으로 빼는거다
const express = require('express')
const BookRouter = express.Router()
const Book = require('../models/Book')
// BookRouter.route('/').get(req, res) => {
//     res.sed('all Book list')

// })

BookRouter.get('/', async(req, res) => {
    // res.send('all book list')
    const books = await Book.find()
    console.log(books)
    res.json({status: 200, books})

})
BookRouter.get('/:id', (req, res) => {
    // res.send(`book ${req.params.id}`)
    Book.findById(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status:200, book})
    })
})

BookRouter.post('/', (req, res)=> {
   // res.send(`book ${req.body.name} created`)
    Book.findOne({ ISBN:req.body.ISBN }, async (err, book) => { 
        // 중복체크 
        if(err) throw err; if(!book){
             // 데이터베이스에서 해당 할일을 조회하지 못한 경우 
             const newBook = new Book(req.body);
              await newBook.save().then( () => {
                   res.json({ status: 201, msg: 'new book created in db !', newBook})
                 })
                 }else{
                      // 생성하려는 할일과 같은 이름이고 아직 끝내지 않은 할일이 이미 데이터베이스에 존재하는 경우
                       const msg = 'this book already exists in db !'
                        console.log(msg) 
                        res.json({ status: 204, msg}) 
                    } 
                })
             })
BookRouter.put('/:id', (req, res)=> {
//  데이터베이스 접속 후 id 값으로 모델 죄호 후 변경됨
    // res.send(`book ${req.params.id} updated`)
    Book.findByIdAndUpdate(req.params.id, req.body, {new:  true}, (err, book)=>{
        if(err) throw err;
        res.json({ status: 204, msg: `book${req.params.id} updated in db !`, book})
    })
})

BookRouter.delete('/:id', (req, res)=>{
    // res.send(`book ${req.params.id} removed!`)
    Book.findByIdAndDelete(req.params.id, (err, book)=>{
        if(err) throw err;
        res.json({ status:204, msg: `book${req.params.id} remove in db !`, book})
    })
})

module.exports = BookRouter;
