# FIFA ULTIMATE TEAM - API REST - NODEJS & MYSQL PROJECT

La idea es modelar el sistema de cartas y de mercado de FUT y exponerlo mediante una API REST.

No es algo que vaya a ir a producción, ni que intente ser una suerte de base de datos de todos los
jugadores del FIFA actual (al estilo páginas como FUTBIN o FUTHEAD), es un proyecto nomás.

## EL MODELO

En la carpeta de diagramas, están todos los diagramas actuales.
En la carpeta de db, está el script de creación en mysql actual.

Por si quieren pegarle una mirada, acá está el actual:

![FUT_DER](https://user-images.githubusercontent.com/82115481/224582713-d1229898-0fbb-474e-92e3-355f14c145e3.jpg)


### Instalación

```
git clone https://github.com/GonzaloMartinezSa/API-REST-Fifa-Ultimate-Team
cd API-REST-Fifa-Ultimate-Team
docker-compose up
npm install
npm run dev
```

### TODO

- [ ] create authentication and authorization
- [ ] add validation
- [ ] improve error handling
- [ ] complete the tests
- [ ] docker for production