type TrustedDeveloperAvatar = {
  name: string
  imageSrc: string
}

const trustedDeveloperAvatars: Array<TrustedDeveloperAvatar> = [
  {
    name: 'Nicole Jeanette',
    imageSrc: '/images/landing/users/thumbs/nicole-jeanette.webp',
  },
  {
    name: 'Bhavik',
    imageSrc: '/images/landing/users/thumbs/bhavik.webp',
  },
  {
    name: 'Bishakh',
    imageSrc: '/images/landing/users/thumbs/bishakh.webp',
  },
  {
    name: 'Chinmay',
    imageSrc: '/images/landing/users/thumbs/chinmay.webp',
  },
]

export function TrustedDevelopersBar() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex shrink-0 items-center">
        {trustedDeveloperAvatars.map((avatar, index) => (
          <div
            key={avatar.name}
            className={`relative ${index === 0 ? '' : '-ml-3'}`}
          >
            <img
              src={avatar.imageSrc}
              alt={avatar.name}
              width={112}
              height={112}
              className="size-9 rounded-full border-2 border-white object-cover shadow-sm"
            />
          </div>
        ))}
      </div>

      <p className="text-sm leading-tight text-neutral-500 sm:text-[15px]">
        Trusted by <span className="font-semibold text-neutral-900">200+</span>{' '}
        website builders
      </p>
    </div>
  )
}
