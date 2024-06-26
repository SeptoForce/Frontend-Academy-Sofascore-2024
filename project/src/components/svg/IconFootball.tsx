export function IconFootball(props: { color?: string; size?: string }) {
  const size = props.size ?? '24'

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.15 4.2c4.236-4.314 11.153-4.314 15.417 0 4.235 4.286 4.235 11.286 0 15.6-4.264 4.314-11.153 4.286-15.416 0-4.236-4.286-4.236-11.314 0-15.6zm12-.657A9.35 9.35 0 0 0 5.225 5.286c-2.965 3-3.53 7.485-1.723 11.057l1.835-.772L8.33 18.6l-.762 1.857c3.53 1.829 7.962 1.229 10.927-1.743 2.937-3 3.501-7.514 1.723-11.085L18.38 8.4l-2.993-3.029.763-1.828zm.763 8.371 1.412 3.629-2.965 3-3.558-1.4.932-4.257 4.179-.972zM8.16 5.486 11.69 7l-.763 4.057-4.038.743-1.468-3.543L8.16 5.486z"
        fill={props.color || 'var(--surface-surface-1)'}
      />
    </svg>
  )
}

export default IconFootball
