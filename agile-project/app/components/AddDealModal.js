import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { createDeal, fetchDeals } from '../slice/dealsSlice';
import { fetchCompanies } from '../slice/companySlice';
import { useDispatch, useSelector } from 'react-redux';

ReactModal.setAppElement('#__next');

const AddDealModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    amount: '',
    stage: 'Initiated',
    createDate: '',
    closeDate: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCompanies());
    }
  }, [isOpen, dispatch]);

  const resetState = () => {
    setFormData({
      name: '',
      company: '',
      amount: '',
      stage: 'Initiated',
      createDate: '',
      closeDate: '',
    });
    setFormErrors({});
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.company) errors.company = 'Company is required.';
    if (!formData.amount) errors.amount = 'Amount is required.';
    if (!formData.createDate) errors.createDate = 'Create Date is required.';
    if (!formData.closeDate) errors.closeDate = 'Close Date is required.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    dispatch(createDeal(formData));
    resetState();
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg overflow-y-auto">
        <button onClick={onClose} className="float-right">
          ✖
        </button>
        <h2 className="text-2xl mb-4">Add New Deal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Company</label>
            <select
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full border ${formErrors.company ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
            {formErrors.company && <p className="text-red-500 text-sm">{formErrors.company}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full border ${formErrors.amount ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            />
            {formErrors.amount && <p className="text-red-500 text-sm">{formErrors.amount}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Initiated">Initiated</option>
              <option value="Qualified">Qualified</option>
              <option value="Contract Sent">Contract Sent</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Create Date</label>
            <input
              type="date"
              name="createDate"
              value={formData.createDate}
              onChange={handleChange}
              className={`w-full border ${formErrors.createDate ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            />
            {formErrors.createDate && <p className="text-red-500 text-sm">{formErrors.createDate}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Close Date</label>
            <input
              type="date"
              name="closeDate"
              value={formData.closeDate}
              onChange={handleChange}
              className={`w-full border ${formErrors.closeDate ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            />
            {formErrors.closeDate && <p className="text-red-500 text-sm">{formErrors.closeDate}</p>}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Add Deal
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};
export default AddDealModal;
