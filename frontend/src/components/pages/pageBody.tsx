import React from 'react';
import { Box, BoxProps, Spinner, Text, useColorMode } from "@chakra-ui/react"

interface PageBodyProps extends BoxProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

export const PageBody = ({ isLoading, children, ...rest }: PageBodyProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
      p='4'
      flex={1}
      borderRadius='md'
      boxShadow='sm'
      {...rest}
    >
      {isLoading ? (
        <Box w='100%' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
          <Spinner size='lg' />
          <Text fontSize='sm' mt='3'> Buscando registros... </Text>
        </Box>
      ) : (
        children
      )}
    </Box>
  );
}
