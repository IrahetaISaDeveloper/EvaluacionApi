import express, { Router } from "express";

import {
  getSubject,
  insertSubject,
  subjectUpdate,
  subjectDelete,
} from "../controller/subjectController.js";

const routes = express.Router();

router.route("/")
.get(getSubject)
.post(insertSubject);

router.route("/:id")
.put(subjectUpdate)
.delete(subjectDelete);

export default router;
