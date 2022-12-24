import React from 'react';
import { ICommentsWithUserData } from '../../../interfaces/modules/commentsModuleInterfaces';
import CommentCardHeader from './CommentCardHeader';

interface commentCardProp {
  comment: ICommentsWithUserData
}

export default function CommentCard({comment}: commentCardProp) {
  return (
    <section>
      <CommentCardHeader userData={comment.userData} />
      <article>
        {comment.content}
      </article>
    </section>
  );
}
