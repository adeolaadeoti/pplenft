import styles from "./hover-text.module.scss";
export default function HoverText({
  href,
  id,
  text,
  target,
  rel,
}: {
  href: string;
  id?: string;
  text: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      id={id}
      target={target}
      rel={rel}
      className={styles.hoverText}
    >
      <span data-hover={text}>{text}</span>
    </a>
  );
}
