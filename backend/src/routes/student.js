import express, { Router } from "express";

import{
    register
}from "../controller/registerStudent"

import {
  getStudent,
  studentUpdate,
  studentDelete,
} from "../controller/studentController";

const routes = express.Router();

router
.route("/")
.get(getStudent)
.post(register);

router
.route("/:id")
.put(  studentUpdate,)
.delete(studentDelete);

export default router