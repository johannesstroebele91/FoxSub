import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapMosdule(AppModule)
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
