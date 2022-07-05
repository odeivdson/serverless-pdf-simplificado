# Layer Lambda Libreoffice

```
$ cd nodejs
$ npm install

$ cd ..
$ zip -r libreofficeLayer.zip nodejs
```

- Acesse o console AWS e faça upload do arquivo libreofficeLayer.zip para o S3.
- Acesse o Lambda e crie sua propria Layer utilizando o link do arquivo S3 (adicionado no procedimento anterior).
- Acesse a Lambda Function e adicione sua Layer recém criada.