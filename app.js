require('dotenv').config();

const jose = require('node-jose');
const jwt = require('jsonwebtoken');

console.log('Hello World');

const payload = {
    name: 'John Doe',
    email: 'john.doe@123.com'
};

const privateKey = process.env.MY_PRIVATE_KEY.replace(/\\n/g, '\n');
const publicKey = process.env.MY_PUBLIC_KEY.replace(/\\n/g, '\n');

console.log(`private key: ${privateKey}`);
console.log(`public key: ${publicKey}`);

jose.JWK.asKey(privateKey, 'pem').then(jwk => {

    // sign the payload
    var signature = jose.JWS.createSign({
        algorithms: ['RS256'],
        format: 'compact',
    }, jwk).update(JSON.stringify(payload), 'utf8').final();
    signature.then(function (signature) {
        console.log(`signature is ${signature}`);
        // verify the signature
        const jwspayload = jwt.verify(signature, publicKey, {
            algorithms: ['RS256'],
        });
        console.log(`jwspayload is ${JSON.stringify(jwspayload)}`);
    });
}).catch(err => {
    console.log(err);
});

