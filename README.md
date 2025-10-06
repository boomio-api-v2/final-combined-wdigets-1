## Clone & Setup

```shell
# Clone
git clone  https://github.com/boomio-api-v2/final-combined-wdigets-1.git

# If you use multiple users, add user name prefix
git clone https://andriusboomio@github.com/boomio-api-v2/final-combined-wdigets-1.git

# Configure Git user
git config --global user.name "AndriusBoomio"
git config --global user.email "andrius@boomio.com"

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
feature/new-testing
feature/qr-remove
feature/whack-testing
feature/claw-machine-auto
feature/claw-machine-auto-with-close
fix/whack-speed-and-gifs
fix-wheel-z-index
claw-machine-icon-button
main
refs/heads/feature/new-testing
0753f565c8eeb594222696c37839677a8738f41d
f944596b1d3e8a4992e37ca44bc1e369d1784e8e
273ccfb7bc0752badbdc88389a5b5b47e183a03e
29f42dcf4707294e1a86d84192c5fceb8c81f414
```
