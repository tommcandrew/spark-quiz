const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware");
const User = require("../models/User.model");

router.post("/addContact", checkAuth, (req, res) => {
  const id = req.user.id;
  const { contact } = req.body;
  User.findById(id)
    .then((user) => {
      user.contacts.push(contact);
      user.save().then(() => {
        res.status(200).send();
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteContact", checkAuth, (req, res) => {
  const id = req.user.id;
  const { contactId } = req.body;
  User.findById(id)
    .then((user) => {
      const updatedContacts = user.contacts.filter(
        (contact) => contact._id.toString() !== contactId
      );
      user.contacts = updatedContacts;

      //remove contact from any groups
      user.groups.forEach((group) => {
        group.contacts = [
          ...group.contacts.filter(
            (contact) => contact._id.toString() !== contactId
          ),
        ];
      });

      user.save().then(() => {
        res.status(200).send({ msg: "Contact deleted" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteGroup", checkAuth, (req, res) => {
  const id = req.user.id;
  const { groupId } = req.body;
  User.findById(id)
    .then((user) => {
      const updatedGroups = user.groups.filter(
        (group) => group._id.toString() !== groupId
      );
      user.groups = updatedGroups;
      user.save().then(() => {
        res.status(200).send({ msg: "Group deleted" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updateContact", checkAuth, (req, res) => {
  const id = req.user.id;
  const { contactId, updatedContact } = req.body;
  User.findById(id)
    .then((user) => {
      user.contacts.forEach((contact) => {
        if (contact._id.toString() === contactId) {
          contact.name = updatedContact.name;
          contact.email = updatedContact.email;
        }
      });
      user.save().then(() => {
        res.status(200).send({ msg: "Contact deleted" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addGroup", checkAuth, (req, res) => {
  const id = req.user.id;
  const { group } = req.body;
  User.findById(id)
    .then((user) => {
      user.groups.push(group);
      user.save().then(() => {
        res.status(200).send();
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteMember", checkAuth, (req, res) => {
  const id = req.user.id;
  const { groupId, memberId } = req.body;
  User.findById(id)
    .then((user) => {
      const updatedGroups = user.groups.map((group) => {
        if (group._id.toString() === groupId) {
          group.contacts = [
            ...group.contacts.filter(
              (contact) => contact._id.toString() !== memberId
            ),
          ];
        }
        return group;
      });
      user.save().then(() => {
        res.status(200).send({ msg: "Member deleted" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/updateGroup", checkAuth, (req, res) => {
  const id = req.user.id;
  const { groupId, membersToAdd } = req.body;
  User.findById(id)
    .then((user) => {
      const updatedGroups = user.groups.map((group) => {
        if (group._id.toString() === groupId) {
          group.contacts = [...group.contacts, ...membersToAdd];
        }
        return group;
      });
      user.groups = updatedGroups;
      user.save().then(() => {
        res.status(200).send({ msg: "Group updated" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/deleteAccount", checkAuth, (req, res) => {
  const id = req.user.id;
  User.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ msg: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//to identify the user session
router.get("/user", checkAuth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
