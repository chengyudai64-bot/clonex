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

## AI video hero prototype

Open `/video-hero.html` and use the `VIDEO` control to select an AI-generated
MP4 or WebM file. Desktop browsers map page scroll progress to the video
timeline; WeChat uses muted inline looping playback for compatibility.

## Custom FBX avatar preview

Open `/custom-model.html` to inspect the converted custom avatar in a local
Three.js scene. Drag to rotate and scroll to move the camera. The supplied FBX
is a static 484,125-triangle mesh with no UV coordinates, embedded textures,
rig, or animation, so the preview uses a procedural dark material and red/blue
lighting.

The production CloneX V4 Hero manifest now loads
`world/assets/custom/custom-avatar-hero.glb`. `prepare-custom-hero.js` normalizes
the static FBX conversion for the original camera scale, and
`patch-custom-avatar.ps1` makes the original runtime tolerate an avatar without
UVs or skeletal animation.
