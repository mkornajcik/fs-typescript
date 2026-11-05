import patientsData from "../data/patients.ts";
import type { Patient, NonSensitivePatientEntry } from "../types.ts";

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

export default {
  getEntries,
  getNonSensitiveEntries,
};
