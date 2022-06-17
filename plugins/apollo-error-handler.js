export default (
  { graphQLErrors, networkError, operation, forward },
  nuxtContext
) => {
  // eslint-disable-next-line no-console
  console.warn(
    'Global error handler',
    graphQLErrors,
    networkError,
    operation,
    forward
  );
};
