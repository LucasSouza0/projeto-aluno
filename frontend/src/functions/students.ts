import { server } from '../services/api';

export interface StudentProps {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  photo?: string;
  active: boolean;
}

type SaveStudentProps = {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  active?: boolean;
}

export async function getAllStudents(): Promise<StudentProps[]> {
  return await server.get('/student').then(response => {
    const students = response.data;
    students.forEach((student: any) => {
      student.active = student.active == '1' ? true : false;
    });

    return students;
  }).catch(() => {
    return [];
  });
}

export async function findStudent(studentId: number): Promise<StudentProps | false> {
  return await server.get(`/student/${studentId}`).then(response => {
    return response.data;
  }).catch(() => {
    return false;
  });
}

export async function saveStudent(student: SaveStudentProps): Promise<StudentProps | false> {
  if (student?.id) {
    return await server.put(`/student/${student.id}`, student).then(response => {
      return response.data;
    }).catch(() => {
      return false;
    });
  }

  return await server.post('/student', student).then(response => {
    return response.data;
  }).catch(() => {
    return false;
  });
}

export async function savePhoto(studentId: number, photo?: FileList): Promise<StudentProps | false> {
  if (!photo) {
    return await server.post(`/student-photo/remove/${studentId}`).then(response => {
      return response.data;
    }).catch(() => {
      return false;
    });
  }

  const formdata = new FormData();
  formdata.append('photo', photo.item(0) || '', photo.item(0)?.name);

  return await server.post(`/student-photo/create/${studentId}`, formdata).then(response => {
    return response.data;
  }).catch(() => {
    return false;
  });
}

export async function deleteStudent(studentId: number): Promise<boolean> {
  return await server.delete(`/student/${studentId}`).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
}
