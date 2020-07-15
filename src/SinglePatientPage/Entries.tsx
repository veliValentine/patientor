import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';

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

const Entries = ({ entries }: { entries: Entry[] | undefined }) => {
  if (!entries || entries.length < 1) return null;
  return (
    <div>
      <h4>entries</h4>
      {entries.map(entry =>
        <div key={entry.id}>
          {entry.date} {entry.description}
          <DiagnoseCodes codes={entry.diagnosisCodes} />
          <hr />
        </div>
      )}
    </div>
  );
};

export default Entries;