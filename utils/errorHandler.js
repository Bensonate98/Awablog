const handleError = (err)=>{
  let error = {username: "", email: "", password: ""};
  if(err.message.includes("user validation failed")){
    Object.values(err.errors).forEach(({properties})=>{
      console.log(properties)
      error[properties.path] = properties.message;
    }) 
  }

  if(err.code === 11000 && err.keyValue.username){
    error["username"] = "Username already exist";
    delete error.email;
    delete error.password;
  }
  if(err.code === 11000 && err.keyValue.email){
    error["email"] = "Email already exist";
    delete error.username;
    delete error.password;
  }
  return error;
}


module.exports = handleError;