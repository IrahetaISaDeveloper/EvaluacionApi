import express, { Router } from "express";

import {
  getStudent,
  studentUpdate,
  studentDelete,
} from "../controller/studentController";

const routes = express.Router();

router
.route("/")
.get(getSpeciality)
.post(insertEspeciality);

router
.route("/:id")
.put(especialityUpdate)
.delete(especialityDelete);

export default router