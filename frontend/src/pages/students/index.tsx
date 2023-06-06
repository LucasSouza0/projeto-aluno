import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { StudentProps, deleteStudent, getAllStudents } from '../../functions/students';
import { PageBody, PageHeader } from '../../components/pages';
import { StudentCard } from './components/studentCard';

export const Students = () => {
  const [students, setStudents] = useState<StudentProps[]>([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleDeleteStudent = (student: StudentProps) => {
    setLoading(true);
    deleteStudent(student.id).then(response => {
      setLoading(false);
      if (!response) {
        toast({
          title: 'Ocorreu um erro',
          description: 'Falha ao remover o aluno',
          status: 'error',
          isClosable: true,
          position: 'top-right',
        });

        return;
      }

      setStudents(old => {
        const index = old.findIndex(oldStudent => oldStudent.id == student.id);
        if (index != -1) {
          old.splice(index, 1);
        }

        return [...old];
      });
    });
  }

  useEffect(() => {
    setLoading(true);
    getAllStudents().then(students => {
      setLoading(false);
      setStudents(students);
    })
  }, []);

  return (
    <>
      <PageHeader
        title='Alunos'
        subTitle={<Text> Total de usuários: <b> {students.length} </b> </Text>}
        buttons={[
          <Link key={1} to='/students/new'>
            <Button size='sm' leftIcon={<AddIcon />} borderRadius='full' colorScheme='blue'>
              Novo Aluno
            </Button>
          </Link>
        ]}
      />

      <PageBody mt={5} isLoading={loading}>
        {students.length === 0 &&
          <Text py={5} textAlign='center' fontWeight='semibold' fontSize='3xl'> Nenhum aluno encontrado </Text>
        }

        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing='5'>

          {students.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDeleteStudent}
            />
          ))}
        </SimpleGrid>
      </PageBody>
    </>
  );
}
