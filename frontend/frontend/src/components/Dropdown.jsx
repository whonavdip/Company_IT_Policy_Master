import React, { useState } from 'react';

const Dropdown = ({ options, onSelect, disabledOptions }) => {
  const handleChange = (e) => {
    const selectedOption = e.target.value;
    onSelect(selectedOption);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option} disabled={disabledOptions.includes(option)}>
          {option}
        </option>
      ))}
    </select>
  );
};

const App = () => {
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleSelect1 = (option) => {
    setSelectedOption1(option);
    setSelectedOption2('');
  };

  const handleSelect2 = (option) => {
    setSelectedOption2(option);
    setSelectedOption1('');
  };

  return (
    <div>
      <Dropdown
        options={options}
        onSelect={handleSelect1}
        disabledOptions={[selectedOption2]}
      />
      <Dropdown
        options={options}
        onSelect={handleSelect2}
        disabledOptions={[selectedOption1]}
      />
    </div>
  );
};

export default App;
