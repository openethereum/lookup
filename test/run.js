const spawn = require('child_process').spawn

const {start, stop} = require('./server')

start(() => {
  const tape = spawn('tape', ['test/init.js', 'src/**/*.spec.js'])

  tape.stdout.on('data', (data) => {
    process.stdout.write(data)
  })

  tape.stderr.on('data', (data) => {
    process.stderr.write(data)
  })

  tape.on('close', (code) => {
    stop()
    process.exit(code)
  })
})
