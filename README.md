# Pong 'n Ponder
The most sophisticated (and least pretentious) of platforms for the facilitation of thought and play!

By: [Logan Schreier](https://github.com/Percipi0) and [Alexander Worley](https://github.com/Alexander-Worley)

Final Project for CS 147L Autumn 2023

## Table of Contents
* [Description](https://github.com/Percipi0/pong-n-ponder#description)
* [Getting Started](https://github.com/Percipi0/pong-n-ponder#getting-started)
  * [Prerequisites](https://github.com/Percipi0/pong-n-ponder#prerequisites)
  * [Installing](https://github.com/Percipi0/pong-n-ponder#installing)
* [Usage](https://github.com/Percipi0/pong-n-ponder#usage)
  * [Synopsis](https://github.com/Percipi0/pong-n-ponder#synopsis)
  * [Ponder](https://github.com/Percipi0/pong-n-ponder#ponder)
  * [Boutique](https://github.com/Percipi0/pong-n-ponder#boutique)
  * [Chat Room](https://github.com/Percipi0/pong-n-ponder#chat-room)
  * [Pong](https://github.com/Percipi0/pong-n-ponder#pong)

## Description
**Philosophers** are tortured souls.The
intense contemplation required to answer life's most profound
philosophical questions, such as
_"what is a chair?"_ or _"is a hotdog a sandwich?" can
quickly drive even the shrewdest of philosophers into utter madness.
Nor are philosophers known to be particularly stable to begin with. As
the French egghead **René Descartes** famously said,
"cogito, ergo bibo" - I think, therefore I drink.
          
Fortunately for would-be alcoholic thinkers everywhere, the
unstoppable force of innovation has marched on into the future, and
has brought unto humanity something truly brilliant - a perfect fusion
of rumination and recreation! The marvelous **Pong 'n Ponder** has burst onto the
global scene, and stands as the most sophisticated (and least
pretentious) of platforms for the facilitation of thought and play.
          
We all know **Friedrich Nietzsche** would have
loved Pong. So what took civilization so long to bind Pong with
Pondering? As we contemplated this very question, we grew tired of
twiddling our thumbs, waiting for this most extraordinary of ideas to
be realized; thus we went to work, toiling away at our computers until
Pong 'n Ponder was well and truly alive. Just as Atlas held up the
heavens, so too did we bear a tremendous burden for the benefit of all
humanity. And now, we wish to share it with the world, completely free
of charge, and available on iOS and Android devices everywhere.
          
Rejoice, citizens! Don the mantle of philosopher, and pick up
          your paddle! **The time of your life awaits!**
          
## Getting Started
### Prerequisites
* A **Pong 'n Ponder Server** (found [TODO](url)) must be running on the same network.
* **Expo Go** (found [here](https://expo.dev/tools#client)) is required to run this project.

### Installing
Upon download:
1. <code>cd</code> to the project's directory and run <code>npm install</code> to download all required dependencies.
2. Run <code>npx expo start</code> to start the project.
3. Scan the QR Code via the Camera App on iOS or the Expo Go App on Android to download and launch **Pong 'n Ponder**.
4. Alternatively, press <code>i</code> to lauch the project on an iOS Simulator or <code>a</code> to launch the project on an Android Simulator.

## Usage
Upon app launch, philosophers will be met with a title screen on the [Ponder](https://github.com/Percipi0/pong-n-ponder#ponder) tab.

At the bottom of the screen, philosophers will find the following tabs:
* [Synopsis](https://github.com/Percipi0/pong-n-ponder#synopsis)
* [Ponder](https://github.com/Percipi0/pong-n-ponder#ponder)
* [Boutique](https://github.com/Percipi0/pong-n-ponder#boutique)

### Synopsis
Here, philosophers will find a synopsis detailing the purpose of this app.

### Ponder
Here, philosophers are able to enter a moniker for themselves along with a room ID.
A random monikor pulled from a list of famous philosophers can be assigned via the dice button.
Upon entering both, philosophers will join the room they entered and be introduced as their moniker.
Philosophers will be unable to join a room if the moniker field is blank, the room ID field is blank,
another philosopher in the entered room is already using the moniker they entered,
or the room ID they entered already has two philosophers in it.
  * Note: this requires a **Pong 'n Ponder Server** to be running on the same network. See [Prerequisites](https://github.com/Percipi0/pong-n-ponder#prerequisites) for details.

Following this, philosophers will be sent to a [Chat Room](https://github.com/Percipi0/pong-n-ponder#chat-room).

### Boutique
Here, philosophers will be able to adjust the following settings for when they play [Pong](https://github.com/Percipi0/pong-n-ponder#pong):
* The hue of their paddle
* The hue of the AI's paddle
* The difficulty level of the Pong AI.

### Chat Room
Here, philosophers will be prompted with a philosophical question chosen from a pool of questions
and can discuss the question with another philosopher if they are in the same room.

An announcement will automatically appear in the chat when any of the following occur:
* A philosopher joins the chat room
* A philosopher takes a break and begins a game of [Pong](https://github.com/Percipi0/pong-n-ponder#pong).
* A philosopher returns to the chat room after their [Pong](https://github.com/Percipi0/pong-n-ponder#pong) break.

In the top left, a return button will return philosophers to the [Ponder](https://github.com/Percipi0/pong-n-ponder#ponder) tab.

In the top right, an information button will display the ID of the current room along with the monikers of each philosopher.

In the bottom left, a Pong button will allow philosophers to take a break and play a game of [Pong](https://github.com/Percipi0/pong-n-ponder#pong).

### Pong
Here, philosophers can take a break from philosophical discussion and play a game of Pong.

Using their finger, they can control the position of the paddle on the left while an AI controls the paddle on the right.

The hue of their paddle, the hue of the AI's paddle, and the difficulty level of the AI can be adjusted in the [Boutique](https://github.com/Percipi0/pong-n-ponder#boutique).

A score board is displayed at the top of the page, and a return button in the top left will
return philosophers to their [Chat Room](https://github.com/Percipi0/pong-n-ponder#chat-room).
