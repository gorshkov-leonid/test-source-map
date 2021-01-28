import { BrowserModule } from "@angular/platform-browser";
import { ApplicationRef, DoBootstrap, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    exports: [AppComponent]
})
export class AppModule implements DoBootstrap {
    constructor() {
    }

    public ngDoBootstrap(appRef: ApplicationRef): void {
        appRef.bootstrap(AppComponent);
    }
}
