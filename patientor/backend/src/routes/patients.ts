import express, { type Response, type Request } from "express";
import patientsService from "../services/patientsService.ts";
import { type Patient, type NewPatientEntry, type NewEntry, type NonSensitivePatient } from "../types.ts";
import { newPatientParser, errorMiddleware, newEntryParser } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientsService.getNonSensitiveEntries();
  return res.send(data);
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientsService.addPatient(req.body);
  return res.json(addedEntry);
});

router.get("/:id", (req, res: Response<Patient | { error: string }>) => {
  const data = patientsService.getPatient(req.params.id);
  if (!data) {
    return res.status(404).send({ error: "Patient not found" });
  }
  return res.json(data);
});

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Patient | { error: string }>) => {
    const updatedPatient = patientsService.addEntry(req.params.id, req.body);

    if (!updatedPatient) {
      return res.status(404).send({ error: "Patient not found" });
    }

    return res.json(updatedPatient);
  },
);

router.use(errorMiddleware);

export default router;
