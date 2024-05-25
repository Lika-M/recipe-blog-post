'use server';

import { revalidatePath } from "next/cache.js";

import { updatePostLikeStatus } from "@/lib/posts.js";

export async function toggleLike(postId){
   await updatePostLikeStatus(postId, 2);

   revalidatePath('/', 'layout');
}