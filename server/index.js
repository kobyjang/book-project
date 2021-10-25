var express = require('express')// node_modules 내 express 관련 코드를 가져온다
var app =express()
// var cors= require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var routes = require('./src/routes')

//app.set('case sensitive routing', true);
// app.get('/hello:id', (req, res) => {
//     res.send(req.params.id)
// })
// app.get('^/hello:id', (req, res) => {
//     res.send(req.params.id)
// })
// app.get('/hello', (req, res) => {
//     res.send(req.query.color)
// })
// //http://localhost:5006/hello?color=red

// app.get('/hello', (req, res) => {
//     res.send('hello world !')
// })

// var corsOptions = { // CORS 옵션 
//     origin: 'http://localhost:3000',
//      credentials: true 
// }
const CONNECT_URL = 'mongodb://localhost:27017/mydbname'
 mongoose.connect(CONNECT_URL, { // Mongo DB 서버 연결 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("mongodb connected ...")) 
.catch(e => console.log(`failed to connect mongodb: ${e}`))

//app.use(cors(corsOptions)) // CORS 설정 
app.use(express.json()) // request body 파싱
app.use(logger('tiny'))
app.use("/api", routes)

// app.get('/hello', (req, res) => { // URL 응답 테스트 
//     res.send('hello world !') 
// })

// app.get('/hello', (req, res) => { // URL 응답 테스트 
//     res.send(req.body) })

// app.use((err,req,res,next)=> {//서버 내부 오류 처리
//     console.error(err.stack)
//     //서버 내부 오류 처리 로직
//     res.status(500).send("something is broken on server !")
// })
app.use( (req, res, next) => { // 사용자가 요청한 페이지가 없는 경우 에러처리 res.status(404).send("Sorry can't find page") })
    res.status(404).send("Sorry can't find page") 
})


app.use( (req, res, next) => { // 사용자가 요청한 페이지가 없는 경우 에러처리 res.status(404).send("Sorry can't find page") })

    res.status(200).send("this is page you see when page don't exist") })

app.listen(5016, () => { // 5000 포트로 서버 오픈
    console.log('server is running on port 5016 .... - nodemon')
})

// const points = [3, 4]
// const app = {}
// app.doubleNums = (points) => {
//     return points.map( p => {
//         return p*p
//     });
// }
// app.sum=(points_doubled) => {
//     let s = 0;
//     points_doubled.forEach(p => {
//         s += p
//     })
//     return s;
// }
// app.sq = (s) => {
//     return Math.sqrt(s)
// }

// const pipeline = [app.doubleNums, app.sum, app.sq]

// const result = app.sq(app.sum(app.doubleNums(points)))
// console.log(result)