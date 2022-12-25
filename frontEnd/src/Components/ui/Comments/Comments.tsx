import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAllSubCommentsUserData, ICommentsWithUserData } from '../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { requestSubCommentsAction } from '../../../redux/actions/commentsActions/commentsActions';
import CommentCard from '../CommentCard/CommentCard';
import NewCommentForm from './NewCommentForm/NewCommentForm';

export default function Comments() {

  const dispatch = useDispatch();
  const { classroom } = useSelector(({ classroomController }: globalState) => classroomController);
  const { comments, error, load } = useSelector(({ commentsModule }: globalState) => commentsModule);

  const initData = () => {
    dispatch(requestSubCommentsAction());
  };

  useEffect(() => {
    initData();
  }, []);

  if(load) {
    return (
      <h1>Carregando!</h1>
    );
  }
  
  return (
    <footer>
      <section>
        {
          comments.filter((currComment: ICommentsWithUserData) =>
            currComment.classroomId === classroom.id).map((comment: ICommentsWithUserData) => (
            <CommentCard  comment={comment} key={comment.id}/>
          ))
        }
      </section>
    </footer>
  );
}
