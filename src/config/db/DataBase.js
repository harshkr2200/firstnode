const mongoose = require("mongoose");
const dataBaseUrl =
  "mongodb+srv://harshkumarsingh:Rr4JCEtOpyUZi4Eb@cluster0.c00ij.mongodb.net/devTinder";

const connectToDatabase = async () => {
  console.log("the data base fun is called");
  try {
    const response = await mongoose.connect(dataBaseUrl);
    // console.log("🚀 ~ connetToDataBase ~ response:", response);
    // if (Object.keys(response).length) {
    //   console.log("test");
    //   throw new Error("Parameter is not a number!");
    // }
    console.log("database connect is done");
    return Object.keys(response).length ? true : false
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = { connectToDatabase };
