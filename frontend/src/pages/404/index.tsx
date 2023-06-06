import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';

export const Page404 = () => {
  return (
    <Flex flex={1} height='100vh' justifyContent='center' alignItems='center'>
      <Box h={20}>
        <HStack spacing={4}>
          <Text fontSize='2xl' fontWeight='bold'> 404 </Text>
          <Text fontSize='sm'> | </Text>
          <Text> This page could not be found. </Text>
        </HStack>
      </Box>
    </Flex>
  );
}