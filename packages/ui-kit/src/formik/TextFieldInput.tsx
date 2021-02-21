import * as React from 'react';
import { darken, makeStyles, Theme, Typography } from '@material-ui/core';
import { Field, FieldProps, useField } from 'formik';
import clsx from 'clsx';
import { CustomColours } from '@types';
import { ErrorColours } from '../definitions/textField';
import { Contrast } from '../themes';

const useStyles = makeStyles((theme: Theme) => {
  const textFieldColours = {};
  Object.keys(ErrorColours).map((k: CustomColours) => {
    const colour = theme.palette[k];
    const dark = Contrast[k] === 'l';

    const contrastText = colour.contrastText;
    const background = colour.light;
    const inputbg = colour.light;
    const inputb = dark ? colour.dark : darken(colour.main, 0.5);
    const focus = dark ? darken(colour.main, 0.7) : darken(colour.main, 0.9);
    const errorText = ErrorColours[k];

    textFieldColours[`root-${k}-bg`] = {
      backgroundColor: background,
    };
    textFieldColours[`root-${k}-input`] = {
      borderColor: inputb,
      backgroundColor: inputbg,
      color: contrastText,
      '&:focus': {
        borderColor: focus,
      },
    };
    textFieldColours[`error-${k}-outline`] = {
      borderColor: errorText,
    };
    textFieldColours[`error-${k}-text`] = {
      color: errorText,
      [theme.breakpoints.only('xs')]: { fontSize: 5 },
      [theme.breakpoints.only('sm')]: { fontSize: 15 },
      [theme.breakpoints.only('md')]: { fontSize: 25 },
      [theme.breakpoints.only('lg')]: { fontSize: 35 },
      [theme.breakpoints.only('xl')]: { fontSize: 45 },
    };
  });

  return {
    ...textFieldColours,
    rootWrapper: {
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
    },
    inputRoot: {
      overflow: 'hidden',
      cursor: 'text',
      display: 'flex',
      textAlign: 'center',
      fontFamily:
        'OliverRegular,PumpkinCheesecake,Roboto,"Helvetica Neue",Arial,sans-serif',
      padding: theme.spacing(0.25),
      borderStyle: 'solid',
      borderRadius: theme.spacing(1),
      outline: 'none',
      '&:active': {
        outline: 'none',
      },
    },
    fullWidthInput: { width: `calc(100% - ${theme.spacing(1)}px)` },
    fullHeightInput: { height: `calc(100% - ${theme.spacing(1)}px)` },
    fullWidth: { width: `calc(100% - ${theme.spacing(2)}px)` },
    fullHeight: { height: `calc(100% - ${theme.spacing(2)}px)` },
  };
});

export type TextFieldInputProps = Omit<TextAreaProps, 'disabled' | 'className'> & {
  className?: string;
  colour?: CustomColours;
  fullWidth?: boolean;
};

export const TextFieldInput: React.FC<TextFieldInputProps> = ({
  className,
  colour = 'white',
  fullWidth = false,
  ...props
}) => {
  const cs = useStyles();

  return (
    <Field name={props.name}>
      {({ form: { isSubmitting }, meta: { touched, error } }: FieldProps<string>) => {
        return (
          <>
            <div
              className={clsx(className, cs.rootWrapper, cs[`root-${colour}-bg`], {
                [cs.fullHeight]: props.multiline,
                [cs.fullWidth]: fullWidth,
              })}
            >
              <TextArea
                {...props}
                disabled={isSubmitting}
                className={clsx(cs.inputRoot, cs[`root-${colour}-input`], {
                  [cs[`error-${colour}-outline`]]: !!error,
                  [cs.fullHeightInput]: props.multiline,
                  [cs.fullWidthInput]: fullWidth,
                })}
              />
              {touched && !!error && (
                <Typography className={clsx(cs[`error-${colour}-text`])}>
                  {error}
                </Typography>
              )}
            </div>
          </>
        );
      }}
    </Field>
  );
};

type TextAreaProps = {
  className: string;
  name: string;
  placeholder?: string;
  charLimit?: number;
  multiline?: boolean;
  disabled: boolean;
};

const useTextBoxStyles = makeStyles((theme: Theme) => ({
  textArea: {
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily:
      'OliverRegular,PumpkinCheesecake,Roboto,"Helvetica Neue",Arial,sans-serif',
    width: '100%',
    margin: 'auto',
    resize: 'none',
    '&:active': {
      outline: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  placeholder: {
    color: theme.palette.dull.main,
  },
  singleline: {
    whiteSpace: 'nowrap',
  },
}));

const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder: ph,
  multiline = false,
  charLimit: limit,
  disabled,
  className,
}) => {
  const cs = useTextBoxStyles();

  const charLimit = limit || multiline ? 100 : 18;

  const textArea = React.useRef<HTMLSpanElement>();

  const [{ value }, , helpers] = useField<string>(name);

  const [placeholder, setPlaceholder] = React.useState<string>(ph);

  const handleFocus = () => {
    setPlaceholder(undefined);
    textArea?.current.focus();
  };

  const handleBlur = () => {
    if (!textArea?.current?.textContent) setPlaceholder(ph);
    helpers.setValue(textArea?.current?.textContent);
  };

  React.useEffect(() => {
    if (value) setPlaceholder(undefined);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    const selection = window.getSelection();
    const selectionRange = Math.abs(selection.anchorOffset - selection.focusOffset);
    if (selectionRange) return;
    const AllowedKeys = [
      'Backspace',
      'Delete',
      'Escape',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ];
    if (
      textArea.current.textContent.length >= charLimit &&
      !AllowedKeys.includes(e.key) &&
      !e.ctrlKey
    ) {
      e.preventDefault();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const clipboardText = e.clipboardData.getData('Text');
    const textCotent = textArea.current.textContent;
    const selection = window.getSelection();
    const selectionRange = [selection.anchorOffset, selection.focusOffset];
    const [start, finish] = [Math.min(...selectionRange), Math.max(...selectionRange)];

    textArea.current.innerText = `${
      textCotent.slice(0, start) + clipboardText + textCotent.slice(finish, charLimit)
    }`.substring(0, charLimit);
  };

  return (
    <div onClick={handleFocus} className={className}>
      <span
        ref={textArea}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className={clsx(cs.textArea, {
          [cs.placeholder]: !!placeholder || disabled,
          [cs.singleline]: !multiline,
        })}
        contentEditable={!disabled}
        suppressContentEditableWarning={true}
      >
        {value || placeholder}
      </span>
    </div>
  );
};
