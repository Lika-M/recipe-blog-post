export default function FormErrors({ errors }) {
    if (errors.length === 0) {
        return;
    }
    return (
        <ul className="form-errors">
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
    );
}