import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useUserStore } from "@/store/user.global";
import { toaster } from "@/components/ui/toaster";
import {
  Box,
  VStack,
  HStack,
  Button,
  Input,
  Icon,
  Heading,
} from "@chakra-ui/react";

const EditUserPage = ({ id, username, email, onClose, refresh }) => {
  const { editUser, deleteUser } = useUserStore();
  const [newUserDetails, setNewUserDetails] = useState({
    id,
    username,
    email,
    password: ""
  });

  const handleEdit = async () => {
    const response = await editUser(newUserDetails);

    if (response.success) {
      toaster.create({
        title: response.message,
        type: "success",
        closable: true,
      });

      onClose();
      refresh();
    } else {
      toaster.create({
        title: response.message,
        type: "error",
        closable: true,
      });
    }
  };

  const handleDelete = async () => {
    const response = await deleteUser(id);

    if (response.success) {
      onClose();
      localStorage.removeItem("token");
      window.location.href = "/";

      toaster.create({
        title: response.message,
        type: "success",
        closable: true,
      });
    } else {
      toaster.create({
        title: response.message,
        type: "error",
        closable: true,
      });
    }
  };
  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="white"
      zIndex="999"
      boxShadow="2xl"
      borderRadius="md"
      p={6}
      minW="400px"
    >
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between">
          <Heading color={"black"} fontSize={"md"} fontWeight="bold">
            Edit User
          </Heading>
          <Icon
            as={IoCloseSharp}
            boxSize={6}
            cursor="pointer"
            onClick={onClose}
            color={"black"}
          />
        </HStack>

        <Input
          color={"black"}
          type="text"
          placeholder="Username"
          value={newUserDetails.username}
          onChange={(e) =>
            setNewUserDetails({ ...newUserDetails, username: e.target.value })
          }
        />
        <Input
          color={"black"}
          type="text"
          placeholder="Email"
          value={newUserDetails.email}
          onChange={(e) =>
            setNewUserDetails({ ...newUserDetails, email: e.target.value })
          }
        />
        <Input
          color={"black"}
          type="password"
          placeholder="New password"
          value={newUserDetails.password}
          onChange={(e) =>
            setNewUserDetails({ ...newUserDetails, password: e.target.value })
          }
        />

        <HStack>
          <Button bg={"purple.500"} color={"white"} onClick={handleEdit}>
            Edit User
          </Button>
          <Button bg={"red.500"} color={"white"} onClick={handleDelete}>
            Delete User
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default EditUserPage;
