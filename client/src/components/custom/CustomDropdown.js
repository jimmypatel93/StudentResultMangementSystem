import { Form } from 'react-bootstrap';

export const CustomDropdown = (props) => {
  const {
    labelText,
    options,
    id,
    handleInputChange,
    required,
    value,
    controlClassName,
    labelClassName,
  } = props;

  return (
    <>
      <Form.Group controlId={id}>
        <Form.Label className={labelClassName}>{labelText}</Form.Label>
        <Form.Control
          as="select"
          name={id}
          onChange={handleInputChange}
          required={required}
          value={value}
          className={controlClassName}
        >
          <option value={''}>Select</option>
          {options &&
            options instanceof Array &&
            options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.text}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
    </>
  );
};
