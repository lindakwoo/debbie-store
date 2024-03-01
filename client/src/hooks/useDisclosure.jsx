import React, { useState } from "react";

const useDisclosure = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

export default useDisclosure;
