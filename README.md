### Intro
This is a demo for using JWT signing and verification.

### Requirements
node.js
#### Generate keys
```bash
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
```

### Installation
```
npm install
```

### Run
```
node app.js
```