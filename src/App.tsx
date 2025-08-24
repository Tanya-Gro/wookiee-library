import { useState } from 'react';
import { useFormsStore } from '@/store/useFormsStore';
import Card from './components/card/Card';
import Modal from '@/components/modal/Modal';
import HookForm from '@/components/forms/HookForm';
import UncontrolledForm from '@/components/forms/UncontrolledForm';
import '@/App.css';

function App() {
  const [isControlled, setIsControlled] = useState<boolean | null>(null);
  const { forms } = useFormsStore();
  const handleCloseModal = () => setIsControlled(null);
  return (
    <>
      <header>
        <button onClick={() => setIsControlled(false)}>
          Uncontrolled Form
        </button>
        <button onClick={() => setIsControlled(true)}>Controlled Form</button>
      </header>
      <main>
        <div className="card_wrapper">
          {forms.map((form, i) => (
            <Card data={form} key={i} />
          ))}
        </div>

        {isControlled === false && (
          <Modal onClose={handleCloseModal}>
            <UncontrolledForm onSuccess={handleCloseModal} />
          </Modal>
        )}

        {isControlled === true && (
          <Modal onClose={handleCloseModal}>
            <HookForm onSuccess={handleCloseModal} />
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
