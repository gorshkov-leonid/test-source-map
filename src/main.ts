import { DoBootstrap, enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { environment } from "./environments/environment";
import { AppModule } from "./app/app.module";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule<DoBootstrap>(AppModule).catch(err => console.error(err));
