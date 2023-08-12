import { useEffect, useRef, useState } from "react";

const useDropdownPopupControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  // handle click outside
  const handleClickOutside = (e) => {
    console.log(e.target);
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggleMenu, dropDownRef };
};

export default useDropdownPopupControl;
