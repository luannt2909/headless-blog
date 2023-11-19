import React from 'react';
import Me from "./Me";
import ContentFragment from "./ContentFragment";

const About = ({ data }) => {
  return (
    <div className="mb-8 rounded-lg bg-white pb-12 shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-md">
        <img
          src={data.coverImageUrl}
          alt={data.title}
          className="h-full w-full rounded-t-lg object-top"
        />
      </div>
      <Me me={data.me}/>
      <div className="px-4 lg:px-0">
        <h1 className="mb-8 text-3xl font-semibold">{data.title}</h1>
        <ContentFragment contents={data.content}/>
      </div>
    </div>
  );
};

export default About;
