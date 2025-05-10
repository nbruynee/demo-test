import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PersonalInfo from './PersonalInfo';
import ChangePassword from './changePassword';

const Profile = (props) => {
    const { show, setShow, userData } = props;
    const [activeTab, setActiveTab] = useState('personal-info');

    // console.log("Check click:", activeTab)

    const handleCloseModal = () => {
        handleClose();
    };

    const handleTabSelect = (tabId) => {
        setActiveTab(tabId);
        // console.log("Selected Tab:", tabId);
    };

    const handleClose = () => setShow(false)
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${activeTab === 'personal-info' ? 'active' : ''}`}
                            id="home-tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            onClick={() => handleTabSelect('personal-info')}
                        >
                            Personal Information
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${activeTab === 'change-password' ? 'active' : ''}`}
                            id="profile-tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            onClick={() => handleTabSelect('change-password')}
                        >
                            Change Password
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    {activeTab === 'personal-info' && (
                        <div className={`tab-pane fade ${activeTab === 'personal-info' ? 'show active' : ''}`} id="personal-info" role="tabpanel" aria-labelledby="personal-info-tab">
                            <PersonalInfo userData={userData} handleCloseModal={handleCloseModal} />
                        </div>
                    )}
                    {activeTab === 'change-password' && (
                        <div className={`tab-pane fade ${activeTab === 'change-password' ? 'show active' : ''}`} id="change-password" role="tabpanel" aria-labelledby="change-password-tab">
                            <ChangePassword handleCloseModal={handleCloseModal} />
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Profile;