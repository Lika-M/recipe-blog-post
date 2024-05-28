'use client';

import { useOptimistic } from 'react';
import Image from 'next/image';

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { toggleLike } from '@/actions/like-post.js';

function Post({ post, action }) {

  function imageLoader({ src, width, quality }) {
    //src:
    //'https://res.cloudinary.com/dnpjxqc7r/image/upload/v1716741971/recipe-blog-post/aqwjz0nisxsjexfwdpbw.png'
    //claudinary define:
    //https://res.cloudinary.com/demo/image/upload/c_thumb,g_faces,h_250,w_250/r_max/co_rgb:F8F3F0,e_outline:10/b_rgb:DBE0EA/happy_people;
   

    const urlStart = src.split('upload/')[0];
    const urlEnd = src.split('upload/')[1];
    const transform = `w_200,q_75`

    console.log(`${urlStart}upload/${transform}/${urlEnd}`)
    return `${urlStart}upload/${transform}/${urlEnd}`;
  }
  return (
    <article className="post">
      <div className="post-image">
        <Image
          src={post.image}
          alt={post.title}
          fill
          loader={imageLoader}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)} className={post.isLiked ? 'liked' : ''}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {

  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, postId) => {
    const index = prevPosts.findIndex(p => p.id === postId);

    if (index === -1) {
      return prevPosts;
    }

    const updatedPost = Object.assign({}, prevPosts[index]);
    updatedPost.isLiked = !updatedPost.isLiked;

    if (updatedPost.isLiked) {
      updatedPost.likes -= 1;
    } else {
      updatedPost.likes += 1;
    }

    const newPostsArray = [...prevPosts];
    newPostsArray.splice(index, 1, updatedPost);
    return newPostsArray;
  });

  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await toggleLike(postId);
  }

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
