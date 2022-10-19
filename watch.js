/* eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef */
require('esbuild')
  .serve(
    {
      host: 'localhost',
      port: 8000,
      servedir: 'local',
    },
    {
      bundle: true,
      entryPoints: ['index.tsx', 'index.css'],
      loader: {
        '.png': 'file',
        '.jpg': 'file',
        '.jpeg': 'file',
        '.gif': 'file',
        '.svg': 'file',
        '.ttf': 'file',
        '.woff': 'file',
        '.woff2': 'file',
        '.eot': 'file',
        '.otf': 'file',
      },
    },
  )
  .then((result) => {
    const { host, port } = result
    console.log(`serving at http://${host}:${port}`)
  })
  .catch((error) => {
    console.log('watch build failed, error: ', error)
    /* eslint-disable-next-line no-undef */
    process.exit(1)
  })
