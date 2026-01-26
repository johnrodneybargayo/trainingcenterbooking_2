
const { spawn } = require('child_process');
const http = require('http');

console.log('Starting Next.js server to seed database...');

// use 3003 to avoid conflicts
const PORT = 3003;

const server = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev', '--', '-p', PORT], {
  stdio: 'pipe',
  shell: true,
  env: { ...process.env }
});

let seeded = false;

server.stdout.on('data', (data) => {
  const str = data.toString();
  console.log('[Next.js]:', str);
  if (str.includes('Ready') || str.includes('started server on') || str.includes('localhost') || str.includes(PORT)) {
    if (!seeded) {
      seeded = true;
      console.log('Server ready. Triggering seed endpoint...');
      // Wait a bit more for the app to be fully ready
      setTimeout(triggerSeed, 5000);
    }
  }
});

server.stderr.on('data', (data) => {
  console.error('[Next.js Error]:', data.toString());
});

function triggerSeed() {
  const req = http.get(`http://localhost:${PORT}/api/seed-db`, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log('Seed response status:', res.statusCode);
      console.log('Seed response body:', data);
      cleanup();
    });
  });

  req.on('error', (e) => {
    console.error('Error requesting seed endpoint:', e.message);
    cleanup();
  });
}

function cleanup() {
  console.log('Stopping server...');
  // Kill the process tree (Windows needs taskkill)
  if (/^win/.test(process.platform)) {
    spawn('taskkill', ['/pid', server.pid, '/f', '/t']);
  } else {
    server.kill();
  }
  process.exit(0);
}

// Timeout
setTimeout(() => {
  console.log('Timeout reached. Exiting.');
  cleanup();
}, 60000);
