const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Consultation = require("../models/consultations");
const Blog = require("../models/blogModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../utils/cloudinary");

const multer = require("multer");
const {
  ref,
  uploadBytes,
  listAll,
  deleteObject,
  getDownloadURL,
} = require("firebase/storage");
const storage = require("../config/firebase");
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({
      message: "Users Fetched Successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Fetching All User Data", success: false });
  }
});

router.get("/get-all-consultations", authMiddleware, async (req, res) => {
  try {
    const consultation = await Consultation.find();
    res.status(200).send({
      message: "Consultations Fetched Successfully",
      success: true,
      data: consultation,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error Fetching All Consultation Data",
      success: false,
    });
  }
});

router.post("/change-consultation-status", authMiddleware, async (req, res) => {
  try {
    const { consultationId, status } = req.body;
    const consultation = await Consultation.findByIdAndUpdate(consultationId, {
      status,
    });
    const user = await User.findOne({ _id: consultation.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "status-consultation-request",
      message: `Your Consultation Request has been updated to ${status}`,
      onClickPath: "/notifications",
    });
    await user.save();
    res.status(200).send({
      message: "Consultation Status Changed Successfully",
      success: true,
      data: consultation,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error Accepting Consultation Request",
      success: false,
      error,
    });
  }
});

router.post("/add-blogs", upload.single("pic"), async (req, res) => {
  const date = new Date().toLocaleDateString();
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
  const downloadURL = await getDownloadURL(snapshot.ref);
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    image: downloadURL,
    date: date,
  });
  try {
    blog.save();
    res.status(200).send({
      message: "Blog Posted Successfully",
      success: true,
      data: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Blog Posting Failed",
      success: false,
    });
  }
});

module.exports = router;
