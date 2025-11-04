import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

export default async function DashboardFilters() {
  const consultants = await prisma.user.findMany({ where: { type: 'CONSULTANT' } });
  return (
    <div className='bg-background my-2 border border-grey-border flex'>
      <div className='p-4'>
        <label
          id='consultant-name'
        >
          Nome do consultor
        </label>
        <select
          id='consultant-name'
          className='bg-grey-border ml-2 p-3 rounded-lg'
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
        <label
          id='consultant-email'
        >
          Email do consultor
        </label>
        <select
          id='consultant-email'
          className='bg-grey-border ml-2 p-3 rounded-lg'
        >
          <option value="">Selecione um email</option>
          {consultants.map((consultant) => (
            <option key={consultant.id} value={consultant.id}>
              {consultant.email}
            </option>
          ))}
        </select>
      </div>
      <div className='p-4'>
        <label htmlFor='date-from'>
          Data de início
        </label>
        <input
          id='date-from'
          type="date"
          className='bg-grey-border ml-2 p-3 rounded-lg'
        />
        <label htmlFor='date-to'>
          Data de fim
        </label>
        <input
          id='date-to'
          type="date"
          className='bg-grey-border ml-2 p-3 rounded-lg'
          defaultValue={new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  )
}
