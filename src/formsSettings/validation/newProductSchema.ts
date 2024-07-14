import * as yup from 'yup';

const priceReg = new RegExp(/^[1-9]\d*$/);
const regExpUrl = new RegExp(
  /^(https?:\/\/)?(([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?$/
);

export const newProductSchema = yup.object().shape({
  title: yup.string().trim().required('Обязательное поле!'),
  price: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .matches(priceReg, 'Цена должна быть целым положительным числом!'),
  description: yup.string().required('Обязательное поле!'),
  image1: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .matches(regExpUrl, 'Некорректная ссылка!'),
  image2: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .matches(regExpUrl, 'Некорректная ссылка!'),
  image3: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .matches(regExpUrl, 'Некорректная ссылка!'),
});
