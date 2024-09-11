import User from "../Models/UserModel.js"
import bcrypt from "bcryptjs"
import createToken from "../utils/CreateToken.js";

const RegisterUser = async (req, res) => {
   const { username, email, password } = req.body;
   if (!username || !email || !password) {
      return res.status(401).json({ error: "All Fields Are Required" })
   }

   const exitsEmail = await User.findOne({ email })
   if (exitsEmail) return res.status(404).json({ error: "Email is already Taken" })

   const salt = await bcrypt.genSalt(10)
   const hashedPass = await bcrypt.hash(password, salt)

   const NewUser = new User({
      username,
      email,
      password: hashedPass
   })
   try {
      await NewUser.save();

      const token = createToken(NewUser._id);

      res.cookie("jwt", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         maxAge: 24 * 60 * 60 * 1000,
         sameSite: 'strict',
      });

      res.status(201).json({
         message: "Registration successful",
         username: NewUser.username,
         email: NewUser.email,
         _id: NewUser._id,
      });

   } catch (error) {
      console.log(error)
   }
}

const LoginUser = async (req, res) => {
   const { email, password } = req.body;
 
   if (!email || !password) {
     return res.status(401).json({ error: "Email and password are required" });
   }
 
   try {
     
     const existingUser = await User.findOne({ email });
     if (!existingUser) {
       return res.status(404).json({ error: "No user found with this email" });
     }
 
     
     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
     if (!isPasswordCorrect) {
       return res.status(401).json({ error: "Incorrect password" });
     }
 
   
     const token = createToken(existingUser._id);
 
   
     res.cookie('jwt', token, {
       httpOnly: true, 
       secure: process.env.NODE_ENV === 'production', 
       maxAge: 24 * 60 * 60 * 1000, 
       sameSite: 'strict', 
     });
 
     res.status(200).json({
       message: "Login successful",
       username: existingUser.username,
       email: existingUser.email,
       _id: existingUser._id,
     });
 
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal Server Error" });
   }
 };
 

const LogoutUser =async (req,res)=>{
   res.cookie('jwt', "", {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      expires: new Date(0),
      sameSite: 'strict', 
    });

   res.status(200).json({ message: "Logout successful" });
}

export { RegisterUser, LoginUser,LogoutUser }