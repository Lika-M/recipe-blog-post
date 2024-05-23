'use server';

import { redirect } from 'next/navigation.js';
import { storePost } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary.js';

export async function createPost(prevState, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || title.trim() === '') {
        errors.push('Title is required!');
    }

    if (!content || content.trim() === '') {
        errors.push('Content is required!');
    }

    if (!image || image.size === 0) {
        errors.push('Image is required!');
    }

    if (errors.length > 0) {
        return { errors };
    }

    let imageUrl;

    try {
        imageUrl = await uploadImage(image);
    } catch (err) {
        throw new Error('Image upload failed, please try again later.')
    }

    await storePost({
        imageUrl,
        title,
        content,
        userId: 1
    })

    redirect('/feed');
}