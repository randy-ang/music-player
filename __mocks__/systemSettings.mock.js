export const autoMockVolumeSettings = ({volume: mockVolume = 0} = {}) => {
  const mockedVolumeSystemSettings = {
    getVolume: jest.fn(() => Promise.resolve(mockVolume)),
    addVolumeListener: jest.fn(),
    removeVolumeListener: jest.fn(),
    setVolume: jest.fn(),
  };
  jest.mock('react-native-system-setting', () => ({
    __esModule: true,
    default: mockedVolumeSystemSettings,
  }));

  beforeEach(() => {
    for (const mockedFnName in mockedVolumeSystemSettings) {
      mockedVolumeSystemSettings[mockedFnName].mockClear();
    }
  });

  afterAll(() => {
    jest.mock('react-native-system-setting', () => {
      const {default: currentSystemSettings} = jest.requireActual(
        'react-native-system-setting',
      );

      for (const mockedFnName in mockedVolumeSystemSettings) {
        currentSystemSettings[mockedFnName] =
          mockedVolumeSystemSettings[mockedFnName];
      }
      return {__esModule: true, default: currentSystemSettings};
    });
  });
};
