import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { crateCommentAction } from '../../../../redux/actions/commentsActions/createNewComment';
import defaultUser from '../../../../../public/profilePhoto.png';
import styles from './styles.module.scss';

export default function NewCommentForm() {
  
  const { user: { userData }, classroomController: { classroom } } = useSelector((state: globalState) => state);

  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    if(!content.length) return toast.error('Comentário sem conteúdo!');
    dispatch(crateCommentAction({content, userId: Number(userData.id), classroomId: classroom.id}));
    setContent('');
  };

  return (
    <form className={styles.new_comemnt_container}>
      <Image
        style={{
          borderRadius: '50%',
          marginTop: '0.8rem'
        }}
        height={50}
        width={50}
        alt={userData.name}
        src={userData.profilePhoto || defaultUser}
      />
      <label htmlFor='content'>
        <span>Adicionar comentário</span>
        <input
          value={content}
          name="content"
          placeholder='Adicionar comentário'
          onChange={({target}) => setContent(target.value)}
          type={'text'}
        />
      </label>

      <button onClick={handleComment}>
        Enviar
      </button>
    </form>
  );
}
