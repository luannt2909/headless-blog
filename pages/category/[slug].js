import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import {PostCard, Categories, Loader, CustomHead, PostGrid, CategoriesTab} from '../../components';
import {FeaturedPosts} from "../../sections";

export const metadata = {
    title: 'Lucian Blog Category',
    description: 'Read more, know more, share more!',
    openGraph: {
        images: [
            {
                url: 'https://i.imgur.com/nl3N786.jpg', // Must be an absolute URL
                width: 800,
                height: 600,
            }
        ],
    },
}

const CategoryPost = ({ posts, slug }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mb-8 px-10">
      <CustomHead title={`Category ${slug}`}/>
      <FeaturedPosts category={slug}/>
      <CategoriesTab slug={slug}/>
      <PostGrid posts={posts}/>
      {/*<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">*/}
      {/*  <div className="col-span-1 lg:col-span-8">*/}
      {/*    {posts.map((post, index) => (*/}
      {/*      <PostCard key={index} post={post} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*  <div className="col-span-1 lg:col-span-4">*/}
      {/*    <div className="relative top-8 lg:sticky">*/}
      {/*      <Categories />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts, slug: params.slug}
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
