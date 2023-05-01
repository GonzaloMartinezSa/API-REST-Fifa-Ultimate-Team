# FUT - API REST - NODEJS & MYSQL PROJECT

La idea es modelar el sistema de cartas y de mercado de FUT y exponerlo mediante una API REST.

No es algo que vaya a ir a producción, ni que intente ser una suerte de base de datos de todos los
jugadores del FIFA actual (al estilo páginas como FUTBIN o FUTHEAD), es un proyecto nomás.

## EL MODELO

En la carpeta de diagramas, están todos los diagramas actuales.
En la carpeta de db, está el script de creación en mysql actual.

Por si quieren pegarle una mirada, acá está el actual:

![FUT_DER](/diagrams/FUT_DER.jpg?raw=true)


### Cómo usar

```
- install docker
- git clone https://github.com/GonzaloMartinezSa/nodejs-fut-api-rest
- cd nodejs-fut-api-rest
(opcional) crear un .env en el root del proyecto, con las variables de entrono que aparecen en el docker-compose.yml
- docker-compose up
```

Ahora está corriendo la aplicación en http://localhost:3000/api

### TODO

- [ ] create authentication and authorization
- [ ] add validation
- [ ] improve error handling
- [ ] complete the tests
- [ ] docker for production
