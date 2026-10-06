import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname, resolve, sep, extname} from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), 'src');
const types = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8'};
const port = Number(process.env.PORT || 5173);
createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const target = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!target.startsWith(`${root}${sep}`)) { response.writeHead(403); response.end(); return; }
    const data = await readFile(target);
    response.writeHead(200, {'Content-Type': types[extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store'});
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch { response.writeHead(404); response.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Front end: http://localhost:${port}`));
