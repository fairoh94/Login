# Login

Este repositorio contiene un sistema de inicio de sesión básico desarrollado en Node.js. Permite a los usuarios registrarse, iniciar sesión y cerrar sesión.

## Características

- Registro de usuarios: los usuarios pueden crear nuevas cuentas proporcionando un nombre de usuario y una contraseña.
- Inicio de sesión: los usuarios pueden iniciar sesión utilizando sus credenciales registradas.
- Cierre de sesión: los usuarios pueden cerrar sesión para finalizar su sesión actual.
- Protección de contraseñas: las contraseñas se almacenan de forma segura utilizando el módulo `bcrypt-nodejs` para garantizar la seguridad de los usuarios.
- Añadir Usuarios
- Añadir Carreras
- Consultar y filtrar alumnos, editar, eliminar
- Consultar Carreras 

## Tecnologías utilizadas

- Node.js
- Express (framework web)
- MongoDB (base de datos)
- Mongoose (ODM para MongoDB)
- bcrypt-nodejs (librería para el hashing de contraseñas)
- connect-flash (mensajes flash)
- ejs-mate (motor de plantillas EJS)
- express-session (gestión de sesiones de Express)
- morgan (middleware de registro de solicitudes HTTP)
- passport (autenticación de usuarios)
- passport-local (estrategia de autenticación local)
- nodemon (herramienta de desarrollo para reiniciar automáticamente el servidor)

## Requisitos previos

- Node.js instalado en tu máquina
- MongoDB instalado y en ejecución

## Instalación

1. Clona este repositorio en tu máquina local utilizando el siguiente comando:
2. git clone https://github.com/fairoh94/Login.git


2. Navega al directorio del proyecto:
cd Login


3. Instala las dependencias del proyecto:
npm install


4. Inicia la aplicación:
npm run dev


5. Abre tu navegador web y accede a `http://localhost:3000` para ver la aplicación en funcionamiento.

## Uso

1. Abre tu navegador web y accede a `http://localhost:3000`.
2. Regístrate proporcionando un nombre de usuario y una contraseña.
3. Inicia sesión con tus credenciales registradas.
4. Explora las diferentes funcionalidades del sistema de inicio de sesión.

## Contribución

Si deseas contribuir a este proyecto, sigue los siguientes pasos:

1. Realiza un fork de este repositorio.
2. Crea una nueva rama para tu función o corrección de errores: `git checkout -b nombre-de-la-rama`.
3. Realiza los cambios necesarios y realiza los commits: `git commit -m "Descripción de los cambios"`.
4. Envía tus cambios al repositorio remoto: `git push origin nombre-de-la-rama`.
5. Abre una pull request en este repositorio para revisar tus cambios.

## Licencia

Este proyecto está bajo la Licencia ISC. Consulta el archivo [LICENSE.md](LICENSE.md) para obtener más información.

## Contacto

Si tienes alguna pregunta o sugerencia sobre este proyecto, puedes contactarme a través de mi perfil de GitHub [fairoh94](https://github.com/fairoh94).
