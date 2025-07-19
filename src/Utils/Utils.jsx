export async function getLocalStorage(key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const storedValue = localStorage.getItem(key);
        resolve(storedValue ? JSON.parse(storedValue) : null);
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
}

export async function setLocalStorage(key, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
}
