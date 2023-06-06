import React, { ChangeEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Flex, HStack, Icon, SimpleGrid, Text, useColorMode, useToast } from "@chakra-ui/react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiSave } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { StudentProps, saveStudent } from "../../../functions/students";
import { TextFormat } from "../../../utils/helpers";

import { Input } from "../../../components/input";

interface FormProps {
  student?: StudentProps;
  setStudent: (student: StudentProps) => void;
}

const schema = yup.object({
  name: yup.string().required('Por favor, insira seu nome!'),
  email: yup.string().email('Preencha um e-mail válido!').required('Por favor, insira seu e-mail!'),
  address: yup.string(),
  phone: yup.string().min(14, 'Preencha um número válido').max(15),
});

export const Form = ({ student, setStudent }: FormProps) => {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const back = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: student?.name,
      address: student?.address,
      email: student?.email,
      phone: student?.phone,
    },
  });

  const handleSave: SubmitHandler<yup.InferType<typeof schema>> = async (data) => {
    setLoading(true);
    saveStudent({
      ...data,
      id: student?.id,
    }).then(response => {
      setLoading(false);
      if (!response) {
        toast({
          title: 'Ocorreu um erro',
          description: 'Falha ao salvar o aluno',
          status: 'error',
          isClosable: true,
          position: 'top-right',
        });

        return;
      }

      toast({
        title: 'Sucesso',
        description: 'Dados salvos com sucesso',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });

      setStudent(response);
    });
  }

  return (
    <Flex
      p={5}
      bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      flex={1}
      borderRadius='md'
      flexDirection='column'
    >
      <Box flex={1}>
        <Text fontSize={{ base: 'md', lg: 'lg' }} fontWeight='bold'>
          Dados do aluno
        </Text>
        <Divider orientation="horizontal" my='3' />
      </Box>

      <form onSubmit={handleSubmit(handleSave)}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5} px={{ base: 'initial', md: 20 }}>
          <Input
            type="text"
            label="Nome"
            placeholder="Nome"
            error={errors['name']}
            {...register('name')}
          />

          <Input
            type="email"
            label="E-mail"
            placeholder='E-mail'
            error={errors['email']}
            {...register('email')}
          />

          <Input
            type="text"
            label="Telefone"
            placeholder="(51) 9999-9999"
            maxLength={15}
            error={errors['phone']}
            {...register('phone', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const text = TextFormat({ value: e.target.value, type: 'phone' });
                e.target.value = text;
              }
            })}
          />

          <Input
            type="text"
            label="Endereço"
            placeholder="Endereço"
            error={errors['address']}
            {...register('address')}
          />
        </SimpleGrid>

        <Flex
          mt={10}
          px={{ base: 'initial', md: 20 }}
          justifyContent='end'
        >
          <HStack>
            <Button
              colorScheme="blue"
              type='submit'
              isLoading={loading}
              leftIcon={<Icon as={FiSave} />}
            >
              Salvar
            </Button>

            <Button
              colorScheme="red"
              variant='outline'
              type='button'
              leftIcon={<Icon as={AiOutlineCloseCircle} />}
              onClick={() => back(-1)}
            >
              Cancelar
            </Button>
          </HStack>
        </Flex>
      </form>
    </Flex>
  );
}
