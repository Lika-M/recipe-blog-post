'use client';

import { useFormState } from 'react-dom';

import FormSubmit from '@/components/form-submit.js';
import FormErrors from './form-errors.js';

export default function FormPost({ action }) {

    const [state, formAction] = useFormState(action, { errors: []});

    return (
        <>
            <h1>Create a new post</h1>
            <form action={formAction}>
                <p className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" />
                </p>
                <p className="form-control">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"

                    />
                </p>
                <p className="form-control">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" rows="5" />
                </p>
                <FormSubmit />
                <FormErrors errors={state.errors} />
            </form>
        </>
    );
}