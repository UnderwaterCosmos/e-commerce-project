import * as yup from 'yup';

const engName = new RegExp(/^[a-z]+$/);
const rusName = new RegExp(/^[А-Яа-яЁё]+$/);

export const newCategorySchema = yup.object().shape({
  value: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .test(
      'isFirstLetterOrdinary',
      'Первая буква должна быть в нижнем регистре!',
      (value) => {
        return value ? value[0] === value[0].toLowerCase() : false;
      }
    )
    .matches(engName, 'Название должно состоять только из букв латиницы!'),
  label: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .test(
      'isFirstLetterCapitalized',
      'Первая буква должна быть заглавной!',
      (value) => {
        return value ? value[0] === value[0].toUpperCase() : false;
      }
    )
    .matches(rusName, 'Название должно состоять только из букв кириллицы!'),
});
