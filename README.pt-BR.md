# 🗳️ Poll

Uma pequena aplicação de votação sem dependências, implementada em um único arquivo JavaScript (`script.js`). Ela permite adicionar opções de uma enquete, registrar votos e exibir os resultados — tudo baseado em um `Map` de `Set`'s.

## Visão Geral

A enquete é modelada como um `Map`, em que cada **opção** (ex.: `"Turkey"`) é mapeada para um `Set` de IDs de votantes:

- Adicionar uma opção a registra com um conjunto vazio de votantes.
- Registrar um voto adiciona o ID do votante ao conjunto da opção — votos duplicados do mesmo votante são rejeitados.
- Exibir os resultados reporta a contagem de votos de cada opção, inclusive opções que receberam zero votos.

## Estrutura do Projeto

```
script.js   # Toda a aplicação: estado da enquete, addOption(), vote(), displayResults()
```

## Executando

Requer uma versão moderna do Node.js (ex.: Node 24+).

```bash
node script.js
```

### Exemplo de Saída Esperada

```text
Poll Results:
Turkey: 2 votes
Morocco: 1 votes
Spain: 0 votes
```

## API

| Função | Descrição |
| --- | --- |
| `addOption(option)` | Adiciona uma nova opção à enquete. Retorna uma mensagem de erro se a opção estiver vazia ou já existir; caso contrário, confirma a adição. |
| `vote(option, voterId)` | Registra um voto em uma opção existente. Retorna uma mensagem de erro se a opção não existir ou o votante já ter votado nela; caso contrário, confirma o voto. |
| `displayResults()` | Retorna uma string formatada listando cada opção e sua contagem de votos. |

### Detalhes de Comportamento

- **Opções vazias são rejeitadas** — `addOption('')` retorna `'Option cannot be empty.'`
- **Opções duplicadas são rejeitadas** — adicionar uma opção existente retorna `Option "..." already exists.`
- **Um voto por votante por opção** — uma segunda chamada a `vote(option, voterId)` com o mesmo `voterId` é ignorada.
- **A ordem é preservada** — as opções são exibidas na ordem em que foram adicionadas (ordem de iteração do `Map`).

## Histórias de Usuário

A demo no final do `script.js` implementa duas histórias de usuário:

1. *"Uma enquete deve ter pelo menos três opções."* → Três opções são adicionadas: `Turkey`, `Morocco`, `Spain`.
2. *"Uma enquete deve receber pelo menos três votos."* → Três votos são registrados: `user1` e `user2` votam em `Turkey`, e `user3` vota em `Morocco`.

Após a execução da demo, `displayResults()` imprime as contagens finais mostradas acima (note que `Spain` corretamente exibe 0 votos).

## Notas de Design

- `Map` é usado em vez de um objeto comum para que os nomes das opções possam ser strings arbitrárias sem preocupação com colisão de chaves, e a ordem de inserção é garantida.
- `Set` é usado para os votantes porque os IDs de votante são únicos por opção.
- Cada função retorna uma string de status legível para humanos em vez de lançar exceções, o que mantém o script da demo simples de ler e executar.

## Estendendo

Algumas ideias para aprimoramentos futuros:

- Armazenar os votos (ex.: `localStorage` ou um backend).
- Adicionar `removeOption()` / prazo para votação.
- Exibir os resultados em um navegador com uma pequena página HTML em vez de `console.log`.