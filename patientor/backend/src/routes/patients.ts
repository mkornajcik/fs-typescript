import express, { type Response, type Request } from "express";
import patientsService from "../services/patientsService.ts";
import { type Patient, type NewPatientEntry, type NonSensitivePatientEntry } from "../types.ts";
import { newPatientParser, errorMiddleware } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientsService.getNonSensitiveEntries();
  res.send(data);
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientsService.addPatient(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;
