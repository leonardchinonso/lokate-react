import { useState } from "react";

const useTogglePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");

  console.log(showPassword, rightIcon);

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setShowPassword(!showPassword);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setShowPassword(!showPassword);
    }
  };

  return { showPassword, rightIcon, handlePasswordVisibility };
};

export default useTogglePasswordVisibility;
