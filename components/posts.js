'use client';

import { useOptimistic } from 'react';

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { toggleLike } from '@/actions/like-post.js';

function Post({ post, action }) {

  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
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
