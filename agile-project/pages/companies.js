import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import AddCompanyModal from '../app/components/addCompanyModal';
import axios from '../app/axios';
import { useDispatch } from 'react-redux';
import { fetchCompanies } from '@/app/slice/companySlice';

const CompaniesPage = () => {
  const companies = useSelector((state) => state.companies.companies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // Utility function to format phone number
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>
      <button onClick={() => setIsModalOpen(true)} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
        Add Company
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Logo</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Phone Number</th>
              <th className="py-2 px-4 border-b border-gray-200">Address</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Company Owner</th>
              <th className="py-2 px-4 border-b border-gray-200">City</th>
              <th className="py-2 px-4 border-b border-gray-200">Country</th>
              <th className="py-2 px-4 border-b border-gray-200">Industry</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">
                  <Link href={`/companies/${company._id}`} legacyBehavior>
                    <a>
                      <img src={company.logo} alt={company.name} className="w-10 h-10" />
                    </a>
                  </Link>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Link href={`/companies/${company._id}`} legacyBehavior>
                    <a>{company.name}</a>
                  </Link>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{formatPhoneNumber(company.phoneNumber)}</td>
                <td className="py-2 px-4 border-b border-gray-200">{company.address}</td>
                <td className="py-2 px-4 border-b border-gray-200">{company.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{company.companyOwner}</td>
                <td className="py-2 px-4 border-b border-gray-200">{company.city}</td>
                <td className="py-2 px-4 border-b border-gray-200">{company.country}</td>
                <td className="py-2 px-4 border-b border-gray-200">{company.industry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddCompanyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CompaniesPage;
