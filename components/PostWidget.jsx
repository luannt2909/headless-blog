import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts, getPopularPosts } from '../services';

const EyeViewIcon = () => (
    <svg className="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
         fill="none" viewBox="0 0 20 14">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
      </g>
    </svg>
);

const PostWidget = ({ slug, categories }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(slug, categories).then((res) => setRelatedPosts(res));
    } else {
      getPopularPosts().then((res) => setRelatedPosts(res));
    }
  }, [slug]);

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b py-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Popular Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="mb-4 flex w-full items-center">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage}
              className="rounded-full align-middle"
              alt={post.title}
              height="60px"
              width="60px"
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-xs text-gray-500">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} className="text-base">
              {post.title}
            </Link>
            {/*<div className="flex ">*/}
            {/*  <EyeViewIcon/>*/}
            {/*  <p className="ml-2 text-xs text-gray-500">*/}
            {/*    {post.viewCount || 1}*/}
            {/*  </p>*/}
            {/*</div>*/}

          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
