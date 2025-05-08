import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { postUpdatePassword } from '../../service/apiService';

const ChangePassword = (props) => {
    const { handleCloseModal } = props;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmitChangePassword = async () => {
        if (!currentPassword) {
            toast.error("Please enter Current Password");
            return;
        }
        if (!newPassword) {
            toast.error("Please enter New Password.");
            return;
        }
        if (!confirmPassword) {
            toast.error("Please enter Confirm new password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New Password and Confirm New Password do not match.");
            return;
        }

        const res = await postUpdatePassword(currentPassword, newPassword);
        console.log('res', res)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            console.log(res.EM)
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
        else {
            toast.error(res?.EM);
        }
    };

    return (
        <div className="mt-3">
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="currentPassword" className="form-label">Current Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="col-md-6"></div>

                <div className="col-md-6">
                    <label htmlFor="newPassword" className="form-label">New Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="col-md-6"></div>

                <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm new password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="col-md-6"></div>

                <div className="col-12 text-end">
                    <Button variant="primary" onClick={() => handleSubmitChangePassword()}>
                        Change Password
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;