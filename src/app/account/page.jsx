'use client';

import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export function AccountSettings() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className=''>
        <Navbar />
      </div>
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 py-4">Account Settings</h1>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <Input
                label="First Name"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <Input
              label="Display Name"
              id="displayName"
              name="displayName"
              placeholder="johndoe"
              value={formData.displayName}
              onChange={handleChange}
            />
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            
            <h2 className="text-xl font-semibold mt-8">Security</h2>
            <Input
              label="Current Password"
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <Input
              label="New Password"
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Input
              label="Confirm New Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="flex justify-center">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
      <div className='py-4'>
        <Footer />
      </div>
    </div>
  );
}

export default AccountSettings;
