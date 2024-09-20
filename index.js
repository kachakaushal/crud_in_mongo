const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./userModels/user');

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/read', async(req, res) => {
    let Allusers=await userModel.find()
    res.render("read", {users: Allusers})
})

app.post('/create',async(req, res) => {
    
   
    let createUser =await userModel.create({
    user:req.body.name,email:req.body.email,image:req.body.image
   })
   res.redirect('/read')
})
app.get('/delete/:id',async(req, res) => {
    let deleteUser = await userModel.findOneAndDelete({ _id: req.params.id })
    res.redirect('/read')

})

app.post('/update/:updateid',async(req, res) => {
    let updateUser = await userModel.findOneAndUpdate({ _id: req.params.updateid },{user:req.body.user,image:req.body.image,email:req.body.email},{new:true})
    res.redirect('/read')
})

app.get('/edit/:updateid',async(req, res) => {
    let updateUser = await userModel.findOne({ _id: req.params.updateid })
    res.render("edit",{user: updateUser})

})



app.listen(3000)
