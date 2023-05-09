const express=require('express')
app=express()
const mongoose=require('mongoose')
app.use(express.json())
const bcrypt =require('bcrypt') 
const cors= require('cors')

// Middleware
app.use(cors())

app.use(express.urlencoded({extended:false}))
mongoose.connect('mongodb+srv://mani:mani3721@cluster0.ffhrjv3.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).
then(()=>app.listen(5000,()=>console.log("Successss"))).catch((error) => console.log(error));

// create methods

require('./usermodel')
const User=mongoose.model("Users")
app.post("/create", async (req, res)=>{
    const {name,age,joindate} =req.body
    try {
        await User.create({
            name,
            age,
            joindate
        })
        res.status(200).json("Successful Added");
    } catch (error) {
        res.send({status:error})
    }
})


 //getmethods   

app.get("/get", async (req, res)=>{
    try {
      let users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
 });

 //update methods

 app.put("/put/:id", async (req, res)=>{
  const id = req.params.id;
  const { _id,name,age,joindate } = req.body;

  if (id === _id) {
    try {
      const user = await User.findByIdAndUpdate(id, req.body);
      res.status(200).json({user});
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

 //deletemethods
 app.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
      try {
        await User.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully");
      } catch (error) {
        res.status(500).json(error);
      }
  });
