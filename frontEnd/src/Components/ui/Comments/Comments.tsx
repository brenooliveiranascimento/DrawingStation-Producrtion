import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAllSubCommentsUserData, ICommentsWithUserData } from '../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { requestSubCommentsAction } from '../../../redux/actions/commentsActions/commentsActions';
import CommentCard from '../CommentCard/CommentCard';
import NewCommentForm from './NewCommentForm/NewCommentForm';
import styles from './styles.module.scss';

export default function Comments() {

  const dispatch = useDispatch();
  const { classroom } = useSelector(({ classroomController }: globalState) => classroomController);
  const { comments, error, load } = useSelector(({ commentsModule }: globalState) => commentsModule);
  const [showComments, setShowComments] = useState(false);

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

  if(!comments.length) {
    return (
      <h1>Nenhum comentário</h1>
    );
  }
  
  return (
    <section className={styles.main_comment_container}>
      <NewCommentForm/>
      <button className={styles.show_comment_btn} onClick={() => setShowComments(!showComments)}>
        mostrar comentarios
      </button>
      {
        showComments && (
          <section>
            {
              comments.filter((currComment: ICommentsWithUserData) =>
                currComment.classroomId === classroom.id).map((comment: ICommentsWithUserData) => (
                <CommentCard  comment={comment} key={comment.id}/>
              )
              )
            }
          </section>
        )
      }
    </section>
  );
}
