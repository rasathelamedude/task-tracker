import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  Link,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user.global.js";
import { toaster } from "@/components/ui/toaster";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { createUser } = useUserStore();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    const response = await createUser(user);

    if (response.success) {
      toaster.create({
        title: "User created successfully",
        type: "success",
      });

      navigate("/login");
    } else {
      toaster.create({
        title: response.message,
        type: "error",
        closable: true,
      });
    }
  };

  return (
    <Flex w={"full"} minH="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} borderRadius="md" boxShadow="md" bg="white" w="full" maxW="md">
        <VStack spacing={4} align="stretch">
          <Heading size="lg" textAlign="center" color={"black"}>
            Sign Up
          </Heading>

          <Input
            color={"black"}
            placeholder="Username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <Input
            color={"black"}
            placeholder="Email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <Input
            color={"black"}
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <Button
            color={"white"}
            bg={"purple.500"}
            colorScheme="blue"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>

          <hr />

          <Text fontSize="sm" textAlign="center" color={"black"}>
            Already have an account?{" "}
            <Link as={RouterLink} to="/login" color="purple.500">
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
