import { createPost } from '@/actions/create-post.js'
import FormPost from '@/components/form-post.js';

export default function NewPostPage() {

  return (
    <FormPost action={createPost} />
  );
}
