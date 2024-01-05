export const Error = ({ message, statusCode }) => (
    <>
        <h1>{message}</h1>
        <span>{statusCode}</span>
    </>
);

export default Error;