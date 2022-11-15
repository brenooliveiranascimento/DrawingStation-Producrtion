import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModulesInterface, SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import { addSubModulesAction } from '../../../../redux/actions/subModuleActions/subModuleActions';
import { Input } from '../../../ui/Inputs/Inputs';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';

interface EditSubModuleInterface {
  handleModal: () => void;
}

function AddNewSubModule({ handleModal }: EditSubModuleInterface) {
  const [editingModule, setEditingModule] = useState<SubModuleInterface>({
    name: '',
    description: '',
    image: '',
    premium: true,
    admPassword: '',
    moduleId: 1,
    identity: '',
  });
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState(false);

  const { modules } = useSelector((state: globalState) => state.modules);

  const handleChange = (target: any) => {
    const { name, value, type, checked } = target;
    if(type === 'checkbox') {
      setEditingModule({...editingModule, [name]: checked});
      return; 
    }
    setEditingModule({...editingModule, [name]: value});
  };

  const addSubModule = () => {
    dispatch(addSubModulesAction(editingModule, handleModal));
  };

  return (
    <section>
      <form>
        <Input
          onChange={({target}) => handleChange(target)}
          name='name'
          placeholder='name'
          value={editingModule.name}
        />
        <Input
          onChange={({target}) => handleChange(target)}
          name='description'
          placeholder='Description'
          value={editingModule.description}
        />

        <Input
          onChange={({target}) => handleChange(target)}
          name='premium'
          checked={editingModule.premium}
          type={'checkbox'}
        />

        <Input
          onChange={({target}) => handleChange(target)}
          name='image'
          placeholder='image'
          value={editingModule.image}
        />

        <Input
          onChange={({target}) => handleChange(target)}
          name='identity'
          type='password'
          placeholder='identity'
          value={editingModule.identity}
        />
        <select
          value={editingModule.moduleId}
          onChange={({target}: any) => setEditingModule({...editingModule, moduleId: target.value})}
        >
          {
            modules.map((currModule: ModulesInterface) => (
              <option value={currModule.id} key={currModule.id}>
                {currModule.name}
              </option>
            ))
          }
        </select>
        <button type='button' onClick={(e: FormEvent) => {
          e.preventDefault();
          if(!confirm) return setConfirm(!confirm);
          addSubModule();
        }}>
          {confirm ? 'Confirmar!' : 'Adicionar'}
        </button>
        <button onClick={handleModal}>
          Cancelar
        </button>
      </form>
      <Image
        width={200}
        height={300}
        src={`${editingModule.image}`}
        alt={`${editingModule.name}`}
      />
    </section>
  );
}

export default AddNewSubModule;
