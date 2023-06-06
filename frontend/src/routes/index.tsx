import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import { SignIn } from '../pages/signIn';
import { Dashboard } from '../pages/dashboard';
import { Students } from '../pages/students';
import { InternalStudent } from '../pages/students/internal';
import { Page404 } from '../pages/404';
import { Menu } from '../components/menu';


export const AppRoutes = () => {
  const { userLocal } = useAuth();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!userLocal &&
        <Routes>
          <Route index path='/' element={<SignIn />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      }

      {userLocal &&
        <Menu>
          <Routes>
            <Route index path='/' element={<SignIn />} />
            <Route path="*" element={<Page404 />} />
            <Route index path='/dashboard' element={<Dashboard />} />
            <Route index path='/students' element={<Students />} />
            <Route index path='/students/:id' element={<InternalStudent />} />
          </Routes>
        </Menu>
      }
    </Suspense>
  );
}
