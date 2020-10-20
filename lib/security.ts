import { md } from 'node-forge';
export function generateToken() {
  const salt = process.env.SALT ?? 'A';
  let p = salt
    .split('')
    .map((item) => item.charCodeAt(0))
    .reduce((a, b) => a + b);
  while (p > 100) {
    p = p / 100 + (p % 100);
  }
  p = Math.floor(p);
  var hash = md.sha512.create();
  let token = process.env.PROXY_SECRET! || '';
  for (let i = 0; i < p; i++) {
    hash.update(token);
    token = hash.digest().toHex();
  }
  console.log('Proxy Server Token:', token);

  process.env.TOKEN = token;
}