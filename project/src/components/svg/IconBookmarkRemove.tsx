export function IconBookmarkRemove(props: { color?: string; size?: string }) {
  const size = props.size ?? '24'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.color || 'var(--surface-surface-1)'}
      width={size}
      height={size}
    >
      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
    </svg>
  )
}

export default IconBookmarkRemove