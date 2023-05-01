import { useState } from "react";

// useTogglePasswordVisibility is a custom hook that handles
// visibility and icons for a custom password input box
export const useTogglePasswordVisibility = () => {
  // create a state to hold the showPassword boolean value
  const [showPassword, setShowPassword] = useState(true);

  // create a state to hold the eye icon current state
  const [rightIcon, setRightIcon] = useState("eye");

  // handlePasswordVisibility is a function to handle
  // toggling visibility of the password text
  const handlePasswordVisibility = () => {
    switch (rightIcon) {
      case "eye":
        // if the icon text is eye to show visibility
        setRightIcon("eye-off");
        setShowPassword(!showPassword);
        break;
      case "eye-off":
        // if the icon text is eye-off to show NO visibility
        setRightIcon("eye");
        setShowPassword(!showPassword);
        break;
      default:
        // do nothing
        break;
    }
  };

  // return the password visibility state, icon and the toggle function
  return { showPassword, rightIcon, handlePasswordVisibility };
};
