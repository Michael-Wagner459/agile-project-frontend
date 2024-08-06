// components/AddCompanyModal.js
import { useState } from 'react';
import ReactModal from 'react-modal';
import { createCompany } from '../slice/companySlice';
import { useDispatch } from 'react-redux';

const AddCompanyModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    logo: '',
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
    companyOwner: '',
    city: '',
    country: '',
    industry: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateCompany = async () => {
    const newErrors = {};
    const phoneNumberPattern = /^[0-9]{10}$/;

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!phoneNumberPattern.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Phone number must be exactly 10 Numbers';

    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.companyOwner) newErrors.companyOwner = 'Company owner is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';

    if (Object.keys(newErrors).length === 0) {
      try {
        dispatch(createCompany(formData));
        onClose();
      } catch (error) {
        console.error('Error updating company', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg overflow-y-auto max-h-full sm:max-w-md md:max-w-lg lg:max-w-xl">
        <button onClick={onClose} className="float-right">
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Update Company</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Logo URL</label>
            <input
              type="text"
              name="logo"
              className="w-full px-3 py-2 border rounded"
              value={formData.logo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="w-full px-3 py-2 border rounded"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="address"
              className="w-full px-3 py-2 border rounded"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Company Owner</label>
            <input
              type="text"
              name="companyOwner"
              className="w-full px-3 py-2 border rounded"
              value={formData.companyOwner}
              onChange={handleChange}
              required
            />
            {errors.companyOwner && <p className="text-red-500">{errors.companyOwner}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">City</label>
            <input
              type="text"
              name="city"
              className="w-full px-3 py-2 border rounded"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Country</label>
            <input
              type="text"
              name="country"
              className="w-full px-3 py-2 border rounded"
              value={formData.country}
              onChange={handleChange}
              required
            />
            {errors.country && <p className="text-red-500">{errors.country}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              className="w-full px-3 py-2 border rounded"
              value={formData.industry}
              onChange={handleChange}
              required
            />
            {errors.industry && <p className="text-red-500">{errors.industry}</p>}
          </div>
          <button onClick={handleUpdateCompany} className="w-full py-2 bg-blue-500 text-white rounded">
            Update Company
          </button>
        </form>
      </div>
    </ReactModal>
  );
};
export default AddCompanyModal;
