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
exports.RemoteCursorManager = void 0;
const RemoteCursor_1 = require("./RemoteCursor");
const RemoteCursorWidget_1 = require("./RemoteCursorWidget");
const Validation_1 = require("./Validation");
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
        if (this._options.tooltips && typeof "label" !== "string") {
            throw new Error("'label' is required when tooltips are enabled.");
        }
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
//# sourceMappingURL=RemoteCursorManager.js.map