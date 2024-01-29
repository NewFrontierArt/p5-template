# NFA p5.js generative code template

This repository contains a simple example of a generative code that can be published to [newfrontier.art](https://www.newfrontier.art) to create a new art collection.

## Project Structure

- `index.html`: The html rendered to be used as the resulting NFT
- `nfa.js`: NFA's helper library to generate pseudo random numbers generated from the mint address
- `p5.min.js`: The minified version of the p5.js library
- `sketch.js`: The p5.js code
- `style.css`: Optional, used only to centralize the canvas

All the `.js` scripts must be imported in the html file and NFA does not support external scripts.

## Importing from p5.js

When importing from p5.js, just copy the content to `sketch.js`. You don't need to copy `style.css` or `index.html`.

Make sure you change any instance of the _random()_ p5.js function to the _nfaRandom()_ provided in the `nfa.js` file.

    //circleSize = random(10, 30)
    circleSize = nfaRandom(10, 30)

When testing in your browser, you can access and try multiple results with the pseudorandom params changing the MINT_ADDRESS in the path of your file in your browser as in `p5-template/index.html?nfa=MINT_ADDRESS`.

## Uploading to newfrontier.art

To upload the generative code, zip all the files together and upload the `.zip` file.
