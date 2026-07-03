import app from "./app";
import {connectDb}from "./config/db";
import UserModel from "./models/users.model";


connectDb()
  .then(() => {
    console.log("Database connection successful");
    
  
    app.listen(3000, () => {
      console.log("Server is running on port 3000", "http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });
  