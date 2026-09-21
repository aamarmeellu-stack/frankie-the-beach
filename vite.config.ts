import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function videoSyncPlugin() {
  return {
    name: 'video-sync-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        // 1. API endpoint to check video statuses and auto-sync root videos to public/
        if (req.url?.startsWith('/api/check-videos')) {
          const status: Record<number, boolean> = {};
          const publicFiles = fs.existsSync('public') ? fs.readdirSync('public') : [];
          const rootFiles = fs.readdirSync('.');

          for (let i = 1; i <= 6; i++) {
            const matchInPublic = publicFiles.find((f: string) => {
              const lower = f.toLowerCase();
              return (
                (lower.includes(`video ${i}`) || lower.includes(`video-${i}`) || lower.includes(`video${i}`)) &&
                (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov'))
              );
            });
            const matchInRoot = rootFiles.find((f: string) => {
              const lower = f.toLowerCase();
              return (
                (lower.includes(`video ${i}`) || lower.includes(`video-${i}`) || lower.includes(`video${i}`)) &&
                (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov'))
              );
            });

            if (matchInRoot && !matchInPublic) {
              try {
                fs.copyFileSync(matchInRoot, `public/${matchInRoot}`);
                fs.copyFileSync(matchInRoot, `public/video-${i}-frankie.mp4`);
                fs.copyFileSync(matchInRoot, `public/video ${i} frankie.mp4`);
                exec(`ffmpeg -ss 00:00:01 -i "public/video-${i}-frankie.mp4" -vframes 1 -q:v 2 "public/video-${i}-poster.webp" -y`);
              } catch (err) {
                console.error(`Error auto-syncing video ${i}:`, err);
              }
            } else if (matchInPublic) {
              if (!fs.existsSync(`public/video-${i}-frankie.mp4`)) {
                try { fs.copyFileSync(`public/${matchInPublic}`, `public/video-${i}-frankie.mp4`); } catch {}
              }
              if (!fs.existsSync(`public/video ${i} frankie.mp4`)) {
                try { fs.copyFileSync(`public/${matchInPublic}`, `public/video ${i} frankie.mp4`); } catch {}
              }
              if (!fs.existsSync(`public/video-${i}-poster.webp`)) {
                exec(`ffmpeg -ss 00:00:01 -i "public/video-${i}-frankie.mp4" -vframes 1 -q:v 2 "public/video-${i}-poster.webp" -y`);
              }
            }

            status[i] = Boolean(matchInPublic || matchInRoot);
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, videos: status }));
          return;
        }

        // 2. Direct upload endpoint for browser drag & drop or file picker
        if (req.url?.startsWith('/api/upload-video') && req.method === 'POST') {
          const parsedUrl = new URL(req.url, 'http://localhost:3000');
          const number = parsedUrl.searchParams.get('number') || '4';
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', () => {
            const buffer = Buffer.concat(chunks);
            if (buffer.length > 0) {
              if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });
              const targetPath = `public/video-${number}-frankie.mp4`;
              const targetSpaced = `public/video ${number} frankie.mp4`;
              const rootSpaced = `video ${number} frankie.mp4`;
              fs.writeFileSync(targetPath, buffer);
              fs.writeFileSync(targetSpaced, buffer);
              try { fs.writeFileSync(rootSpaced, buffer); } catch {}
              exec(`ffmpeg -ss 00:00:01 -i "${targetPath}" -vframes 1 -q:v 2 "public/video-${number}-poster.webp" -y`, () => {});
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, number, url: `/video-${number}-frankie.mp4` }));
            } else {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Empty video payload' }));
            }
          });
          return;
        }

        // 3. Dynamic video streaming handler with HTTP 206 byte-range support
        const cleanUrl = decodeURIComponent(req.url || '').split('?')[0];
        const match =
          cleanUrl.match(/^\/video[-_ ]?([1-6])[-_ ]?frankie\.(mp4|webm|mov)$/i) ||
          cleanUrl.match(/^\/video[-_ ]?([1-6])\.(mp4|webm|mov)$/i);

        if (match) {
          const num = match[1];
          const publicFiles = fs.existsSync('public') ? fs.readdirSync('public') : [];
          const rootFiles = fs.readdirSync('.');
          const foundPublic = publicFiles.find((f: string) => {
            const l = f.toLowerCase();
            return (
              (l.includes(`video ${num}`) || l.includes(`video-${num}`) || l.includes(`video${num}`)) &&
              (l.endsWith('.mp4') || l.endsWith('.webm') || l.endsWith('.mov'))
            );
          });
          const foundRoot = rootFiles.find((f: string) => {
            const l = f.toLowerCase();
            return (
              (l.includes(`video ${num}`) || l.includes(`video-${num}`) || l.includes(`video${num}`)) &&
              (l.endsWith('.mp4') || l.endsWith('.webm') || l.endsWith('.mov'))
            );
          });

          const filePath = foundPublic ? `public/${foundPublic}` : foundRoot ? foundRoot : null;
          if (filePath && fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            const fileSize = stat.size;
            const range = req.headers.range;

            if (range) {
              const parts = range.replace(/bytes=/, '').split('-');
              const start = parseInt(parts[0], 10);
              const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
              const chunksize = end - start + 1;
              const file = fs.createReadStream(filePath, { start, end });
              res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
              });
              file.pipe(res);
              return;
            } else {
              res.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
                'Accept-Ranges': 'bytes',
              });
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
        }

        next();
      });
    },
    buildStart() {
      if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });
      const publicFiles = fs.readdirSync('public');
      const rootFiles = fs.readdirSync('.');

      for (let i = 1; i <= 6; i++) {
        let found = publicFiles.find((f: string) => {
          const lower = f.toLowerCase();
          return (
            (lower.includes(`video ${i}`) || lower.includes(`video-${i}`) || lower.includes(`video${i}`)) &&
            (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov'))
          );
        });

        if (!found) {
          const inRoot = rootFiles.find((f: string) => {
            const lower = f.toLowerCase();
            return (
              (lower.includes(`video ${i}`) || lower.includes(`video-${i}`) || lower.includes(`video${i}`)) &&
              (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov'))
            );
          });
          if (inRoot) {
            try {
              fs.copyFileSync(inRoot, `public/${inRoot}`);
              found = inRoot;
            } catch {}
          }
        }

        if (found) {
          try {
            if (!fs.existsSync(`public/video-${i}-frankie.mp4`)) {
              fs.copyFileSync(`public/${found}`, `public/video-${i}-frankie.mp4`);
            }
            if (!fs.existsSync(`public/video ${i} frankie.mp4`)) {
              fs.copyFileSync(`public/${found}`, `public/video ${i} frankie.mp4`);
            }
          } catch {}
        }
      }
    },
    closeBundle() {
      if (fs.existsSync('dist') && fs.existsSync('public')) {
        const publicFiles = fs.readdirSync('public');
        publicFiles.forEach((f: string) => {
          if (f.startsWith('video') || f.startsWith('video-') || f.startsWith('video ')) {
            try {
              fs.copyFileSync(path.join('public', f), path.join('dist', f));
            } catch {}
          }
        });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      videoSyncPlugin(),
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.png', 'apple-touch-icon.png', 'logo.webp', 'pwa-192x192.png', 'pwa-512x512.png', 'icon.svg'],
        manifest: {
          id: '/',
          name: "Frankie's @ The Beach",
          short_name: "Frankie's",
          description: "Beachfront dining, gourmet burgers, drinks, and beach attractions in Ramsgate.",
          theme_color: '#0580FF',
          background_color: '#EEEFE9',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/logo.webp',
              sizes: '512x512',
              type: 'image/webp',
              purpose: 'any',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff,woff2}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'esnext',
      minify: 'esbuild' as const,
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            icons: ['lucide-react'],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
