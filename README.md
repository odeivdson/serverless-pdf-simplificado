# serverless
https://www.serverless.com/framework/docs


####
### Projeto

- layer: Camada libreoffice
- pdf-converter: Função lambda para conversão de docx em PDF


### Deploy
```
# Configure suas credenciais aws:
aws configure

# Execute o deploy automatizado:
$ cd pdf-converter
$ npm install
$ npm run deploy

- Acesse o arquivo README.md do diretório layer e siga as dicas para adicionar a layer em sua lambda function
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
- Processar variáveis no documento (substituição de variáveis)

---
### Importante
```
Dependência Libreoffice resolvida via Libreoffice Layer
```
[shelfio/libreoffice-lambda-layer](https://github.com/shelfio/libreoffice-lambda-layer)