import { FC } from 'react';
import Navbar from '../components/navbar/NavBar';

interface PageTemplateProps {
  title: string;
  content: any;
}

export const PageTemplate: FC<PageTemplateProps> = ({
  title ='',
  content
}) => {
  return (
    <div>
      <Navbar>Regert {title}</Navbar>
      { content }
    </div>
  )
}