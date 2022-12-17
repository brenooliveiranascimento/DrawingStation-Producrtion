import React from 'react';

export default function Player() {
  return (
    <section>
      <iframe
        className="Video"
        src={'https://www.youtube.com/embed/'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Disabled youtube"
      />
    </section>
  );
}
