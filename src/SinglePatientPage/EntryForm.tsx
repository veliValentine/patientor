import React from 'react';
import { EntryFormValues } from './index';
import { Formik, Field, FieldProps, Form } from 'formik';
import { Button, Form as Formm } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';
import { NumberField } from '../AddPatientModal/FormField';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

const TextField: React.FC<TextProps> = ({ field, label, placeholder }) => (
  <Formm.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
  </Formm.Field>
);

const EntryForm: React.FC<Props> = ({ onSubmit }) => {
  //const { id } = useParams<{ id: string }>();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [''],
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form>
            <h4>New health check entry</h4>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            /><Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            /><Field
              label="DiagnosisCodes"
              placeholder="DiagnosisCodes"
              name="diagnosisCodes"
              component={TextField}
            /><Field
              label="HealthCheckRating"
              name="healthCheckRating"
              min={0}
              max={3}
              component={NumberField}
            />
            <Button
              type="submit"
              floated="right"
              color="green"
            >
              Add
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EntryForm;