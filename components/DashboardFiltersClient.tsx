'use client';

import { useEffect, useState } from 'react';

interface Consultant {
  id: string;
  name: string;
  email: string;
}

interface Props {
  consultants: Consultant[];
  searchParams?: { consultant?: string, consultantEmail?: string, dateFrom?: string, dateTo?: string };
}

export default function DashboardFiltersClient({ consultants, searchParams }: Props) {
  const [selectedConsultant, setSelectedConsultant] = useState(searchParams?.consultant || '');
  const [selectedEmail, setSelectedEmail] = useState(searchParams?.consultantEmail || '');

  const handleConsultantChange = (consultantId: string) => {
    setSelectedConsultant(consultantId);
    const consultant = consultants.find(c => c.id === consultantId);
    setSelectedEmail(consultant ? consultant.email : '');
  };

  const handleEmailChange = (email: string) => {
    setSelectedEmail(email);
    const consultant = consultants.find(c => c.email === email);
    setSelectedConsultant(consultant ? consultant.id : '');
  };

  return (
    <form method="GET" className='bg-background my-2 border border-grey-border flex justify-center align-content-center text-sm'>
      <div className='p-4'>
        <label htmlFor='consultant'>
          Nome do consultor
        </label>
        <select
          name='consultant'
          id='consultant'
          className='bg-grey-border ml-2 p-3 rounded-lg'
          value={selectedConsultant}
          onChange={(e) => handleConsultantChange(e.target.value)}
        >
          <option value="">Selecione um consultor</option>
          {consultants.map((consultant) => (
            <option key={consultant.id} value={consultant.id}>
              {consultant.name}
            </option>
          ))}
        </select>
      </div>
      <div className='p-4'>
        <label htmlFor='consultantEmail'>
          Email do consultor
        </label>
        <select
          name='consultantEmail'
          id='consultantEmail'
          className='bg-grey-border ml-2 p-3 rounded-lg'
          value={selectedEmail}
          onChange={(e) => handleEmailChange(e.target.value)}
        >
          <option value="">Selecione um email</option>
          {consultants.map((consultant) => (
            <option key={consultant.id} value={consultant.email}>
              {consultant.email}
            </option>
          ))}
        </select>
      </div>
      <div className='p-4'>
        <label htmlFor='dateFrom'>
          Data de início
        </label>
        <input
          name='dateFrom'
          id='dateFrom'
          type="date"
          className='bg-grey-border mx-2 p-3 rounded-lg'
          defaultValue={searchParams?.dateFrom || ''}
        />
        <label htmlFor='dateTo'>
          Data de fim
        </label>
        <input
          name='dateTo'
          id='dateTo'
          type="date"
          className='bg-grey-border ml-2 p-3 rounded-lg'
          defaultValue={searchParams?.dateTo || new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className='p-4 flex items-end'>
        <button type='submit' className='bg-brand-green hover:bg-brand-green-hover hover:cursor-pointer text-brand-bright-green px-4 py-3 rounded-lg'>
          Filtrar
        </button>
      </div>
    </form>
  );
}