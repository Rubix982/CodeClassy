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
exports.RemoteSelection = void 0;
const monaco = __importStar(require("monaco-editor"));
const Validation_1 = require("./Validation");
class RemoteSelection {
    /**
     * Constructs a new remote selection.
     *
     * @internal
     */
    constructor(codeEditor, id, classId, color, label, onDisposed) {
        this._editor = codeEditor;
        this._id = id;
        const uniqueClassId = `monaco-remote-selection-${classId}`;
        this._className = `monaco-remote-selection ${uniqueClassId}`;
        this._styleElement = RemoteSelection._addDynamicStyleElement(uniqueClassId, color);
        this._label = label;
        this._decorations = [];
        this._onDisposed = onDisposed;
    }
    /**
     * A helper method to add a style tag to the head of the document that will
     * style the color of the selection. The Monaco Editor only allows setting
     * the class name of decorations, so we can not set a style property directly.
     * This method will create, add, and return the style tag for this element.
     *
     * @param className
     *   The className to use as the css selector.
     * @param color
     *   The color to set for the selection.
     * @returns
     *   The style element that was added to the document head.
     *
     * @private
     * @internal
     */
    static _addDynamicStyleElement(className, color) {
        Validation_1.Validation.assertString(className, "className");
        Validation_1.Validation.assertString(color, "color");
        const css = `.${className} {
         background-color: ${color};
       }`.trim();
        const styleElement = document.createElement("style");
        styleElement.innerText = css;
        document.head.appendChild(styleElement);
        return styleElement;
    }
    /**
     * A helper method to ensure the start position is before the end position.
     *
     * @param start
     *   The current start position.
     * @param end
     *   The current end position.
     * @return
     *   An object containing the correctly ordered start and end positions.
     *
     * @private
     * @internal
     */
    static _swapIfNeeded(start, end) {
        if (start.lineNumber < end.lineNumber || (start.lineNumber === end.lineNumber && start.column <= end.column)) {
            return { start, end };
        }
        else {
            return { start: end, end: start };
        }
    }
    /**
     * Gets the userland id of this selection.
     */
    getId() {
        return this._id;
    }
    /**
     * Gets the start position of the selection.
     *
     * @returns
     *   The start position of the selection.
     */
    getStartPosition() {
        return Object.assign({}, this._startPosition);
    }
    /**
     * Gets the start position of the selection.
     *
     * @returns
     *   The start position of the selection.
     */
    getEndPosition() {
        return Object.assign({}, this._endPosition);
    }
    /**
     * Sets the selection using zero-based text indices.
     *
     * @param start
     *   The start offset to set the selection to.
     * @param end
     *   The end offset to set the selection to.
     */
    setOffsets(start, end) {
        const startPosition = this._editor.getModel().getPositionAt(start);
        const endPosition = this._editor.getModel().getPositionAt(end);
        this.setPositions(startPosition, endPosition);
    }
    /**
     * Sets the selection using Monaco's line-number / column coordinate system.
     *
     * @param start
     *   The start position to set the selection to.
     * @param end
     *   The end position to set the selection to.
     */
    setPositions(start, end) {
        // this._decorations = this._editor.deltaDecorations(this._decorations, []);
        const ordered = RemoteSelection._swapIfNeeded(start, end);
        this._startPosition = ordered.start;
        this._endPosition = ordered.end;
        this._render();
    }
    /**
     * Makes the selection visible if it is hidden.
     */
    show() {
        this._render();
    }
    /**
     * Makes the selection hidden if it is visible.
     */
    hide() {
        this._decorations = this._editor.deltaDecorations(this._decorations, []);
    }
    /**
     * Determines if the selection has been permanently removed from the editor.
     *
     * @returns
     *   True if the selection has been disposed, false otherwise.
     */
    isDisposed() {
        return this._disposed;
    }
    /**
     * Permanently removes the selection from the editor.
     */
    dispose() {
        if (!this._disposed) {
            this._styleElement.parentElement.removeChild(this._styleElement);
            this.hide();
            this._disposed = true;
            this._onDisposed();
        }
    }
    /**
     * A helper method that actually renders the selection as a decoration within
     * the Monaco Editor.
     *
     * @private
     * @internal
     */
    _render() {
        this._decorations = this._editor.deltaDecorations(this._decorations, [
            {
                range: new monaco.Range(this._startPosition.lineNumber, this._startPosition.column, this._endPosition.lineNumber, this._endPosition.column),
                options: {
                    className: this._className,
                    hoverMessage: this._label != null ? {
                        value: this._label
                    } : null
                }
            }
        ]);
    }
}
exports.RemoteSelection = RemoteSelection;
//# sourceMappingURL=RemoteSelection.js.map