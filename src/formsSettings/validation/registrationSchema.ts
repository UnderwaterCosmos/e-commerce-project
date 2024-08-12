import * as yup from 'yup';

const regExpEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regExpUrl = new RegExp(
  /^(https?:\/\/)?(([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?$/
);

export const registrationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('formErrors.required')
    .matches(regExpEmail, 'formErrors.incorrectEmail'),
  password: yup
    .string()
    .required('formErrors.required')
    .min(5, 'formErrors.fiveSymbolsMin'),
  confirmPassword: yup
    .string()
    .required('formErrors.required')
    .oneOf([yup.ref('password')], 'formErrors.wrongPasswordConfirm'),
  login: yup
    .string()
    .trim()
    .required('formErrors.required')
    .min(3, 'formErrors.threeSymbolsMin'),
  avatarUrl: yup
    .string()
    .trim()
    .required('formErrors.required')
    .matches(regExpUrl, 'formErrors.incorrectLink'),
});
