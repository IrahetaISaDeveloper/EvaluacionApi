import express, { Router } from "express";

import {
  getSpeciality,
  insertEspeciality,
  especialityUpdate,
  especialityDelete,
} from "../controller/especiality.js";

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