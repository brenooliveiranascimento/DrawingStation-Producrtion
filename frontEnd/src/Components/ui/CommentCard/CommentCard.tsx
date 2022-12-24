import React, { use, useState } from 'react';
import { IAllSubCommentsUserData, ICommentsWithUserData, IsubComments } from '../../../interfaces/modules/commentsModuleInterfaces';
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

  const handleEdit = () => {
    if(!edit) {
      setEdit(true);
      setEditedValue(comment.content);
    } else {
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
        <button onClick={handleEdit}>
          { edit ? 'Salvar' : 'Editar' }
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
