import { createUploadLink } from 'apollo-upload-client'

export default ({ req, env, $config }) => {
  const serverHost = $config.apolloServiceUrl

  return {
    defaultHttpLink: false,

    link: createUploadLink({
      credentials: 'include',
      uri:
        (process.client ? $config.publicDevApolloServiceUrl : serverHost) +
        $config.apolloServicePath,

      fetch: (uri, options) => {
        if (typeof req !== 'undefined') {
          // Req is defined only for SSR requests
          options.headers.Cookie = req.headers.cookie
        }
        return fetch(uri, options)
      },
    }),
  }
}
