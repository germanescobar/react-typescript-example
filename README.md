# Aplicación de cursos online

El objetivo de este proyecto es ofrecer el curso de fundamentos en Desarrollo Web, aunque se puede adaptar a cualquier curso online.

## Requisitos

* Node.js >= 12
* PostgreSQL >= 9

## Configuración ambiente desarrollo

1. Clonar el proyecto.
2. Ejecutar `npm install`
3. Crear la base de datos de desarrollo y pruebas:
    ```
    $ createdb arista
    $ createdb arista_test
    ```
4. Correr las migraciones:
    ```
    $ npm run db:migrate
    $ npm run db:migrate:test
    ```
5. Correr el seed, que crea un usuario con correo `test@example.com` y contraseña `test1234`:
    ```
    $ npm run db:seed
    ```
6. Ejecutar el proyecto:
    ```
    $ npm run start:dev
    ```

Ingresar desde un navegador a `http://localhost:3000`.

Para ejecutar las pruebas utiliza el siguiente comando:

```
$ npm run test:system
```

## Contribución

Para contribuir al proyecto abre un Pull Request con el cambio para discutirlo e integrarlo. Algunos puntos a tener en cuenta:

1. Los commits deben estar en inglés y deben estar capitalizados. Generalmente deben comenzar con un verbo. La primera línea no debe superar los 50 caracteres en lo posible. Y en el cuerpo las líneas no deben superar 70 caracteres. Por ejemplo:

```
Change HTML template name

index.html was conflicting with the root path so we decided to change
it to template.html. Closes #34.
```

2. Para el nombramiento de las ramas todo en minúscula y las palabras separadas por guión (`-`). Máximo 3 palabras.
