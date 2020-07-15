import React from 'react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import { useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const entryTypeIcon = (entry: Entry) => {
  switch (entry.type) {
    case "Hospital":
      return <Icon name="hospital" />;
    case "HealthCheck":
      return <Icon name="heart" />;
    case "OccupationalHealthcare":
      return <Icon name="stethoscope" />;
    default:
      assertNever(entry);
  }
};

const heartColor = (scale: number) => {
  switch (scale) {
    case 0:
      return 'green';
    case 1:
      return 'yellow';
    case 2:
      return 'red';
    default:
      return 'black';
  }
};

const DiagnoseCodes = ({ codes }: { codes: string[] | undefined }) => {
  const [{ diagnoses },] = useStateValue();

  if (!codes) return null;

  const getName = (code: string) => {
    if (!diagnoses[code]) return null;
    return diagnoses[code].name;
  };

  return (
    <ul>
      {codes.map(code =>
        <li key={code}>{code} {getName(code)}</li>
      )}
    </ul>
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <div>
    <h3>{entry.date} {entryTypeIcon(entry)}</h3>
    <p>{entry.description}</p>
    {entry.discharge ? <p>relese date: {entry.discharge.date}</p> : null}
    <DiagnoseCodes codes={entry.diagnosisCodes} />
    <hr />
  </div>
);

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
  <div>
    <h3>{entry.date} {entryTypeIcon(entry)}</h3>
    <p>{entry.description}</p>
    <Icon name="heart" color={heartColor(entry.healthCheckRating)} />
    <DiagnoseCodes codes={entry.diagnosisCodes} />
    <hr />
  </div>
);

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
  <div>
    <h3>{entry.date} {entryTypeIcon(entry)}</h3>
    <p>{entry.description}</p>
    <p>employer: {entry.employerName}</p>
    <DiagnoseCodes codes={entry.diagnosisCodes} />
    <hr />
  </div>
);

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const Entries = ({ entries }: { entries: Entry[] | undefined }) => {
  if (!entries || entries.length < 1) return null;
  return (
    <div>
      <h4>entries</h4>

      {entries.map(entry =>
        <EntryDetails entry={entry} key={entry.id} />
      )}
    </div>
  );
};

/*
      <hr />
      {entries.map(entry =>
        <div key={entry.id}>
          {entry.date} {entry.description}
          <DiagnoseCodes codes={entry.diagnosisCodes} />
          <hr />
        </div>
      )}
*/
export default Entries;