## Installation & Build

```shell
# Install dependencies
npm i

# Build the project
npm run build
```
After building, the output will be available in dist/bundle.js.

## Development (local preview)

```console
npm start
```

Preview URL:
http://127.0.0.1:3000/?demo=1&widget_type=catch

## Commit & Push

3.) Commit and push changes. Make sure that you pushes dist/bundle.js file.

4.) take dist/bundle.js it is our main build file, which we will connect to website. Open it and pres Raw button.

5.) Put your github link, and transform it in cd for source code. I used this https://raw.githack.com/

!!! But don't forget if you use production mode, if you push new changes, they will be cached from previous branch.
So you need to open your new commit, open version of file and repeat the previous operation.

## Embed in Your Website
Add the following snippet inside your <head>:

Example:

```html
<head>
     <script>
        const newLinkBoomio = "https://api.sun.boomio.eu/webshop-proxy-service/api/handle";
    </script>
    <script defer src="dist/bundle.js"></script>
</head>
```

## Assets (images)

Assets (images) are loaded into different branches under this repository. Be carefull and dont' delete the branches before making sure they are not used.

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
