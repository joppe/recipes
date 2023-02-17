export async function login(
  username: string,
  password: string,
): Promise<string | false> {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        return false;
      }

      return data.authToken;
    })
    .catch(() => false);
}
