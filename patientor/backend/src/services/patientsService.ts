import patientsData from "../data/patients.ts";
import type { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types.ts";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getEntries = (): Patient[] => {
  return patients;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};
