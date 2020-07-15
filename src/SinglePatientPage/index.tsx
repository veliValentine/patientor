import React, { useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

import { useParams } from 'react-router-dom';
import { Patient, Entry } from '../types';

import { Icon } from 'semantic-ui-react';
import { useStateValue, editPatient } from '../state';

const SinglePatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(editPatient(patientFromApi));
      } catch (e) {
        console.error(e.message);
      }
    };
    if (patients[id] === undefined || !patients[id].ssn) {
      getPatient();
    }
  }, [id, dispatch, patients]);

  const patient = patients[id];

  switch (patient) {
    case undefined:
      return <div>loading...</div>;
    case null:
      return <div>patient not found</div>;
    default:
      break;
  }

  const patientGendre = () => {
    switch (patient.gender) {
      case 'male':
        return <Icon name="mars" />;
      case 'female':
        return <Icon name="venus" />;
      case 'other':
        return <Icon name="genderless" />;
      default:
        return <></>;
    }
  };
  console.log({ patient });

  const entries = () => {
    if (!patient.entries || patient.entries.length < 1) {
      return null;
    }
    const entries = patient.entries;

    const diagnoseCodes = (entry: Entry) => {
      console.log({ entry });
      if (!entry.diagnosisCodes || entry.diagnosisCodes.length < 1) {
        return null;
      }
      return (
        <ul>
          {entry.diagnosisCodes.map(code =>
            <li key={code}>{code}</li>
          )}
        </ul>
      );
    };

    return (
      <div>
        <h4>entries</h4>
        {entries.map(entry =>
          <div key={entry.id}>
            {entry.date} {entry.description}
            {diagnoseCodes(entry)}
            <hr />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2>
        {patient.name}
        {patientGendre()}
      </h2>
      <p>ssn:{patient.ssn}</p>
      <p>occupation:{patient.occupation}</p>
      {entries()}
    </div>
  );
};

export default SinglePatient;