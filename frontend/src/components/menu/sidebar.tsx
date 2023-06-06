import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Image, useColorMode } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';

import { useSidebar } from '../../hooks/sidebar';

import { SidebarContent } from "./sidebarContent";

interface SidebarProps {
  isDrawer?: boolean;
}

export const Sidebar = ({ isDrawer }: SidebarProps) => {
  const { colorMode } = useColorMode();
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      {!isDrawer ? (
        <Flex
          w={isOpen ? 240 : 75}
          h='100vh'
          position='fixed'
          bg={colorMode === 'light' ? 'gray.600' : 'gray.900'}
          boxShadow='3px 8px 6px 0px rgba(0, 0, 0, .4)'
          flexDirection='column'
          transition='all .3s'
          zIndex={2}
        >
          <Flex w='100%' h='64px' px='6' flexDirection='row' justifyContent='space-between' alignItems='center'>
            {isOpen &&
              <Link to='/dashboard'>
                <Image
                  w='60%'
                  src='/assets/images/logo.png'
                  alt="Logo marca da empresa"
                />
              </Link>
            }

            <HamburgerIcon
              flex={!isOpen ? 1 : undefined}
              color='white'
              fontSize={!isOpen ? '3xl' : '2xl'}
              cursor='pointer'
              onClick={toggleSidebar}
            />
          </Flex>

          <SidebarContent />
        </Flex>
      ) : (
        <Flex
          w='100%'
          h='100vh'
          flexDirection='column'
          bg={colorMode === 'light' ? 'gray.600' : 'gray.900'}
        >
          <Flex w='100%' h='64px' px='6' flexDirection='row' justifyContent='space-between' alignItems='center'>
            {isOpen &&
              <Link to='/dashboard'>
                <Image
                  src='/assets/images/logo.png'
                  width={100}
                  height={100}
                  alt="Logo marca da empresa"
                />
              </Link>
            }

            <HamburgerIcon
              flex={!isOpen ? 1 : undefined}
              color='white'
              fontSize={!isOpen ? '3xl' : '2xl'}
              cursor='pointer'
              onClick={toggleSidebar}
            />
          </Flex>

          <SidebarContent />
        </Flex>
      )}
    </>
  );
}
