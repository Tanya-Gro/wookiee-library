import { useState } from 'react';
import { useFormsStore } from '@/store/useFormsStore';

import Card from './components/card/Card';
import Modal from '@/components/modal/Modal';
import HookForm from '@/components/forms/HookForm';
import UncontrolledForm from '@/components/forms/UncontrolledForm';

import '@/App.css';

type FormType = 'controlled' | 'uncontrolled';

function App() {
  const [formType, setFormType] = useState<FormType | null>(null);
  const { forms } = useFormsStore();

  const handleCloseModal = () => setFormType(null);

  return (
    <>
      <header>
        <button onClick={() => setFormType('uncontrolled')}>
          Uncontrolled Form
        </button>
        <button onClick={() => setFormType('controlled')}>
          Controlled Form
        </button>
      </header>
      <main>
        <div className="card_wrapper">
          {forms.map((form, i) => (
            <Card data={form} key={i} />
          ))}
        </div>

        {formType === 'uncontrolled' && (
          <Modal onClose={handleCloseModal}>
            <UncontrolledForm onSuccess={handleCloseModal} />
          </Modal>
        )}

        {formType === 'controlled' && (
          <Modal onClose={handleCloseModal}>
            <HookForm onSuccess={handleCloseModal} />
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
