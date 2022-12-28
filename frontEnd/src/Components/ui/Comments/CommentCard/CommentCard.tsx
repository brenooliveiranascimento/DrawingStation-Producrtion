import React, { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICommentsWithUserData, IsubComments } from '../../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { deleteCommentAction } from '../../../../redux/actions/commentsActions/deleteComment';
import { editCommentAction } from '../../../../redux/actions/commentsActions/editComment';
import NewSubComment from '../NewCommentForm/NewSubComment';
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
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { userData } = useSelector(({ user }: globalState) => user);

  const dispatch = useDispatch();

  const deleteComment = () => {
    if(edit) return setEdit(!edit);
    if(!confirmDelete) return setConfirmDelete(true);
    dispatch(deleteCommentAction({id: comment.id, userId: Number(userData.id)}, comment));
    setConfirmDelete(false);
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
        /> : <p className={styles.comment}>{comment.content}</p>}
        { comment.userData.id ===  userData.id &&
        <section>
          <button onClick={handleEdit}>
            { edit ? 'Salvar' : 'Editar' }
          </button>
          <button onClick={deleteComment}>
            { confirmDelete ? 'Confirmar' : ( edit ? 'Cancelar' : 'deletar') }
          </button>
        </section>
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
      {
        !comment.subComments.length && showSubComments && <NewSubComment commentData={comment}/>
      }
      <button className={styles.show_sub_comment} onClick={() => setShowSubComments(!showSubComments)}>
        { showSubComments ? 'Esconder comentários' : 'Mostrar respostas'}
      </button>
    </section>
  );
}
