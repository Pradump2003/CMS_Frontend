
export default function Button({
  type = "button",
  onClick,
  className = "",
  children,
}) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
