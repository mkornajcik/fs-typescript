import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Diagnosis, EntryWithoutId, Gender, type Patient } from "../../types";
import { Alert, Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string>();

  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    patientService
      .getOne(id)
      .then(setPatient)
      .catch(() => setError("Patient not found"));
  }, [id]);

  if (error) return <Typography>{error}</Typography>;
  if (!patient) return <p>Loading patient...</p>;

  const addEntry = (values: EntryWithoutId) => {
    if (!id) return;
    patientService
      .createEntry(id, values)
      .then((updatedPatient) => {
        setPatient(updatedPatient);
        setShowForm(false);
        setFormError(undefined);
      })
      .catch(() => setFormError("Failed to add entry"));
  };

  return (
    <div>
      <Box component="section" sx={{ p: 2, border: "1px solid grey" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h4">{patient.name} |</Typography>
          {patient.gender === Gender.Male ? (
            <MaleIcon />
          ) : patient.gender === Gender.Female ? (
            <FemaleIcon />
          ) : (
            <Typography>Other</Typography>
          )}
        </Stack>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        <Typography>date of birth: {patient.dateOfBirth}</Typography>
        {patient.entries.length > 0 && (
          <div>
            <Typography variant="h4">entries</Typography>
            {patient.entries.map((entry) => (
              <div key={entry.id}>
                <Box component="section" sx={{ p: 2, border: "1px solid grey" }}>
                  <EntryDetails entry={entry} />
                  {entry.diagnosisCodes && (
                    <List sx={{ listStyleType: "disc", pl: 4 }}>
                      {entry.diagnosisCodes.map((code) => (
                        <ListItem key={code} sx={{ display: "list-item" }}>
                          {code} {diagnoses.find((d) => d.code === code)?.name}
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </div>
            ))}
          </div>
        )}
      </Box>
      {!showForm && (
        <Button
          variant="contained"
          onClick={() => {
            setFormError(undefined);
            setShowForm(true);
          }}
        >
          Add New Entry
        </Button>
      )}

      {showForm && (
        <>
          {formError && <Alert severity="error">{formError}</Alert>}
          <AddEntryForm diagnoses={diagnoses} onCancel={() => setShowForm(false)} onSubmit={addEntry} />
        </>
      )}
    </div>
  );
};

export default PatientPage;
