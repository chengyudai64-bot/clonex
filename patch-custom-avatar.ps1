$ErrorActionPreference = 'Stop'

$bundlePath = Join-Path $PSScriptRoot 'assets/bundle.js'
$chunkPath = Join-Path $PSScriptRoot 'assets/571.bundle.js'
$bundle = [IO.File]::ReadAllText($bundlePath)
$chunk = [IO.File]::ReadAllText($chunkPath)

$oldModel = 'url:"/assets/murakamiavatar3.glb"'
$newModel = 'url:"/assets/custom/custom-avatar-hero.glb"'
if ($bundle.Contains($oldModel)) {
  $bundle = $bundle.Replace($oldModel, $newModel)
} elseif (-not $bundle.Contains($newModel)) {
  throw 'Could not find the V4 avatar manifest entry.'
}

$startMarker = 'addAvatar(){let t=f.Z.get("avatar")'
$endMarker = 'setClips(t,e){'
$start = $chunk.IndexOf($startMarker)
$end = $chunk.IndexOf($endMarker, $start)
if ($start -lt 0 -or $end -lt 0) { throw 'Could not locate addAvatar() in runtime chunk.' }

$replacement = 'addAvatar(){let t=f.Z.get("avatar");t.scene.traverse((t=>{t.geometry&&(t.frustumCulled=!1,t.geometry.attributes&&t.geometry.attributes.uv?("hair-lowpoly-baked"==t.name?(t.material=new i.Wid,t.material.map=L.Z.crown_diffuse,t.material.normalMap=L.Z.crown_normal,t.material.metalnessMap=L.Z.crown_metalness,t.material.roughnessMap=L.Z.crown_metalness):(t.material.map=L.Z.albedo,t.material.normalMap=L.Z.normal,t.material.metalnessMap=L.Z.roughness,t.material.roughnessMap=L.Z.roughness),t.material.normalScale.y=-1,t.material.side=2,t.material.transparent=!0):(t.material=new i.Wid({color:1577256,roughness:.68,metalness:.08}),t.material.side=2))}));const e=t.scene||t.scenes[0],n=t.animations||[],s=new i.Xcj(e);n[0]&&(this.avatarEyeAction=s.clipAction(n[0]).play(),this.avatarEyeAction.weight=1),n[1]&&(this.avatarLoop=s.clipAction(n[1]).play(),this.avatarLoop.weight=0),n[2]&&(this.keyAction=s.clipAction(n[2]).play()),this.mixers.push(s),this.avatarMixer=s,this.add(e)}'
$chunk = $chunk.Substring(0, $start) + $replacement + $chunk.Substring($end)

$oldUpdate = 'this.acc>this.lightDuration&&(this.avatarEyeAction.weight=0,this.avatarLoop.weight=1,this.cableInit.weight=0,this.cableLoop.weight=1),'
$newUpdate = 'this.acc>this.lightDuration&&(this.avatarEyeAction&&(this.avatarEyeAction.weight=0),this.avatarLoop&&(this.avatarLoop.weight=1),this.cableInit.weight=0,this.cableLoop.weight=1),'
if ($chunk.Contains($oldUpdate)) {
  $chunk = $chunk.Replace($oldUpdate, $newUpdate)
} elseif (-not $chunk.Contains($newUpdate)) {
  throw 'Could not locate the avatar animation transition.'
}

[IO.File]::WriteAllText($bundlePath, $bundle, [Text.UTF8Encoding]::new($false))
[IO.File]::WriteAllText($chunkPath, $chunk, [Text.UTF8Encoding]::new($false))
Write-Host 'CloneX V4 Hero now uses custom-avatar-hero.glb'
