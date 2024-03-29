import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IsubComments } from '../../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { deleteSubCommentAction } from '../../../../redux/actions/commentsActions/deleteComment';
import { editSubCommentAction } from '../../../../redux/actions/commentsActions/editComment';
import CommentCardHeader from '../../Comments/CommentCard/CommentCardHeader';
import styles from './styles.module.scss';

interface ISubCommentCardInterface {
  subComment: IsubComments
}

export default function SubCommentCard({subComment}: ISubCommentCardInterface) {
  const [editedValue, setEditedValue] = useState('');
  const [edit, setEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();

  const { user: { userData }, controlleInterface: { toComments, commentId } } = useSelector((state: globalState) => state);

  const deleteComment = () => {
    if(edit) return setEdit(!edit);
    if(!confirmDelete) return setConfirmDelete(true);
    dispatch(deleteSubCommentAction({
      id: Number(subComment.id),
      userId: Number(userData.id)},
    ));
  };

  const handleEdit = () => {
    if(confirmDelete) {
      setConfirmDelete(false);
      return;
    }
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
    <section
      style={{
        borderTop: commentId === subComment.id ? '1px solid gold' : 'none',
        borderRadius: commentId === subComment.id ? '1rem' : 'none',
        paddingBottom: commentId === subComment.id ? '0rem' : 'none',
      }}
      id={`comment-${subComment.id}`} className={styles.sub_comment_container}>
      <CommentCardHeader userData={subComment.userData} />
      <article>
        {edit ?
          <input
            onChange={({target}) => setEditedValue(target.value)}
            value={editedValue}
          /> : <span className={styles.comment}>{subComment.content}</span>}
        { subComment.userData.id ===  userData.id &&
        <section>
          <button onClick={handleEdit}>
            { confirmDelete ? 'Cancelar' : edit ? 'Salvar' : 'Editar' }
          </button>
          <button onClick={deleteComment}>
            { confirmDelete ? 'Confirmar' : ( edit ? 'Cancelar' : 'deletar') }
          </button>
        </section>
        }
      </article>
    </section>
  );
}
