# everymind-oliveira-trade

API de login e cadastro da oliveira-trade (feito em node js)

## Instalação

é nessessário ter o node instalado na maquina, após o download, dar o seguinte comando na pasta raiz do projeto para baixar as dependencias
```bash
npm install
```
e depois iniciar a aplicação com:
```bash
npm start
```

o programa ira se iniciar em um servidor local na porta 3000 

## Rotas

você pode executar rotas post via postman ou CURL, o corpo da requisição e o valor dos campos é mostrado no exemplo abaixo

```python


# rota '/signup' que ira retornar uma mensagem com status da operaçao e se for um sucesso retorna o objeto do usuario
curl -d "name=felipe&cpf=111.111.111-11&email=felipe@gmail.com&password=12345" -X POST http://localhost:3000/signup

# rota '/signin' que ira retornar uma mensagem com status da operaçao e se for um sucesso retorna o objeto do usuario e um token JWT
curl -d "email=felipe@gmail.com&password=12345" -X POST http://localhost:3000/signin

```




