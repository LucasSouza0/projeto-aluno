import React from 'react';
import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, useBreakpointValue } from "@chakra-ui/react";

import { useSidebar } from '../../hooks/sidebar';

import { Navbar } from "./navbar";
import { Sidebar } from './sidebar';

interface MenuProps {
  children: React.ReactNode;
}

export const Menu = ({ children }: MenuProps) => {
  const { isOpen, closeSidebar } = useSidebar();
  const isWideVersion = useBreakpointValue({ base: false, md: true });

  return (
    <Box as="section" position='relative'>
      <Flex flexDirection='row' alignItems='start' position='relative'>
        {isWideVersion && <Sidebar />}
        <Navbar>
          {children}
        </Navbar>
      </Flex>

      {!isWideVersion &&
        <Drawer placement='left' onClose={closeSidebar} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
          <Sidebar isDrawer={true} />
          </DrawerContent>
        </Drawer>
      }
    </Box>
  );
}
