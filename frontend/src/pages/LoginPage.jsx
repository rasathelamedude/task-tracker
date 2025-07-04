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
import { useUserStore } from "../store/user.global";
import { toaster } from "@/components/ui/toaster";

const LoginPage = () => {
  const navigate = useNavigate();
  const { validateUser } = useUserStore();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const response = await validateUser(credentials);

    if (response.success) {
      toaster.create({
        title: response.message,
        type: "success",
        closable: true,
      });

      navigate("/dashboard");
    } else {
      toaster.create({
        title: response.message,
        type: "error",
        closable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" w={"full"} align="center" justify="center" bg="gray.50">
      <Box p={8} borderRadius="md" boxShadow="md" bg="white" w="full" maxW="md">
        <VStack spacing={4} align="stretch">
          <Heading size="lg" textAlign="center" color={"black"}>
            Login
          </Heading>

          <br />

          <Input
            color={"black"}
            placeholder="Email"
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />

          <Input
            color={"black"}
            placeholder="Password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />

          <Button
            color={"white"}
            bg={"purple.500"}
            colorScheme="blue"
            onClick={handleLogin}
          >
            Login
          </Button>

          <hr />

          <Text fontSize="sm" textAlign="center" color={"black"}>
            Don't have an account?{" "}
            <Link as={RouterLink} to="/signup" color="purple.500">
              Sign up
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
