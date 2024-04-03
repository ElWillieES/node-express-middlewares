# Node Express Middlewares

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=ffffff)&nbsp;
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)&nbsp;

Más ejemplos de Badges en [markdown-badges](https://ileriayo.github.io/markdown-badges/), [Badges 4 README.md Profile](https://github.com/alexandresanlim/Badges4-README.md-Profile) y [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

## Introducción

**Node Express Middlewares** es una aplicación Web de ejemplo, desarrollada con Node.js y Express.js, que pretende ayudar a comprender el concepto y funcionamiento de los Middlewares en Express.

En lugar del enfoque monolítico del módulo `http` de Node que utiliza una única función (Request Handler) para gestionar todas peticiones HTTP, **Express permite utilizar múltiples funciones Request Handlers** (mediante middlewares), resultando mucho más modular y mantenible. 

Es decir, **en Express tendremos un array de funciones middleware que se ejecutan secuencialmente como una cadena**, donde cada una puede ejecutarse sólo para peticiones concretas, o bien para todas las peticiones, según nuestras necesidades. Además, cualquiera de ellas, tiene la posibilidad de dar paso a la ejecución del siguiente middleware de la cadena, o de poner fin devolviendo una respuesta HTTP, sin continuar con la ejecución del resto de middlewares. Por ejemplo, en los middleware definidos por nosotros:

* Si deseamos no ejecutar más middlewares y devolver una respuesta al usuario, deberemos ejecutar un método como `res.end()`, `res.send()`, `res.sendFile()`, etc.
* Si deseamos continuar con la ejecución del siguiente middleware, deberemos ejecutar `next()`.

Hay varias formas de añadir funciones middleware a esta cadena (middleware stack), como por ejemplo mediante `app.use()` y `app.get()`.

Es posible utilizar **middlewares de terceros** (no es estrictamente necesario que tengamos que picárnoslos nosotros, reutilicemos), como por ejemplo:

* **Morgan**, para generar un log de accesos de las peticiones HTTP.
* **body-parser**, analiza el cuerpo (body) de las peticiones HTTP, y lo hace disponible en el objeto req. Especialmente útil al trabajar con formularios, JSON, etc.
* **express.static**, para servir contenidos estáticos desde un directorio, como podrían ser ficheros CSS, imágenes, o HTML.
* **express-validator**, para validar y sanitizar datos de entrada del usuario, lo que ayuda a evitar vulnerabilidades de seguridad y errores de lógica en la aplicación.
* **express-request-id**, facilita el seguimiento de peticiones HTTP, añadiendo un UUID al objeto req, en la propiedad req.id. Además, añade el encabezado X-Request-Id en la respuesta HTTP.
* **compression**, para comprimir (ej: gzip) el contenido devuelto de fichero HTML, CSS, o JavaScript, con la intención de optimizar el ancho de banda y mejorar el rendimiento.
* **connect-ratelimit**, para implementar un rate limit de peticiones.
* **helmet**, facilita la configuración de encabezados de seguridad como X-XSS-Protection, X-Content-Type-Options, Strict-Transport-Security, Content-Security-Policity, etc.
* **cookie-parser**, analiza las cookies adjuntas en las peticiones HTTP y la hace disponibles en el objeto req.
cors, para habilitar y configurar CORS (Cross-Origin Resource Sharing).
* **response-time**, devuelve el encabezado X-Response-Time para facilitar el análisis de rendimiento de la aplicación.
* **express-session**, facilita el manejo de sesiones de usuario en aplicaciones web.
* **passport**, para la autenticación de usuarios, con soporte para múltiples estrategias de autenticación como local, OAuth, OpenID, etc.
* **csurf**, para proteger contra ataques CSRF (Cross-Site Request Forgery) mediante la generación y validación de tokens CSRF en las peticiones HTTP. CSRF es un tipo de ataque en el cual un atacante aprovecha la autenticación existente de un usuario para realizar acciones no autorizadas en nombre del usuario.

Además, **Express extiende los objetos que representan a la petición y respuesta HTTP (habitualmente `req` y `res`)**, incluyendo características adicionales. Esta técnica de extender los objetos `req` y `res`, es también utilizada por muchos middlewares, como una forma sencilla de pasar información de un middleware a otro dentro de una misma petición.

## Envío de encabezados desde Google Chrome

Este proyecto de ejemplo, incluye un middleware que comprueba que existe en las peticiones HTTP un encabezado `api-key`, de tal modo que las peticiones HTTP que NO lo incluyen se consideran no autenticadas (devolviendo un 401), y las que lo incluyen se consideran autenticadas.

Una aproximación simplista, que tan sólo pretende resultar de ayuda didáctica para comprender el funcionamiento de los middlewares en Express.

Si utilizamos **Google Chrome** para acceder a esta aplicación web de ejemplo, podemos utilizar la extensión **ModHeader** para configurar un encabezado `api-key` con cualquier valor random, de tal modo que cuando estemos navegando el propio navegador incluya dicho encabezado en todas las peticiones de forma transparente, y así podamos probar esta aplicación Web de forma sencilla.

## Estructura de ficheros del repo

El código del repo está organizado de la siguiente manera:

- **app/**: Contiene el código fuente de la aplicación.
  - **node_modules/**: Almacena las dependencias del proyecto (ej: al instalarlas con npm install), incluido en el .gitignore para no subirlo al repo.
  - **public/**: Contiene los ficheros estáticos de la aplicación Web, como podrían ser ficheros CSS, JavaScript, HTML, imágenes, etc.
    - **hello.html**: Página HTML estática de ejemplo.
  - **views/**: Contiene las vistas EJS (Embedded JavaScript), es decir, las páginas (o fragmentos como podría ser un footer o un header) de la aplicación Web.
    - **about.ejs**: Página HTML de ejemplo, que muestra una variable que recibe como parámetro al renderizarse.
  - **index.js**: Archivo principal que configura y arranca la aplicación.
  - **package-lock.json**: Archivo de metadatos para fijar de manera precisa las versiones exactas de todas las dependencias y sus subdependencias.
  - **package.json**: Archivo de configuración de npm con las dependencias y scripts del proyecto.

- **.dockerignore**: Archivo que especifica los archivos y carpetas que deben ser excluidos durante el proceso de construcción de la imagen Docker (similar al archivo .gitignore).
- **.gitignore**: Archivo que especifica los archivos y carpetas que deben ser ignorados por Git.
- **Dockerfile**: Archivo Dockerfile para ejecutar la aplicación dockerizada.
- **README.md**: Documentación principal del proyecto.

## Módulos de Node.js utilizados (dependencias)

Revisar el fichero **package.json** para mayor detalle.

### Dependencias de Desarrollo

| Dependencia               | Motivo
|---------------------------|-------
| nodemon                   | Permite reiniciar automáticamente la aplicación al detectar una cambio en un fichero (útil durante el desarrollo y pruebas en local)

### Dependencias de Producción

| Dependencia         | Motivo
|---------------------|-------
| cross-env           | Permite establecer y utilizar variables de entorno de manera uniforme en diferentes plataformas, como Windows, Linux y macOS
| compression         | Permite comprimir las respuestas HTTP
| cors                | Permite configurar CORS (Cross-Origin Resource Sharing)
| ejs                 | Motor de plantillas EJS (Embedded JavaScript) para generar HTML de forma dinámica
| express             | Es un servidor Web para Node.js (Web Application Framework)
| express-request-id  | Añade a la petición entrante (request) un campo id con un valor único, y lo añade en la respuesta (response) al encabezado X-Request-Id, para tener trazabilidad 
| morgan              | Es un Logger para el registro de peticiones HTTP


## Cómo ejecutar en local el proyecto, de forma dockerizada

A continuación se muestra:

* Cómo crear una imagen en local con docker build.
* Cómo listar las imágenes que tenemos disponibles en local. Deberá aparecer la que acabamos de crear.
* Cómo ejecutar un contenedor con nuestra imagen.
* Cómo comprobar los contenedores que se están ejecutando (estará el nuestro).
* Cómo ver los Logs de nuestro contenedor.
* Cómo parar el contenedor.

```shell
docker build -t node-express-middlewares .
docker images
docker run -it --rm -d -p 3000:3000 --name node-express-middlewares node-express-middlewares
docker ps
docker logs node-express-middlewares
docker stop node-express-middlewares
```

## Cómo ejecutar en local el proyecto, de forma nativa

Nos posicionamos en el directorio de la aplicación (app).

```shell
cd app
```

Instalamos las dependencias, si no lo hemos hecho anteriormente.

```shell
npm install
```

Podemos ejecutar la aplicación, en modo DEV, así.

```shell
npm run dev
```

O ejecutarla, en modo Prod, así.

```shell
npm start
```
