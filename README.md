# Pong 'n Ponder
The most sophisticated (and least pretentious) of platforms for the facilitation of thought and play!

By: [Logan Schreier](https://github.com/Percipi0) and [Alexander Worley](https://github.com/Alexander-Worley)

Final Project for Stanford University's CS 147L Autumn 2023

## Table of Contents
* [Description](#description)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installing](#installing)
* [Usage](#usage)
  * [Synopsis](#synopsis)
  * [Ponder](#ponder)
  * [Boutique](#boutique)
  * [Chat Room](#chat-room)
  * [Pong](#pong)
* [Demonstration Video](#demonstration-video)

## Description
**Philosophers** are tortured souls.The
intense contemplation required to answer life's most profound
philosophical questions, such as
"what is a chair?" or "is a hotdog a sandwich?" can
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
* A **Pong 'n Ponder Server** (found [here](https://github.com/Percipi0/pong-n-ponder-server)) must be running on the same network.
* Within **/app/index.js**, replace the URL on line 37 with the IPv4 Address of the machine on your network that is running the Pong 'n Ponder Server.
  * <code>const URL = "http://XX.XX.XX.XXX:1930"</code>
* **Expo Go** (found [here](https://expo.dev/tools#client)) is required to run this project.

### Installing
Upon download:
1. <code>cd</code> to the project's directory and run <code>npm install</code> to download all required dependencies.
2. Run <code>npx expo start</code> to start the project.
3. Scan the QR Code via the Camera App on iOS or the Expo Go App on Android to download and launch **Pong 'n Ponder**.
4. Alternatively, press <code>i</code> to lauch the project on an iOS Simulator or <code>a</code> to launch the project on an Android Simulator.

## Usage
Upon app launch, philosophers will be met with a title screen on the [Ponder](#ponder) tab.

At the bottom of the screen, philosophers will find the following tabs:
* [Synopsis](#synopsis)
* [Ponder](#ponder)
* [Boutique](#boutique)

### Synopsis
<img src="https://github.com/Percipi0/pong-n-ponder/blob/main/screenshots/Synopsis.png" width=20%>

Here, philosophers will find a synopsis detailing the purpose of this app.

### Ponder
<img src="https://github.com/Percipi0/pong-n-ponder/blob/main/screenshots/Ponder.png" width=20%>

Here, philosophers are able to enter a moniker for themselves along with a room ID.
A random monikor pulled from a list of famous philosophers can be assigned via the dice button.
Upon entering both, philosophers will join the room they entered and be introduced as their moniker.
Philosophers will be unable to join a room if the moniker field is blank, the room ID field is blank,
another philosopher in the entered room is already using the moniker they entered,
or the room ID they entered already has two philosophers in it.
  * Note: this requires a **Pong 'n Ponder Server** to be running on the same network. See [Prerequisites](#prerequisites) for details.

Following this, philosophers will be sent to a [Chat Room](#chat-room).

### Boutique
<img src="https://github.com/Percipi0/pong-n-ponder/blob/main/screenshots/Boutique.png" width=20%>

Here, philosophers will be able to adjust the following settings for when they play [Pong](#pong):
* The hue of their paddle
* The hue of the AI's paddle
* The difficulty level of the Pong AI.

### Chat Room
<img src="https://github.com/Percipi0/pong-n-ponder/blob/main/screenshots/Chat-Room.png" width=20%> <img src="https://github.com/Percipi0/pong-n-ponder/blob/main/screenshots/Particulars.png" width=20%>

Here, philosophers will be prompted with a philosophical question chosen from a pool of questions
and can discuss the question with another philosopher if they are in the same room.

An announcement will automatically appear in the chat when any of the following occur:
* A philosopher joins the chat room
* A philosopher takes a break and begins a game of [Pong](#pong).
* A philosopher returns to the chat room after their [Pong](#pong) break.

In the top left, a return button will return philosophers to the [Ponder](#ponder) tab.

In the top right, an information button will display the ID of the current room along with the monikers of each philosopher.

In the bottom left, a Pong button will allow philosophers to take a break and play a game of [Pong](#pong).

### Pong
<img src="https://github.com/Percipi0/pong-n-ponder/blob/main/screenshots/Pong.png" width=20%>

Here, philosophers can take a break from philosophical discussion and play a game of Pong.

Using their finger, they can control the position of the paddle on the left while an AI controls the paddle on the right.

The hue of their paddle, the hue of the AI's paddle, and the difficulty level of the AI can be adjusted in the [Boutique](#boutique).

A score board is displayed at the top of the page, and a return button in the top left will
return philosophers to their [Chat Room](#chat-room).

## Demonstration Video
[<img src="https://img.youtube.com/vi/fIQEBOnLAqQ/hqdefault.jpg"/>](https://www.youtube.com/embed/fIQEBOnLAqQ)
