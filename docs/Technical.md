# Reddit Posts Explorer - Documentação Técnica

## Visão Geral
O Reddit Posts Explorer é uma aplicação web desenvolvida com Astro.js que permite explorar e filtrar posts do Reddit, especificamente do subreddit r/artificial. A aplicação oferece funcionalidades para buscar, armazenar e filtrar posts com uma interface amigável.

## Arquitetura

### Frontend
- **Framework**: Astro.js
- **Estilização**: TailwindCSS
- **Layout Responsivo**: Design adaptável para diferentes tamanhos de tela

### Backend
- **Banco de Dados**: MongoDB
- **ODM**: Mongoose
- **API**: REST endpoints implementados via Astro API Routes

## Estrutura do Projeto

### Componentes Principais

#### 1. Layout (`Work.astro`)
- Layout base da aplicação
- Implementa a estrutura HTML comum
- Inclui navbar e container principal

#### 2. Páginas
- **reddit.astro**: Página principal que exibe e gerencia os posts

### Modelos de Dados

#### Post Schema
```typescript
interface IPost {
    id: string;
    title: string;
    author_fullname: string;
    created_utc: number;
    created_date: string;
    ups: number;
    num_comments: number;
}
```

### Serviços

#### RedditService
Responsável por:
- Buscar posts do Reddit
- Salvar posts no banco de dados
- Filtrar posts por data e critérios de ordenação

### API Endpoints

#### 1. `/api/posts/fetch`
- **Método**: GET
- **Função**: Busca novos posts do Reddit e salva no banco

#### 2. `/api/posts/list`
- **Método**: GET
- **Função**: Lista todos os posts salvos

#### 3. `/api/posts/filter`
- **Método**: GET
- **Parâmetros**:
  - startDate: Data inicial
  - endDate: Data final
  - orderBy: Critério de ordenação (ups/num_comments)

## Funcionalidades

### 1. Busca de Posts
- Busca automatizada de posts do r/artificial
- Armazenamento em banco de dados MongoDB
- Deduplicação automática

### 2. Filtragem
- Por período (data inicial e final)
- Ordenação por:
  - Número de upvotes
  - Número de comentários

### 3. Interface Interativa
- Feedback visual para ações do usuário
- Mensagens de sucesso/erro
- Botões de ação para busca e filtragem

## Como Usar

1. **Buscar Novos Posts**
   - Clique em "Fetch New Posts" para buscar posts recentes

2. **Filtrar Posts**
   - Selecione datas inicial e final
   - Escolha critério de ordenação
   - Clique em "Filter Posts"

## Considerações Técnicas

### Performance
- Índices MongoDB para queries otimizadas
- Bulk operations para inserções em massa
- Tratamento de erros robusto

### Segurança
- Validação de inputs
- Sanitização de dados
- Tratamento de erros apropriado

## Manutenção e Extensibilidade

O código foi estruturado de forma modular, permitindo:
- Fácil adição de novos endpoints
- Extensão de funcionalidades
- Modificação de critérios de filtragem
- Adição de novos campos ao schema

## Dependências Principais
- astro
- mongoose
- axios
- tailwindcss

Esta documentação fornece uma visão geral técnica e prática do projeto, sendo útil tanto para desenvolvedores quanto para usuários finais.