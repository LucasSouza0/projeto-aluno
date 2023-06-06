import React from 'react';
import { Box, Container, Flex, useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';

import { useSidebar } from '../../hooks/sidebar';

import { NavbarRight } from './navbarRight';
import { Breadcrumb } from './breadcrumb';

interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar = ({ children }: NavbarProps) => {
  const isWideVersion = useBreakpointValue({ base: false, md: true });
  const { colorMode } = useColorMode();
  const { isOpen, openSidebar } = useSidebar();

  return (
    <Box flex='1' position='relative'>
      <Flex
        w='100%'
        position='fixed'
        zIndex={1}
        bg={{
          base: colorMode === 'light' ? 'gray.600' : 'gray.900',
          md: colorMode === 'light' ? 'white' : 'gray.800',
        }}
        flexDirection='row'
      >
        {!isWideVersion &&
          <Flex
            px='3'
            py='4'
            justifyContent='start'
            alignItems='center'
          >
            <HamburgerIcon
              fontSize='3xl'
              cursor='pointer'
              color='white'
              onClick={openSidebar}
            />
          </Flex>
        }

        {isWideVersion &&
          <Flex
            flex={1}
            px='6'
            py='4'
            pl={{ base: 'initial', md: isOpen ? 260 : 95 }}
            justifyContent='start'
            alignItems='center'
            transition='all .3s'
          >
            <Breadcrumb />
          </Flex>
        }

        <Flex
          flex={1}
          px={{ base: '3', md: '6' }}
          py='4'
          justifyContent='end'
          alignItems='center'
        >
          <NavbarRight />
        </Flex>
      </Flex>

      <Container
        p='6'
        pt='20'
        pl={{ md: isOpen ? 260 : 95 }}
        maxW='full'
        position='relative'
        transition='all .3s'
      >
        {children}
      </Container>
    </Box>
  )
}
