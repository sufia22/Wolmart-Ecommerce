import { useState } from "react";

const useFormField = (iniState) => {
  const [input, setInput] = useState(iniState);

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // reset form
  const resetForm = () => {
    setInput(iniState);
  };

  return { input, resetForm, handleInputChange, setInput };
};

export default useFormField;
