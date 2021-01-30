import React from 'react';


const Select = ({ options, valueKey, titleKey, allTitle, value, onSelect }) => {
  return (
    <select onChange={onSelect}>
      <option value="">{allTitle}</option>
      {options.map(option =>
        <option key={option[titleKey] + option[valueKey]}
                value={option[valueKey]}>
                  {option[titleKey]}
         </option>
       )}
    </select>
  );
};

export default Select;