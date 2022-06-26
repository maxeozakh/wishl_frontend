require('esbuild')
  .build({
    bundle: true,
    watch: false,
    entryPoints: ['index.tsx', 'index.css'],
    outdir: 'public',
  })
  .catch(() => process.exit(1))
