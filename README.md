# Dashboard de Anuncios - Práctica de Fundamentos de React con Vite y TypeScript

¡Bienvenido al proyecto de Dashboard de Anuncios! Este proyecto, desarrollado con Vite, TypeScript y React, te ofrece una aplicación de dashboard para gestionar el API de anuncios Nodepop.

## Descripción del Proyecto

El objetivo principal de este proyecto es crear una aplicación de tipo dashboard que actúe como interfaz gráfica para gestionar el API de anuncios Nodepop. El backend de la aplicación utiliza el proyecto [nodepop-api](https://github.com/davidjj76/nodepop-api), mientras que el frontend está desarrollado en React utilizando Vite como herramienta de construcción y TypeScript para una tipificación robusta.

## Backend

El backend de la aplicación está alojado en un servidor local y proporciona una serie de endpoints para la gestión de usuarios y anuncios. Algunos de los endpoints disponibles son:

- **/api/auth/signup**: Permite crear nuevos usuarios.
- **/api/auth/me**: Obtiene la información del usuario autenticado.
- **/api/auth/login**: Permite iniciar sesión y obtener un token de acceso.
- **/api/v1/adverts**: Proporciona un listado de anuncios y permite aplicar diversos filtros.
- **/api/v1/adverts/tags**: Obtiene el listado de tags disponibles.
- **/api/v1/adverts/:id**: Permite obtener información detallada de un anuncio específico y borrarlo si es necesario.

Todos los endpoints bajo `/adverts` requieren autenticación mediante un token proporcionado en el endpoint de login.

## Frontend

El frontend de la aplicación es una Single Page Application desarrollada en React con Vite y TypeScript. Se han implementado diversas rutas para gestionar las diferentes páginas y componentes de la aplicación, como:

- **/login**: Página de inicio de sesión.
- **/adverts**: Página principal de anuncios.
- **/adverts/:id**: Página de detalle de un anuncio.
- **/adverts/new**: Página para crear un nuevo anuncio.
- **/404**: Página de error 404 para rutas inexistentes.

## Funcionalidades Principales

- **LoginPage**: Permite iniciar sesión con email y contraseña.
- **AdvertsPage**: Muestra un listado de anuncios con opción de aplicar filtros.
- **AdvertPage**: Muestra detalles de un anuncio y permite borrarlo.
- **NewAdvertPage**: Permite crear un nuevo anuncio con todos los detalles necesarios.

Además, se ha implementado un componente para el logout cuando el usuario está autenticado.

## Consideraciones Importantes

- **Estilos**: Se han utilizado styled-components para los estilos de la aplicación, proporcionando una forma flexible y eficiente de gestionar los estilos en los componentes de React.
- **Código**: Para asegurar código limpio y bien organizado se ha usado Prettier y aprovechando las ventajas de TypeScript para una tipificación sólida y segura.

---
