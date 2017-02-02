const spawn = require('child_process').spawn

const {start, stop} = require('./server')

start(() => {
  const tape = spawn('tape', ['test/init.js', 'src/**/*.spec.js'])

  tape.stdout.pipe(process.stdout)
  tape.stderr.pipe(process.stderr)

  tape.on('close', (code) => {
    stop()
    process.exit(code)
  })
})
