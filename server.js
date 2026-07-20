const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const pidFile = path.join(root,'.clonex.pid');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.mp3':'audio/mpeg','.otf':'font/otf','.glb':'model/gltf-binary','.webmanifest':'application/manifest+json'};
const server=http.createServer((req,res)=>{
  const urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,urlPath==='/'?'index.html':urlPath.slice(1));
  if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);return res.end('Not found')}
  const stat=fs.statSync(file);const range=req.headers.range;const headers={'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
  if(range){const [a,b]=range.replace(/bytes=/,'').split('-');const start=Number(a);const end=b?Number(b):stat.size-1;res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});return fs.createReadStream(file,{start,end}).pipe(res)}
  res.writeHead(200,{...headers,'Content-Length':stat.size});fs.createReadStream(file).pipe(res)
});
server.on('error',error=>{if(error.code==='EADDRINUSE'){console.log('CloneX is already running: http://127.0.0.1:4173');process.exit(0)}throw error});
server.listen(4173,'127.0.0.1',()=>{fs.writeFileSync(pidFile,String(process.pid));console.log('CloneX: http://127.0.0.1:4173')});
const cleanup=()=>{try{if(fs.existsSync(pidFile)&&fs.readFileSync(pidFile,'utf8')===String(process.pid))fs.unlinkSync(pidFile)}catch{}process.exit()};
process.on('SIGINT',cleanup);process.on('SIGTERM',cleanup);
