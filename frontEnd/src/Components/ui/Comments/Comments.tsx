import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAllSubCommentsUserData, ICommentsWithUserData } from '../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { requestSubCommentsAction } from '../../../redux/actions/commentsActions/commentsActions';
import CommentCard from './CommentCard/CommentCard';
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
  }, [showComments]);

  if(load) {
    return (
      <h1>Carregando!</h1>
    );
  }

  if(!comments.length) {
    return (
      <section className={styles.main_comment_container}>
        <NewCommentForm/>
        <p>Nenhum comentário parra essa aula, seja o primeiro!</p>
      </section>
    );
  }
  
  return (
    <section className={styles.main_comment_container}>
      <NewCommentForm/>
      <button className={styles.show_comment_btn} onClick={() => setShowComments(!showComments)}>
        { showComments ? 'Ocultar comentários' : 'mostrar comentarios' }
      </button>
      {
        showComments && ( <section>
          {comments.filter((currComment: ICommentsWithUserData, index: number) =>
            currComment.classroomId === classroom.id).map((comment: ICommentsWithUserData, index: number) => (
            <CommentCard  comment={comment} key={index}/>
          ))}
        </section>
        )
      }
    </section>
  );
}
