# Clase 14 - Posicionamiento avanzado con Flexbox

![digital-house](https://user-images.githubusercontent.com/81197487/166121694-0ecf8adc-7dc5-4809-9223-ff72edebc779.gif)

## Sobre la actividad

Este proyecto es una presentación interactiva de los conceptos de flexbox. Es una herramienta para la clase sincrónica donde se busca mayor dinamismo y entretenimiento así como la posibilidad de realizar un diagnóstico continuo de la práctica.

## Sobre el código

Los invito a investigar un poco y comprender como funciona. Casi todo lo que se encuentren en la carpeta views y css ya lo hemos visto en el curso o estamos muy próximos a verlo (como formularios).

### Backend

A diferir de lo que se ha visto en el curso, el backend de este proyecto no está armado sobre express sino que se encuentra en la carpeta lambda. En la carpeta encontrarán 3 módulos. Cada uno son funciones que se ejecutan en AWS Lambda y aprovechan la función de websocket que provee AWS API Gateway.

En resumen, websocket es una tecnología que nos permite establecer una conexión continua entre el cliente y el servidor siendo de utilidad en este proyecto para poder enviar que la tarea se ha realizado correctamente inmediatamente al resto de los usuarios. Similar a un chat grupal. Esto no se verá en el curso pero pueden investigarlo por su cuenta por ejemplo en [mdn](https://developer.mozilla.org/es/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications).

### Scripts

Verán que dentro de public hay una carpeta llamada scripts. La misma contiene una serie de archivos para ser ejecutados en el frontend. Esto lo veremos en el módulo 8, Javascript para front-end. De todas maneras, sigue siendo el mismo javascript que ya vimos con la inclusion de eventListeners e interacciones con el DOM. No se preocupen, ya lo vamos a ver y los invito nuevamente a revisar este código en ese momento.

## Feedback

Como siempre, si tienen alguna duda o sugerencia, escríbannos por nuestro canal de Discord. Lo mismo simplemente para comentarnos qué te pareció el proyecto.
