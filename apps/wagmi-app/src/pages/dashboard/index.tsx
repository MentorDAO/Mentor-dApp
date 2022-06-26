// @ts-nocheck
import React,  { useState }  from "react";
import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";
import ProjectsList from '@/components/ProjectList';
import abiHub from '../../../../../contracts/abi/hub.json'
const createValist = require('@valist/sdk').create;
import Web3HttpProvider from 'web3-providers-http';
import { create } from "ipfs-http-client";
import { useSigner, useConnect, useContract } from 'wagmi'
import Modal from '@/components/Modal';
import { ethers } from 'ethers'
import abi from '../../../../../contracts/abi/dao.json'

// @ts-ignore
const client:any = create('https://ipfs.infura.io:5001/api/v0');
const contractAddress = '0x402D30e7Dba9BE455203A9d02bAB122bc5F59549';


const data = [
  {
    name: 'WhitePaper',
    id: '123',
    level: 'begginer'
  },
  {
    name: 'Learner',
    id: '134423',
    level: 'advanced'
  },
  {
    name: 'Builder',
    id: '3334',
    level: 'pro'
  }
];
const applicationsData = [
  {
    name: 'Alex',
    role: 'fullStack',
    rep: '40',
    id: '3334',
    dao: 'WhitePaper'
  },
  {
    name: 'Kate S.',
    role: 'swe',
    rep: '30',
    id: '4566',
    dao: 'WhitePaper'
  },
  {
    name: 'Jack',
    rep: '2',
    role: 'web3',
    id: '999',
    dao: 'Builder'
  },
]
const AdminPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [level, setLevel] = useState('')
  const [royalty, setRoyalty] = useState('')
  const [bounty, setBounty] = useState('')
  const [projectId, setProjectId] = useState('')
  const [projectMeta, setProjMeta] = useState('')
  const [lis, setLis] = useState('');
  const { activeConnector } = useConnect()
  const { data: signer, isError, isLoading } = useSigner()
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [newProject, setNewProject] = useState({});
  const [valisMets, setValisMeta] = useState('');

  const note = (label, text) => (
    <div><span className="text-gray-600">{label} </span>{text}</div>
  )
  async function confirm(){
    if (activeConnector) {
      const contract = new ethers.Contract(contractAddress, abi, signer)
      console.log('contract dao: ', contract)

      try {
        const val = await contract.approve('address', 'hash')
        /* optional - wait for transaction to be confirmed before rerouting */
        /* await provider.waitForTransaction(val.hash) */
        console.log('val: ', val)
        
      } catch (err) {
        console.log('Errorr: ', err)
      }
    }   
  }

  // TODO:
  const appData = applicationsData.map((item, index) => {
    return (
      <div className="flex flex-row mb-4">
        <button
          className="text-white bg-yellow-500 active:bg-yellow-700 text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
          type="button"
          onClick={() => confirm()}
        >
          Confirm
        </button>
        {note('DAO:', item.dao)} - 
        {note(item.role, item.name)}: rep - <span className="text-red">{item.rep}</span>
      </div>
    )
  });
  const applications = (
    <div className="flex flex-col">
      {appData}
    </div>
  )

  const applyForm = (
    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
    <label className="block text-black text-sm font-bold mb-1">
      Project Title
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
    <label className="block text-black text-sm font-bold mb-1">
      Why do you want to apply?
    </label>
    <textarea className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
    <button
      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
      type="button"
      onClick={() => setShowAddModal(false)}
    >
      Submit
    </button>
  </form>
  )
  const projectForm = (
    <>
    <h2 className="text-lg font-bold text-blue-600 mb-2">{message && message}</h2>
    
    <h2 className="text-lg font-bold text-blue-600 mb-2">{valisMets && message && `Licensed project ${projectId}!`}</h2>
    {message && lis && (<button  className="text-blue-700 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1" onClick={license}>License with Valist</button>)}

    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
    <label className="block text-black text-sm font-bold mb-1">
      Project Title
    </label>
    <input onChange={(e)=> setNewProject({...newProject, title: e.target.value})} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
    <label className="block text-black text-sm font-bold mb-1">
      Description
    </label>
    <textarea onChange={(e)=> setNewProject({...newProject, desc: e.target.value})}  className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
    <label className="block text-black text-sm font-bold mb-1">
      Royalty
    </label>
    <input onChange={(e)=> setNewProject({...newProject, royalty: e.target.value})} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
    <label className="block text-black text-sm font-bold mb-1">
      Bounty
    </label>
    <input onChange={(e)=> setNewProject({...newProject, bounty: e.target.value})} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
    <button
      className="text-white mt-3 bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
      type="submit"
      onClick={createNewProject}
    >
      Submit
    </button>
  </form>
  </>
  )

  async function setProject(){
    try {
        const web3 = new Web3HttpProvider("https://rpc.valist.io/polygon");
  
        const privateKey = ethers.Wallet.createRandom();
        const wallet = new ethers.Wallet(privateKey);
  
        const provider = new ethers.providers.Web3Provider(web3);
        const valist = await createValist(provider, { wallet, metaTx: true });
        const accountID = valist.generateID(137, 'acme-co');
        const projectID = valist.generateID(accountID, 'go-binary')
        console.log(projectID)
        setProjectId(projectID)     
        return valist; 
    } catch (err) {
      console.log(err)
    }
  }

  async function saveProject(hash) {
    if (activeConnector) {
      const contract = new ethers.Contract(contractAddress, abiHub, signer)
      console.log('contract: ', contract)

      try {
        const val = await contract.projectMake(title, hash)
        /* optional - wait for transaction to be confirmed before rerouting */
        /* await provider.waitForTransaction(val.hash) */
        console.log('val: ', val)
        
        setMessage('Created new Project! Ready to license?')
      } catch (err) {
        console.log('Errorr: ', err)
      }
    }    
  }

  async function license(){
    try {
        const releaseID = await lis?.getLatestReleaseID(projectId)
    
        const projectMeta = await lis?.getProjectMeta(projectId);
        const latestRelease = await lis?.getReleaseMeta(releaseID);
        setValisMeta(projectMeta)
        console.log({projectMeta});
        console.log(latestRelease);
        setMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  async function saveToIpfs(data) {
    const lis = await setProject()
    setLis(lis)

    try {
      const added = await client.add(JSON.stringify(data))
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function createNewProject(e) {   
    e.preventDefault()

    if (!newProject.title) return
    await setProject();
    const hash = await saveToIpfs(newProject)
    await saveProject(hash)
  }
  
  async function appyToDAO(e) {   
    e.preventDefault()
    console.log("dao apply")

    const hash = await saveToIpfs(newProject)
    await saveProject(hash)
  }

  return (
    <Admin meta={<Meta title="Admin" description="MentorDAO Admin" />}>
      <h3 className="text-2xl font-bold text-yellow-800">Your mDAOs</h3>
      <hr className="my-2 opacity-50" />
      <button
        className="btn-blue active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-6"
        type="button"
        onClick={() => setShowAddModal(true)}
      >
        Create a Project
      </button>
      <button
        className="btn-blue active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-6"
        type="button"
        onClick={() => setShowApproveModal(true)}
      >
        Approve mDAO applications
      </button>
      <ProjectsList setModal={setShowModal} setSelectedProject={setSelectedItem} data={data} isDash={true} />
      <Modal showModal={showAddModal} setModal={setShowAddModal} title="Create a Project">
        {projectForm}
      </Modal>
      <Modal showModal={showModal} setModal={setShowModal} title="Appy to a Project">
        {applyForm}
      </Modal>
      <Modal showModal={showApproveModal} setModal={setShowApproveModal} title="Your mDAOs applications">
        {applications}
      </Modal>
    </Admin>
)};

export default AdminPage;
