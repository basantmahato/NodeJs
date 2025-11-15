const loginApi = (req, res)  =>{
   const userData = req.body;
  
  console.log("User data received:", userData);

  res.send({ message: "User logged in successfully", data: userData });

}

module.exports = loginApi;