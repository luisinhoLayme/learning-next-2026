import type { Form, ValidationErrors } from "../intefaces/validate-form";

export async function validateForm(form: Form): Promise<ValidationErrors> {
  const errors: ValidationErrors = {};

  // Itera sobre los campos y sus reglas
  for (const field in form) {
    const { value, rules } = form[field];

    // Verificar si el campo es obligatorio
    if (rules.required && (value === undefined || value === '')) {
      errors[field] = `Missing ${field}.`;
      continue;
    }

    // Verificar longitud mínima
    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      errors[field] = `${field} must have at least ${rules.minLength} characters.`;
      continue;
    }

    // Verificar longitud máxima
    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      errors[field] = `${field} must have a maximum of ${rules.maxLength} characters.`;
      continue;
    }

    // Verificar si es un correo electrónico
    if (rules.email && typeof value === 'string' && !/\S+@\S+\.\S+/.test(value)) {
      errors[field] = `${field} must be a valid email.`;
      continue;
    }

    // Verificar si es un password
    if (rules.password && typeof value === 'string' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/.test(value)) {
      errors[field] = `The password must include uppercase, lowercase and numbers`
    }

    // Verificar mínimo de edad
    if (rules.min !== undefined && typeof value === 'number' && value < rules.min) {
      errors[field] = `The ${field} must be greater than or equal to ${rules.min}.`;
      continue;
    }

    // Verificar máximo de edad
    if (rules.max !== undefined && typeof value === 'number' && value > rules.max) {
      errors[field] = `The ${field} must be less than or equal to ${rules.max}.`;
      continue;
    }

    // Validación asincrónica (simulación de una validación externa)
    // if (rules.asyncValidation) {
    //   try {
    //     const asyncError = await rules.asyncValidation(value as string);
    //     if (asyncError) {
    //       errors[field] = asyncError;
    //     }
    //   } catch (error) {
    //     errors[field] = `Error al validar ${field}: ${error instanceof Error ? error.message : 'desconocido'}`;
    //   }
    // }
  }

  // Si hay errores, devolverlos
  return errors;
}

  // const form: Form = {
  //   name: {
  //     value: 'Juan',
  //     rules: {
  //       required: true,
  //       minLength: 3,
  //       maxLength: 50
  //     }
  //   },
  //   email: {
  //     value: ''+formData.email,
  //     rules: {
  //       required: true,
  //       email: true
  //     }
  //   },
  //   age: {
  //     value: 30,
  //     rules: {
  //       required: true,
  //       min: 18,
  //       max: 100
  //     }
  //   }
  // };
  //
  // const errors = await validateForm(form)
  // if (Object.keys(errors).length > 0) {
  //   return {ok: false, data: null, errors}
  // }
