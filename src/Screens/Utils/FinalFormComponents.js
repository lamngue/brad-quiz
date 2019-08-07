import React from "react";
import {
  TreePicker,
  Input,
  Checkbox,
  InputNumber,
  CheckPicker,
  Button
} from "rsuite";

const ButtonAnswer = React.memo(props => {
  let { input, onSelect, select, meta, data, handleOnChange, ...rest } = props;
  return (
    <React.Fragment>
      <Button
        {...input}
        {...rest}
        block
        value={input.name}
        appearance = {select === input.name ? 'primary' : 'default'}
        onClick={value => {
          onSelect(value);
        }}
        onChange={value => {
          input.onChange(value);
          if (handleOnChange) handleOnChange(value);
        }}
      >
        {input.name}
      </Button>
      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </React.Fragment>
  )
});

const InputField = React.memo(props => {
  let { input, meta, data, handleOnChange, ...rest } = props;
  return (
    <React.Fragment>
      <Input
        {...input}
        {...rest}
        value={input.value}
        onChange={value => {
          input.onChange(value);
          if (handleOnChange) handleOnChange(value);
        }}
      />

      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </React.Fragment>
  );
});

const CheckPickerField = React.memo(props => {
  let { input, meta, data, handleOnChange, ...rest } = props;
  return (
    <React.Fragment>
      <CheckPicker
        {...input}
        {...rest}
        value={input.value}
        onChange={value => {
          debugger;
          input.onChange(value);
          if (handleOnChange) handleOnChange(value);
        }}
      />

      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </React.Fragment>
  );
});

const TextAreaField = React.memo(
  ({ input, meta, rows, handleOnChange, ...rest }) => (
    <React.Fragment>
      <textarea
        {...input}
        {...rest}
        rows={rows || 4}
        onChange={e => {
          input.onChange(e.target.value);
          if (handleOnChange) handleOnChange(e.target.value);
        }}
      />
      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </React.Fragment>
  )
);

// Textarea của rsuite

const RSTextAreaField = React.memo(props => {
  let { input, meta, data, rows, className, handleOnChange, ...rest } = props;
  return (
    <div className={className}>
      <Input
        componentClass="textarea"
        {...input}
        {...rest}
        value={input.value}
        rows={rows || 4}
        onChange={value => {
          input.onChange(value);
          if (handleOnChange) handleOnChange(value);
        }}
      />

      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
});

const TreePickerField = React.memo(
  ({ input, meta, data, handleOnChange, ...rest }) => {
    return (
      <React.Fragment>
        <TreePicker
          {...input}
          {...rest}
          data={data || []}
          onChange={value => {
            input.onChange(value);
            if (handleOnChange) handleOnChange(value);
          }}
        />

        {meta.error && meta.touched && (
          <span className="error">{meta.error}</span>
        )}
      </React.Fragment>
    );
  }
);

const CheckboxField = React.memo(
  ({ input, meta, label, handleOnChange, ...rest }) => {
    return (
      <React.Fragment>
        <Checkbox
          {...input}
          {...rest}
          checked={input.value}
          onChange={(value, checked) => {
            input.onChange(checked);
            if (handleOnChange) handleOnChange(checked);
          }}
        >
          {label}
        </Checkbox>

        {meta.error && meta.touched && (
          <span className="error">{meta.error}</span>
        )}
      </React.Fragment>
    );
  }
);

const InputNumberField = ({
  input,
  meta,
  data,
  label,
  handleOnChange,
  ...rest
}) => {
  return (
    <React.Fragment>
      <InputNumber
        {...input}
        {...rest}
        value={input.value}
        onChange={value => {
          input.onChange(value);
          if (handleOnChange) handleOnChange(value);
        }}
      >
        {label}
      </InputNumber>

      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </React.Fragment>
  );
};

export {
  ButtonAnswer,
  TextAreaField,
  RSTextAreaField,
  TreePickerField,
  InputField,
  CheckboxField,
  InputNumberField,
  CheckPickerField
};
