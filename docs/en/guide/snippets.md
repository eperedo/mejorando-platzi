# Snippets (DEPRECATED)

<Note type="warning">
It's not working anymore since platzi change its video player
</Note>

## Creating your own snippets

Mejorando Platzi gives you the power to add your own in-video-snippets with a simple json configuration.

First We need to identify the video where We want to display the snippets.

In this guide We will use the course [Programación Básica](https://platzi.com/clases/1050-programacion-basica/5103-bienvenidos/) as example.

The url of this video is:

```
https://platzi.com/clases/1050-programacion-basica/5103-bienvenidos/
```

First we need the ID of the video, but how in the hell will I know the ID? Well that's simple.

Urls are the unique identifier for snippets, but not the whole url. Since there's part of the url that always will be the same for all the videos We will exclude **https://platzi.com/clases/**.

So in this case the ID is:

```
1050-programacion-basica/5103-bienvenidos/
```

Now that we have the ID of the video Let's asumme we need to display three snippets.

```
at minute 0:18 the text "about:blank"
at minute 0:48 the text "alert('Mi nombre es Freddy');"
at minute 3:31 the link "https://atom.io/"
```

In order to accomplished that we will need the following json:

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

The json file include at the very top the ID of the video, then we can start adding snippets. A snippet always will need: the time which represent the very moment where it will be displayed. **A text** which will be printed on the screen and **an action**, for the moment the extension only support **two types of actions**: clipboard and link.

The first action gives the ability to copy the text to the clipboard in one click.
The **link** action will display the text inside an html **a** tag so it will be clickable and open that link in your browser.

What about other videos? Well the process is pretty much the same. You can get the ID of the other video and add it to your existing json file.

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

Ok, we have the json file, now we need to upload it to the extension.

## Uploading the file to the extension

If you already [have installed the extension](/en/guide/getting-started) you can right click on the extension's icon and select the **Options** menu.

![Mejorando Platzi Options Menu](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981775/mejorando-platzi/mp-doc-1.png)

It will open the options page where you can select your json snippet file, then click the **Save** button and that's it.

![Mejorando Platzi Options Page](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981852/mejorando-platzi/mp-doc-2.png)

Now We can go to the video and according the json we have just created those 3 snippets will arise just in time!

Snippet at 0:18
![Mejorando Platzi - Snippet Video](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981197/mejorando-platzi/mp-video-1.gif)

Snippet at 0:48
![Mejorando Platzi - Snippet Video](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981197/mejorando-platzi/mp-video-2.gif)

Snippet at 3:31
![Mejorando Platzi - Snippet Video](https://res.cloudinary.com/drukp4ipu/image/upload/v1553981197/mejorando-platzi/mp-video-3.gif)
