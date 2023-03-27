# example-nostr-auth

An example login supporting NIP07 with nextjs 13 appDir and next-auth.

# the stack

* nextjs
* appDir
* next-auth
* jwt
* nostr
* NIP07 https://github.com/nostr-protocol/nips/blob/master/07.md

# running the example
```
npm install
npm run dev
```

# details

This project uses the following dependencies:
```
npm i next-auth --save
npm i nostr-tools --save
```

The provided .env file contains development defauts for next-auth:
NEXT_AUTH_URL
NEXT_AUTH_SECRET
