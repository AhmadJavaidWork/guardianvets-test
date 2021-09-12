import express, { json, urlencoded } from 'express';
import forceSSL from 'express-force-ssl';
import morgan from 'morgan';
import { env } from '../../config';
import passport from 'passport';
import knex from '../knex';

export default (apiRoot, routes) => {
  const app = express();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('db', knex);

  if (env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true,
    });
    app.use(forceSSL);
  }

  if (env === 'production' || env === 'development') {
    app.use(morgan('dev'));
  }

  app.use(json());
  app.use(urlencoded({ extended: false }));

  app.use(apiRoot, routes);

  return app;
};
