import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Icon, Heading, HStack } from "@chakra-ui/react";

const NavbarLink = ({ isActive = false, path, title, icon }) => {
  const bg = isActive ? "purple.700" : "purple.500";

  return (
    <ChakraLink
      as={RouterLink}
      to={path}
      p={3}
      borderRadius="md"
      color="white"
      bg={bg}
      w={"full"}
    >
      <HStack w={"full"} spacing={3}>
        <Icon as={icon} size={"sm"} boxSize={4} />
        <Heading as={"h6"} fontSize={"md"} fontWeight={"medium"}>
          {title}
        </Heading>
      </HStack>
    </ChakraLink>
  );
};

export default NavbarLink;
