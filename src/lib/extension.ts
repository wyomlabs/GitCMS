/** Store listings for the GitCMS browser extension. */
export const EXTENSION_STORES = [
  {
    key: 'chrome',
    name: 'Chrome Web Store',
    eyebrow: 'Available in the',
    logo: '/logos/chrome.svg',
    url: 'https://chromewebstore.google.com/detail/gitcms-headless-cms-for-y/pemglpclheejlbobifgdbjjofdhmiafm',
  },
  {
    key: 'firefox',
    name: 'Firefox',
    eyebrow: 'Get the add-on for',
    logo: '/logos/firefox.svg',
    url: 'https://addons.mozilla.org/en-US/firefox/addon/gitcms-open-github-content/',
  },
] as const
