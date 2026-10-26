# pgats-automacao-web-2026

Testes E2E com Cypress, executados exclusivamente pela interface web.

## Preparação

Instale as dependências:

```powershell
npm ci
```

Copie o modelo para criar sua configuração local:

```powershell
Copy-Item .env.example .env.test
```

O arquivo `.env.test` é carregado automaticamente pelo `cypress.config.js`, tanto na execução pelo terminal quanto ao abrir o Cypress. Ele não deve ser versionado. O `.env.example` deve ser versionado e conter apenas valores públicos de exemplo.

| Variável | Finalidade |
| --- | --- |
| `BASE_URL` | Endereço base da aplicação acessada pelos testes. |
| `TEST_USER_EMAIL` | E-mail de uma conta de teste existente. |
| `TEST_USER_PASSWORD` | Senha da conta de teste existente. |

Variáveis já definidas no sistema ou no CI têm prioridade sobre o `.env.test`. No CI, o arquivo pode ser omitido se as três variáveis estiverem definidas; forneça as credenciais pelos secrets do repositório. Se faltar uma variável obrigatória, a inicialização informa apenas seu nome, sem exibir valores.

Após copiar o modelo, preencha as credenciais de uma conta exclusiva de testes já cadastrada pela interface. Os cenários atuais esperam o nome exibido `PGATS Aut`. A factory `criarUsuarioExistente()` lê essas credenciais; os novos usuários continuam sendo gerados pela factory `criarUsuario()`.

## Execução

Execute toda a suíte e gere o relatório:

```powershell
npm test
```

Abra o Cypress para execução interativa:

```powershell
npm run test:open
```

## Relatório

Após a execução, abra `cypress/reports/html/automation-exercise.html` no navegador. O arquivo `automation-exercise.json`, na mesma pasta, contém os resultados estruturados. O relatório é atualizado a cada execução.
