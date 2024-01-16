import React, {useEffect} from 'react';
import { useRouter } from 'next/router';

import { getPosts, getPostDetails, trackingPost } from '../../services/index';

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
  TableOfContent,
  CustomHead,
} from '../../components';

import { AdjacentPosts } from '../../sections';
import slugify from "slugify";

const PostDetails = ({ post, toc }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  useEffect(() => {
    trackingPost(post.id)
  },[])

  return (
    <div className="container mx-auto mb-8 px-10">
      <CustomHead title={post.title}/>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
          {/* To know that what is the post that these comments belong to */}
          <CommentsForm slug={post.id} />
          <Comments slug={post.id} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            {post.mdContent && <TableOfContent toc={toc}/>}
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            {!post.mdContent && <Categories />}
          </div>
        </div>
      </div>
    </div>
  );
};
const generateTOC = (markdown) => {
  const regex = /^(#{1,6})\s(.+)/gm;
  const toc = [];
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const slug = slugify(text, {lower: true, strict: true});
    const heading = {level, text, slug, children: []}
    toc.push(heading);
  }

  return toc;
};
// The way to fetch data using getStaticProps in Next.js
// Next.js will pre-render this page at build time using the props that returned by 'getStaticProps'
export async function getStaticProps({ params }) {
  const data = (await getPostDetails(params.slug)) || [];
  const toc = generateTOC(data.mdContent)
  return {
    props: { post: data, toc: toc},
  };
}

// If a page has Dynamic Routes and uses 'getStaticProps', it needs to define a list of paths tobe statically generated
// When export a function called 'getStaticProps' (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by 'getStaticProps'
// It basically mean: must need to specify what kind of articles are we going to have
// => With this, the Next.js application is going to know all of the possible paths that app can go to
// Ex:
//      post/reactjs
//      post/nextjs
//      ...
// => So Next.js has to research all of the possible dynamic paths so that it can statically render them
// fallback: false
// => That means Next.js is going to statically generate our site, and that's going to be great + incredibly fast but when deploy project
//    => Then add new blog in GraphCMS
//      => Won't be able to get it because all of our current posts are going to be statically generated
export async function getStaticPaths() {
  const posts = await getPosts();
  // const path = posts.map(({ id }) => ({ params: { id: id.toString() } }))
  return {
    //   Use destructuring to get out the slug from the posts Object
    // paths: posts.map(({ id }) => ({ params: { id: id.toString() } })),
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    // paths: [],
    fallback: true,
  };
}

export default PostDetails;
