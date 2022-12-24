import React, { useState } from 'react';

export default function NewCommentForm() {
  
  const [content, setContent] = useState('');

  return (
    <form>
      <label>
        <input
          value={content}
          onChange={({target}) => setContent(target.value)}
          type={'text'}
        />
      </label>
    </form>
  );
}
