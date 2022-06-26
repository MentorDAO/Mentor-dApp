import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";
import ProjectsList from '@/components/ProjectList';

const data = [
  {
    name: 'One',
    id: '123',
    level: 'begginer'
  },
  {
    name: 'Two',
    id: '134423',
    level: 'advanced'
  },
  {
    name: 'One',
    id: '3334',
    level: 'pro'
  }
]

const AdminPage = () => {
  return (
    <Admin meta={<Meta title="DAOS" description="micro DAOs" />}>
      <h3 className="text-2xl font-bold">Join a mDAO</h3>
      <hr className="my-6 opacity-50" />
      <ProjectsList data={data} />
    </Admin>
  )
};

export default AdminPage;
