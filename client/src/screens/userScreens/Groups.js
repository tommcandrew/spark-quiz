import React, { useState, useEffect } from "react";
import AddGroupModal from "../../components/UI/AddGroupModal";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import * as userActions from "../../store/actions/userActions";
import "./Contacts.css";

const Groups = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [ showAddGrouptModal, setShowAddGroupModal ] = useState(false);

	const handleClose = (e) => {
		if (e.target.classList.contains("addGroupModal__wrapper")) {
			setShowAddGroupModal(false);
		}
	};

	function getUser() {
		dispatch(authActions.loadUser());
	}

	useEffect(
		() => {
			if (!user) {
				getUser();
			}
		},
		[ user ]
	);

	const handleSubmit = (e) => {
		 e.preventDefault();
		 const name = e.target.name.value;
        const email = e.target.email.value;
        
		// dispatch(userActions.addContact({ name, email }));
		// e.target.reset();
		// setShowAddContactModal(false);
	};

	return (
		<div className="contacts__wrapper">
			<h1 className="contacts__title">Groups</h1>
			<div className="contacts__content">
				<div>
					<input type="text" placeholder="Search" />
				</div>
				<div className="contacts__contacts">
					{user &&
						user.groups &&
						user.groups.map((group, index) => (
							<div key={index} className="contacts__contact">
								{group.name}
							</div>
						))}
				</div>
				<button onClick={() => setShowAddGroupModal(true)} type="button">
					Add Group
				</button>
			</div>
			{showAddGrouptModal && <AddGroupModal handleClose={handleClose} handleSubmit={handleSubmit} />}
		</div>
	);
};

export default Groups;
