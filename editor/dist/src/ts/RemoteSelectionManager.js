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
exports.RemoteSelectionManager = void 0;
const RemoteSelection_1 = require("./RemoteSelection");
const Validation_1 = require("./Validation");
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
//# sourceMappingURL=RemoteSelectionManager.js.map