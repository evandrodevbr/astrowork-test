# Reddit Posts Explorer - Documentação de API

## Endpoints da API

### 1. Buscar Novos Posts
```http
GET /api/posts/fetch
```

**Resposta de Sucesso (200)**
```json
{
    "success": true,
    "data": [
        {
            "id": "abc123",
            "title": "Exemplo de Post",
            "author_fullname": "t2_user123",
            "created_utc": 1699123456,
            "created_date": "2024-01-15T10:30:00Z",
            "ups": 150,
            "num_comments": 45
        }
    ]
}
```

**Resposta de Erro (500)**
```json
{
    "success": false,
    "error": "Failed to fetch and save posts"
}
```

### 2. Listar Posts
```http
GET /api/posts/list
```

**Resposta de Sucesso (200)**
```json
{
    "success": true,
    "count": 1,
    "data": [
        {
            "id": "abc123",
            "title": "Exemplo de Post",
            "author_fullname": "t2_user123",
            "created_utc": 1699123456,
            "created_date": "2024-01-15T10:30:00Z",
            "ups": 150,
            "num_comments": 45
        }
    ]
}
```

**Resposta de Erro (500)**
```json
{
    "success": false,
    "error": "Failed to fetch posts"
}
```

### 3. Filtrar Posts
```http
GET /api/posts/filter
```

**Parâmetros de Query**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| startDate | string | Sim | Data inicial (ISO-8601) |
| endDate | string | Sim | Data final (ISO-8601) |
| orderBy | string | Sim | Campo de ordenação ('ups' ou 'num_comments') |

**Exemplo de Requisição**
```http
GET /api/posts/filter?startDate=2024-01-01T00:00:00Z&endDate=2024-01-15T23:59:59Z&orderBy=ups
```

**Resposta de Sucesso (200)**
```json
{
    "success": true,
    "data": [
        {
            "id": "abc123",
            "title": "Exemplo de Post",
            "author_fullname": "t2_user123",
            "created_utc": 1699123456,
            "created_date": "2024-01-15T10:30:00Z",
            "ups": 150,
            "num_comments": 45
        }
    ]
}
```

**Respostas de Erro**

*Parâmetros Inválidos (400)*
```json
{
    "success": false,
    "error": "Missing required parameters"
}
```

*Formato de Data Inválido (400)*
```json
{
    "success": false,
    "error": "Invalid date format"
}
```

*Erro do Servidor (500)*
```json
{
    "success": false,
    "error": "Failed to get filtered posts"
}
```

## Exemplos de Uso com cURL

### Buscar Novos Posts
```bash
curl -X GET http://localhost:3000/api/posts/fetch
```

### Listar Todos os Posts
```bash
curl -X GET http://localhost:3000/api/posts/list
```

### Filtrar Posts
```bash
curl -X GET 'http://localhost:3000/api/posts/filter?startDate=2024-01-01T00:00:00Z&endDate=2024-01-15T23:59:59Z&orderBy=ups'
```

## Exemplos de Uso com JavaScript (Fetch API)

### Buscar Novos Posts
```javascript
const fetchPosts = async () => {
    try {
        const response = await fetch('/api/posts/fetch');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};
```

### Listar Posts
```javascript
const listPosts = async () => {
    try {
        const response = await fetch('/api/posts/list');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};
```

### Filtrar Posts
```javascript
const filterPosts = async () => {
    try {
        const params = new URLSearchParams({
            startDate: '2024-01-01T00:00:00Z',
            endDate: '2024-01-15T23:59:59Z',
            orderBy: 'ups'
        });
        
        const response = await fetch(`/api/posts/filter?${params}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};
```

## Notas Importantes

1. Todas as datas devem estar no formato ISO-8601
2. O campo `orderBy` aceita apenas 'ups' ou 'num_comments'
3. As respostas sempre incluem um campo `success` indicando o status da operação
4. Erros retornam mensagens descritivas no campo `error`
5. Os timestamps são armazenados em UTC

Esta documentação fornece todos os detalhes necessários para interagir com a API do Reddit Posts Explorer, incluindo exemplos práticos de uso com diferentes ferramentas e linguagens.