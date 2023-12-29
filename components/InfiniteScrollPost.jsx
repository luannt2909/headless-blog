import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {getPostsPagination} from '../services/index';
import {PostCard} from "./index";

const InfiniteScrollPost = () => {
    const limit = 10
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true); // Track if there is more data to fetch

    const fetchMoreData = async (initialize) => {
        if (page === 1 && !initialize) return
        if (!hasMoreData) return
        const result = (await getPostsPagination({page, limit})) || [];
        const {posts, pagination} = result
        setItems(prevItems => [...prevItems, ...posts]);
        setPage(pagination.page + 1);
        if (pagination.page < pagination.pageCount) {

        }
        setHasMoreData(pagination.page < pagination.pageCount)
    };
    useEffect(() => {
        fetchMoreData(true)
    }, [])

    return (
        <div>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                loader={<LoadingSkeleton/>}
                endMessage={<EndingPost/>}
            >
                {items.map((item, index) => (
                    <PostCard post={item} key={index}/>
                ))}
            </InfiniteScroll>
        </div>
    );
};

const EndingPost = () => {
    return (
        <div className="bg-gray-100 py-10 px-8 flex items-center rounded-lg shadow-lg ">
            <div className="w-1/2">
                <h2 className="text-3xl font-bold mb-4">&#9834; See You Again &#9834;</h2>
                <p className="text-md mb-6">&#9834; It's been a long day without you, my friend &#9834;</p>
                <p className="text-md mb-6">&#9834; And I'll tell you all about it when I see you again &#9834;</p>
                <p className="text-md mb-6">&#9834; We've come a long way from where we began &#9834;</p>
                <p className="text-md mb-6">&#9834; Oh, I'll tell you all about it when I see you again &#9834;</p>
            </div>
            <div className="w-1/2">
                <img src="/see_you_again.png" alt="See you again" className="w-full h-60 rounded-lg shadow-lg " />
            </div>
        </div>
    );
};

const LoadingSkeleton = () => {
    return (
        <div className="w-full h-full border-2 rounded-md mx-auto mt-20">
            <div className="flex animate-pulse flex-row items-center h-200 justify-center space-x-5">
                <div className="w-16 bg-gray-300 h-16 rounded-full"></div>
                <div className="flex flex-col space-y-3">
                    <div className="w-48 bg-gray-300 h-6 rounded-md"></div>
                    <div className="w-36 bg-gray-300 h-6 rounded-md"></div>
                </div>
            </div>
        </div>
    )
}

export default InfiniteScrollPost;