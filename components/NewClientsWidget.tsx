'use client'

import { useEffect, useState } from 'react';

interface NewClientsWidgetProps {
  consultantId?: string;
}

export default function NewClientsWidget({ consultantId }: NewClientsWidgetProps) {
  const [clientCount, setClientCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastWeekClients = async () => {
      setLoading(true);
      try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const params = new URLSearchParams({
          type: 'USER',
          dateFrom: sevenDaysAgo.toISOString().split('T')[0]
        });

        if (consultantId) {
          params.append('consultant', consultantId);
        }

        const response = await fetch(`/api/users?${params}`);
        const users = await response.json();
        setClientCount(Array.isArray(users) ? users.length : 0);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
        setClientCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchLastWeekClients();
  }, [consultantId]);

  return (
    <div className='bg-background border border-grey-border rounded-lg p-4 w-48'>
      <div className='text-sm text-gray-400 mb-1'>Total de clientes</div>
      <div className='flex items-center gap-2 mb-1'>
        <span className='text-2xl font-bold text-brand-white'>
          {loading ? '...' : clientCount}
        </span>
        {!loading && (
          clientCount > 0 ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#00f700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className='w-4 h-4 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
              <circle cx='10' cy='10' r='8' stroke='currentColor' strokeWidth='2' fill='none' />
              <path d='M8 12l2-2 2 2' stroke='currentColor' strokeWidth='2' fill='none' />
            </svg>
          )
        )}
      </div>
      <p className='text-xs text-gray-400'>nos últimos 7 dias</p>
    </div>
  );
}