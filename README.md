## Clone & Setup

```shell
# Clone
git clone  https://github.com/boomio-api-v2/final-combined-wdigets-1.git

# If you use multiple users, add user name prefix
git clone https://userName@github.com/boomio-api-v2/final-combined-wdigets-1.git

# Configure Git user
git config --global user.name "userName"
git config --global user.email "userEmail"

# Check
git config --global user.name
git config --global user.email
```

## Installation & Build

Install Node 24.x

```shell
# Install dependencies
npm i

# Build the project
npm run build
```

After building, the output will be available in dist/bundle.js.

## Development (local preview)

```shell
npm start

# Alternative
npm run dev
```

Preview URL:
http://127.0.0.1:3000/?demo=1&widget_type=catch

## Commit & Push

Commit and push changes. Make sure that you pushe dist/bundle.js file.

## Embed in Your Website

Add the following snippet inside your <head>:

Example:

```html
<head>
  <script>
    const newLinkBoomio = 'https://api.sun.boomio.eu/webshop-proxy-service/api/handle';
  </script>
  <script defer src="dist/bundle.js"></script>
</head>
```

or

```html
<head>
  <script>
    window.newLinkBoomio = 'https://api.sun.boomio.eu/webshop-proxy-service/api/handle';
  </script>
  <script defer src="dist/bundle.js"></script>
</head>
```

## Assets (images)

Assets (images) are loaded into different branches under this repository. Be carefull and don't delete the branches before making sure they are not used.

Unique branch / revision identifiers found in raw.githubusercontent URLs for repository boomio-api-v2/final-combined-wdigets-1:

```
feature/whack-testing
main
```
