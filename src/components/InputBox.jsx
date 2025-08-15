import React from "react";

const InputBox = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Type here..."
      className="px-6 py-3 w-80 text-white text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      autoFocus
    />
  );
};

export default InputBox;
