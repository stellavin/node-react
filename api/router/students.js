const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// creating student
router.post("/", async (req, res) => {
  let data = req.body.params;
  console.log(data);
  const student = new Student({
    firstName: data.firstName,
    lastName: data.lastName,
    age: Number(data.age),
    nationality: data.nationality,
  });

  try {
    const newStudent = await student.save();
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get nationalities
router.get("/nationality", getNationality, (req, res) => {
  res.send(res.nationalities);
});

// create middleware
router.get("/", async (req, res) => {
  let students;
  try {
    students = await Student.find({
      nationality: req.query.nationality,
    });
    if (students == null) {
      return res.status(404).json({
        message: "cannot find students with the provided nationality",
      });
    }
    return res.status(200).json({ students });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

async function getNationality(req, res, next) {
  let nationalities;
  try {
    nationalities = await Student.distinct("nationality");
    if (nationalities == null) {
      return res.status(404).json({
        message: "no nationality",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.nationalities = nationalities;

  next();
}

module.exports = router;
