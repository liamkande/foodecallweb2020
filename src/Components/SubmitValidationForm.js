import React from "react"
import { Field, reduxForm } from "redux-form"
import submit from "../utils/submit"
import TextField from '@material-ui/core/TextField'

const renderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderEmailField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const SubmitValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field
        type="text"
        component={renderField}
        placeholder="Email"
        name="username"
      />

      <Field
        type="password"
        component={renderField}
        placeholder="Password"
        name="password"
      />
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Log In
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "submitValidation" // a unique identifier for this form
})(SubmitValidationForm);
