import React, { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAllSubCommentsUserData, ICommentsWithUserData, IsubComments } from '../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { deleteCommentAction } from '../../../redux/actions/commentsActions/deleteComment';
import { editCommentAction } from '../../../redux/actions/commentsActions/editComment';
import user from '../../../redux/modules/user/user';
import NewSubComment from '../Comments/NewCommentForm/NewSubComment';
import SubCommentCard from '../SubCommentCard/SubCommentCard';
import CommentCardHeader from './CommentCardHeader';
import styles from './styles.module.scss';

interface commentCardProp {
  comment: ICommentsWithUserData
}

export default function CommentCard({comment}: commentCardProp) {
  const [showSubComments, setShowSubComments] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const [edit, setEdit] = useState(false);

  const { userData } = useSelector(({ user }: globalState) => user);

  const dispatch = useDispatch();

  const deleteComment = () => {
    if(edit) return setEdit(!edit);
    dispatch(deleteCommentAction({id: comment.id, userId: Number(userData.id)}, comment));
  };

  const handleEdit = () => {
    if(!edit) {
      setEdit(true);
      setEditedValue(comment.content);
    } else {
      dispatch(editCommentAction({ content: editedValue, id: comment.id, userId: Number(userData.id) }));
      setEdit(false);
    }
  };

  return (
    <section className={styles.card_caontainer}>
      <CommentCardHeader userData={comment.userData}  />
      <article>
        {edit ? <input
          onChange={({target}) => setEditedValue(target.value)}
          value={editedValue}
        /> : <span className={styles.comment}>{comment.content}</span>}
        { comment.userData.id ===  userData.id &&
        <button onClick={handleEdit}>
          { edit ? 'Salvar' : 'Editar' }
        </button>}
        {
          comment.userData.id === userData.id &&
        <button onClick={deleteComment}>
          { edit ? 'Cancelar' : 'deletar' }
        </button>
        }
      </article>
      {
        showSubComments && comment.subComments.map((currSubComment: IsubComments, index: number) => {
          return (
            <section key={index}>
              <SubCommentCard subComment={currSubComment} key={currSubComment.id}/>
              {
                index + 1 === comment.subComments.length && <NewSubComment commentData={comment}/>
              }
            </section>
          );
        })
      }
      <button onClick={() => setShowSubComments(!showSubComments)}>
        { showSubComments ? 'Fechar respostas' : 'Mostrar respostas' }
      </button>
    </section>
  );
}
