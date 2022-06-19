/**!
© 2019 Convergence Labs, Inc.
@version 0.0.1
@license MIT
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("monaco-editor"));
	else if(typeof define === 'function' && define.amd)
		define("MonacoCollabExt", ["vs/editor/editor.main"], factory);
	else if(typeof exports === 'object')
		exports["MonacoCollabExt"] = factory(require("monaco-editor"));
	else
		root["MonacoCollabExt"] = factory(root["monaco"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__643__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 22:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditorContentManager = void 0;
const monaco = __importStar(__webpack_require__(643));
const Validation_1 = __webpack_require__(422);
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


/***/ }),

/***/ 741:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the Monaco Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoteCursor = void 0;
/**
 * The RemoteCursor class represents a remote cursor in the MonacoEditor. This
 * class allows you to control the location and visibility of the cursor.
 */
class RemoteCursor {
    /**
     * Creates a new RemoteCursor.
     *
     * @param delegate
     *   The underlying Monaco Editor widget.
     * @internal
     * @hidden
     */
    constructor(delegate) {
        this._delegate = delegate;
    }
    /**
     * Gets the unique id of this cursor.
     *
     * @returns
     *   The unique id of this cursor.
     */
    getId() {
        return this._delegate.getId();
    }
    /**
     * Gets the position of the cursor.
     *
     * @returns
     *   The position of the cursor.
     */
    getPosition() {
        return this._delegate.getPosition().position;
    }
    /**
     * Sets the location of the cursor based on a Monaco Editor IPosition.
     *
     * @param position
     *   The line / column position of the cursor.
     */
    setPosition(position) {
        this._delegate.setPosition(position);
    }
    /**
     * Sets the location of the cursor using a zero-based text offset.
     *
     * @param offset
     *   The offset of the cursor.
     */
    setOffset(offset) {
        this._delegate.setOffset(offset);
    }
    /**
     * Shows the cursor if it is hidden.
     */
    show() {
        this._delegate.show();
    }
    /**
     * Hides the cursor if it is shown.
     */
    hide() {
        this._delegate.hide();
    }
    /**
     * Determines if the cursor has already been disposed. A cursor is disposed
     * when it has been permanently removed from the editor.
     *
     * @returns
     *   True if the cursor has been disposed, false otherwise.
     */
    isDisposed() {
        return this._delegate.isDisposed();
    }
    /**
     * Disposes of this cursor, removing it from the editor.
     */
    dispose() {
        this._delegate.dispose();
    }
}
exports.RemoteCursor = RemoteCursor;


/***/ }),

/***/ 423:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the Monaco Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoteCursorManager = void 0;
const RemoteCursor_1 = __webpack_require__(741);
const RemoteCursorWidget_1 = __webpack_require__(282);
const Validation_1 = __webpack_require__(422);
/**
 * The RemoteCursorManager class is responsible for creating and managing a
 * set of indicators that show where remote users's cursors are located when
 * using Monaco in a collaborative editing context.  The RemoteCursorManager
 * leverages Monaco's Content Widget concept.
 */
class RemoteCursorManager {
    /**
     * Creates a new RemoteCursorManager with the supplied options.
     *
     * @param options
     *   The options that will configure the RemoteCursorManager behavior.
     */
    constructor(options) {
        if (typeof options !== "object") {
            throw new Error("'options' is a required parameter and must be an object.");
        }
        // Override the defaults.
        options = Object.assign(Object.assign({}, RemoteCursorManager.DEFAULT_OPTIONS), options);
        if (options.editor === undefined || options.editor === null) {
            throw new Error(`options.editor must be defined but was: ${options.editor}`);
        }
        this._options = options;
        this._cursorWidgets = new Map();
        this._nextWidgetId = 0;
    }
    /**
     * Adds a new remote cursor to the editor.
     *
     * @param id
     *   A unique id that will be used to reference this cursor.
     * @param color
     *   The css color that the cursor and tooltip should be rendered in.
     * @param label
     *   An optional label for the tooltip. If tooltips are enabled.
     *
     * @returns
     *   The remote cursor widget that will be added to the editor.
     */
    addCursor(id, color, label) {
        Validation_1.Validation.assertString(id, "id");
        Validation_1.Validation.assertString(color, "color");
        if (this._options.tooltips && typeof "label" !== "string") {}
        const widgetId = "" + this._nextWidgetId++;
        const tooltipDurationMs = this._options.tooltipDuration * 1000;
        const cursorWidget = new RemoteCursorWidget_1.RemoteCursorWidget(this._options.editor, widgetId, color, label, this._options.tooltips, tooltipDurationMs, () => this.removeCursor(id));
        this._cursorWidgets.set(id, cursorWidget);
        return new RemoteCursor_1.RemoteCursor(cursorWidget);
    }
    /**
     * Removes the remote cursor from the editor.
     *
     * @param id
     *   The unique id of the cursor to remove.
     */
    removeCursor(id) {
        Validation_1.Validation.assertString(id, "id");
        const remoteCursorWidget = this._getCursor(id);
        if (!remoteCursorWidget.isDisposed()) {
            remoteCursorWidget.dispose();
        }
        this._cursorWidgets.delete(id);
    }
    /**
     * Updates the location of the specified remote cursor using a Monaco
     * IPosition object..
     *
     * @param id
     *   The unique id of the cursor to remove.
     * @param position
     *   The location of the cursor to set.
     */
    setCursorPosition(id, position) {
        Validation_1.Validation.assertString(id, "id");
        const remoteCursorWidget = this._getCursor(id);
        remoteCursorWidget.setPosition(position);
    }
    /**
     * Updates the location of the specified remote cursor based on a zero-based
     * text offset.
     *
     * @param id
     *   The unique id of the cursor to remove.
     * @param offset
     *   The location of the cursor to set.
     */
    setCursorOffset(id, offset) {
        Validation_1.Validation.assertString(id, "id");
        const remoteCursorWidget = this._getCursor(id);
        remoteCursorWidget.setOffset(offset);
    }
    /**
     * Shows the specified cursor. Note the cursor may be scrolled out of view.
     *
     * @param id
     *   The unique id of the cursor to show.
     */
    showCursor(id) {
        Validation_1.Validation.assertString(id, "id");
        const remoteCursorWidget = this._getCursor(id);
        remoteCursorWidget.show();
    }
    /**
     * Hides the specified cursor.
     *
     * @param id
     *   The unique id of the cursor to show.
     */
    hideCursor(id) {
        Validation_1.Validation.assertString(id, "id");
        const remoteCursorWidget = this._getCursor(id);
        remoteCursorWidget.hide();
    }
    /**
     * A helper method that gets a cursor by id, or throws an exception.
     * @internal
     */
    _getCursor(id) {
        if (!this._cursorWidgets.has(id)) {
            throw new Error("No such cursor: " + id);
        }
        return this._cursorWidgets.get(id);
    }
}
exports.RemoteCursorManager = RemoteCursorManager;
/**
 * The default values for optional parameters.
 * @internal
 */
RemoteCursorManager.DEFAULT_OPTIONS = { tooltips: true, tooltipDuration: 1 };


/***/ }),

/***/ 282:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the Monaco Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoteCursorWidget = void 0;
const monaco_editor_1 = __webpack_require__(643);
const EditorContentManager_1 = __webpack_require__(22);
const Validation_1 = __webpack_require__(422);
function getConfiguration(editorInstance) {
    // Support for Monaco < 0.19.0
    if (typeof editorInstance.getConfiguration === "function") {
        return editorInstance.getConfiguration();
    }
    return {
        lineHeight: editorInstance.getOption(monaco_editor_1.editor.EditorOption.lineHeight)
    };
}
/**
 * This class implements a Monaco Content Widget to render a remote user's
 * cursor, and an optional tooltip.
 *
 * @internal
 */
class RemoteCursorWidget {
    constructor(codeEditor, widgetId, color, label, tooltipEnabled, tooltipDuration, onDisposed) {
        this._onInsert = (index, text) => {
            if (this._position === null) {
                return;
            }
            const offset = this._offset;
            if (index <= offset) {
                const newOffset = offset + text.length;
                const position = this._editor.getModel().getPositionAt(newOffset);
                this._updatePosition(position);
            }
        };
        this._onReplace = (index, length, text) => {
            if (this._position === null) {
                return;
            }
            const offset = this._offset;
            if (index <= offset) {
                const newOffset = (offset - Math.min(offset - index, length)) + text.length;
                const position = this._editor.getModel().getPositionAt(newOffset);
                this._updatePosition(position);
            }
        };
        this._onDelete = (index, length) => {
            if (this._position === null) {
                return;
            }
            const offset = this._offset;
            if (index <= offset) {
                const newOffset = offset - Math.min(offset - index, length);
                const position = this._editor.getModel().getPositionAt(newOffset);
                this._updatePosition(position);
            }
        };
        this._editor = codeEditor;
        this._tooltipDuration = tooltipDuration;
        this._id = `monaco-remote-cursor-${widgetId}`;
        this._onDisposed = onDisposed;
        // Create the main node for the cursor element.
        const { lineHeight } = getConfiguration(this._editor);
        this._domNode = document.createElement("div");
        this._domNode.className = "monaco-remote-cursor";
        this._domNode.style.background = color;
        this._domNode.style.height = `${lineHeight}px`;
        // Create the tooltip element if the tooltip is enabled.
        if (tooltipEnabled) {
            this._tooltipNode = document.createElement("div");
            this._tooltipNode.className = "monaco-remote-cursor-tooltip";
            this._tooltipNode.style.background = color;
            this._tooltipNode.innerHTML = label;
            this._domNode.appendChild(this._tooltipNode);
            // we only need to listen to scroll positions to update the
            // tooltip location on scrolling.
            this._scrollListener = this._editor.onDidScrollChange(() => {
                this._updateTooltipPosition();
            });
        }
        else {
            this._tooltipNode = null;
            this._scrollListener = null;
        }
        this._contentManager = new EditorContentManager_1.EditorContentManager({
            editor: this._editor,
            onInsert: this._onInsert,
            onReplace: this._onReplace,
            onDelete: this._onDelete
        });
        this._hideTimer = null;
        this._editor.addContentWidget(this);
        this._offset = -1;
        this._disposed = false;
    }
    hide() {
        this._domNode.style.display = "none";
    }
    show() {
        this._domNode.style.display = "inherit";
    }
    setOffset(offset) {
        Validation_1.Validation.assertNumber(offset, "offset");
        const position = this._editor.getModel().getPositionAt(offset);
        this.setPosition(position);
    }
    setPosition(position) {
        Validation_1.Validation.assertPosition(position, "position");
        this._updatePosition(position);
        if (this._tooltipNode !== null) {
            setTimeout(() => this._showTooltip(), 0);
        }
    }
    isDisposed() {
        return this._disposed;
    }
    dispose() {
        if (this._disposed) {
            return;
        }
        this._editor.removeContentWidget(this);
        if (this._scrollListener !== null) {
            this._scrollListener.dispose();
        }
        this._contentManager.dispose();
        this._disposed = true;
        this._onDisposed();
    }
    getId() {
        return this._id;
    }
    getDomNode() {
        return this._domNode;
    }
    getPosition() {
        return this._position;
    }
    _updatePosition(position) {
        this._position = {
            position: Object.assign({}, position),
            preference: [monaco_editor_1.editor.ContentWidgetPositionPreference.EXACT]
        };
        this._offset = this._editor.getModel().getOffsetAt(position);
        this._editor.layoutContentWidget(this);
    }
    _showTooltip() {
        this._updateTooltipPosition();
        if (this._hideTimer !== null) {
            clearTimeout(this._hideTimer);
        }
        else {
            this._setTooltipVisible(true);
        }
        this._hideTimer = setTimeout(() => {
            this._setTooltipVisible(false);
            this._hideTimer = null;
        }, this._tooltipDuration);
    }
    _updateTooltipPosition() {
        const distanceFromTop = this._domNode.offsetTop - this._editor.getScrollTop();
        if (distanceFromTop - this._tooltipNode.offsetHeight < 5) {
            this._tooltipNode.style.top = `${this._tooltipNode.offsetHeight + 2}px`;
        }
        else {
            this._tooltipNode.style.top = `-${this._tooltipNode.offsetHeight}px`;
        }
        this._tooltipNode.style.left = "0";
    }
    _setTooltipVisible(visible) {
        if (visible) {
            this._tooltipNode.style.opacity = "1.0";
        }
        else {
            this._tooltipNode.style.opacity = "0";
        }
    }
}
exports.RemoteCursorWidget = RemoteCursorWidget;


/***/ }),

/***/ 321:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoteSelection = void 0;
const monaco = __importStar(__webpack_require__(643));
const Validation_1 = __webpack_require__(422);
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


/***/ }),

/***/ 193:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the Monaco Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoteSelectionManager = void 0;
const RemoteSelection_1 = __webpack_require__(321);
const Validation_1 = __webpack_require__(422);
/**
 * The RemoteSelectionManager renders remote users selections into the Monaco
 * editor using the editor's built-in decorators mechanism.
 */
class RemoteSelectionManager {
    /**
     * Creates a new RemoteSelectionManager with the specified options.
     *
     * @param options
     *   Ths options that configure the RemoteSelectionManager.
     */
    constructor(options) {
        Validation_1.Validation.assertDefined(options, "options");
        this._remoteSelections = new Map();
        this._options = options;
        this._nextClassId = 0;
    }
    /**
     * Adds a new remote selection with a unique id and the specified color.
     *
     * @param id
     *   The unique id of the selection.
     * @param color
     *   The color to render the selection with.
     */
    addSelection(id, color, label) {
        const onDisposed = () => {
            this.removeSelection(id);
        };
        const selection = new RemoteSelection_1.RemoteSelection(this._options.editor, id, this._nextClassId++, color, label, onDisposed);
        this._remoteSelections.set(id, selection);
        return selection;
    }
    /**
     * Removes an existing remote selection from the editor.
     *
     * @param id
     *   The unique id of the selection.
     */
    removeSelection(id) {
        const remoteSelection = this._getSelection(id);
        if (!remoteSelection.isDisposed()) {
            remoteSelection.dispose();
        }
    }
    /**
     * Sets the selection using zero-based text offset locations.
     *
     * @param id
     *   The unique id of the selection.
     * @param start
     *   The starting offset of the selection.
     * @param end
     *   The ending offset of the selection.
     */
    setSelectionOffsets(id, start, end) {
        const remoteSelection = this._getSelection(id);
        remoteSelection.setOffsets(start, end);
    }
    /**
     * Sets the selection using the Monaco Editor's IPosition (line numbers and columns)
     * location concept.
     *
     * @param id
     *   The unique id of the selection.
     * @param start
     *   The starting position of the selection.
     * @param end
     *   The ending position of the selection.
     */
    setSelectionPositions(id, start, end) {
        const remoteSelection = this._getSelection(id);
        remoteSelection.setPositions(start, end);
    }
    /**
     * Shows the specified selection, if it is currently hidden.
     *
     * @param id
     *   The unique id of the selection.
     */
    showSelection(id) {
        const remoteSelection = this._getSelection(id);
        remoteSelection.show();
    }
    /**
     * Hides the specified selection, if it is currently shown.
     *
     * @param id
     *   The unique id of the selection.
     */
    hideSelection(id) {
        const remoteSelection = this._getSelection(id);
        remoteSelection.hide();
    }
    /**
     * A helper method that gets a cursor by id, or throws an exception.
     * @internal
     */
    _getSelection(id) {
        if (!this._remoteSelections.has(id)) {
            throw new Error("No such selection: " + id);
        }
        return this._remoteSelections.get(id);
    }
}
exports.RemoteSelectionManager = RemoteSelectionManager;


/***/ }),

/***/ 422:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the Monaco Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Validation = void 0;
/**
 * A helper class to aid in input validation.
 *
 * @internal
 */
class Validation {
    static assertString(val, name) {
        if (typeof val !== "string") {
            throw new Error(`${name} must be a string but was: ${val}`);
        }
    }
    static assertNumber(val, name) {
        if (typeof val !== "number") {
            throw new Error(`${name} must be a number but was: ${val}`);
        }
    }
    static assertDefined(val, name) {
        if (val === undefined || val === null) {
            throw new Error(`${name} must be a defined but was: ${val}`);
        }
    }
    static assertFunction(val, name) {
        if (typeof val !== "function") {
            throw new Error(`${name} must be a function but was: ${typeof val}`);
        }
    }
    static assertPosition(val, name) {
        Validation.assertDefined(val, name);
        if (typeof val.lineNumber !== "number" || typeof val.column !== "number") {
            throw new Error(`${name} must be an Object like {lineNumber: number, column: number}: ${JSON.stringify(val)}`);
        }
    }
}
exports.Validation = Validation;


/***/ }),

/***/ 294:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(423), exports);
__exportStar(__webpack_require__(193), exports);
__exportStar(__webpack_require__(22), exports);


/***/ }),

/***/ 643:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__643__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(294);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});