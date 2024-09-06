import User from "../Models/UserModel.js"
import bcrypt from "bcryptjs"

const RegisterUser = async (req, res) => {
   const { username, email, password } = req.body;
   if (!username || !email || !password) {
      return res.json({ error: "All Fields Are Required" })
   }

   const exitsEmail = await User.findOne({ email })
   if (exitsEmail) return res.json({ error: "Email is already Taken" })

   const salt = await bcrypt.genSalt(10)
   const hashedPass = await bcrypt.hash(password, salt)

   const NewUser = new User({
      username,
      email,
      password: hashedPass
   })
   try {
      NewUser.save();

      return res.json({
         username:NewUser.username,
         email: NewUser.email,
         _id : NewUser._id
      })
   } catch (error) {
      console.log(error)
   }
}

const LoginUser = async (req, res) => {
   const { email, password } = req.body;

   const exitsEmail = await User.findOne({ email })
   if (!exitsEmail) return res.json({ error: "No User Found" })
   else if (exitsEmail) {
      try {
       const MatchedUser = await bcrypt.compare(password, exitsEmail.password);
       if(MatchedUser){
         return res.json({
            username:exitsEmail.username,
            email: exitsEmail.email,
            _id : exitsEmail._id
         })
       }
      } catch (error) {
         console.log(error)
      }
   }
}

export { RegisterUser, LoginUser }