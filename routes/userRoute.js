const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Consultation = require("../models/consultations");
const Blog = require("../models/blogModel");
const Profile = require("../models/profileModel");
const moment = require("moment");
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
const https = require("https");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User Created Successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error Creating User", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Does Not Exist", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is Incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .send({ message: "Login Successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error Logging In", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Does Not Exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Getting User Info", success: false, error });
  }
});

router.post("/consultations", authMiddleware, async (req, res) => {
  try {
    req.body.date = moment.utc(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.timings = moment.utc(req.body.timings, "HH:mm").toISOString();
    const newConsultation = new Consultation({
      ...req.body,
      status: "Pending",
    });
    await newConsultation.save();
    const user = await User.findOne({ _id: req.body.userId });
    userApplied = user.name;
    const adminUser = await User.findOne({ role: "admin" });
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-consultation-request",
      message: `${userApplied} with Title ${newConsultation.title} has applied for a consultation`,
      data: {
        consultationId: newConsultation._id,
        name: User.name,
      },
      onClickPath: "/admin/consultation",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      message: "Consultation Request Sent Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error Applying for Consultation",
      success: false,
      error,
    });
  }
});

router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      // const updatedUser = await User.findByIdAndUpdate(user._id, user);
      const updatedUser = await user.save();

      updatedUser.password = undefined;
      res.status(200).send({
        message: "All Notifications Are Marked As Seen",
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error Marking Notifications As Seen",
        success: false,
        error,
      });
    }
  }
);

router.post(
  "/delete-all-seen-notifications",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      user.unseenNotifications = [];
      user.seenNotifications = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        message: "All Notifications Are Deleted",
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error Deleting Notifications",
        success: false,
        error,
      });
    }
  }
);

router.get("/get-all-appointments", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const consultation = await Consultation.find({
      userId: user._id,
    });
    res.status(200).send({
      message: "All Consultations Fetched Successfully",
      success: true,
      data: consultation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Fetching Consultations Failed",
      success: false,
      error,
    });
  }
});

router.get("/get-latest-appointment", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const consultation = await Consultation.find({
      userId: user._id,
    })
      .sort({
        date: 1,
      })
      .limit(1);
    res.status(200).send({
      message: "All Consultations Fetched Successfully",
      success: true,
      data: consultation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Fetching Consultations Failed",
      success: false,
      error,
    });
  }
});

router.post("/check-availability", authMiddleware, async (req, res) => {
  try {
    const date = moment.utc(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment
      .utc(req.body.timings, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment
      .utc(req.body.timings, "HH:mm")
      .add(1, "hours")
      .toISOString();
    const consultation = await Consultation.find({
      date: date,
      timings: { $gte: fromTime, $lte: toTime },
    });
    if (consultation.length > 0) {
      return res.status(200).send({
        message: "Appointments are not available for the selected time",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments are available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Checking Availability Failed",
      success: false,
      error,
    });
  }
});

router.get("/get-all-dates", authMiddleware, async (req, res) => {
  try {
    const consultation = await Consultation.find({
      date: { $gte: "2022-11-11T00:00:00.000Z" },
    });
    const dates = consultation.date;
    res.status(200).send({
      message: "All Dates Fetched Successfully",
      success: true,
      data: dates,
    });
    console.log(dates);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Fetching Dates Failed",
      success: false,
      error,
    });
  }
});

router.get("/get-all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({ highlight: "false" }).sort({
      createdAt: -1,
    });

    res.status(200).send({
      message: "All Blogs Fetched Successfully",
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).send({
      message: "Blogs Fetching Failed",
      success: false,
    });
  }
});

router.get("/get-highlight-blog", async (req, res) => {
  try {
    const highlight = await Blog.find({ highlight: "true" });

    res.status(200).send({
      message: "All Blogs Fetched Successfully",
      success: true,
      data: highlight,
    });
  } catch (error) {
    res.status(500).send({
      message: "Blogs Fetching Failed",
      success: false,
    });
  }
});

router.get("/cases/:id", async (req, res) => {
  try {
    const blogs = await Blog.find({ _id: req.params.id });
    res.status(200).send({
      message: "Blog with ID fetched",
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).send({ message: "Blog fetching failed", success: false });
  }
});

router.post("/update-profile", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.body.userId });
    const user = await User.findById({ _id: req.body.userId });

    const newprofile = await Profile.findOneAndUpdate(
      { userId: user._id },
      req.body
    );
    res.status(200).send({
      message: "Profile Updated Successfully",
      success: true,
      data: newprofile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Profile Updating Failed",
      success: false,
    });
  }
});

router.post("/update-name", authMiddleware, async (req, res) => {
  try {
    // const user = await User.findById({ _id: req.body.userId });

    const newUser = await User.findByIdAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    res.status(200).send({
      message: "Profile Updated Successfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Profile Updating Failed",
      success: false,
    });
  }
});

// router.post(
//   "/add-profile-picture",
//   upload.single("profilepic"),
//   async (req, res) => {
//     const file = req.file;
//     const imageRef = ref(storage, file.originalname);
//     const metatype = { contentType: file.mimetype, name: file.originalname };
//     const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
//     const downloadURL = await getDownloadURL(snapshot.ref);
//     const profile = new Profile({
//       ...req.body,
//       image: downloadURL,
//     });

//     try {
//       profile.save();
//       res.status(200).send({
//         message: "Profile Picture Posted Successfully",
//         success: true,
//         data: profile,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "Posting Profile Picture Failed",
//         success: false,
//       });
//     }
//   }
// );

router.get("/get-profile-picture", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId });
    const profile = await Profile.find({
      userId: user._id,
    });
    res.status(200).send({
      message: "Profile Picture Fetched Successfully",
      success: true,
      data: profile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Fetching Profile Picture Failed",
      success: false,
      error,
    });
  }
});

// router.post(
//   "/update-profile-picture",
//   upload.single("profilepic"),
//   async (req, res) => {
//     const file = req.file;
//     const imageRef = ref(storage, file.originalname);
//     const metatype = { contentType: file.mimetype, name: file.originalname };
//     const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
//     const downloadURL = await getDownloadURL(snapshot.ref);

//     try {
//       const profile = await Profile.findByIdAndUpdate(
//         { _id: req.body.userId },
//         req.body.image
//       );
//       res.status(200).send({
//         message: "Profile Updated Successfully",
//         success: true,
//         data: profile,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "Profile Updating Failed",
//         success: false,
//       });
//     }
//   }
// );

router.post("/upload-picture", authMiddleware, async (req, res) => {
  const profile = new Profile({
    ...req.body,
  });

  try {
    profile.save();
    res.status(200).send({
      message: "Profile Picture Posted Successfully",
      success: true,
      data: profile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Posting Profile Picture Failed",
      success: false,
    });
  }
});

router.post("/signup", function (req, res) {
  const eMail = req.body.email;

  const data = {
    members: [
      {
        email_address: eMail,
        status: "subscribed",
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/af63e200bf";

  const options = {
    method: "POST",
    auth: process.env.MAILCHIMP_API,
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.send({
        message: "Successfully Subscribed for Newsletter",
        success: true,
      });
    } else {
      res.send({
        message: "Subscribing for Newsletter Failed",
        success: false,
      });
    }
    response.on("data", function (data) {});
  });
  request.write(jsonData);
  request.end();
});

module.exports = router;
