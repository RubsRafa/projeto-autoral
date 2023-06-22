import app, { init } from './app';

const port = process.env.PORT || 4004;

init().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
