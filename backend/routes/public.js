const Group = require("../models/group");
const Message = require("../models/message");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const app = require("express").Router();

app.post("/createAccount", async (req, res) => {
  let { name, mobile, email, password } = req.body;
  try {
    email = email.toString();

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(402)
        .json({ success: false, error: "user with this email exists already" });

    user = await User.create({ name, mobile, email, password });

    res.status(200).json({ data: user, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});
app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    email = email.toString();
    let user = await User.findOne({ email });
    // if (!user) {
    //   return res.status(404).json({
    //     succes: false,
    //     error: "No one is registered with this email id",
    //   });
    // }
    // let passCompare = await bcrypt.compare(password, user.password);
    // if (!passCompare)
    //   return res
    //     .status(401)
    //     .json({ succes: false, error: "Wrong credentials" });

    res.status(200).json({ data: user, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});

app.get("/getAllUsers", async (req, res) => {
  try {
    let data = await User.find({});
    res.status(200).json({ data, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});
app.get("/getUser/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await User.findById(id);
    res.status(200).json({ data, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});
app.post("/getChat", async (req, res) => {
  try {
    let { From, To } = req.body;
    let data = await Message.find({ $or :  [{From , To} , {From : To, To : From}] }).populate("From");
    // let data_op = await Message.find({ From: To, To: From })
    //   .populate("From")
    //   .populate("To");
    // const data = dat.concat(data_op);
    res.status(200).json({ data, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});
app.post("/getGroupChat", async (req, res) => {
  try {
    let { ToGroup } = req.body;
    let data = await Message.find({ ToGroup }).populate("From");

    res.status(200).json({ data, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});
app.post("/sendMessage", async (req, res) => {
  try {
    let { From, To, ToGroup, file, time, messageType, messageText, metaData } =
      req.body;

    // if(!ToGroup) ToGroup =null;
    // if(!file) file =null;

    // if(!metaData) metaData =null;

    let data = await Message.create({
      From,
      To,
      ToGroup,
      file,
      time,
      messageType,
      messageText,
      metaData,
    });

    res.status(200).json({ data, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});

app.get("/getGroupsByUserId/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await User.findById(id).populate({
      path: "Groups",
      select: ["_id", "name"],
    });

    res.status(200).json({ data, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});

app.post("/createGroup", async (req, res) => {
  try {
    let { name, CreatedBy, Members } = req.body;
    console.log(req.body);
    let data = await Group.create({ name, CreatedBy, Members });
    const set = new Set(Members.concat(CreatedBy));
    const newArr = Array.from(set);

    // const data1 = await User.updateMany({_id : {'$or' : newArr}}, {$push : {'Groups' : data._id}} )
    console.log(data);
    for (let i = 0; i < newArr.length; i++) {
      await User.updateOne({ _id: newArr[i] }, { $push: { Groups: data._id } });
    }

    res.status(200).json({ data, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});

app.get("/getGroup/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Group.findById(id);
    res.status(200).json({ data, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
});

 


module.exports = app;
