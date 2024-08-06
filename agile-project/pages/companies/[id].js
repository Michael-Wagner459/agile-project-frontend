import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { deleteCompany } from '@/app/slice/companySlice';
import axios from '../../app/axios';
import { fetchDeals } from '@/app/slice/dealsSlice';
import CompanyDealCard from '../../app/components/CompanyDealCard';
import UpdateCompanyModal from '@/app/components/UpdateCompanyModal';

const CompanyDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [company, setCompany] = useState(null);
  const [deals, setDeals] = useState([]);
  const [isUpdateCompanyModalOpen, setUpdateCompanyModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCompanyDetails = async () => {
        try {
          const response = await axios.get(`/api/companies/${id}`);
          setCompany(response.data);
          setDeals(response.data.deals);
        } catch (error) {
          console.error('Error fetching company details', error);
        }
      };
      fetchCompanyDetails();
    }
  }, [id, deals]);

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this company and all associated deals?')) {
      dispatch(deleteCompany(id));
      router.push('/companies');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {company && (
        <div className="flex">
          <div className="w-1/2 p-4 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
            <img src={company.logo} alt={company.name} className="mb-4 w-full h-48 object-contain" />
            <p>
              <strong>Phone:</strong> {formatPhoneNumber(company.phoneNumber)}
            </p>
            <p>
              <strong>Email:</strong> {company.email}
            </p>
            <p>
              <strong>Address:</strong> {company.address}
            </p>
            <p>
              <strong>City:</strong> {company.city}
            </p>
            <p>
              <strong>Country:</strong> {company.country}
            </p>
            <p>
              <strong>Industry:</strong> {company.industry}
            </p>
            <button
              onClick={() => setUpdateCompanyModalOpen(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update Company
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
              Delete Company
            </button>
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-xl font-bold mb-4">Deals</h2>
            <div className="grid grid-cols-1 gap-4">
              {deals.map((deal) => (
                <CompanyDealCard key={deal._id} deal={deal} />
              ))}
            </div>
          </div>
        </div>
      )}
      <UpdateCompanyModal
        isOpen={isUpdateCompanyModalOpen}
        onClose={() => setUpdateCompanyModalOpen(false)}
        company={company}
        setCompany={setCompany}
      />
    </div>
  );
};

export default CompanyDetails;
