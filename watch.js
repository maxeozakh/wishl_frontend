const define = {}

for (const k in process.env) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k])
}

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
    external: ['env'],
    define: define
  })
  .catch(() => process.exit(1))
