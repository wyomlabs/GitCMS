import { useEffect, useRef, useState } from 'react'

type LazyAutoplayVideoProps = {
  src: string
  poster?: string
  ariaLabel: string
  className?: string
}

export function LazyAutoplayVideo({
  src,
  poster,
  ariaLabel,
  className,
}: LazyAutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '320px 0px' },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      poster={shouldLoad ? poster : undefined}
      aria-label={ariaLabel}
      className={className}
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      preload="none"
    />
  )
}
