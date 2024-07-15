import * as yup from 'yup';

const priceReg = new RegExp(/^[1-9]\d*$|^$/);
const regExpUrl = new RegExp(
  /^(https?:\/\/)?(([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?$|^$/
);

export const editProductSchema = yup.object().shape({
  title: yup.string().trim(),
  price: yup
    .string()
    .trim()
    .matches(priceReg, 'Цена должна быть целым положительным числом!'),
  description: yup.string().trim(),
  image1: yup.string().trim().matches(regExpUrl, 'Некорректная ссылка!'),
  image2: yup.string().trim().matches(regExpUrl, 'Некорректная ссылка!'),
  image3: yup.string().trim().matches(regExpUrl, 'Некорректная ссылка!'),
});
