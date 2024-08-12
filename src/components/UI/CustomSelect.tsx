import Select from 'react-select';
import { useTranslation } from 'react-i18next';

import { ISelect } from '../../types/filters';

interface IProps {
  name: string;
  options: ISelect[];
  value?: ISelect;
  selectHandler: (option: ISelect) => void;
}

export function CustomSelect({ name, options, value, selectHandler }: IProps) {
  const { t } = useTranslation();

  const translatedOptions = options.map((option) => ({
    ...option,
    label: t(`${option.label}`),
  }));
  const translatedValue = { ...value, label: t(`${value?.label}`) };

  return (
    <Select
      options={translatedOptions}
      value={translatedValue}
      onChange={(option) => selectHandler(option as ISelect)}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          width: name === 'filters' ? '240px' : 'auto',
          height: '42px',
          borderRadius: '6px',
          borderColor: '#EEEEEE',
          textAlign: name === 'newProduct' ? 'left' : 'start',
        }),
        option: (baseStyles, { isSelected, isFocused }) => ({
          ...baseStyles,
          backgroundColor: isSelected
            ? '#0147FF'
            : isFocused
            ? 'rgba(163, 179, 217, 0.6)'
            : '',
          color: isSelected ? 'white' : '',
        }),
      }}
    />
  );
}
