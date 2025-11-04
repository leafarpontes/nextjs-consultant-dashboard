import DashboardFilters from "@/components/DashboardFilters";
import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const users = await prisma.user.findMany({ where: { type: 'USER' } });
  console.log('users', users);
  return (
    <main
      className='pt-24 flex justify-center align-items-center font-red-hat-display text-brand-white'
    >
      <div>
        <h1 className='text-3xl font-extrabold'>
          Dashboard
        </h1>
        <div className='h-12'>Criar usuário</div>
        <DashboardFilters />
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
