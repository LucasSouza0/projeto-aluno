import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Flex, Text, HStack, useColorMode, Icon } from "@chakra-ui/react";

import { StudentProps } from '../../../functions/students';

import { EditIcon } from "@chakra-ui/icons";
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { DeleteMessage } from '../../../components/deleteMessage';

interface StudentCardProps {
  student: StudentProps;
  onDelete?: (student: StudentProps) => void;
}

export const StudentCard = ({ student, onDelete }: StudentCardProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      px='2'
      py='6'
      bg={colorMode === 'light' ? 'white' : 'gray.900'}
      flex={1}
      alignContent='center'
      justifyContent='center'
      flexDirection='column'
      borderRadius='md'
      boxShadow='md'
    >
      <Box alignSelf='center'>
        <Avatar src={student.photo} name={student.name} size='xl' />
      </Box>

      <Box>
        <Text
          p='2'
          textAlign='center'
          fontSize='xl'
        >
          {student.name}
        </Text>

        <Text
          textAlign='center'
          color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
        >
          {student.email}
        </Text>
      </Box>

      <Flex justifyContent='center' alignItems='center' mt='4'>
        <HStack spacing='2'>
          <Link to={`/students/${student.id}`}>
            <Button
              size='sm'
              colorScheme='blue'
              borderRadius='full'
              leftIcon={<EditIcon />}
            >
              Detalhes
            </Button>
          </Link>

          <DeleteMessage
            message='Deseja deletar esse aluno?'
            onSuccess={() => onDelete && onDelete(student)}
          >
            <Button
              size='sm'
              colorScheme="red"
              variant='outline'
              borderRadius='full'
              leftIcon={<Icon as={AiOutlineCloseCircle} />}
            >
              Excluir
            </Button>
          </DeleteMessage>
        </HStack>
      </Flex>
    </Flex>
  );
}
