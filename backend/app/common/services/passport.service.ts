import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import dotenv from "dotenv";
import { User } from "../../user/user.schema";
import { AppDataSource } from "./database.service";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

export const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: payload.id } });

    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
