import React from 'react';
import { Box, List, VStack } from "@chakra-ui/react";
import { VscSignOut } from 'react-icons/vsc';

import { itensMenu } from '../../utils/menuItens';
import { SidebarItem } from "./sidebarItem";

export const SidebarContent = () => {
  const location = window.location.pathname;

  return (
    <Box w='100%' h='fit-content' px='3' py='6'>
      <List>
        <VStack spacing='3'>
          {itensMenu.map(item => (
            <SidebarItem
              key={item.id}
              active={item.url.includes(location || '/dasboard')}
              {...item}
            />
          ))}

          <SidebarItem
            id='signOut'
            active={false}
            icon={VscSignOut}
            title='Sair'
            url='/'
            signOut
          />
        </VStack>
      </List>
    </Box>
  );
}
