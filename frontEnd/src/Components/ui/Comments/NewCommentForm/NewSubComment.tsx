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
    dispatch(crateSubCommentAction({content, userId: Number(userData.id), commentId: commentData.id, comentTo: commentData.userData.id}));
    setContent('');
  };

  return (
    <form className={styles.new_comemnt_container}>
      <label className={styles.sub_comment_label} htmlFor='content'>
        <input
          className={styles.sub_comment_input}
          placeholder='Reponder comentário'
          value={content}
          name="content"
          onChange={({target}) => setContent(target.value)}
          type={'text'}
        />
      </label>

      <button className={styles.new_comment_btn} onClick={handleComment}>
        Enviar
      </button>
    </form>
  );
}
