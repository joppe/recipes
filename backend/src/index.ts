import * as dotenv from 'dotenv';

// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import('./server/server').then(({ start }) => {
  return start();
});
