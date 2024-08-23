import passport from 'passport';
import {
  createUserImageController,
  getImageController,
} from './image.controller';
import upload from '../../middleware/multer';
import { router } from '../users/user.router';
import validate from '../../middleware/validateResouce';
import { getImageSchema } from './image.schema';

router.post(
  '/users/avatar',
  [passport.authenticate('jwt', { session: false }), upload.single('avatar')],
  createUserImageController
);
router.get('/static/:_id', [validate(getImageSchema)], getImageController);

export default router;
