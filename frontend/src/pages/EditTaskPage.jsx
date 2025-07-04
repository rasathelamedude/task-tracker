import { useUserStore } from "../store/user.global.js";
import {
  Button,
  Heading,
  HStack,
  Input,
  VStack,
  Box,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { IoCloseSharp } from "react-icons/io5";

const EditTaskPage = ({ id, name, description, status, onClose, onEdit }) => {
  const { editTask, deleteTask } = useUserStore();

  const [newTaskValues, setNewTaskValues] = useState({
    id,
    name,
    description,
    status,
  });

  const handleEdit = async () => {
    const editedTask = await editTask({
      id: newTaskValues.id,
      name: newTaskValues.name,
      description: newTaskValues.description,
      status: newTaskValues.status,
    });

    if (editedTask.success) {
      toaster.create({
        title: editedTask.message,
        type: "success",
        closable: true,
      });

      onClose();
      onEdit();
    } else {
      toaster.create({
        title: editedTask.message,
        type: "error",
        closable: true,
      });
    }
  };

  const handleDelete = async () => {
    const deletedTask = await deleteTask(newTaskValues.id);

    if (deletedTask.success) {
      toaster.create({
        title: deletedTask.message,
        type: "success",
        closable: true,
      });

      onClose();
      onEdit();
    } else {
      toaster.create({
        title: deletedTask.message,
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
            Edit Task
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
          placeholder="Name"
          value={newTaskValues.name}
          onChange={(e) =>
            setNewTaskValues({ ...newTaskValues, name: e.target.value })
          }
        />
        <Input
          color={"black"}
          type="text"
          placeholder="Description"
          value={newTaskValues.description}
          onChange={(e) =>
            setNewTaskValues({ ...newTaskValues, description: e.target.value })
          }
        />

        <select
          value={newTaskValues.status}
          onChange={(e) =>
            setNewTaskValues({ ...newTaskValues, status: e.target.value })
          }
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #CBD5E0", // Chakra's gray.300
            backgroundColor: "#F7FAFC", // Chakra's gray.50
            fontSize: "16px",
            color: "#2D3748", // Chakra's gray.800
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
            marginTop: "4px",
            marginBottom: "4px",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <option value={"Pending"}>Pending</option>
          <option value={"In-progress"}>In-progress</option>
          <option value={"Completed"}>Completed</option>
        </select>

        <HStack>
          <Button bg={"purple.500"} color={"white"} onClick={handleEdit}>
            Edit task
          </Button>
          <Button bg={"red.500"} color={"white"} onClick={handleDelete}>
            Delete task
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default EditTaskPage;
