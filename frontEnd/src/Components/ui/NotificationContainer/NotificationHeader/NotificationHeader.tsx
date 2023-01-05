import React from 'react';
import { FaTrash } from 'react-icons/fa';

export default function NotificationHeader() {
  return (
    <header>
      <aside>

      </aside>
      <aside>
        <button>
          <FaTrash color='white'/>
        </button>
      </aside>
    </header>
  );
}
