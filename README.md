# sendgrid-nodejs-endpoint
A simple NodeJS server to create an endpoint for a Sendgrid account.

This project can be [used as a template](https://github.com/nunofaria11/sendgrid-nodejs-endpoint/generate).

## Environment

These configurations can be placed in a `.env` file at the root of the project:

```
PORT=3001
SENDGRID_API_KEY=<Sendgrid API key>

FROM=sender@mail.com
ALLOWED_RECIPIENTS=recipient1@mail.com recipient2@mail.com

ALLOWED_ORIGINS=http://example.com

AUTH_SCHEME=Digest
AUTH_REALM=test-realm
AUTH_PASSFILE=/path/users.passfile
```

NPM scripts:
```
npm start               # Starts the server
npm run start-debug     # Starts the server in debug mode
```

## REST Endpoints

**"/" root endpoint**

GET endpoint responds with "Hello World!" message:

```
> GET /
< 200 OK
{
  "message": "Hello World!"
}
```

**"/mail" endpoint**

POST endpoint receives body with JSON object and uses the same object API as [Sendgrid NodeJS API](https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail).
```
> POST /mail
{
    "to": "recipient@mail.com",
    "subject": "test sendgrid client",
    "text": "test sendgrid client",
    "html": "test sendgrid client"
}

< 200 OK
```

## Authentication
Basic and Digest authentication is available but optional. To configure authentication set the environment variables:

```
# The authentication scheme to use (optional); supported values: Basic|Digest
AUTH_SCHEME=Digest

# The authentication realm (optional); default value: sendgrid-nodejs-endpoint
AUTH_REALM=my-realm

# The path to the user encrypted passwords file (optional); default value: /../users.passfile
AUTH_PASSFILE=
```

**Note**: If no `AUTH_SCHEME` is defined no authentication is applied.

### Generate password files

The encrypted passwords file can be generated with [htdigest](https://github.com/http-auth/htdigest) for Digest scheme, and [htpasswd](https://github.com/http-auth/htpasswd) for Basic scheme.

**Digest**
```
htdigest users.htdigest test-realm test-username
```

**Basic**
```
htpasswd users.htpasswd test-username
```

## Allowed origins
Allowed origins can be configured in environment variable `ALLOWED_ORIGINS` (space separated for multiple values).

```
# The allowed origins for CORS configuration; default value: *
ALLOWED_ORIGINS=http://example1.com http://example2.com
```

## Allowed recipients
A group of allowed recipients can be configured via the environment variable `ALLOWED_RECIPIENTS` (space separated for multiple values). If one of the recipients is not in the allow-list the request is rejected with "400 Bad Request" response code.

```
ALLOWED_RECIPIENTS=address_1@mail.com address_2@mail.com
```

**Note**: if unspecified recipients will not be filtered.

## Dependencies
- [express](http://expressjs.com)
- [morgan](https://github.com/expressjs/morgan)
- [debug](https://github.com/visionmedia/debug)
- [dotenv](https://github.com/motdotla/dotenv)
- [sendgrid/mail](https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail)
- [http-auth](https://github.com/http-auth/http-auth)
- [http-auth-connect](https://github.com/http-auth/http-auth-connect)