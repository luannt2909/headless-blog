// const graphqlAPI = process.env.NEXT_PUBLIC_TONYBLOG_ENDPOINT;
import qs from "qs";

const restAPI = "http://localhost:1337/api";

export const getPosts = async () => {
    const queryParams = qs.stringify({
        populate: "*",
        sort: "createdAt:desc"
    }, {encode: false})

    const uri = `${restAPI}/posts?${queryParams}`
    const rsp = await fetch(uri)
    const data = await rsp.json()
    const posts = transformPosts(data.data)
    return posts
};

function transformPosts(data) {
    const posts = data.map((d) => transformPost(d))
    return posts
}

function transformPost(data) {
    return ({
        id: data.id,
        ...data.attributes,
        categories: data.attributes.categories ? transformCategories(data.attributes.categories) : [],
        author: data.attributes.author ? transformAuthor(data.attributes.author) : {}
    })
}

function transformCategories(data) {
    const result = data.data.map((d) => ({
        id: d.id,
        ...d.attributes,
    }))
    return result
}

function transformAuthor(data) {
    const author = data.data
    return {
        id: author.id,
        ...author.attributes,
    }
}

function transformComments(data) {
    const result = data.data.map((d) => ({id: d.id, ...d.attributes}))
    return result
}

// Accepting a slug that's going to be a string
// raw: give access to the post's content
export const getPostDetails = async (slug) => {
    const uri = `${restAPI}/posts/${slug}?populate=*`
    const results = await fetch(uri)
    const data = await results.json()
    const post = transformPost(data.data)
    return post
};

export const getRecentPosts = async () => {
    const queryParams = qs.stringify({
        populate: "*",
        sort: "createdAt:desc",
        pagination: {
            page: 1,
            pageSize: 3
        }
    }, {encode: false})

    const uri = `${restAPI}/posts?${queryParams}`
    const results = await fetch(uri)
    const data = await results.json()
    const posts = transformPosts(data.data)
    return posts
};

export const getSimilarPosts = async (slug, categories) => {
    const queryParams = qs.stringify({
        filters: {
            slug: {
                $ne: slug
            },
            categories: {
                slug: {
                    $in: categories
                }
            }
        },
        sort: "createdAt:desc",
        populate: "*",
    }, {encode: false})
    const uri = `${restAPI}/posts?${queryParams}`

    const results = await fetch(uri)
    const data = await results.json()
    const posts = transformPosts(data.data)
    return posts
};

export const getCategories = async () => {
    const uri = `${restAPI}/categories`
    const results = await fetch(uri)
    const data = await results.json()
    const categories = transformCategories(data)
    return categories
};

export const submitComment = async (obj) => {
    const uri = `${restAPI}/comments`
    const body = {
        data: {
            ...obj,
            post: obj.slug
        }
    }
    const result = await fetch(uri, {
        method: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return result.json();
};

// String!: String with exclamation mark
export const getComments = async (slug) => {
    const queryParams = qs.stringify({
        filters: {
            post: {
                id: {$eq: slug}
            },
        },
        sort: "createdAt:desc",
    }, {encode: false})
    const uri = `${restAPI}/comments?${queryParams}`
    const results = await fetch(uri)
    const data = await results.json()
    return transformComments(data)
};

export const getFeaturedPosts = async () => {
    const queryParams = qs.stringify({
        filters: {
            isFeaturedPost: true
        },
        sort: "createdAt:desc",
        populate: "*"
    }, {encode: false})
    const uri = `${restAPI}/posts?${queryParams}`
    const results = await fetch(uri)
    const data = await results.json()
    const posts = transformPosts(data.data)
    return posts
};

export const getCategoryPost = async (slug) => {
    const queryParams = qs.stringify({
        filters: {
            categories: {
                slug: slug
            }
        },
        sort: "createdAt:desc",
        populate: "*"
    }, {encode: false})
    const uri = `${restAPI}/posts?${queryParams}`
    const results = await fetch(uri)
    const data = await results.json()
    const posts = transformPosts(data.data)
    return posts
};

export const getAdjacentPosts = async (createdAt, slug) => {
    const previousPost = await getPreviousPosts(createdAt, slug)
    const nextPost = await getNextPosts(createdAt, slug)
    return {previous: previousPost || undefined, next: nextPost || undefined}
};

export const getPreviousPosts = async (createdAt, slug) => {
    const queryParams = qs.stringify({
        filters: {
            slug: {$ne: slug},
            createdAt: {$lte: createdAt},
        },
        pagination:{
            start: 0,
            limit: 1,
        },
        sort: "createdAt:desc",
        populate: "*"
    }, {encode: false})
    const uri = `${restAPI}/posts?${queryParams}`
    const results = await fetch(uri)
    const data = await results.json()
    const posts = transformPosts(data.data)
    return posts.length > 0 ? posts[0] : undefined
};
export const getNextPosts = async (createdAt, slug) => {
    const queryParams = qs.stringify({
        filters: {
            slug: {$ne: slug},
            createdAt: {$gte: createdAt},
        },
        pagination:{
            start: 0,
            limit: 1,
        },
        sort: "createdAt:asc",
        populate: "*"
    }, {encode: false})
    const uri = `${restAPI}/posts?${queryParams}`
    const results = await fetch(uri)
    const data = await results.json()
    const posts = transformPosts(data.data)
    return posts.length > 0 ? posts[0] : undefined
};

export const getAbout = async () => {
    const uri = `${restAPI}/about?populate=*`
    const results = await fetch(uri)
    const data = await results.json()
    return {
        id: data.data.id,
        ...data.data.attributes
    }
};

// import { request, gql } from 'graphql-request';
//
// // const graphqlAPI = process.env.NEXT_PUBLIC_TONYBLOG_ENDPOINT;
// const graphqlAPI = process.env.NEXT_PUBLIC_TONYBLOG_ENDPOINT;
//
// export const getPosts = async () => {
//   const query = gql`
//     query MyQuery {
//       postsConnection {
//         edges {
//           node {
//             author {
//               bio
//               name
//               id
//               photo {
//                 url
//               }
//             }
//             createdAt
//             slug
//             title
//             excerpt
//             featuredImage {
//               url
//             }
//             categories {
//               name
//               slug
//             }
//           }
//         }
//       }
//     }
//   `;
//
//   const results = await request(graphqlAPI, query);
//
//   return results.postsConnection.edges;
// };
//
// // Accepting a slug that's going to be a string
// // raw: give access to the post's content
// export const getPostDetails = async (slug) => {
//   const query = gql`
//     query GetPostDetails($slug: String!) {
//       post(where: { slug: $slug }) {
//         author {
//           bio
//           name
//           id
//           photo {
//             url
//           }
//         }
//         createdAt
//         slug
//         title
//         excerpt
//         featuredImage {
//           url
//         }
//         categories {
//           name
//           slug
//         }
//         content {
//           raw
//         }
//       }
//     }
//   `;
//
//   const results = await request(graphqlAPI, query, { slug });
//
//   return results.post;
// };
//
// export const getRecentPosts = async () => {
//   const query = gql`
//     query GetPostDetails() {
//       posts (
//         orderBy: createdAt_ASC
//         last: 3
//       ) {
//         title
//         featuredImage {
//           url
//         }
//         createdAt
//         slug
//       }
//     }
//   `;
//
//   const results = await request(graphqlAPI, query);
//
//   return results.posts;
// };
//
// export const getSimiliarPosts = async (slug, categories) => {
//   const query = gql`
//     query GetPostDetails($slug: String!, $categories: [String!]) {
//       posts(
//         where: {
//           slug_not: $slug
//           AND: { categories_some: { slug_in: $categories } }
//         }
//         last: 3
//       ) {
//         title
//         featuredImage {
//           url
//         }
//         createdAt
//         slug
//       }
//     }
//   `;
//
//   const results = await request(graphqlAPI, query, { slug, categories });
//
//   return results.posts;
// };
//
// export const getCategories = async () => {
//   const query = gql`
//     query GetCategories {
//       categories {
//         name
//         slug
//       }
//     }
//   `;
//
//   const results = await request(graphqlAPI, query);
//
//   return results.categories;
// };
//
// export const submitComment = async (obj) => {
//   const result = await fetch('/api/comments', {
//     method: 'POST',
//     dataType: 'json',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(obj),
//   });
//
//   return result.json();
// };
//
// // String!: String with exclamation mark
// export const getComments = async (slug) => {
//   const query = gql`
//     query GetComments($slug: String!) {
//       comments(where: { post: { slug: $slug } }) {
//         name
//         createdAt
//         content
//       }
//     }
//   `;
//
//   const results = await request(graphqlAPI, query, { slug });
//
//   return results.comments;
// };
//
// export const getFeaturedPosts = async () => {
//   const query = gql`
//     query GetCategoryPost() {
//       posts(where: {featuredPost: true}){
//         author {
//           name
//           photo {
//             url
//           }
//         }
//         featuredImage {
//           url
//         }
//         title
//         slug
//         createdAt
//       }
//     }
//   `;
//
//   const results = await request(graphqlAPI, query);
//
//   return results.posts;
// };
//
// export const getCategoryPost = async (slug) => {
//   const query = gql`
//     query GetCategoryPost($slug: String!) {
//       postsConnection(where: { categories_some: { slug: $slug } }) {
//         edges {
//           cursor
//           node {
//             author {
//               bio
//               name
//               id
//               photo {
//                 url
//               }
//             }
//             createdAt
//             slug
//             title
//             excerpt
//             featuredImage {
//               url
//             }
//             categories {
//               name
//               slug
//             }
//           }
//         }
//       }
//     }
//   `;
//
//   const result = await request(graphqlAPI, query, { slug });
//
//   return result.postsConnection.edges;
// };
//
// export const getAdjacentPosts = async (createdAt, slug) => {
//   const query = gql`
//     query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
//       next: posts(
//         first: 1
//         orderBy: createdAt_ASC
//         where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
//       ) {
//         title
//         featuredImage {
//           url
//         }
//         createdAt
//         slug
//       }
//       previous: posts(
//         first: 1
//         orderBy: createdAt_DESC
//         where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
//       ) {
//         title
//         featuredImage {
//           url
//         }
//         createdAt
//         slug
//       }
//     }
//   `;
//
//   const result = await request(graphqlAPI, query, { slug, createdAt });
//
//   return { next: result.next[0], previous: result.previous[0] };
// };
