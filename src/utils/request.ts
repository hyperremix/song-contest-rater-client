import Auth, { CognitoUser } from '@aws-amplify/auth';
import { RequestOptions, ResponseError } from './types';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
const parseJSON = (response: Response): Promise<any> => {
  if (response.status === 204 || response.status === 205) {
    return Promise.resolve(null);
  }
  return response.json();
};

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
const checkStatus = (response: Response): Response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new ResponseError(response);
};

const getRequestInit = async (
  options?: RequestOptions,
): Promise<RequestInit> => {
  let init: RequestInit = {};

  const token = await getUserIdToken();
  if (token) {
    init = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  if (options?.method) {
    init = {
      ...init,
      method: options.method.toString(),
    };
  }

  if (options?.body) {
    init = {
      ...init,
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options.body),
    };
  }

  return init;
};

const getUserIdToken = async (): Promise<string> => {
  try {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
    return user.getSignInUserSession()?.getIdToken().getJwtToken() ?? '';
  } catch (error) {
    return '';
  }
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export const request = async <T>(
  url: string,
  options?: RequestOptions,
): Promise<T> => {
  const requestInit = await getRequestInit(options);
  const fetchResponse = await fetch(
    `${process.env.REACT_APP_API_URL}${url}`,
    requestInit,
  );
  const response = checkStatus(fetchResponse);
  return await parseJSON(response);
};
