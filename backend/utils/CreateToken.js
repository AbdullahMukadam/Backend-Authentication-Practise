import jwt from "jsonwebtoken"

const createToken = ({userId})=>{
  const Token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"3d"
  })

  return Token
}

export default createToken