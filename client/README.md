# Calvin Finder — Client Prototype

An [Expo](https://expo.dev) / React Native app that helps students find rooms, buildings,
and points of interest on Calvin's campus. This is the CS 262 team's client-side prototype.

## Screens

- **Landing** ([src/app/index.tsx](src/app/index.tsx)) — the introductory screen: app pitch
  and a "Find a Room" call to action.
- **Finder** ([src/app/finder.tsx](src/app/finder.tsx)) — the main data screen: a searchable
  dropdown of campus locations, a toggleable list of points of interest (restrooms, printers,
  water fountains, vending machines), and a mock map with pins. All data (locations and points
  of interest) is hard-coded in `finder.tsx` for this prototype.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

This project uses [file-based routing](https://docs.expo.dev/router/introduction) via
`expo-router`, with routes defined in `src/app`.

## Testing

Tests use [Jest](https://jestjs.io/) via the `jest-expo` preset and
[React Native Testing Library](https://callstack.github.io/react-native-testing-library/),
rendering real routes through `expo-router/testing-library`. They cover both screens: content
rendering, navigation between the landing and finder screens, toggling points of interest, and
selecting a location from the dropdown.

```bash
npm test        # run the suite once
npm run test:watch
```

## Linting & type-checking

```bash
npm run lint
npx tsc --noEmit
```

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)
