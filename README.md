# NFA p5.js generative code template

This repository is structured as

- `index.html`: The html rendered to be used as the resulting NFT
- `nfa.js`: NFA's helper library to generate pseudo random numbers generated from the mint address
- `p5.min.js`: The minified version of the p5.js library
- `sketch.js`: The p5.js code
- `style.css`: Optional, used only to centralize the canvas

All the `.js` scripts must be imported in the html file and NFA does not support external scripts.

When testing in chrome, you can access and try multiple results with the pseudorandom params changing the MINT_ADDRESS in the path of your file in your browser as in `p5-template/index.html?nfa=MINT_ADDRESS`.
