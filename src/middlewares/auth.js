const handlerForCheckIfUserIsAdmin = (req, res, next) => {
  const token = req?.params.userid;
  const {query} = req
  console.log("🚀 ~ handlerForCheckIfUserIsAdmin ~ query:", query)
  console.log("🚀 ~ handlerForCheckIfUserIsAdmin ~ token:", token);
  if (isNaN(Number(token))) {
  return res.status(404).send("Please send vaild user id");
  }
  const isTokenCorrect = token === "100";
  if (!isTokenCorrect) {
    console.log("inside the if")
    res.status(401).send("User is not a admin");
  }
  console.log("before next")
  next();
};

const handlerForcheckIsUserAuth = (req, res, next) => {
  console.log("check auth for user");
  const token = "user";
  const isTokenCorrect = token === "hello";
  if (!isTokenCorrect) {
    res.status(401).send("User is not a user of this org");
  } else {
    next();
  }
};

module.exports = {
  handlerForCheckIfUserIsAdmin,
  handlerForcheckIsUserAuth,
};
