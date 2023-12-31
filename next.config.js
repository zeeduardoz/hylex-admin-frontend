const path = require('path')

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_CALLBACK: process.env.DISCORD_CALLBACK,
    DISCORD_PEM_DIRECTORY: process.env.DISCORD_PEM_DIRECTORY
  }
}
