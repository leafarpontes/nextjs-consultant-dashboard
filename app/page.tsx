import DashboardFilters from "@/components/DashboardFilters";
import { PrismaClient, Prisma } from "./generated/prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Home({ searchParams }: { searchParams: Promise<{ consultant?: string, consultantEmail?: string, dateFrom?: string, dateTo?: string }> }) {
  const params = await searchParams;
  const whereClause: Prisma.UserWhereInput = { type: 'USER' };
  
  if (params.consultant) {
    whereClause.consultantId = params.consultant;
  }
  
  if (params.consultantEmail) {
    const consultant = await prisma.user.findFirst({ where: { email: params.consultantEmail, type: 'CONSULTANT' } });
    if (consultant) {
      whereClause.consultantId = consultant.id;
    }
  }
  
  if (params.dateFrom && params.dateTo) {
    whereClause.createdAt = {
      gte: new Date(params.dateFrom),
      lte: new Date(params.dateTo + 'T23:59:59.999Z')
    };
  }
  
  const users = await prisma.user.findMany({ where: whereClause });
  console.log('users', users);
  return (
    <main
      className='pt-24 flex justify-center align-items-center font-red-hat-display text-brand-white'
    >
      <div>
        <h1 className='text-3xl font-extrabold'>
          Dashboard
        </h1>
        <Link
          href={'/create-user'}
          className='inline-block bg-brand-green hover:bg-brand-green-hover hover:cursor-pointer text-brand-bright-green px-3 py-2 rounded-lg text-sm my-2'
        >
          Criar usuário +
        </Link>
        <DashboardFilters searchParams={params} />
        <table className='w-full border-collapse font text-sm'>
          <thead>
            <tr className='bg-background my-2 border border-grey-border'>
              <th className='py-7 px-10 text-left'>Nome</th>
              <th className='py-7 px-10 text-left'>Email</th>
              <th className='py-7 px-10 text-left'>Telefone</th>
              <th className='py-7 px-10 text-left'>CPF</th>
              <th className='py-7 px-10 text-left'>Idade</th>
              <th className='py-7 px-10 text-left'>Endereço</th>
              <th className='py-7 px-10 text-left'>Criado em</th>
              <th className='py-7 px-10 text-left'>Atualizado em</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='my-2 border border-grey-border' style={{backgroundColor: '#131516'}}>
                <td className='py-7 px-10 text-left'>{user.name}</td>
                <td className='py-7 px-10 text-left'>{user.email}</td>
                <td className='py-7 px-10 text-left'>{user.phone}</td>
                <td className='py-7 px-10 text-left'>{user.cpf}</td>
                <td className='py-7 px-10 text-left'>{user.age}</td>
                <td className='py-7 px-10 text-left'>{user.address}</td>
                <td className='py-7 px-10 text-left'>{user.createdAt.toLocaleDateString()}</td>
                <td className='py-7 px-10 text-left'>{user.updatedAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
