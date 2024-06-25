import * as yup from 'yup';

const regExpEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regExpUrl = new RegExp(
  /^(https?:\/\/)?(([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?$/
);

export const registrationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .matches(regExpEmail, 'Некорректный формат почты!'),
  password: yup
    .string()
    .required('Обязательное поле!')
    .min(5, 'Необходимо минимум 5 символов.'),
  login: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .min(3, 'Необходимо минимум 3 символа.'),
  avatarUrl: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .matches(regExpUrl, 'Некорректная ссылка!'),
});
