import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPostsPagination } from '../services/index';
import {PostCard} from "./index";

const InfiniteScrollPost = () => {
    const limit = 10
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true); // Track if there is more data to fetch

    const fetchMoreData = async () => {
        if (!hasMoreData) return;
        const result = (await getPostsPagination({page, limit})) || [];
        const {posts, pagination} = result
        if (posts.length === 0) {
            setHasMoreData(false); // Set hasMoreData to false if no new data is returned
        } else {
            setItems(prevItems => [...prevItems, ...posts]);
            setPage(prevPage => prevPage + 1);
        }
    };
    useEffect(() => {
        fetchMoreData()
    },[])

    return (
        <div>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center', color:'white' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {items.map((item, index) => (
                    <PostCard post={item} key={index} />
                    ))}
            </InfiniteScroll>
        </div>
    );
};

export default InfiniteScrollPost;