import React, { useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

import { useParams } from 'react-router-dom';
import { Patient, HealthCheckEntry, Entry } from '../types';

import { Icon } from 'semantic-ui-react';
import { useStateValue, editPatient, updatePatient } from '../state';
import Entries from './Entries';
import EntryForm from './EntryForm';

export type EntryFormValues = Omit<HealthCheckEntry, 'id' | 'type'>;

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

  const onSubmit = async (values: EntryFormValues) => {
    try {
      const { data: entryFromApi } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      const p = patient.entries ? {...patient, entries: patient.entries.concat(entryFromApi)} : {...patient, entries: [entryFromApi]};
      dispatch(updatePatient(p));
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  return (
    <div>
      <h2>
        {patient.name}
        {patientGendre()}
      </h2>
      <p>ssn:{patient.ssn}</p>
      <p>occupation:{patient.occupation}</p>

      <Entries entries={patient.entries} />
      <EntryForm onSubmit={onSubmit} />
    </div>
  );
};


export default SinglePatient;