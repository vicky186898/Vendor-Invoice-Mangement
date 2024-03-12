import React, { useState } from 'react';

const FilterButton = ({ onFilter }) => {
  const [CompanyName, setCompanyName] = useState('');

  const handleChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleClick = () => {
    onFilter(CompanyName);
  };

  return (
    <div>
      <input type="text" placeholder="Company Name" value={CompanyName} onChange={handleChange} />
      <button className="btn btn-primary" onClick={handleClick}>Filter</button>
    </div>
  );
};

export default FilterButton;
