# sendgrid-nodejs-endpoint
A simple NodeJS server to create an endpoint for a Sendgrid account.

## Environment

```
PORT=3001
ALLOWED_ORIGINS=http://example.com
SENDGRID_API_KEY=<Sendgrid API key>
```

NPM scripts:
```
npm start               # Starts the server
npm run start-debug     # Starts the server in debug mode
```

## REST Endpoint

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
	"from": "sender@mail.com",
	"to": "recipient@mail.com",
	"subject": "test sendgrid client",
	"text": "test sendgrid client",
    "html": "test sendgrid client"
}

< 200 OK
```

## Dependencies
- [express](http://expressjs.com)
- [morgan](https://github.com/expressjs/morgan)
- [debug](https://github.com/visionmedia/debug)
- [dotenv](https://github.com/motdotla/dotenv)
- [sendgrid/mail](https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail)