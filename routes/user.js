const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware");
const User = require("../models/User.model");
const Quiz = require("../models/Quiz.model");

router.post("/addContact", checkAuth, async (req, res) => {
  const id = req.user.id;
  const { contact } = req.body;
  try {
    const user = await User.findById(id);
    let existingContactEmails = [];
    user.contacts.forEach((contact) =>
      existingContactEmails.push(contact.email)
    );
    if (existingContactEmails.includes(contact.email)) {
      console.log("A contact with that email already exists.");
      res
        .status(400)
        .send({ msg: "A contact with that email already exists." });
      return;
    }
    user.contacts.push(contact);
    await user.save();
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteContact", checkAuth, async (req, res) => {
  const id = req.user.id;
  const { contactId } = req.body;
  try {
    const user = await User.findById(id);
    const updatedContacts = user.contacts.filter(
      (contact) => contact._id.toString() !== contactId
    );
    user.contacts = updatedContacts;
    user.groups.forEach((group) => {
      group.contacts = [
        ...group.contacts.filter(
          (contact) => contact._id.toString() !== contactId
        ),
      ];
    });
    await user.save();
    res.status(200).send({ msg: "Contact deleted" });
  } catch (err) {
    console.log(Err);
  }
});

router.post("/deleteGroup", checkAuth, async (req, res) => {
  const id = req.user.id;
  const { groupId } = req.body;
  try {
    const user = await User.findById(id);
    const updatedGroups = user.groups.filter(
      (group) => group._id.toString() !== groupId
    );
    user.groups = updatedGroups;
    await user.save();
    res.status(200).send({ msg: "Group deleted" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateContact", checkAuth, async (req, res) => {
  const id = req.user.id;
  const { contactId, updatedContact } = req.body;
  try {
    const user = await User.findById(id);
    user.contacts.forEach((contact) => {
      if (contact._id.toString() === contactId) {
        contact.name = updatedContact.name;
        contact.email = updatedContact.email;
      }
    });
    await user.save();
    res.status(200).send({ msg: "Contact deleted" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/addGroup", checkAuth, async (req, res) => {
  const id = req.user.id;
  const { group } = req.body;
  try {
    const user = await User.findById(id);
    let existingGroups = [];
    user.groups.forEach((group) => existingGroups.push(group.name));
    if (existingGroups.includes(group.name)) {
      console.log("Group already exists");
      res.status(400).send({ msg: "Group already exists" });
    }
    user.groups.push(group);
    await user.save();
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteMember", checkAuth, async (req, res) => {
  const id = req.user.id;
  const { groupId, memberId } = req.body;
  try {
    const user = await User.findById(id);
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
    user.groups = updatedGroups;
    await user.save();
    res.status(200).send({ msg: "Member deleted" });
  } catch (err) {
    console.log(err);
  }
});
router.post("/updateGroup", checkAuth, async (req, res) => {
  const id = req.user.id;
  const { groupId, groupName, members } = req.body;
  try {
    const user = await User.findById(id);
    const updatedGroups = user.groups.map((group) => {
      if (group._id.toString() === groupId) {
        group.name = groupName;
        group.contacts = members;
      }
      return group;
    });
    user.groups = updatedGroups;
    await user.save();
    res.status(200).send({ msg: "Group updated" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/deleteAccount", checkAuth, async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).send({ msg: "User deleted" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/fetchUser", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    	let userQuizzes = [];
				const quizzes = await Quiz.find();
				quizzes.forEach((quiz) => {
					if (user.quizzes.includes(quiz._id)) {
						userQuizzes.push(quiz);
					}
				});

    res.status(200).send({ user, userQuizzes });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
