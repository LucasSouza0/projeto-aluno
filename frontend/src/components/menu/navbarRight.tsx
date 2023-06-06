import React from 'react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Avatar, HStack, Icon, useColorMode } from "@chakra-ui/react"
import { MdNotificationsNone } from "react-icons/md"

import { useAuth } from "../../hooks/auth"

export const NavbarRight = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userLocal } = useAuth();

  return (
    <HStack spacing='5'>
      {colorMode === 'light' ? (
        <MoonIcon
          fontSize='2xl'
          cursor='pointer'
          onClick={() => toggleColorMode()}
          color={{
            base: 'gray.50',
            md: 'initial'
          }}
        />
      ) : (
        <SunIcon
          fontSize='2xl'
          cursor='pointer'
          onClick={() => toggleColorMode()}
          color={{
            base: 'gray.50',
            md: 'initial'
          }}
        />
      )}
      
      <Avatar
        name={userLocal?.name}
        size='sm'
        cursor='pointer'
        colorScheme="gray"
      />
    </HStack>
  )
}