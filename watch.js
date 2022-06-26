require('esbuild')
  .build({
    watch: {},
    bundle: true,
    entryPoints: ['index.tsx', 'index.css'],
    outdir: 'public',
  })
  .catch(() => process.exit(1))
