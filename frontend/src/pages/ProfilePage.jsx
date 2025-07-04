import React, { useEffect, useState } from "react";
import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import EditUserPage from "./EditUserPage";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/v1/users/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      setUserDetails(data.data.user);
    };

    getUserDetails();
  }, [shouldRefresh]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      {isBeingEdited && (
        <EditUserPage
          id={userDetails._id}
          username={userDetails.username}
          email={userDetails.email}
          password={userDetails.password}
          onClose={() => setIsBeingEdited(false)}
          refresh={() => setShouldRefresh((prev) => !prev)}
        />
      )}
      <Box p={6} maxW="600px" mx="auto">
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading color={"black"} size="md">
              {userDetails.username}
            </Heading>
            <Button color="white" bg="red.500" onClick={handleLogout}>
              Log out
            </Button>
          </HStack>

          <Button
            onClick={() => {
              setIsBeingEdited((prev) => !prev);
            }}
            color="white"
            bg="purple.500"
            alignSelf="flex-start"
          >
            Edit Profile
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default ProfilePage;
