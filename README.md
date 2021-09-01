# dynamodb-demo

_This repository contains a sample Node application based on [Express](http://expressjs.com/) using the [DynamoDB data mapper module](https://www.npmjs.com/package/dynamodb). It also uses the [single-table design](https://aws.amazon.com/blogs/compute/creating-a-single-table-design-with-amazon-dynamodb/)_.

---

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/KristijanS99/dynamodb-demo # or clone your own fork
cd dynamodb-demo
cp .env.example .env # Fill in the required values
npm install
npm run dev
```

Your app should now be running on `http://localhost:PORT`

## Building for production

```sh
cp .env.example .env # Fill in the required values
npm install
npm run build
```

## Running in production

```sh
cp .env.example .env # Fill in the required values
npm install
npm run start
```
