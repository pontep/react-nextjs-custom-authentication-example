import { useColorMode } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      color={colorMode === "dark" ? "orange" : "indigo"}
    />
  );
};

export default ThemeToggleButton;
