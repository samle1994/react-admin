import React from "react";
import PropTypes from "prop-types";
const Input = (props) => {
  const { id, type, defaultValue, frmField, err, errMessage, ...others } =
    props;
  const classInput = `form-control ${err ? "is-invalid" : ""}`;
  return (
    <>
      {others["rows"] ? (
        <textarea
          className={classInput}
          id={id}
          defaultValue={defaultValue}
          {...others}
          {...frmField}
        ></textarea>
      ) : (
        <input
          className={classInput}
          autoComplete="off"
          defaultValue={defaultValue}
          id={id}
          {...others}
          {...frmField}
        />
      )}
      {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
    </>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["text", "url", "email", "number", "password"]),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  frmField: PropTypes.object,
  err: PropTypes.string,
  errMessage: PropTypes.string,
};

export default Input;
