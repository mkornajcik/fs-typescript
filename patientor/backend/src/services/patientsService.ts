import patientsData from "../data/patients.ts";
import type { Patient, NonSensitivePatient, NewPatientEntry, NewEntry } from "../types.ts";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getEntries = (): Patient[] => {
  return patients;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) return undefined;

  patient.entries.push({ id: uuid(), ...entry });
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addEntry,
};
