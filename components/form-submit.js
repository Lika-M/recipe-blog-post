'use client';

import { useFormStatus } from "react-dom";

export default function FormSubmit() {
    const {pending} = useFormStatus();

    if(pending){
        return <p className="form-actions">Creating post...</p>
    }

    return (
        <p className="form-actions">
            <button type="reset">Reset</button>
            <button disabled={pending}>Create Post</button>
        </p>
    );
    return
}