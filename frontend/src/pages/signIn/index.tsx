import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, VStack, Button, Heading, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { Input } from '../../components/input';

const schema = yup.object({
  email: yup.string().email('Preencha um e-mail válido!').required('Preencha o e-mail'),
  password: yup.string().required('Preencha a senha!'),
});

export const SignIn = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { login, userLocal } = useAuth();

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigation = useNavigate();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
  });

  const handleLogin: SubmitHandler<yup.InferType<typeof schema>> = async (data) => {
    setLoading(true);
    login(data).then(response => {
      setLoading(false);

      if (!response) {
        toast({
          title: 'Ação não autorizada.',
          description: 'Usuário ou senha inválidos.',
          status: 'error',
          isClosable: true,
          position: 'top-right',
        });

        return;
      }

      navigation('/dashboard');
    });
  }

  useEffect(() => {
    if (userLocal) {
      navigation('/dashboard')
    }
  }, [userLocal]);

  return (
    <Flex justifyContent='center' alignItems='center' h='100vh' w='100vw'>
      <Flex direction="column" background={formBackground} p='12' rounded='6' w='lg'>
        <Heading mb='6'> Login
          <Button onClick={toggleColorMode} ml={10}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Heading>
        
        <VStack 
          w='100%'
          as="form" 
          px='8'
          py='4'
          action='#' 
          spacing='4' 
          borderRadius='md'
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input 
            type="email" 
            placeholder="youremail@mail.com" 
            error={errors['email']}
            {...register('email')}
          />

          <Input 
            type='password' 
            placeholder="******" 
            error={errors['password']}
            {...register('password')}
          />

          <Button 
            w='100%'
            type='submit'
            colorScheme='teal' 
            size='md' 
            fontSize='md'
            isLoading={loading}
            disabled={loading}
          >
            Log in
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
}
