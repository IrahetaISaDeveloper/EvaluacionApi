import express, { Router } from "express";

import {
  getStudent,
  studentUpdate,
  studentDelete,
} from "../controller/studentController.js";

const router = express.Router();

router
.route("/")
.get(getStudent)

router
.route("/:id")
.put(studentUpdate)
.delete(studentDelete);

export default router;