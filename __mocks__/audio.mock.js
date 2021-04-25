export const mockAudioSound = mockedSoundValues => {
  const mockPreValues = require('expo-av');
  jest.mock('expo-av', () => {
    const {Audio, ...unmockedValues} = jest.requireActual('expo-av');
    return {
      ...unmockedValues,
      Audio: {
        ...Audio,
        Sound: {
          ...Audio.Sound,
          ...mockedSoundValues,
        },
      },
    };
  });

  beforeEach(() => {
    for (const mockedFnName in mockedSoundValues) {
      mockedSoundValues[mockedFnName].mockClear();
    }
  });

  afterAll(() => {
    jest.mock('expo-av', () => {
      const actualExpoAv = jest.requireActual('expo-av');

      for (const mockedFnName in mockedSoundValues) {
        actualExpoAv.Audio.Sound[mockedFnName] =
          mockPreValues.Audio.Sound[mockedFnName];
      }
      return actualExpoAv;
    });
  });
};
