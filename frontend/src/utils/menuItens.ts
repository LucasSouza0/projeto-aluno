import { IconBaseProps } from "react-icons";
import { MdHome } from "react-icons/md"
import { FiUsers } from 'react-icons/fi';

export interface MenuItensProps {
  id: string;
  title: string;
  url: string;
  external?: boolean;
  icon: React.ComponentType<IconBaseProps>;
}

export const itensMenu: MenuItensProps[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    url: '/dashboard',
    icon: MdHome,
  },
  {
    id: 'students',
    title: 'Alunos',
    url: '/students',
    icon: FiUsers,
  },
];
