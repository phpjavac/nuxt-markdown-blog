const I18N = {
  useCookie: false,
  alwaysRedirect: true,
  locales: [
    {
      code: 'zh',
      iso: 'zh-CN',
      name: 'Chinese',
      file: 'zh/index.js'
    },
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en/index.js'
    }
  ],
  lazy: true,
  seo: false,
  langDir: '/locales/',
  defaultLocale: 'zh',
  parsePages: false
}

module.exports = {
  I18N
}
