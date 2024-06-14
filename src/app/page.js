// page.js

import NovoPostModal from './componentes/NovoPostModal';
import MeuComponente from '@/app/componentes/page'; // Certifique-se de que o caminho esteja correto

const Page = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Bem-vindo à Página Inicial</h1>
      <MeuComponente />
    <NovoPostModal/>
    </div>
  );
};

export default Page;
