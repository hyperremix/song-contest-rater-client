import { Dispatch, FormEvent, useState } from 'react';

export const useFormFields = (
  initialState: any,
): [any, (event: any) => void] => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    event => {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
};

export const onChangeHandler = <T>(
  base: T | null,
  reducer: (
    payload: T,
  ) => {
    payload: T;
    type: string;
  },
  dispatch: Dispatch<any>,
  event: any,
) => {
  const value = event.target.value ? event.target.value : event.target.checked;

  dispatch(
    reducer({
      ...base!,
      [event.target.id]: value,
    }),
  );
};

export const onSubmitFormHandler = (
  dispatch: Dispatch<any>,
  reducer: () => {
    payload: undefined;
    type: string;
  },
  event?: FormEvent<HTMLFormElement>,
) => {
  if (event !== undefined && event.preventDefault) {
    event.preventDefault();
  }

  dispatch(reducer());
};
