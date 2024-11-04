const express = require("express");
const app = express();
require("./config/db/DataBase");
// const { handlerForCheckIfUserIsAdmin,handlerForcheckIsUserAuth } = require("./middlewares/auth");
const { connectToDatabase } = require("./config/index");
const { User } = require("./models/user/user");
const PROT = 7777;

app.use(
  express.json({
    limit: "20kb",
    strict: true,
  })
);

app.post("/singup", async (req, res) => {
  const saveingUser = new User(req.body);
  try {
    const savedValue = await saveingUser.save();
    if (!savedValue) {
      throw new Error("hello world");
    }
    res.send("user added is done");
  } catch (error) {
    console.log("🚀 ~ app.post ~ error:", error);
    // res.status(400).send("error", error);
    res.send(400, {
      message: error._message,
    });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    // console.log("🚀 ~ app.get ~ users:", users);
    res.send(users);
  } catch (error) {
    res.status("404").send("something went wrong here");
  }
});

app.delete("/deleteuser", async (req, res) => {
  try {
    const id = req.body._id;
    console.log("🚀 ~ app.delete ~ userId:", id);
    if (!id) {
      console.log("inside the if block");
      return res.status("404").send("Please send user id");
    }
    const deleteResponse = await User.findByIdAndDelete(id);
    console.log("🚀 ~ app.delete ~ deleteResponse:", deleteResponse);
    res.send("User deleted done");
  } catch (error) {
    console.log("🚀 ~ app.delete ~ error:", error);
    res.status(500).send("something went wrong");
  }
});

app.patch("/edituser:userID", async (req, res) => {
  try {
    const {userID}= req.params
    const dateForUpadte = req.body;
    const allowToUpdate = [
      "age",
      "passWord",
      "about",
      "profileImage",
      "skills",
    ];

    const isAllowToUpdate = Object.keys(dateForUpadte).every((keys) => {
      return allowToUpdate.includes(keys);
    });
    if (!userID) {
      throw new Error("Please send correct userID");
    }
    if (!isAllowToUpdate) {
      throw new Error("Something went worng in payload");
    }
    const response = await User.findOneAndUpdate(
      { _id: userID },
      dateForUpadte
    );
    console.log("response",response)

    res.send("User updated done");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const startApp = async () => {
  try {
    const res = await connectToDatabase();
    console.log("🚀 ~ startApp ~ res:", res);
    if (res) {
      app.listen(PROT, () => {
        console.log("sever is listening on port", PROT);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

startApp();

// app.use("/admin", handlerForCheckIfUserIsAdmin);
// app.use("/user", handlerForcheckIsUserAuth);

// app.get("/admin/:userid",handlerForCheckIfUserIsAdmin,handlerForcheckIsUserAuth, (req, res) => {
//   console.log("Called")
//   res.send("all data sent due to user is a admin");
// });
// app.get("/user/getalldata",handlerForcheckIsUserAuth, (req, res) => {
//   res.send("user data is sent to auth user");
// });

// app.post("/post", (req, res) => {
//   console.log("data saved in database");
//   res.send("Value save in database......");
// });
