# sendgrid-nodejs-endpoint
A simple NodeJS server to create an endpoint for a Sendgrid account

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

## Dependencies
- [express](http://expressjs.com)
- [morgan](https://github.com/expressjs/morgan)
- [debug](https://github.com/visionmedia/debug)
- [dotenv](https://github.com/motdotla/dotenv)
- [sendgrid/mail](https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail)