import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import { Divider, Flex, HStack, Input, InputGroup, InputRightElement, Text, useColorMode } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  subTitle?: string | JSX.Element;
  hasSearch?: boolean;
  buttons?: JSX.Element[];
  backButton?: boolean;
  onChangeSearch?: (searchText: string) => void;
}

let timeSearch = setTimeout(() => { });

export const PageHeader = ({
  title,
  subTitle,
  hasSearch,
  buttons,
  backButton,
  onChangeSearch
}: PageHeaderProps) => {
  const back = useNavigate();
  const { colorMode } = useColorMode();

  return (
    <Flex
      w='100%'
      p='4'
      bg={colorMode == 'light' ? 'gray.50' : 'gray.700'}
      borderRadius='md'
      flexDirection='row'
      justifyContent='space-between'
      alignContent='center'
      boxShadow='sm'
    >
      {backButton &&
        <Flex pr='6' alignItems='center'>
          <ArrowBackIcon
            fontSize='2xl'
            cursor='pointer'
            onClick={() => back(-1)}
          />
        </Flex>
      }

      <Flex flex={1} alignItems='center' flexDirection='row'>
        <HStack spacing='5'>
          <Text fontSize='xl' fontWeight='bold'> {title} </Text>
          <Divider orientation='vertical' h={'10'} />

          {typeof subTitle === 'string' ? (
            <Text> {subTitle} </Text>
          ) : (
            subTitle
          )}

          {hasSearch &&
            <InputGroup width='auto'>
              <InputRightElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
              </InputRightElement>
              <Input
                type='text'
                placeholder='Pesquisar'
                borderRadius='full'
                onChange={e => {
                  if (onChangeSearch) {
                    clearTimeout(timeSearch);
                    timeSearch = setTimeout(() => {
                      onChangeSearch(e.target.value);
                    }, 3000);
                  }
                }}
              />
            </InputGroup>
          }
        </HStack>
      </Flex>

      <Flex flex={1} justifyContent='end' alignItems='center'>
        {buttons?.map(button => (
          <React.Fragment key={button.key}>
            {button}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
}
