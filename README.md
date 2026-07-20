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

## WeChat

Share the public HTTPS deployment URL in WeChat. `127.0.0.1` and `localhost`
only work on the computer running the local server and cannot be opened from a
phone. The site includes WeChat viewport, safe-area, touch, media-unlock and
WebGL fallback handling.
