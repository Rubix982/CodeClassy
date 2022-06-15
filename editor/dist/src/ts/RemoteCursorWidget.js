"use strict";
/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the Monaco Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteCursorWidget = void 0;
const monaco_editor_1 = require("monaco-editor");
const EditorContentManager_1 = require("./EditorContentManager");
const Validation_1 = require("./Validation");
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
//# sourceMappingURL=RemoteCursorWidget.js.map