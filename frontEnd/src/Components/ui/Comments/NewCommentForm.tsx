import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { crateCommentAction } from '../../../redux/actions/commentsActions/createNewComment';

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
    <form>
      <label htmlFor='content'>
        <input
          value={content}
          name="content"
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
