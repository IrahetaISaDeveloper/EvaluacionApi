import express, { Router } from "express";

import {
  getStudent,
  studentUpdate,
  studentDelete,
} from "../controller/studentController";

const routes = express.Router();

router
.route("/")
.get(getStudent)

router
.route("/:id")
.put(  studentUpdate,)
.delete(studentDelete);

export default router