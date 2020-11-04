## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Project is old-fashioned in-browser arcade game.
	
## Technologies
Project created using:
* Vanilla JS
* Golang 1.12.10
	
## Setup
To run this project:

```
$ bash gameStart.sh
```

Or you can create Docker instead: 

```
$ docker build -t game:arcade .
$ docker run -p 8000:8000 game:arcade  
```

and then navigate to localhost:8000/ in your browser.

Have fun!