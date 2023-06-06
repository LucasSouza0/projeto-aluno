# CRUD de Alunos 

## Sobre o desafio

Implementar um CRUD de gerenciamento de alunos usando o framework PHP Codeigniter e ReactJS.

Para a implementação desse desafio foi utilizada uma abordagem RESTful 
para a comunicação entre o front-end e o back-end, também foi implementado autenticação na API utilizando um token `JWT` pois garante uma maior segurança na troca de informações entre o back-end e front-end. No front-end do sistema foi utilizado o `typescript` como linguagem de programação e também foi utilizado a biblioteca de componentes `chakra-ui` para facilitar o desenvolvimento da interface do usuário.

Algumos melhorias podem ser feitas para o sistema, como:
- Implementar um sistemas de reflesh token na API.
- Separar o back-end do front-end em aplicações independentes.
- Fazer o upload das imagens para a nuvem como o `AWS S3`.
- Implementar uma otimização das imagens antes de salvá-las.


## Requesitos do PHP
Necessário `PHP versão 7.4` ou superior, com as seguintes extensões instaladas:

- [intl](http://php.net/manual/en/intl.requirements.php)
- [mbstring](http://php.net/manual/en/mbstring.installation.php)

Além disso, certifique-se de que as seguintes extensões estejam habilitadas em seu PHP:

- json
- mysqli
- [mysqlnd](http://php.net/manual/en/mysqlnd.install.php)
- [libcurl](http://php.net/manual/en/curl.requirements.php)

## Requesitos do Nedejs
Necessário `Nodejs versão 16.8.0` e `npm versão 7.21.0`

## Executando o projeto
- Crie um database no MySQL chamado de `projeto-aluno`
- Copie o aquivo `.env.example` para `.env` e ajuste as configurações de banco de dados e baseURL 

```bash
# Clone o repositório
$ git clone https://github.com/LucasSouza0/projeto-aluno.git

# Acesse a pasta do projeto no terminal/cmd
$ cd projeto-aluno

# Instale as dependencias do codeigniter
$ composer install

# Instale as dependencias do react
$ npm i --legacy-peer-deps

# Execute a build do frontend
$ npm run build

# Execute o comando para criar as tebelas do banco de dados
$ php spark migrate

# Execute o comando para criar o usuário padrão
$ php spark db:seed UserSeeder

# Execute o comando para iniciar a aplicação 
$ php spark serve
```

Após executar o último comando será possível acessar o sistema na url `http://localhost:8080`, os seguintes dados podem ser utilizados para fazer a autenticação no sistema

- `E-mail:` admin@admin.com.br
- `Senha`: admin
