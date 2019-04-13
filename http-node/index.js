const http = require('http')
const porta = 3000;

// definir o callback para receber requisicoes
const server = http.createServer(function(req, res) {
    res.setHeader('content-type', 
        'text/html; charset=utf-8')
    res.writeHead(200)
    res.write('<html><body>Olá NodeJS!</body></html>')
    res.end();
})

server.listen(porta, function() {
    console.log('Servidor iniciado na porta ' + porta)
})
