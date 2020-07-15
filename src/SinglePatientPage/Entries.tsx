import React from 'react';
import { Entry } from '../types';

const DiagnoseCodes = ({ codes }: { codes: string[] | undefined }) => {
  if (!codes) return null;
  return (
    <ul>
      {codes.map(code =>
        <li key={code}>{code}</li>
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