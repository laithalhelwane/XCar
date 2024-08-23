import config from '../../config/config';
import createApp from '../../app';
import connect from '../../util/connect';
import logger from '../../util/logger';
import swaggerDocs from '../../util/swagger';
const {
  app: { port },
} = config;
const app = createApp();
app.listen(port, async () => {
  await connect();
  swaggerDocs(app, port);
  logger.info(`app is running on port ${port}`);
});
