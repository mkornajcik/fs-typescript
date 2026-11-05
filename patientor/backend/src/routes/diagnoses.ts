import express from "express";
import diagnosesService from "../services/diagnosesService.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = diagnosesService.getEntries();
  res.send(data);
});

export default router;
