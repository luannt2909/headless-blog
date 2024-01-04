import React from 'react';
import moment from 'moment';
import Link from 'next/link';

const PostGridCard = ({post}) => {
    return (
        <Link href={`/post/${post.slug}`} className="h-full">
            <div
                className="mb-4 cursor-pointer bg-white p-0 pb-4 shadow-md h-full hover:shadow-xl bg-white transition transition-transform hover:scale-105 duration-150 rounded-lg">
                <div className="relative mb-6 overflow-hidden shadow-md h-72">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="h-full w-full rounded-t-lg object-top shadow-lg lg:rounded-lg"
                    />
                </div>
                <h1 className="ml-4 mb-4 md:text-xl sm:text-md font-semibold ">
                    <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </h1>
                <div className="mb-4 ml-4 block w-full items-center lg:flex">
                    <div className="flex mr-4 w-full items-center md:justify-center lg:mb-0 lg:w-auto">
                        <img
                            src={post.author.profileImage}
                            alt={post.author.name}
                            height="30px"
                            width="30px"
                            className="rounded-full align-middle"
                        />
                        <p className="ml-2 inline align-middle text-md text-gray-700">
                            {post.author.name}
                        </p>
                    </div>
                    <div className="font-medium text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 inline h-6 w-6 text-pink-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default PostGridCard;
