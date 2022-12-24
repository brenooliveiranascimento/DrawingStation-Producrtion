import React, { useState } from 'react';
import { IAllSubCommentsUserData, ICommentsWithUserData, IsubComments } from '../../../interfaces/modules/commentsModuleInterfaces';
import SubCommentCard from '../SubCommentCard/SubCommentCard';
import CommentCardHeader from './CommentCardHeader';

interface commentCardProp {
  comment: ICommentsWithUserData
}

export default function CommentCard({comment}: commentCardProp) {
  const [showSubComments, setShowSubComments] = useState(false);

  return (
    <section>
      <CommentCardHeader userData={comment.userData} />
      <article>
        {comment.content}
      </article>
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
