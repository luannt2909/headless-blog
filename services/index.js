import qs from "qs";

// const restAPI = "http://localhost:1337/api";
const restAPI = process.env.NEXT_PUBLIC_BLOG_ENDPOINT;

const DEFAULT_POST_FIELDS = ["featuredImage", "title", "description", "slug", "createdAt", "viewCount"]
export const getPosts = async () => {
    const queryParams = qs.stringify({
        populate: "*",
        sort: "createdAt:desc",
        fields: DEFAULT_POST_FIELDS,
    }, {encode: false})

    const uri = `${restAPI}/posts?${queryParams}`
    const rsp = await fetch(uri)
    const data = await rsp.json()
    const posts = data.data ? transformPosts(data.data) : []
    return posts
};
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};


export const getPostsPagination = async ({page= 0, limit = 10}) => {
    // Usage
    // await  sleep(5000)
    const queryParams = qs.stringify({
        populate: "*",
        sort: "createdAt:desc",
        fields: DEFAULT_POST_FIELDS,
        pagination: {
            page: page,
            pageSize: limit
        }
    }, {encode: false})

    const uri = `${restAPI}/posts?${queryParams}`
    const rsp = await fetch(uri)
    const data = await rsp.json()
    const posts = data.data ? transformPosts(data.data) : []
    return {posts: posts, pagination: data?.meta?.pagination}
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
    const result = data.data ? data.data.map((d) => {
        const c = {
            id: d.id,
            ...d.attributes,
        }
        if (c.posts) {
            c.postCount = c.posts?.data?.attributes?.count
        }
        return c
    }) : []
    return result
}

function transformAuthor(data) {
    const author = data.data ? data.data : {}
    return {
        id: author.id,
        ...author.attributes,
    }
}

function transformComments(data) {
    const result = data.data ? data.data.map((d) => ({id: d.id, ...d.attributes})) : []
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
        // populate: "*",
        sort: "createdAt:desc",
        fields: DEFAULT_POST_FIELDS,
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

export const getPopularPosts = async () => {
    const queryParams = qs.stringify({
        // populate: "*",
        sort: "viewCount:desc",
        fields: DEFAULT_POST_FIELDS,
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
        // populate: "*",
        fields: DEFAULT_POST_FIELDS
    }, {encode: false})
    const uri = `${restAPI}/posts?${queryParams}`

    const results = await fetch(uri)
    const data = await results.json()
    const posts = transformPosts(data.data)
    return posts
};

export const getCategories = async (withCountPost) => {
    let uri = `${restAPI}/categories`
    if (withCountPost) {
        uri = `${uri}?populate[posts][count]=true`
    }
    const results = await fetch(uri)
    const data = await results.json()
    const categories = transformCategories(data)
    return categories
};

export const getMyStatus = async () => {
    const uri = `${restAPI}/about?populate=me`
    const results = await fetch(uri)
    const data = await results.json()
    return data.data.attributes.me
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

export const getFeaturedPosts = async (category) => {
    const queryParams = qs.stringify({
        filters: {
            isFeaturedPost: true,
            categories: category ? {
                slug: category
            } : undefined
        },
        sort: "createdAt:desc",
        populate: "*",
        fields: DEFAULT_POST_FIELDS
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
        populate: "*",
        fields: DEFAULT_POST_FIELDS
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
        pagination: {
            start: 0,
            limit: 1,
        },
        sort: "createdAt:desc",
        populate: "*",
        fields: DEFAULT_POST_FIELDS
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
        pagination: {
            start: 0,
            limit: 1,
        },
        sort: "createdAt:asc",
        populate: "*",
        fields: DEFAULT_POST_FIELDS
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

export const trackingPost = async (id) => {
    const uri = `${restAPI}/posts/${id}/tracking`
    const results = await fetch(uri)
    const data = await results.json()
    return {
        id: data.data.id,
        ...data.data.attributes
    }
};
