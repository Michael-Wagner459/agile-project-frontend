import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteDeal } from '../slice/dealsSlice';

const DealCard = ({ deal, innerRef, draggableProps, dragHandleProps }) => {
  const dispatch = useDispatch();
  const [isUpdateDealModalOpen, setIsUpdateDealModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this company and all associated deals?')) {
      dispatch(deleteDeal(deal._id));
    }
  };

  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="border p-2 rounded mb-2 flex justify-between items-center"
    >
      <div>
        <p>
          <strong>Name:</strong> {deal.name}
        </p>
        <p>
          <strong>Company:</strong> {deal.company.name}
        </p>
        <p>
          <strong>Stage:</strong> {deal.stage}
        </p>
        <p>
          <strong>Amount:</strong> {deal.amount}
        </p>
        <p>
          <strong>Open Date:</strong> {new Date(deal.createDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Close Date:</strong> {new Date(deal.closeDate).toLocaleDateString()}
        </p>
      </div>
      <button onClick={handleDelete} className="flex items-center justify-center w-10 h-10">
        <img src="data:image/jpeg;base64,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" />
      </button>
    </div>
  );
};

export default DealCard;
