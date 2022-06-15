"use strict";
/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the Monaco Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorContentManager = void 0;
const monaco = __importStar(require("monaco-editor"));
const Validation_1 = require("./Validation");
/**
 * The EditorContentManager facilitates listening to local content changes and
 * the playback of remote content changes into the editor.
 */
class EditorContentManager {
    /**
     * Constructs a new EditorContentManager using the supplied options.
     *
     * @param options
     *   The options that configure the EditorContentManager.
     */
    constructor(options) {
        /**
         * A helper method to process local changes from Monaco.
         *
         * @param e
         *   The event to process.
         * @private
         * @internal
         */
        this._onContentChanged = (e) => {
            if (!this._suppress) {
                e.changes.forEach((change) => this._processChange(change));
            }
        };
        this._options = Object.assign(Object.assign({}, EditorContentManager._DEFAULTS), options);
        Validation_1.Validation.assertDefined(this._options, "options");
        Validation_1.Validation.assertDefined(this._options.editor, "options.editor");
        Validation_1.Validation.assertFunction(this._options.onInsert, "options.onInsert");
        Validation_1.Validation.assertFunction(this._options.onReplace, "options.onReplace");
        Validation_1.Validation.assertFunction(this._options.onDelete, "options.onDelete");
        this._disposer = this._options.editor.onDidChangeModelContent(this._onContentChanged);
    }
    /**
     * Inserts text into the editor.
     *
     * @param index
     *   The index to insert text at.
     * @param text
     *   The text to insert.
     */
    insert(index, text) {
        this._suppress = true;
        const { editor: ed, remoteSourceId } = this._options;
        const position = ed.getModel().getPositionAt(index);
        ed.executeEdits(remoteSourceId, [{
                range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
                text,
                forceMoveMarkers: true
            }]);
        this._suppress = false;
    }
    /**
     * Replaces text in the editor.
     *
     * @param index
     *   The start index of the range to replace.
     * @param length
     *   The length of the  range to replace.
     * @param text
     *   The text to insert.
     */
    replace(index, length, text) {
        this._suppress = true;
        const { editor: ed, remoteSourceId } = this._options;
        const start = ed.getModel().getPositionAt(index);
        const end = ed.getModel().getPositionAt(index + length);
        ed.executeEdits(remoteSourceId, [{
                range: new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column),
                text,
                forceMoveMarkers: true
            }]);
        this._suppress = false;
    }
    /**
     * Deletes text in the editor.
     *
     * @param index
     *   The start index of the range to remove.
     * @param length
     *   The length of the  range to remove.
     */
    delete(index, length) {
        this._suppress = true;
        const { editor: ed, remoteSourceId } = this._options;
        const start = ed.getModel().getPositionAt(index);
        const end = ed.getModel().getPositionAt(index + length);
        ed.executeEdits(remoteSourceId, [{
                range: new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column),
                text: "",
                forceMoveMarkers: true
            }]);
        this._suppress = false;
    }
    /**
     * Disposes of the content manager, freeing any resources.
     */
    dispose() {
        this._disposer.dispose();
    }
    /**
     * A helper method to process a single content change.
     *
     * @param change
     *   The change to process.
     * @private
     * @internal
     */
    _processChange(change) {
        Validation_1.Validation.assertDefined(change, "change");
        const { rangeOffset, rangeLength, text } = change;
        if (text.length > 0 && rangeLength === 0) {
            this._options.onInsert(rangeOffset, text);
        }
        else if (text.length > 0 && rangeLength > 0) {
            this._options.onReplace(rangeOffset, rangeLength, text);
        }
        else if (text.length === 0 && rangeLength > 0) {
            this._options.onDelete(rangeOffset, rangeLength);
        }
        else {
            throw new Error("Unexpected change: " + JSON.stringify(change));
        }
    }
}
exports.EditorContentManager = EditorContentManager;
/**
 * Option defaults.
 *
 * @internal
 */
EditorContentManager._DEFAULTS = {
    onInsert: () => {
        // no-op
    },
    onReplace: () => {
        // no-op
    },
    onDelete: () => {
        // no-op
    },
    remoteSourceId: "remote"
};
//# sourceMappingURL=EditorContentManager.js.map