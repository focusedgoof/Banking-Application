import React, { useState, forwardRef } from 'react';
import { TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import './Form.css';

const Form = forwardRef(({ formFields, onSubmit, formData, buttonLabel }, ref) => {
  const [formValues, setFormValues] = useState(formData || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues({});
  };

  return (
    <form className="custom-form" onSubmit={handleFormSubmit} ref={ref}>
      {formFields.map((field, index) => (
        <div className="form-field" key={index}>
          <TextField
            fullWidth
            type={field.type || 'text'}
            id={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={formValues[field.name] || ''}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <Button className="submit-button" variant="contained" type="submit">
        {buttonLabel}
      </Button>
    </form>
  );
});

Form.propTypes = {
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
  buttonLabel: PropTypes.string.isRequired,
};

export default Form;
