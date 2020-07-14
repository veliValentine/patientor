import React, { useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

import { useParams } from 'react-router-dom';
import { Patient } from '../types';

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

  return (
    <div>
      <h2>
        {patient.name}
        {patientGendre()}
      </h2>
      <p>ssn:{patient.ssn}</p>
      <p>occupation:{patient.occupation}</p>
    </div>
  );
};

export default SinglePatient;