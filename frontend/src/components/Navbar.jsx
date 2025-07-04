import React from "react";
import { VStack } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";
import NavbarLink from "./NavbarLink.jsx";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <VStack
        minH={"100vh"}
        w={"240px"}
        minW={"240px"}
        color={"white"}
        bg={"purple.500"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        py={10}
      >
        <NavbarLink
          path="/dashboard"
          isActive={location.pathname.startsWith("/dashboard") ? true : false}
          title="Dashboard"
          icon={FaCalendarAlt}
        />
        <NavbarLink
          path="/new-task"
          isActive={location.pathname.startsWith("/new-task") ? true : false}
          title="New task"
          icon={FaRegPenToSquare}
        />
        <NavbarLink
          path="/profile"
          isActive={location.pathname.startsWith("/profile") ? true : false}
          title="Account"
          icon={MdOutlineManageAccounts}
        />
      </VStack>
    </>
  );
};

export default Navbar;
