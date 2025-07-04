import { Flex, Box, VStack, Heading, Input, Button } from "@chakra-ui/react";
import { h1 } from "framer-motion/client";
import React, { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { useUserStore } from "@/store/user.global.js";

const NewTaskPage = () => {
  const { createTask } = useUserStore();
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
  });

  const handleTaskCreation = async () => {
    const taskCreated = await createTask(newTask);

    if (taskCreated.success) {
      toaster.create({
        title: taskCreated.message,
        type: "success",
      });

      setNewTask({ name: "", description: "" });
    } else {
      toaster.create({
        title: taskCreated.message,
        type: "error",
      });
    }
  };

  return (
    <Flex
      w={"full"}
      minH="100vh"
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        p={8}
        borderRadius="md"
        boxShadow="md"
        bg={"white"}
        w={"full"}
        maxW={"md"}
      >
        <VStack align={"stretch"}>
          <Heading
            as={h1}
            alignSelf={"center"}
            color={"black"}
            fontSize={"md"}
            fontWeight={"medium"}
          >
            Create new task
          </Heading>

          <Input
            type="text"
            color={"black"}
            w={"full"}
            placeholder="Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />

          <Input
            type="text"
            color={"black"}
            w={"full"}
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />

          <br />

          <Button
            bg={"purple.500"}
            color={"white"}
            onClick={handleTaskCreation}
          >
            Create
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default NewTaskPage;
