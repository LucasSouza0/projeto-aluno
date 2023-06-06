import React, { ChangeEvent, useRef, useState } from 'react';
import { Avatar, Box, Flex, HStack, Input, Spinner, Text, Tooltip, useColorMode, useToast } from "@chakra-ui/react";

import { StudentProps, savePhoto } from "../../../functions/students";
import { DeleteIcon } from '@chakra-ui/icons';

interface MenuProps {
  student?: StudentProps;
  setStudent: (student: StudentProps) => void;
}

export const Menu = ({ student, setStudent }: MenuProps) => {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSaveImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && student) {
      const file = event.target?.files[0];
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      setLoading(true);
      savePhoto(student?.id, dataTransfer.files).then(response => {
        setLoading(false);
        if (!response) {
          toast({
            title: 'Ocorreu um erro',
            description: 'Falha ao atualizar avatar',
            status: 'error',
            isClosable: true,
            position: 'top-right',
          });

          return;
        }

        toast({
          title: 'Sucesso',
          description: 'Avatar atualizado com sucesso',
          status: 'success',
          isClosable: true,
          position: 'top-right',
        });
        setStudent(response);
      });
    }
  }

  const handleRemoveImage = () => {
    if (student) {
      setLoading(true);
      savePhoto(student.id, undefined).then(response => {
        setLoading(false);
        if (!response) {
          toast({
            title: 'Ocorreu um erro',
            description: 'Falha ao atualizar avatar',
            status: 'error',
            isClosable: true,
            position: 'top-right',
          });

          return;
        }

        toast({
          title: 'Sucesso',
          description: 'Avatar atualizado com sucesso',
          status: 'success',
          isClosable: true,
          position: 'top-right',
        });
        
        setStudent(response);
      });
    }
  }

  return (
    <Flex
      py={5}
      px={10}
      bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      borderRadius='md'
      flexDirection='column'
    >
      <Flex w='100%' justifyContent='center' alignItems='center' flexDirection='column'>
        {loading &&
          <>
            <Spinner size='lg' alignSelf='center' />
            <Text> Alterando avatar... </Text>
          </>
        }

        {!loading &&
          <Tooltip
            p='1'
            ml='3'
            bg={colorMode === 'light' ? 'gray.800' : 'gray.50'}
            hasArrow
            label={student?.id && 'Atualizar avatar'}
            color={colorMode === 'light' ? 'white' : 'black'}
            placement='right'
            fontSize='md'
          >
            <Avatar
              src={student?.photo}
              name={student?.name || 'Novo aluno'}
              size={{ base: 'md', lg: 'xl' }}
              cursor='pointer'
              onClick={() => student?.id && inputRef.current?.click()}
            />
          </Tooltip>
        }

        {student?.photo &&
          <Flex
            mt='4'
            justifyContent='center'
            alignItems='center'
            cursor='pointer'
            fontSize='sm'
            onClick={handleRemoveImage}
          >
            <HStack spacing={1}>
              <DeleteIcon color='red.600' />
              <Text color='red.600'> Remover avatar </Text>
            </HStack>
          </Flex>
        }

        <Input
          ref={inputRef}
          type='file'
          accept=".jpg, .jpeg, .png"
          placeholder='image-profile'
          display='none'
          onChange={handleSaveImage}
        />

        <Text
          mt='3'
          fontSize={{ base: 'lg', md: 'xl' }}
          fontWeight='semibold'
        >
          {student?.name || 'Novo aluno'}
        </Text>

        <Text
          textAlign='center'
          color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
        >
          {student?.email}
        </Text>
      </Flex>
    </Flex>
  );
}
