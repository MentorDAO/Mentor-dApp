import React,  { useState }  from "react"
import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";
import ProjectsList from '@/components/ProjectList';
import Modal from '@/components/Modal';


const data = [
  {
    name: 'Learner',
    id: '134423',
    level: 'advanced'
  },
  {
    name: 'Builder',
    id: '3334',
    level: 'pro'
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
];

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Admin meta={<Meta title="DAOS" description="micro DAOs" />}>
      <h3 className="text-2xl font-bold">Join a mDAO</h3>
      <hr className="my-6 opacity-50" />
      <ProjectsList showModal={showModal} data={data} />
      <Modal showModal={showModal} setModal={setShowModal} title="Join the DAO">
        Create you application
      </Modal>
    </Admin>
  )
};

export default AdminPage;
