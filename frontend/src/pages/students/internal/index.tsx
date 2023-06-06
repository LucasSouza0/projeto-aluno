import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, GridItem, useToast } from '@chakra-ui/react';

import { StudentProps, findStudent } from '../../../functions/students';
import { PageBody, PageHeader } from '../../../components/pages';

import { Menu } from '../components/menu';
import { Form } from '../components/form';

export const InternalStudent = () => {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<StudentProps>();

  const toast = useToast();
  const requestParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = requestParams.id;
    if (id && id != 'new') {
      setLoading(true);
      findStudent(parseInt(id) ?? 0).then(response => {
        setLoading(false);
        if (!response) {
          toast({
            title: 'Ocorreu um erro',
            description: 'Falha ao consultar aluno',
            status: 'error',
            isClosable: true,
            position: 'top-right',
          });
          
          navigate('/students');
          return;
        }

        setStudent(response);
      });
    }
  }, [requestParams, navigate]);

  return (
    <>
      <PageHeader
        backButton
        title={ student ? 'Gerenciar aluno' : 'Adicionar aluno' }
      />

      <PageBody mt='5' bg='initial' boxShadow='none' isLoading={loading}>
        <Grid templateColumns='repeat(12, 1fr)' gap={6}>
          <GridItem colSpan={{ base: 12, md: 4, lg: 3 }}>
            <Menu student={student} setStudent={setStudent} />
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 8, lg: 9 }}>
            <Form student={student} setStudent={setStudent} />
          </GridItem>
        </Grid>
      </PageBody>
    </>
  );
}
