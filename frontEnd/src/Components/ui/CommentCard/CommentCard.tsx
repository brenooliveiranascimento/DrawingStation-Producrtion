import React, { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAllSubCommentsUserData, ICommentsWithUserData, IsubComments } from '../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { deleteCommentAction } from '../../../redux/actions/commentsActions/deleteComment';
import { editCommentAction } from '../../../redux/actions/commentsActions/editComment';
import user from '../../../redux/modules/user/user';
import NewSubComment from '../Comments/NewSubComment';
import SubCommentCard from '../SubCommentCard/SubCommentCard';
import CommentCardHeader from './CommentCardHeader';

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
    <section>
      <CommentCardHeader userData={comment.userData} />
      <article>
        {edit ? <input
          onChange={({target}) => setEditedValue(target.value)}
          value={editedValue}
        /> :comment.content}
        { comment.userData.id ===  userData.id &&
        <button onClick={handleEdit}>
          { edit ? 'Salvar' : 'Editar' }
        </button>}
        <button onClick={deleteComment}>
          deletar
        </button>
      </article>
      <NewSubComment commentData={comment}/>
      {
        showSubComments && comment.subComments.map((currSubComment: IsubComments) =>
          <SubCommentCard subComment={currSubComment} key={currSubComment.id}/>)
      }
      <button onClick={() => setShowSubComments(!showSubComments)}>
        { showSubComments ? 'Fechar respostas' : 'Mostrar respostas' }
      </button>
    </section>
  );
}
