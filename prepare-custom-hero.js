const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'world/assets/custom/custom-avatar.glb');
const output = path.join(__dirname, 'world/assets/custom/custom-avatar-hero.glb');
const source = fs.readFileSync(input);

if (source.toString('ascii', 0, 4) !== 'glTF') throw new Error('Input is not a binary glTF file');
const version = source.readUInt32LE(4);
if (version !== 2) throw new Error(`Unsupported glTF version: ${version}`);

let offset = 12;
const chunks = [];
while (offset < source.length) {
  const length = source.readUInt32LE(offset);
  const type = source.readUInt32LE(offset + 4);
  chunks.push({ type, data: source.subarray(offset + 8, offset + 8 + length) });
  offset += 8 + length;
}

const jsonChunk = chunks.find(chunk => chunk.type === 0x4e4f534a);
if (!jsonChunk) throw new Error('GLB JSON chunk is missing');
const json = JSON.parse(jsonChunk.data.toString('utf8').replace(/[\0 ]+$/, ''));

json.nodes[0].translation = [0, 0.65, 0];
json.nodes[0].scale = [1.5, 1.5, 1.5];
json.animations = [0, 1, 2].map(index => ({
  name: `CustomAvatarIdle${index + 1}`,
  channels: [],
  samplers: []
}));

let jsonData = Buffer.from(JSON.stringify(json));
const jsonPadding = (4 - (jsonData.length % 4)) % 4;
if (jsonPadding) jsonData = Buffer.concat([jsonData, Buffer.alloc(jsonPadding, 0x20)]);

const rebuilt = [];
for (const chunk of chunks) {
  const data = chunk.type === 0x4e4f534a ? jsonData : chunk.data;
  const header = Buffer.alloc(8);
  header.writeUInt32LE(data.length, 0);
  header.writeUInt32LE(chunk.type, 4);
  rebuilt.push(header, data);
}

const body = Buffer.concat(rebuilt);
const header = Buffer.alloc(12);
header.write('glTF', 0, 4, 'ascii');
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + body.length, 8);
fs.writeFileSync(output, Buffer.concat([header, body]));
console.log(`Prepared Hero model: ${output}`);
