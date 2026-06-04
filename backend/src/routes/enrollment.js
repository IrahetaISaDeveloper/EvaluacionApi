import express, { Router } from "express";

import {
  getEnrollment,
  insertEnrollment,
  enrollmentUpdate,
  enrollmentDelete,
} from "../controller/enrollment.js";

const routes = express.Router();

router
.route("/")
.get(getEnrollment)
.post(insertEnrollment);

router
.route("/:id")
.put(enrollmentUpdate)
.delete(enrollmentDelete);

export default router