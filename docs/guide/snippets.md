# Snippets

<Note type="warning">
Se necesita conocimientos básicos de como crear un archivo json
</Note>

## Crear tus propios snippets

Mejorando Platzi te da el poder de agregar tus propios snippets dentro de los videos con un simple archivo json.

Primero necesitamos identificar el video donde queremos mostrar los snippets.

En esta guía vamos a usar el curso [Programación Básica](https://platzi.com/clases/1050-programacion-basica/5103-bienvenidos/) como ejemplo.

La url del video es:

```
https://platzi.com/clases/1050-programacion-basica/5103-bienvenidos/
```

Las urls son los identificadores para los snippets, pero no toda la url. Ya que hay partes de la url que siempre van a ser iguales para todos los videos excluiremos **https://platzi.com/clases/** para tener el identificador.
Asi que en este caso el identificador del video es:

```
1050-programacion-basica/5103-bienvenidos/
```

Ahora que tenemos el identificador del video vamos a agregar 3 snippets al video

```
al minuto 0:18 el código "about:blank"
al minuto 0:48 el código "alert('Mi nombre es Freddy');"
al minuto 3:31 el link "https://atom.io/"
```

Para poder lograr esto vamos a necesitar el siguiente archivo json:

```json
{
	"1050-programacion-basica/5103-bienvenidos/": {
		"0:18": {
			"text": "about:blank",
			"action": "clipboard"
		},
		"0:48": {
			"text": "alert('Mi nombre es Freddy');",
			"action": "clipboard"
		},
		"3:31": {
			"text": "https://atom.io/",
			"action": "link"
		}
	}
}
```

El archivo json incluye en la parte superior el identificador del video, luego podemos comenzar a agregar snippets. Un snippet siempre necesitará: **el tiempo** que representa el momento en el que se mostrará. **Un texto** que se mostrará en la pantalla y **una acción**, por el momento la extensión solo admite **dos tipos de acciones**: **clipboard** y **link**.

La primera acción permite copiar el texto en el portapapeles con un solo click.
La acción **link** mostrará el texto dentro de una etiqueta html **a**, y al hacer click se abrirá una nueva pestaña con el link configurado.

¿Qué pasa si quiero snippets en otros videos? Bueno, el proceso es prácticamente el mismo. Puede obtener el identificador del otro video y agregarlo al archivo json existente.

```json
{
	"1050-programacion-basica/5103-bienvenidos/": {
		"0:18": {
			"text": "about:blank",
			"action": "clipboard"
		},
		"0:48": {
			"text": "alert('Mi nombre es Freddy');",
			"action": "clipboard"
		},
		"3:31": {
			"text": "https://atom.io/",
			"action": "link"
		}
	},
	"other-platzi-video-url/": {
		"02:20": {
			"text": "yarn add @vue-cli -g",
			"action": "clipboard"
		}
	}
}
```

Ok, ahora guardamos el archivo json en algún lugar en nuestro disco y lo subimos en las opciones de la extensión.

## Subir el archivo a la extensión

Si ya tienes instalada la [extension](/getting-started) haz click derecho sobre el ícono de la extensión y seleccionar el menú **Opciones**

![Mejorando Platzi Options Menu](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981775/mejorando-platzi/mp-doc-1.png)

Se abrirá la página de opciones donde puedes elegir el json que acabamos de crear, luego hacemos click sobre el botón **Guardar** y eso es todo, debe aparecer un mensaje indicando que se grabaron los cambios correctamente.

![Mejorando Platzi Options Page](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981852/mejorando-platzi/mp-doc-2.png)

Ahora podemos ir al video y según lo que configuramos en el archivo json se van a mostrar 3 snippets:

Snippet en el minuto 0:18
![Mejorando Platzi - Snippet Video](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981197/mejorando-platzi/mp-video-1.gif)

Snippet en el minuto 0:48
![Mejorando Platzi - Snippet Video](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981197/mejorando-platzi/mp-video-2.gif)

Snippet en el minuto 3:31
![Mejorando Platzi - Snippet Video](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981197/mejorando-platzi/mp-video-3.gif)
