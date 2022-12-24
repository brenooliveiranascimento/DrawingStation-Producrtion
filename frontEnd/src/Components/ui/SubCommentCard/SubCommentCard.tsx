import React from 'react';
import { IsubComments } from '../../../interfaces/modules/commentsModuleInterfaces';
import CommentCardHeader from '../CommentCard/CommentCardHeader';

interface ISubCommentCardInterface {
  subComment: IsubComments
}

export default function SubCommentCard({subComment}: ISubCommentCardInterface) {
  return (
    <section>
      <CommentCardHeader userData={subComment.userData} />
      <article>
        {subComment.content}
      </article>
    </section>
  );
}
