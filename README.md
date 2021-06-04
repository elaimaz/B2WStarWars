# B2WStarWars
b2w star wars api

Banco de dados = MongoDB

Para testar a api é necessario criar um arquivo .env e inserir a porta(PORT) e as strings de conexão com o banco MongoDB, MONGODB_URI para o ambiente de desenvolvimente e TEST_MONGODB_URI para testes. O arquivo pode conter os seguintes valores para usar um banco mongo na nuvem (MongoDB Atlas).

MONGODB_URI=mongodb+srv://admin:admin@firstcluster.4gj8w.mongodb.net/b2w?retryWrites=true&w=majority
PORT=3003

TEST_MONGODB_URI=mongodb+srv://admin:admin@firstcluster.4gj8w.mongodb.net/b2wTest?retryWrites=true&w=majority


Apesar do projeto ter sido feito com yarn é esperado que não tenha problemas com npm.

yarn start -> Inicia a API.
yarn dev -> Inicia em modo de desenvolvedor.
yarn test -> realiza os testes.
yarn lint -> checa as regras de lint (airbnb).
yarn lint-fix -> checa as regras e corrige automaticamente o que puder.

os endpoints são:

/api/planets -> GET lista todos os planetas no DB, POST tenta adicionar um novo planeta no DB.
/api/planets/:id -> GET tenta encontrar o planeta com o id passado no parametro, DELETE tenta deletar o id passado como parametro.
/api/planets/name/:name -> GET Tenta encontrar o planeta com o nome passado como parametro.
