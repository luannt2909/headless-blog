import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-72">
    <div
      className="absolute inline-block h-72 w-full rounded-lg bg-cover bg-center bg-no-repeat shadow-md"
      style={{ backgroundImage: `url('${post.featuredImage}')` }}
    />
    <div className="absolute h-72 w-full rounded-lg bg-gradient-to-b from-gray-400 via-gray-700 to-black bg-center opacity-50" />
    <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-lg p-4">
      <p className="text-shadow mb-4 text-xs font-semibold text-white">
        {moment(post.createdAt).format('MMM DD, YYYY')}
      </p>
      <p className="text-shadow mb-4 text-center text-2xl font-semibold text-white">
        {post.title}
      </p>
      {/* <div className="absolute bottom-5 flex w-full items-center justify-center">
        <Image
          unoptimized
          alt={post.author.name}
          height="30px"
          width="30px"
          className="rounded-full align-middle drop-shadow-lg"
          src={post.author.profileImage}
        />
        <p className="text-shadow ml-2 inline align-middle font-medium text-white">
          {post.author.name}
        </p>
      </div> */}
    </div>
    <Link href={`/post/${post.slug}`}>
      <span className="absolute h-full w-full cursor-pointer" />
    </Link>
  </div>
);

export default FeaturedPostCard;
