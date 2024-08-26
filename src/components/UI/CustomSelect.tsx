import Select from 'react-select';

import { ISelect } from '../../types/filters';
import { useTheme } from '../../hooks/useTheme';

interface IProps {
  name: string;
  options: ISelect[];
  value?: ISelect;
  selectHandler: (option: ISelect) => void;
}

export function CustomSelect({ name, options, value, selectHandler }: IProps) {
  const { theme } = useTheme();

  return (
    <Select
      options={options}
      value={value}
      onChange={(option) => selectHandler(option as ISelect)}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          width: name === 'filters' ? '240px' : 'auto',
          height: '42px',
          borderRadius: '6px',
          borderColor: theme === 'light' ? '#EEEEEE' : '#373737',
          backgroundColor: theme === 'light' ? '#fff' : '#282828',
          textAlign: name === 'newProduct' ? 'left' : 'start',
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: theme === 'light' ? '#1D1D1D' : '#fff',
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: 'none',
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: theme === 'dark' ? '#fff' : '#282828',
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: theme === 'light' ? '#fff' : '#282828',
        }),
        option: (baseStyles, { isSelected, isFocused }) => ({
          ...baseStyles,
          backgroundColor: isSelected
            ? '#0147FF'
            : isFocused
            ? 'rgba(163, 179, 217, 0.6)'
            : '',
          color: theme === 'light' ? '#1D1D1D' : '#fff',
        }),
      }}
    />
  );
}
