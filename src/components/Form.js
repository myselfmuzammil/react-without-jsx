export function Form({children, ...props}) {
  return (
    <form {...props} onSubmit={ev => ev.preventDefault()}>
      {children}
    </form>
  );
}

export default Form;
