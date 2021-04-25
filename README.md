# music-player

This is an app that [can search the itunes library](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api) for music. Afterwards, we can select a song from it and then listen to the respective song's preview.

There are also some extra functionalities, such as:

- previous & next button: clicking this button will go to the previous & next song on the list respectively
- pause/play button: this button will play if music is paused & vice versa
- volume slider: you can adjust your phone's volume using this

<!-- Supported devices.
○ Supported features.
○ Requirements to build the app.
○ Instructions to build and deploy the app. -->

## Folder structure

```sh
music-player/
├── android
        ├── app.src.main.java.com.         # global contexts
        ├── screens         # screens
        └── utils           # helpers
        └── App.js              # All services pre-made environment config
└── src                     # Sources of Project
        ├── context         # global contexts
        ├── screens         # screens
        └── utils           # helpers
        └── App.js          # main app
```

## Requirements

The minimum SDK version is 21 (Lollipop), although this app has not been tested in that version yet.
This app's target SDK version is 30.

## Development

1. **Install Node.js**: Our app is powered by [Node.js](https://nodejs.org/en/). We recommend you to install Node.js using [nvm](https://github.com/nvm-sh/nvm).
2. **Install Yarn**: We use [yarn](https://yarnpkg.com) to handle our JavaScript dependencies. See [the yarn documentation](https://yarnpkg.com/en/docs/install) for instructions on installing it.

### For local dev

3. Run `yarn android`
4. Done.

### For debug apk

3. Run `yarn build:android:dev`
4. apk is generated at `/android/app/build/outputs/apk/debug/app-debug.apk`
5. Download apk to your phone/emulator
6. Enjoy the app.
