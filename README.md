# serverless
https://www.serverless.com/framework/docs


####
### Start 
```
# Instalação de dependências:
npm install

# Serverless offline
npm run start
```

### Deploy
```
# Configure suas credenciais aws:
aws configure

# Execute o deploy automatizado:
npm run deploy
```

### Endpoint:
```
https://...amazonaws.com

POST Body {
  "contentBase64": "docxBase64"
}
```

### Todo
- Criar testes unitários
- Criar Layer própria (não depender da layer libreoffice)
- Processar variáveis no documento (substituição de variáveis)

---
### Importante
```
Dependência Libreoffice resolvida via Libreoffice Layer
```
[shelfio/libreoffice-lambda-layer](https://github.com/shelfio/libreoffice-lambda-layer)