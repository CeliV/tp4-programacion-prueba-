const Server = require('./core/server') //  importa la clase Server que está en la carpeta /core

const servidor = new Server() //  crea una instancia del servidor
servidor.listen() // lo arranca y empieza a escuchar peticiones

process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err)
})

process.on('unhandledRejection', (err) => {
  console.error('Promesa rechazada:', err)
})
