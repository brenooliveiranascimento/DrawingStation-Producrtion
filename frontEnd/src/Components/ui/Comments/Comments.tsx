import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { requestSubCommentsAction } from '../../../redux/actions/commentsActions/commentsActions';

export default function Comments() {

  const dispatch = useDispatch();

  const initData = () => {
    dispatch(requestSubCommentsAction());
  };

  useEffect(() => {
    initData();
  }, []);
  
  return (
    <footer>
      <section>

      </section>
    </footer>
  );
}
