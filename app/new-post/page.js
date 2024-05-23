import { redirect } from 'next/navigation.js';

import { storePost } from '@/lib/posts';
import FormPost from '@/components/form-post.js';

export default function NewPostPage() {

  async function createPost(prevState, formData) {
    'use server';
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || title.trim() === '') {
      return errors.push('Title is required!');
    }

    if (!content || content.trim() === '') {
      return errors.push('Content is required!');
    }

    if (!image || image.size === 0) {
      return errors.push('Image is required!');
    }

    if (errors.length > 0) {
      return { errors };
    }

    await storePost({
      imageUrl: '',
      title,
      content,
      userId: 1
    })

    redirect('/feed');
  }

  return (
    <FormPost action={createPost} />
  );
}
