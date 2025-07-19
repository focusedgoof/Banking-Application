import { act, render } from '@testing-library/react';
import { getLocalStorage, setLocalStorage } from '../../Utils/Utils'; 

describe('LocalStorage Utils', () => {
  // Mocking localStorage
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key],
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();
  
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  test('getLocalStorage retrieves data from localStorage', async () => {
    const key = 'testKey';
    const data = { value: 'testValue' };

    // Set data in localStorage
    localStorage.setItem(key, JSON.stringify(data));

    // Use act to wait for the Promise to resolve
    await act(async () => {
      const result = await getLocalStorage(key);
      expect(result).toEqual(data);
    });
  });

  test('getLocalStorage returns null for non-existing key', async () => {
    const key = 'nonExistingKey';

    // Use act to wait for the Promise to resolve
    await act(async () => {
      const result = await getLocalStorage(key);
      expect(result).toBeNull();
    });
  });

  test('setLocalStorage sets data in localStorage', async () => {
    const key = 'testKey';
    const data = { value: 'testValue' };

    // Use act to wait for the Promise to resolve
    await act(async () => {
      await setLocalStorage(key, data);
    });

    // Check if data is set in localStorage
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(data));
  });
});
