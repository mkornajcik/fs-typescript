import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Gender, Patient } from "../../types";
import { Box, Stack, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
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
      </Box>
    </div>
  );
};

export default PatientPage;
