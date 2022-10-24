const express = require('express');
const connectDb = require('./db')
const routes = require('./routes')
const authenticate = require('./middleware/authenticate')



const app = express();

app.use(express.json())
app.use(routes)


app.get('/private',authenticate, async (req,res,next) => {
    console.log('I am authenticated', req.user)
    return res.status(201).json({message:'private Route'})
})
app.get('/public',(req,res,next) => {

    return res.status(201).json({message:'public Route'})
})
app.get('/', (_,req) => {
    req.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>lorem ipsum dolor sit amet Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero maxime praesentium neque, at dolorem rem asperiores exercitationem, ratione eos ducimus pariatur obcaecati modi dolorum nesciunt voluptates vitae officia assumenda, itaque a alias labore. Vitae eum iure reprehenderit sed! Sint quisquam quidem placeat aspernatur quo sed tempore in rem officiis fugit nulla modi ut quis natus, qui iusto reprehenderit doloremque ipsa temporibus incidunt id enim recusandae commodi nobis. Eius fuga maxime autem perferendis nostrum maiores architecto quae modi, iure optio soluta illum nisi incidunt molestiae porro expedita in dicta iste delectus, amet, sapiente eum voluptate aut adipisci! Aliquam ea perferendis saepe!</p>
    </body>
    </html>`)
})




app.use((err,req,res,next) => {
  const status = err.status ? err.status : 500
  const message = err.message ? err.message : 'Server Error'
    res.status(status).json({message })
})
connectDb('mongodb://localhost:27017/attendance-system')
.then(()=>{
    console.log('Database Connected')
    app.listen(4000,()=>{
        console.log('Server Listening at port 4000')
    })
})
.catch((err)=>{
    console.log(err)
})

