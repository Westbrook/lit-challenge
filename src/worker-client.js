const workerUrl = new URL('./worker-server.js', import.meta.url);
export const worker = new Worker(workerUrl.href);
