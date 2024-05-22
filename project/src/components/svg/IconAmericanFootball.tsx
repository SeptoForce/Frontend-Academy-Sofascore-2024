export function IconAmericanFootball(props: { color?: string; size?: string }) {
  const size = props.size ?? '24'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.193 3.8c4.8 0 6.805 3.2 7.115 5.714h.706c.367 0 .65.286.65.657a.643.643 0 0 1-.65.658h-.65V13.6c0 .343 0 .686.029 1h2.739c.988 0 1.073.8 1.1 1.057v3.4c0 .772-.366 1.114-1.128 1.114-.791 0-3.163-.342-3.84-4.2h-2.09c-.282 3.343-2.739 3.629-3.53 3.629-1.242 0-2.286-.514-3.218-1.543-.198-.2-.424-.543-.593-.8a.866.866 0 0 1-.141-.2l-.076-.076-1.647-.01c-.395 0-1.129-.171-1.355-1.285a15.503 15.503 0 0 0-.339-1.115c-.339-.942-.734-2.114-.734-3.628 0-3.429 2.937-7.143 7.652-7.143zm9.685 12.171h-2.316c.367 1.743 1.158 2.772 2.316 2.858V15.97zm-9.713-10.8c-3.897 0-6.325 3-6.325 5.8 0 1.286.339 2.286.65 3.172.14.428.282.857.366 1.257.029.143.029.2.057.229H6.55c.48 0 .847.2 1.157.628.057.057.113.143.17.229.14.228.338.514.48.657.875 1 1.665 1.114 2.258 1.114 1.469 0 2.231-.971 2.231-2.886v-.084l-.016-.486c-.018-.322-.05-.64-.069-.944-.113-1.257-.197-2.457.565-3.314.537-.572 1.355-.886 2.626-.972-.254-1.8-1.694-4.4-5.788-4.4zm.282 9.429c.734 0 1.327.6 1.327 1.343s-.593 1.343-1.327 1.343-1.327-.6-1.327-1.343.593-1.343 1.327-1.343zm5.562-3.743c-.875.057-1.44.229-1.722.543-.367.429-.31 1.257-.226 2.314.028.257.028.572.057.886h1.92c-.029-.314-.029-.657-.029-1v-2.743z"
        fill={props.color || 'var(--surface-surface-1)'}
      />
    </svg>
  )
}

export default IconAmericanFootball