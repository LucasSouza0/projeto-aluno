import React from 'react';
import { Link } from "react-router-dom";
import { HStack, Icon, ListItem, Text, Tooltip, useColorMode } from "@chakra-ui/react"

import { useSidebar } from '../../hooks/sidebar';
import { useAuth } from '../../hooks/auth';
import type { MenuItensProps } from '../../utils/menuItens';

interface SidebarItem extends MenuItensProps {
  active?: boolean;
  signOut?: boolean;
}

export const SidebarItem = (item: SidebarItem) => {
  const { colorMode } = useColorMode();
  const { isOpen } = useSidebar();
  const { logout } = useAuth();

  return (
    <ListItem
      w='100%'
      p='2'
      bg={item.active ? 'gray.500' : undefined}
      display='flex'
      alignItems='center'
      fontSize='lg'
      borderRadius='md'
      color='white'
      cursor='pointer'
      _hover={{
        transition: 'all .5s',
        background: 'gray.500'
      }}
    >
      <Link
        to={item.url}
        target={item.external ? "_blank" : "_self"}
        style={{ width: '100%' }}
        onClick={() => item?.signOut && logout()}
      >
        {!isOpen ? (
          <Tooltip
            p='1'
            ml='3'
            bg={colorMode === 'light' ? 'gray.800' : 'gray.50'}
            hasArrow
            label={item.title}
            color={colorMode === 'light' ? 'white' : 'black'}
            placement='right'
            fontSize='md'
          >
            <HStack
              spacing='3'
              display='flex'
              flexDirection='column'
            >
              <Icon as={item.icon} fontSize='2xl' />
            </HStack>
          </Tooltip>
        ) : (
          <HStack spacing='3'>
            <Icon as={item.icon} />
            <Text> {item.title} </Text>
          </HStack>
        )}
      </Link>
    </ListItem>
  );
}
