import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaStickyNote, FaThumbtack, FaKey } from 'react-icons/fa';
import './UserProfile.css';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Failed to fetch profile:', result.error);
                return;
            }

            setUserProfile(result);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
        setPasswordError('');
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        // Validation
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setPasswordError('All fields are required');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/user/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const result = await response.json();

            if (!response.ok) {
                setPasswordError(result.error || 'Failed to change password');
                return;
            }

            setPasswordSuccess('Password changed successfully!');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            setTimeout(() => {
                setShowPasswordModal(false);
                setPasswordSuccess('');
            }, 2000);
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordError('An error occurred while changing password');
        }
    };

    if (loading) {
        return <div className="loading-container"><div className="loading-spinner"></div></div>;
    }

    if (!userProfile) {
        return <div className="profile-error">Failed to load profile</div>;
    }

    return (
        <div className="user-profile-section">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <FaUser />
                    </div>
                    <h2>{userProfile.user.name}</h2>
                    <p className="profile-role">{userProfile.user.role}</p>
                </div>

                <div className="profile-details">
                    <div className="profile-detail-item">
                        <FaEnvelope className="detail-icon" />
                        <div>
                            <span className="detail-label">Email</span>
                            <span className="detail-value">{userProfile.user.email}</span>
                        </div>
                    </div>

                    <div className="profile-stats">
                        <div className="stat-item">
                            <FaStickyNote className="stat-icon" />
                            <div>
                                <span className="stat-value">{userProfile.statistics.totalNotes}</span>
                                <span className="stat-label">Total Notes</span>
                            </div>
                        </div>

                        <div className="stat-item">
                            <FaThumbtack className="stat-icon pinned" />
                            <div>
                                <span className="stat-value">{userProfile.statistics.pinnedNotes}</span>
                                <span className="stat-label">Pinned Notes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="change-password-btn" onClick={() => setShowPasswordModal(true)}>
                    <FaKey /> Change Password
                </button>
            </div>

            {/* Change Password Modal */}
            <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePasswordSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                placeholder="Enter current password"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                placeholder="Enter new password"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                placeholder="Confirm new password"
                            />
                        </Form.Group>

                        {passwordError && <div className="alert alert-danger">{passwordError}</div>}
                        {passwordSuccess && <div className="alert alert-success">{passwordSuccess}</div>}

                        <div className="modal-buttons">
                            <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Change Password
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserProfile;
