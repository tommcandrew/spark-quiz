"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require("express");

var router = express.Router();

var checkAuth = require("../middleware");

var User = require("../models/User.model");

var Quiz = require("../models/Quiz.model");

router.post("/addContact", checkAuth, function _callee(req, res) {
  var id, contact, user, existingContactEmails;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.user.id;
          contact = req.body.contact;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context.sent;
          existingContactEmails = [];
          user.contacts.forEach(function (contact) {
            return existingContactEmails.push(contact.email);
          });

          if (!existingContactEmails.includes(contact.email)) {
            _context.next = 12;
            break;
          }

          console.log("A contact with that email already exists.");
          res.status(400).send({
            msg: "A contact with that email already exists."
          });
          return _context.abrupt("return");

        case 12:
          user.contacts.push(contact);
          _context.next = 15;
          return regeneratorRuntime.awrap(user.save());

        case 15:
          res.status(200).send();
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 18]]);
});
router.post("/deleteContact", checkAuth, function _callee2(req, res) {
  var id, contactId, user, updatedContacts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.user.id;
          contactId = req.body.contactId;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context2.sent;
          updatedContacts = user.contacts.filter(function (contact) {
            return contact._id.toString() !== contactId;
          });
          user.contacts = updatedContacts;
          user.groups.forEach(function (group) {
            group.contacts = _toConsumableArray(group.contacts.filter(function (contact) {
              return contact._id.toString() !== contactId;
            }));
          });
          _context2.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          res.status(200).send({
            msg: "Contact deleted"
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](2);
          console.log(Err);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 14]]);
});
router.post("/deleteGroup", checkAuth, function _callee3(req, res) {
  var id, groupId, user, updatedGroups;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.user.id;
          groupId = req.body.groupId;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context3.sent;
          updatedGroups = user.groups.filter(function (group) {
            return group._id.toString() !== groupId;
          });
          user.groups = updatedGroups;
          _context3.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          res.status(200).send({
            msg: "Group deleted"
          });
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 13]]);
});
router.post("/updateContact", checkAuth, function _callee4(req, res) {
  var id, _req$body, contactId, updatedContact, user;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.user.id;
          _req$body = req.body, contactId = _req$body.contactId, updatedContact = _req$body.updatedContact;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context4.sent;
          user.contacts.forEach(function (contact) {
            if (contact._id.toString() === contactId) {
              contact.name = updatedContact.name;
              contact.email = updatedContact.email;
            }
          });
          _context4.next = 9;
          return regeneratorRuntime.awrap(user.save());

        case 9:
          res.status(200).send({
            msg: "Contact deleted"
          });
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 12]]);
});
router.post("/addGroup", checkAuth, function _callee5(req, res) {
  var id, group, user, existingGroups;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.user.id;
          group = req.body.group;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context5.sent;
          existingGroups = [];
          user.groups.forEach(function (group) {
            return existingGroups.push(group.name);
          });

          if (existingGroups.includes(group.name)) {
            console.log("Group already exists");
            res.status(400).send({
              msg: "Group already exists"
            });
          }

          user.groups.push(group);
          _context5.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.status(200).send();
          _context5.next = 18;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](2);
          console.log(_context5.t0);

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 15]]);
});
router.post("/deleteMember", checkAuth, function _callee6(req, res) {
  var id, _req$body2, groupId, memberId, user, updatedGroups;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.user.id;
          _req$body2 = req.body, groupId = _req$body2.groupId, memberId = _req$body2.memberId;
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context6.sent;
          updatedGroups = user.groups.map(function (group) {
            if (group._id.toString() === groupId) {
              group.contacts = _toConsumableArray(group.contacts.filter(function (contact) {
                return contact._id.toString() !== memberId;
              }));
            }

            return group;
          });
          user.groups = updatedGroups;
          _context6.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          res.status(200).send({
            msg: "Member deleted"
          });
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](2);
          console.log(_context6.t0);

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 13]]);
});
router.post("/updateGroup", checkAuth, function _callee7(req, res) {
  var id, _req$body3, groupId, groupName, members, user, updatedGroups;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.user.id;
          _req$body3 = req.body, groupId = _req$body3.groupId, groupName = _req$body3.groupName, members = _req$body3.members;
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context7.sent;
          updatedGroups = user.groups.map(function (group) {
            if (group._id.toString() === groupId) {
              group.name = groupName;
              group.contacts = members;
            }

            return group;
          });
          user.groups = updatedGroups;
          _context7.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          res.status(200).send({
            msg: "Group updated"
          });
          _context7.next = 16;
          break;

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](2);
          console.log(_context7.t0);

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 13]]);
});
router.get("/deleteAccount", checkAuth, function _callee8(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.user.id;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(id));

        case 4:
          user = _context8.sent;
          res.status(200).send({
            msg: "User deleted"
          });
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          console.log(_context8.t0);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.get("/fetchUser", checkAuth, function _callee9(req, res) {
  var user, userQuizzes, quizzes;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select("-password"));

        case 3:
          user = _context9.sent;
          userQuizzes = [];
          _context9.next = 7;
          return regeneratorRuntime.awrap(Quiz.find());

        case 7:
          quizzes = _context9.sent;
          quizzes.forEach(function (quiz) {
            if (user.quizzes.includes(quiz._id)) {
              userQuizzes.push(quiz);
            }
          });
          res.status(200).send({
            user: user,
            userQuizzes: userQuizzes
          });
          _context9.next = 15;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
module.exports = router;