import { useUserContext } from "../../libs/user-context";
import ThemeToggleButton from "../button/themeToggleButton";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  const { user, logout } = useUserContext();
  return (
    <Container maxW={"2xl"} p={"1rem 0"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading>AppName</Heading>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={4}
        >
          {user && (
            <>
              <Text>{user?.email}</Text>
              <div>
                <Button variant={"outline"} onClick={logout}>
                  Logout
                </Button>
              </div>
            </>
          )}
          <ThemeToggleButton />
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
