import express, { Router } from "express";

import {
  getTeachers,
  teachersUpdate,
  teacherDelete,
} from "../controller/teachersController.js";

const router = express.Router();

router
.route("/")
.get(getTeachers)

router
.route("/:id")
.put(teachersUpdate)
.delete(teacherDelete);

export default router;