import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IsubComments } from '../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { editCommentAction, editSubCommentAction } from '../../../redux/actions/commentsActions/editComment';
import CommentCardHeader from '../CommentCard/CommentCardHeader';

interface ISubCommentCardInterface {
  subComment: IsubComments
}

export default function SubCommentCard({subComment}: ISubCommentCardInterface) {
  const [editedValue, setEditedValue] = useState('');
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const { userData } = useSelector(({ user }: globalState) => user);

  const handleEdit = () => {
    if(!edit) {
      setEdit(true);
      setEditedValue(subComment.content);
    } else {
      dispatch(editSubCommentAction({
        content: editedValue,
        id: Number(subComment.id),
        userId: Number(userData.id) }));
      setEdit(false);
    }
  };

  return (
    <section>
      <CommentCardHeader userData={subComment.userData} />
      <article>
        {edit ? <input
          onChange={({target}) => setEditedValue(target.value)}
          value={editedValue}
        /> :subComment.content}
        { subComment.userData.id ===  userData.id &&
        <button onClick={handleEdit}>
          { edit ? 'Salvar' : 'Editar' }
        </button>}
      </article>
    </section>
  );
}
