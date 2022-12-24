import React, { FormEvent, useState } from 'react';

export default function NewCommentForm() {
  
  const [content, setContent] = useState('');

  const handleComment = ({preventDefault}: FormEvent) => {
    preventDefault();
    setContent('');
  };

  return (
    <form>
      <label htmlFor='content'>
        <input
          value={content}
          name="content"
          onChange={({target}) => setContent(target.value)}
          type={'text'}
        />
      </label>

      <button onClick={handleComment}>
        Enviar
      </button>
    </form>
  );
}
