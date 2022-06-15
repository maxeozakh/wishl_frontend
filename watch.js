require('esbuild')
  .build({
    bundle: true,
    watch: {
      onRebuild(module, result) {
        console.log(result)
      },
    },
    entryPoints: ['index.tsx', 'index.css'],
    outdir: 'local',
  })
  .catch(() => process.exit(1))
