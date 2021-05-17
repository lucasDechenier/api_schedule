<h1 align="center"> 
 REST API - Gerenciamento
</h1>

<p align="center">
	Essa API tem como função requisições e respostas para um sistema de agendamentos
</p>

<p align="center">
  <a href="#-technologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Executando o Projeto</a>
</p>

## 🖥️ Características:
- fasffffffffffffffffsafa

## 📱 Rotas:
###Usuarios:
######Utilize no Header de todas as rotas o Content-Type como application/json
- **Register (http://localhost:3000/user/register) rota do tipo POST:**

	Deverá enviar um JSON da seguinte maneira:
	
	`{
    "name": "Nome Desejado",
    "email": "email@extensãodoemail.com.br",
    "password": "senha123"
	}`
	
	Como resposta irá obter o seguinte JSON com a senha já criptografada:
	
	`{
  "admin": false,
  "_id": "60a272be07d02d3820b4646a",
  "name": "Nome Desejado",
  "email": "email@extensãodoemail.com.br",
  "password": "$2a$10$zA11xRZ9gSVw4sH3NXzl4.Jx1/nCwMJA0I7nGs/u6ZwhVeBM3MZz2",
  "createdAt": "2021-05-17T13:42:22.494Z",
  "__v": 0
}`
- **login (http://localhost:3000/user/login) rota do tipo POST: **

	Deverá enviar um JSON da seguinte maneira:
	
	`{
    "email": "email@extensãodoemail.com.br",
    "password": "senha123"
}`
	
	Em caso de sucesso receberá uma resposta que será o Token de autorização do usuário:
	
	`{
  "authorizationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEyNzJiZTA3ZDAyZDM4MjBiNDY0NmEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTI1OTE0MH0.RWKrh6ALvT2y9y1GApffrl6DPlSFkPjeHBryEqt5WMw"
}`

	**Todas as rotas agora vão precisar receber no header o token dessa maneira:**
	
	`headers('authorization-token') = 	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGExNGUwZWMyNjM3MDJjMjg3ODliMjMiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTE4NDMwNn0.vb-RSqHEs-C1ZQB1-dh3d8yYFWjf-T-o9IeenNvCXqU`

	**Caso utilize o insomnia, utilize a imagem abaixo:**
	<p align="center">
    <img alt="Weather app" title="Weather app" 			src="https://github.com/lucasDechenier/api_schedule/blob/master/assets/header1.png" />
	</p>

- **Agendar um atendimento (http://localhost:3000/user/schedule) rota do tipo GET:**

	Deverá enviar um JSON da seguinte maneira:
	
	`{
   "startDay": 16,
   "startHour": 15,
   "startMinute": 50
}`
	- Os agendamentos só podem ser feitos de 10 em 10 minutos
	- Só pode ser feito um agendamento no mesmo horário a não ser que seja feito por outro usuário
	- Caso exista dentro de quarenta minutos 3 agendamentos que vão ser realizados de forma simultânea, o quarto agendamento a tentar ser realizado não irá ser permitido.
Como resposta irá obter o seguinte JSON com a senha já criptografada:
	
	`{
  "admin": false,
  "_id": "60a272be07d02d3820b4646a",
  "name": "Nome Desejado",
  "email": "email@extensãodoemail.com.br",
  "password": "$2a$10$zA11xRZ9gSVw4sH3NXzl4.Jx1/nCwMJA0I7nGs/u6ZwhVeBM3MZz2",
  "createdAt": "2021-05-17T13:42:22.494Z",
  "__v": 0
}`

####Registro:

## 🧪 Technologies
[![JavaScript](https://camo.githubusercontent.com/62d37abe760867620e0baea1066303719d630a82936837ba7bff6b0c754e3c9f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742532302d2532333332333333302e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)   ![NodeJS](https://camo.githubusercontent.com/cc96d7d28a6ca21ddbb1f2521d751d375230ed840271e6a4c8694cf87cc60c14/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732532302d2532333433383533442e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)

### 🔨  Dependências e Características

######Banco de dados (Está em núvem)
- [MongoDB com Mongoose](https://mongoosejs.com/)

######Depedências
- [Node Express](https://expressjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcrypt)

## 

## 🚀 Executando o Projeto

Clone o projeto e acesso a pasta dos arquivos 

```bash
$ git clone https://github.com/lucasDechenier/api_schedule
```
Siga as etapas para instalação
```bash
# Iniciando o package.json
$ npm init -y

# Instalando as dependências
$ npm install

# Iniciando o projeto
$ npm start
```
