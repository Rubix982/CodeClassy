"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestCase = /*#__PURE__*/_createClass(function TestCase() {
  _classCallCheck(this, TestCase);
});

var EditorResponseDataDTO = /*#__PURE__*/_createClass(function EditorResponseDataDTO(_ref) {
  var assignmentName = _ref.assignmentName,
      assignmentDueDate = _ref.assignmentDueDate,
      assignmentCreatedOn = _ref.assignmentCreatedOn,
      isAssignmentSubmitted = _ref.isAssignmentSubmitted,
      codingQuestionTitle = _ref.codingQuestionTitle,
      codingQuestionBody = _ref.codingQuestionBody,
      fullName = _ref.fullName,
      testCases = _ref.testCases;

  _classCallCheck(this, EditorResponseDataDTO);

  this.assignmentName = assignmentName;
  this.assignmentDueDate = assignmentDueDate;
  this.assignmentCreatedOn = assignmentCreatedOn;
  this.isAssignmentSubmitted = isAssignmentSubmitted;
  this.codingQuestionBody = codingQuestionBody;
  this.codingQuestionTitle = codingQuestionTitle;
  this.fullName = fullName;
  this.testCases = testCases;
});

exports.default = EditorResponseDataDTO;