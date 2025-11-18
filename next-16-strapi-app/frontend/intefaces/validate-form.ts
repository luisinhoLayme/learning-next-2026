export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  password?: boolean;
  min?: number;
  max?: number;
  asyncValidation?: (value: string) => Promise<string | undefined>;
};

export type FieldValidation = {
  value: string | number | undefined;
  rules: ValidationRule;
};

export type Form = {
  [key: string]: FieldValidation;
};

// type ValidationRules = {
//     [key: string]: ValidationRule;
// };
//
// type FormData = {
//     [key: string]: string | number | undefined;
// };
//
export type ValidationErrors = {
  [key: string]: string;
};
