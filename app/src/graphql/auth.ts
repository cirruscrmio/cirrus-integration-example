import * as client from "openid-client";
import config from "~/config";
import { createWinstonLogger } from "~/logger";

// The minimum allowed expiry time for a token
// before it will be refetched
const MIN_SECONDS_BEFORE_REFRESH = 10;

type AuthResult = Awaited<ReturnType<typeof client.clientCredentialsGrant>>;

let cachedResponse: AuthResult | undefined;
let ongoingRequest: Promise<AuthResult> | undefined;

const logger = createWinstonLogger({ level: config.LOG_LEVEL });

// Configuration object for `openid-client`. Used in favor over `discovery`
// since OAuth method and server metadata will not change.
const clientConfig = new client.Configuration(
  {
    issuer: config.CIRRUS_OAUTH_URL,
    token_endpoint: config.CIRRUS_OAUTH_URL,
  },
  config.CIRRUS_AUTH_CLIENT_ID,
  config.CIRRUS_AUTH_CLIENT_SECRET,
);

export const getToken = async (): Promise<string> => {
  // If there is an existing token then reause that
  // assuming there is sufficent expiration time left on it
  if (cachedResponse) {
    const expiresIn = cachedResponse.expiresIn();

    if (expiresIn && expiresIn > MIN_SECONDS_BEFORE_REFRESH) {
      logger.verbose("Resuing existing auth token");

      return cachedResponse.access_token;
    }
  }

  // If there already is an ongoing request, then await
  // it and return the auth token from there instead of starting
  // a new request.
  if (ongoingRequest) {
    logger.verbose("Awaiting ongoing auth token requst");

    const result = await ongoingRequest;
    return result.access_token;
  }

  logger.verbose("Starting to fetch auth token");
  ongoingRequest = client.clientCredentialsGrant(clientConfig);

  try {
    cachedResponse = await ongoingRequest;
    logger.verbose("Successfully fetched auth token");
  } catch (error) {
    logger.error("Failed to fetch auth token", error);
    // Re-throw the error to the caller
    throw error;
  } finally {
    // Clear the ongoing request semaphore after the request is complete
    ongoingRequest = undefined;
  }

  return cachedResponse.access_token;
};
