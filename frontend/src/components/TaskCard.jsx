import { Box, Text, Badge } from "@chakra-ui/react";
import React from "react";

const TaskCard = ({ id, name, description, status, onClick }) => {
  return (
    <Box
      overflow={"hidden"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      w={"full"}
      h={"100%"}
      cursor={"pointer"}
      boxShadow={"md"}
      p={2}
      borderWidth={1}
      borderRadius={"md"}
      bg={
        status === "Pending"
          ? "gray.300"
          : status === "In-progress"
          ? "yellow.100"
          : "green.300"
      }
      onClick={() => onClick({ id, name, description, status })}
      _hover={{ boxShadow: "lg" }}
      transition={"all"}
    >
      <Text color={"black"} fontWeight={"bold"} noOfLines={1}>
        {name}
      </Text>
      <Text color={"blackAlpha.800"} fontSize={"sm"} noOfLines={2}>
        {description}
      </Text>
      <Badge p={2} color={"white"} variant={"solid"} colorPalette={"purple"}>
        {status}
      </Badge>
    </Box>
  );
};

export default TaskCard;
