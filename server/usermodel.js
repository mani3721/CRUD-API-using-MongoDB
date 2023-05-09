const mongoose =require('mongoose')

const UserSchema = mongoose.Schema(
    {
        
        name:String,
        age: String,
        joindate: String
    },{
        collections:"Users"
    }
)

mongoose.model("Users", UserSchema);
