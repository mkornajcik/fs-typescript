import { Stack, Typography } from "@mui/material";
import { Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import HealthRatingBar from "../HealthRatingBar";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>{entry.date}</Typography>
            <MedicalInformationIcon />
          </Stack>

          <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
          <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
          <Typography>diagnose by {entry.specialist}</Typography>
        </div>
      );
    case "Hospital":
      return (
        <div>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>{entry.date}</Typography>
            <LocalHospitalIcon />
          </Stack>

          <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
          <Typography>Discharge: {entry.discharge.date}</Typography>
          <Typography>Criteria: {entry.discharge.criteria}</Typography>
          <Typography>diagnose by {entry.specialist}</Typography>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>{entry.date}</Typography>
            <WorkIcon />
            <Typography>Employer: {entry.employerName}</Typography>
          </Stack>

          <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
          {entry.sickLeave && (
            <Typography>
              Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </Typography>
          )}
          <Typography>diagnose by {entry.specialist}</Typography>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
