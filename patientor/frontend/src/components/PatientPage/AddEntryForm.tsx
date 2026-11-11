import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Chip,
} from "@mui/material";
import { Entry, EntryWithoutId, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const entryTypeOptions: { value: Entry["type"]; label: string }[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
];

const healthTypeOptions: { value: HealthCheckRating; label: string }[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low Risk" },
  { value: 2, label: "High Risk" },
  { value: 3, label: "Critical Risk" },
];

const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const base = {
      date,
      description,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case "HealthCheck":
        return onSubmit({ ...base, type: "HealthCheck", healthCheckRating });

      case "Hospital":
        return onSubmit({
          ...base,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        });

      case "OccupationalHealthcare":
        return onSubmit({
          ...base,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? { sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd } }
            : {}),
        });
    }
  };

  return (
    <form onSubmit={addEntry}>
      <Typography variant="h6">Add a new entry</Typography>
      <TextField
        select
        label="Entry type"
        fullWidth
        value={type}
        onChange={({ target }) => setType(target.value as Entry["type"])}
      >
        {entryTypeOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Date"
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        sx={{ marginTop: 2 }}
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ marginTop: 2 }}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        sx={{ marginTop: 2 }}
      />
      {type === "HealthCheck" && (
        <TextField
          select
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
          sx={{ marginTop: 2 }}
        >
          {healthTypeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value} - {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}

      {type === "Hospital" && (
        <>
          <TextField
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Discharge criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
            sx={{ marginTop: 2 }}
          />
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Sick leave start"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={sickLeaveStart}
            onChange={({ target }) => setSickLeaveStart(target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Sick leave end"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
            sx={{ marginTop: 2 }}
          />
        </>
      )}
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          multiple
          labelId="diagnosis-codes-label"
          label="Diagnosis Codes"
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value as string[])}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((code) => (
                <Chip key={code} label={code} size="small" />
              ))}
            </Box>
          )}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Button type="button" color="secondary" variant="contained" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Stack>
    </form>
  );
};

export default AddEntryForm;
