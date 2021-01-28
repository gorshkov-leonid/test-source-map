import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from "@angular/core";
import * as monaco from "monaco-editor";
import { editor, Environment } from "monaco-editor";
import ITextModel = editor.ITextModel;
import ICodeEditor = editor.ICodeEditor;

setupMonacoEnvironment();

@Component({
    selector: "app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.less"],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
    @ViewChild("codeEditorContainer", {static: true}) private _editorContainer: ElementRef;

    private _editor: ICodeEditor;

    ngAfterViewInit(): void {
        const iTextModel: ITextModel = monaco.editor.createModel("{\"a\": \"b\"}", "json");
        this._editor = monaco.editor.create(
            this._editorContainer.nativeElement,
            {
                extraEditorClassName: "monaco-code-editor-container",
                model: iTextModel
            }
        );
        this._editor.layout();
    }

    @HostListener("window:resize")
    public onResizeWindow(): void {
        this._editor.layout()
    }

}

function setupMonacoEnvironment(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (self as any).MonacoEnvironment = {
        // https://github.com/microsoft/monaco-editor-samples/blob/master/browser-esm-webpack-typescript/src/index.ts
        getWorkerUrl: function (moduleId, label) {
            if (label === "json") {
                return "./assets/monaco/json.worker.bundle.js";
            }
            return "./assets/monaco/editor.worker.bundle.js";
        }
    } as Environment;
}