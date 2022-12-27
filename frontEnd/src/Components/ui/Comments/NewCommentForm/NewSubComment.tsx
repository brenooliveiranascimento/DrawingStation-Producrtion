import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ICommentsWithUserData } from '../../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { crateSubCommentAction } from '../../../../redux/actions/commentsActions/createNewComment';
import styles from './styles.module.scss';

interface ISubCommentForm {
  commentData: ICommentsWithUserData;
}

export default function NewSubComment({commentData}: ISubCommentForm) {
  const { userData } = useSelector(({ user }: globalState) => user);

  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    if(!content.length) return toast.error('Comentário sem conteúdo!');
    dispatch(crateSubCommentAction({content, userId: Number(userData.id), commentId: commentData.id}));
    setContent('');
  };

  return (
    <form style={{width: 300}} className={styles.new_comemnt_container}>
      <label htmlFor='content'>
        <input
          style={{
            width:300,
            backgroundColor: '#353241'
          }}
          placeholder='Reponder comentário'
          value={content}
          name="content"
          onChange={({target}) => setContent(target.value)}
          type={'text'}
        />
      </label>

      <button style={{marginTop:8, backgroundColor: '#353241'}} onClick={handleComment}>
        Enviar
      </button>
    </form>
  );
}
