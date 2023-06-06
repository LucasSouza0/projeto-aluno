import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { 
  FormControl, 
  Input as ChakraInput, 
  InputProps as ChakraInputProps, 
  Text, 
  FormErrorMessage 
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  label?: string;
  error?: FieldError;
}

const BaseInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ 
  label, error, ...rest 
}, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {label &&
        <Text
          as='label'
          fontWeight='semibold'
          fontSize={rest.size}
          mb='1'
        >
          {label}
        </Text>
      }

      <ChakraInput
        ref={ref}
        mt={label && '1'}
        {...rest}
      />

      {!!error &&
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      }
    </FormControl>
  )
}

export const Input = forwardRef(BaseInput);
