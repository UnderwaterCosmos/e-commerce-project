import Select, { SingleValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { ISelect } from '../../types/filters';

const selectOptions = [
  {
    value: 'ru',
    label: 'RU',
  },
  {
    value: 'en',
    label: 'EN',
  },
];

export function ChangeTranslation() {
  const { i18n } = useTranslation();

  const selectHandler = (language: SingleValue<ISelect>) => {
    i18n.changeLanguage(language?.value);
  };

  return (
    <Select
      options={selectOptions}
      value={selectOptions.find((option) => option.value === i18n.language)}
      onChange={selectHandler}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: '#EEEEEE',
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          color: '#1D1D1D',
        }),
      }}
    />
  );
}
