import Auth, { CognitoUser } from '@aws-amplify/auth';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response): Promise<any> {
  if (response.status === 204 || response.status === 205) {
    return Promise.resolve(null);
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new ResponseError(response);
}

async function addAuthHeader(
  options?: RequestInit,
): Promise<RequestInit | undefined> {
  if (!options) {
    return options;
  }

  const user: CognitoUser = await Auth.currentAuthenticatedUser();
  const token = user.getSignInUserSession()?.getIdToken().getJwtToken();
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestInit,
): Promise<{} | { err: ResponseError }> {
  const optionsWithAuth = await addAuthHeader(options);
  const fetchResponse = await fetch(url, optionsWithAuth);
  const response = checkStatus(fetchResponse);
  return await parseJSON(response);
}
