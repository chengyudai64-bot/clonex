# clonex

Local offline mirror of the RTFKT CloneX interactive website.

Double-click `START-CLONEX.cmd` to start the local server, then open <http://127.0.0.1:4173/>.

## Build

```bash
npm install
npm run build
```

The deployable static website is generated in `dist/`. Configure the hosting
platform with `npm run build` as the build command and `dist` as the output
directory.
