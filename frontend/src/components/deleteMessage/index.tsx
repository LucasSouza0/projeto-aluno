import React from "react"
import { 
  Button, 
  Flex, 
  HStack, 
  Icon, 
  Popover, 
  PopoverArrow, 
  PopoverBody, 
  PopoverContent, 
  PopoverTrigger, 
  Portal, 
  Text, 
  useDisclosure 
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface DeleteMessageProps {
  children: React.ReactNode;
  message: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const DeleteMessage = ({ children, message, onCancel, onSuccess }: DeleteMessageProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Flex flexDirection='column' justifyContent='center' alignItems='center'>
              <Text fontSize='md' fontWeight='semibold'> {message} </Text>
              <Flex justifyContent='center' alignItems='center' mt='3'>
                <HStack spacing='3'>
                  <Button
                    size='xs'
                    colorScheme='blue'
                    borderRadius='md'
                    leftIcon={<CheckIcon />}
                    onClick={() => {
                      onClose()
                      onSuccess && onSuccess();
                    }}
                  >
                    Excluir
                  </Button>

                  <Button
                    size='xs'
                    colorScheme='red'
                    borderRadius='md'
                    leftIcon={<Icon as={AiOutlineCloseCircle} />}
                    onClick={() => {
                      onClose();
                      onCancel && onCancel();
                    }}
                  >
                    Cancelar
                  </Button>
                </HStack>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
