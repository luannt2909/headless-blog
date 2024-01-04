import React from 'react';
import {PostCard, PostGridCard} from "./";

const PostGrid = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
                <PostGridCard post={post} key={post.id}/>
            ))}
        </div>
    );
};

export default PostGrid;