import config from '../config/config';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import User from '../components/users/user.model';
import { PassportStatic } from 'passport';
import { set } from 'lodash';
const {
  jwt: { publicKey },
} = config;
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256'],
};
const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById({ _id: payload.sub });
    if (!user) {
      return done(null, false);
    } else {
      return done(
        null,
        set(user!.toJSON(), 'sessionId', payload.sessionId) as Express.User
      );
    }
  } catch (error) {
    done(error, false);
  }
});
export default function (passport: PassportStatic) {
  passport.use(jwtStrategy);
}
