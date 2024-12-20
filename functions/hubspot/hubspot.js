import hubspot from '@hubspot/api-client';
import { readJsonFile, saveToJsonFile } from './functions/helpers/json-helpers.js';

const hubspotClient = new hubspot.Client({
  accessToken: '',
});

// ---------------------- Get all Blog Posts from Hubspot ---------------------- //

// const getAllBlogPostsFromHubspot = async () => {
//   try {
//     const createdAt = undefined;
//     const createdAfter = undefined;
//     const createdBefore = undefined;
//     const updatedAt = undefined;
//     const updatedAfter = undefined;
//     const updatedBefore = undefined;
//     const sort = undefined;
//     const after = 'MzAw'; // a string key to paginate provided by the API
//     const limit = 300;
//     const archived = undefined;

//     const apiResponse = await hubspotClient.cms.blogs.blogPosts.blogPostsApi.getPage(
//       createdAt,
//       createdAfter,
//       createdBefore,
//       updatedAt,
//       updatedAfter,
//       updatedBefore,
//       sort,
//       after,
//       limit,
//       archived
//     );
//     saveToJsonFile(apiResponse, './boh-blog-posts-02.json');
//   } catch (e) {
//     if (e.message === 'HTTP request failed') {
//       console.error(JSON.stringify(e.response, null, 2));
//     } else {
//       console.error(e);
//     }
//   }
// };

// getAllBlogPostsFromHubspot();

// ---------------------- Get a single Blog Post from Hubspot ---------------------- //

// const getBlogPostFromHubspot = async () => {
//   try {
//     const apiResponse = await hubspotClient.cms.blogs.blogPosts.blogPostsApi.getById(
//       '125312103706'
//     );
//     saveToJsonFile(apiResponse, './hubspot-example-post.json');
//   } catch (e) {
//     if (e.message === 'HTTP request failed') {
//       console.error(JSON.stringify(e.response, null, 2));
//     } else {
//       console.error(e);
//     }
//   }
// };

// getBlogPostFromHubspot();

// ---------------------- Get All Categories (Tags) from Hubspot ---------------------- //

// const getTagsFromHubspot = async () => {
//   try {
//     const apiResponse = await hubspotClient.cms.blogs.tags.blogTagsApi.getPage();
//     saveToJsonFile(apiResponse.results, './hubspot-tags.json');
//   } catch (e) {
//     if (e.message === 'HTTP request failed') {
//       console.error(JSON.stringify(e.response, null, 2));
//     } else {
//       console.error(e);
//     }
//   }
// };

// getTagsFromHubspot();

// ---------------------- Format the Categories (Tags) for Hubspot ---------------------- //

// const tags = await readJsonFile('./back-of-house/categories/categories-formatted.json');

// const hubspotFormattedTags = tags.map((tag) => {
//   return {
//     name: tag.name,
//   };
// });

// saveToJsonFile(hubspotFormattedTags, './hubsport-formatted-tags.json');

// ---------------------- Create the Categories (Tags) in Hubspot ---------------------- //

// const createTagsInHubspot = async () => {
//   const tags = await readJsonFile('./back-of-house/hubspot/hubsport-formatted-authors.json');

//   tags.forEach(async (tag) => {
//     try {
//       const apiResponse = await hubspotClient.cms.blogs.tags.blogTagsApi.create(tag);
//       console.log(JSON.stringify(apiResponse, null, 2));
//     } catch (e) {
//       if (e.message === 'HTTP request failed') {
//         console.error(JSON.stringify(e.response, null, 2));
//       } else {
//         console.error(e);
//       }
//     }
//   });
// };

// ---------------------- Format the Authors for Hubspot ----------------------

// const authors = await readJsonFile('./back-of-house/authors/authors-formatted-with-social.json');

// const hubspotFormattedAuthors = authors.map((item) => {
//   const linkedin = item.socialMedia.find((social) => social.type === 'LinkedIn');
//   const twitter = item.socialMedia.find((social) => social.type === 'Twitter');

//   return {
//     id: item.id,
//     fullName: item.name,
//     email: item.email,
//     slug: item.slug,
//     name: item.name,
//     displayName: item.name,
//     bio: item.bio,
//     linkedin: linkedin ? linkedin.url : '',
//     twitter: twitter ? twitter.url : '',
//   };
// });

// saveToJsonFile(hubspotFormattedAuthors, './hubsport-formatted-authors.json');

// ---------------------- Create the Authors in Hubspot ---------------------- //

// const createAuthorsInHubspot = async () => {
//   const authors = await readJsonFile('./back-of-house/hubspot/hubsport-formatted-authors.json');

//   authors.forEach(async (author) => {
//     try {
//       const apiResponse = await hubspotClient.cms.blogs.authors.blogAuthorsApi.create(author);
//       console.log(JSON.stringify(apiResponse, null, 2));
//     } catch (e) {
//       if (e.message === 'HTTP request failed') {
//         console.error(JSON.stringify(e.response, null, 2));
//       } else {
//         console.error(e);
//       }
//     }
//   });
// };

// ---------------------- Get All Authors from Hubspot ---------------------- //

// const getAuthorsFromHubspot = async () => {
//   try {
//     const apiResponse = await hubspotClient.cms.blogs.authors.blogAuthorsApi.getPage();
//     saveToJsonFile(apiResponse.results, './hubspot-authors.json');
//   } catch (e) {
//     if (e.message === 'HTTP request failed') {
//       console.error(JSON.stringify(e.response, null, 2));
//     } else {
//       console.error(e);
//     }
//   }
// };

// getAuthorsFromHubspot();

// ---------------------- Combine Blog Post Files and Sort by Publish Date ---------------------- //

// const posts1 = await readJsonFile('./back-of-house/final/stories-1-new.json');
// const posts2 = await readJsonFile('./back-of-house/final/stories-2-new.json');
// const posts3 = await readJsonFile('./back-of-house/final/stories-3-new.json');
// const posts4 = await readJsonFile('./back-of-house/final/stories-4-new.json');
// const posts5 = await readJsonFile('./back-of-house/final/stories-5-new.json');

// const allPosts = [...posts1, ...posts2, ...posts3, ...posts4, ...posts5];

// allPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

// saveToJsonFile(allPosts, './back-of-house/final/all-stories-sorted.json');

// ---------------------- Format the Blog Posts for Hubspot ---------------------- //

// const posts = await readJsonFile('./back-of-house/final/all-stories-sorted.json');
// const hubspotAuthors = await readJsonFile('./back-of-house/hubspot/hubspot-authors.json');
// const hubspotTags = await readJsonFile('./back-of-house/hubspot/hubspot-tags.json');

// const getBlogAuthorId = (authorName) => {
//   const author = hubspotAuthors.find((author) => author.name === authorName);
//   return author ? author.id : '';
// };

// const getTagIds = (tags) => {
//   if (!tags) return [];

//   const result = tags.map((postTag) => {
//     const tag = hubspotTags.find((hTag) => hTag.name === postTag.name);
//     return tag ? parseInt(tag.id) : 0;
//   });

//   return result || [];
// };

// const formattedPosts = posts.map((post) => {
//   const publishDate = new Date(post.publishedAt);
//   const created = new Date(post.createdAt);
//   const updated = new Date(post.updatedAt);

//   let fallbackPublishDate;

//   if (!isNaN(publishDate.getTime())) {
//     // if publishDate is valid
//     fallbackPublishDate = publishDate.toISOString();
//   } else if (!isNaN(updated.getTime())) {
//     // else if updated is valid
//     fallbackPublishDate = updated.toISOString();
//   } else if (!isNaN(created.getTime())) {
//     // else if created is valid
//     fallbackPublishDate = created.toISOString();
//   } else {
//     fallbackPublishDate = null;
//   }

//   return {
//     slug: post.slug,
//     name: post.title,
//     authorName: post?.author?.name || 'Back of House Team',
//     blogAuthorId: post?.author?.name ? getBlogAuthorId(post?.author?.name) : '126510223626',
//     tagIds: getTagIds(post.categories),
//     htmlTitle: post.title,
//     useFeaturedImage: true,
//     featuredImage: post?.image || '',
//     featuredImageAltText: post.title,
//     postBody: post.body,
//     postSummary:
//       post.shortDescription ||
//       'Choose delivery platforms, POS systems, and more of the best restaurant technology out there with advice from our community of independent restaurateurs.',
//     rssBody: post.body,
//     rssSummary:
//       post.shortDescription ||
//       'Choose delivery platforms, POS systems, and more of the best restaurant technology out there with advice from our community of independent restaurateurs.',
//     metaDescription:
//       post.shortDescription ||
//       'Choose delivery platforms, POS systems, and more of the best restaurant technology out there with advice from our community of independent restaurateurs.',
//     state: 'PUBLISHED',
//     contentGroupId: 106338269770,
//     publishDate: fallbackPublishDate,
//     created: !isNaN(created.getTime()) ? created.toISOString() : null,
//     updated: !isNaN(updated.getTime()) ? updated.toISOString() : null,
//   };
// });

// const filteredPosts = formattedPosts.filter((post) => post.name);

// saveToJsonFile(filteredPosts, './hubspot-blog.json');

// ---------------------- Create Blog Posts In Hubspot ---------------------- //

const createBlogPostInHubspot = async () => {
  const posts = await readJsonFile('./TESTING-02.json');

  // const batch = posts.slice(0, 50);
  // const batch = posts.slice(50, 100);
  // const batch = posts.slice(100, 150);
  // const batch = posts.slice(150, 200);
  // const batch = posts.slice(200, 250);
  // const batch = posts.slice(250, 300);
  // const batch = posts.slice(300, 350);
  // const batch = posts.slice(350, 400);
  // const batch = posts.slice(400, 450);
  // const batch = posts.slice(450, 500);
  // const batch = posts.slice(500, 550);
  // const batch = posts.slice(550, 600);
  const batch = posts.slice(600, 650);

  batch.forEach(async (post) => {
    try {
      // Convert the date strings to Date objects
      post.publishDate = new Date(post.publishDate);
      post.created = new Date(post.created);
      post.updated = new Date(post.updated);

      const apiResponse = await hubspotClient.cms.blogs.blogPosts.blogPostsApi.create(post);
      console.log(JSON.stringify(apiResponse, null, 2));
    } catch (e) {
      if (e.message === 'HTTP request failed') {
        console.error(JSON.stringify(e.response, null, 2));
      } else {
        console.error(e);
      }
    }
  });
};

createBlogPostInHubspot();

// ---------------------- Update Blog Posts In Hubspot ---------------------- //

// const JSON_POSTS_01 = await readJsonFile('./boh-blog-posts-01.json');
// const JSON_POSTS_02 = await readJsonFile('./boh-blog-posts-02.json');
// const JSON_POSTS_03 = await readJsonFile('./boh-blog-posts-03.json');

// const posts = [...JSON_POSTS_01.results, ...JSON_POSTS_02.results, ...JSON_POSTS_03.results];

// saveToJsonFile(posts, './boh-blog-posts-all.json');

// const updateBlogPostInHubspot = async () => {
//   const posts = await readJsonFile('./boh-blog-posts-all-formatted-unique.json');

//   const batch = posts.slice(4, 100);

//   batch.forEach(async (post) => {
//     try {
//       await hubspotClient.cms.blogs.blogPosts.blogPostsApi.update(post.id, {
//         slug: post.slug,
//         ...post,
//       });
//       console.log('Updated post: ', post.id);
//     } catch (e) {
//       saveToJsonFile(e.body, `./errors/hubspot-error-${post.id}.json`);

//       if (e.message === 'HTTP request failed') {
//         console.error(JSON.stringify(e.response, null, 2));
//       } else {
//         console.error(e);
//       }
//     }
//   });
// };

// updateBlogPostInHubspot();

// ---------------------- Misc Code ---------------------- //

// const allBlogPosts = await readJsonFile('./boh-all-posts.json');
// const publishedBlogPosts = await readJsonFile('./boh-published-posts.json');

/**
 * Goal:
 * - Cleanup data
 * - In the allBlogPosts array there are blog posts that are archived see field "archivedInDashboard": true
 * - We need to set the "archivedInDashboard" field to false for all blog posts
 * - We need to remove duplicate blog posts from the allBlogPosts array
 *
 */

// const allBlogPostsCleaned = allBlogPosts.map((post) => {
//   return {
//     ...post,
//     archivedInDashboard: false,
//   };
// });

// const allBlogPostsCleanedUnique = allBlogPosts.filter(
//   (post, index, self) => index === self.findIndex((p) => p.id === post.id)
// );

// saveToJsonFile(allBlogPostsCleanedUnique, './boh-all-posts-cleaned-unique.json');

// const cleanedData = await readJsonFile('./boh-all-posts-cleaned-unique.json');

// const formattedData = cleanedData.map((post) => {
//   // Remove "/blog" from the slug
//   return {
//     ...post,
//     slug: post.slug.replace('/blog', ''),
//   };
// });

// saveToJsonFile(formattedData, './boh-all-posts-formatted.json');

// const formattedData = await readJsonFile('./boh-all-posts-formatted.json');

// const archivedPosts = await readJsonFile('./boh-archived-posts.json');
// const unarchivedPosts = await readJsonFile('./boh-unarchived-posts.json');

// console.log('archivedPosts: ', archivedPosts.length);
// console.log('unarchivedPosts: ', unarchivedPosts.length);

// // Start with unarchived posts, and only add the archived post if there's no corresponding unarchived one.
// const uniquePosts = unarchivedPosts.concat(
//   archivedPosts.filter(
//     (archivedPost) =>
//       !unarchivedPosts.some((unarchivedPost) => unarchivedPost.slug === archivedPost.slug)
//   )
// );

// saveToJsonFile(uniquePosts, './boh-all-posts-ready-to-publish.json');

// const formattedData = await readJsonFile('./boh-all-posts-ready-to-publish.json');

// const updateBlogPostID = formattedData.map((post) => {
//   return {
//     ...post,
//     slug: post.slug.replace('resources/', ''),
//     contentGroupId: '106338269770',
//   };
// });
