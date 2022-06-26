// @ts-nocheck
import React from "react";
import { useState } from "react";
import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";
import ProjectsList from '@/components/ProjectList';
import abi from '../../../../../contracts/abi/dao.json'
const createValist = require('@valist/sdk').create;
import Web3HttpProvider from 'web3-providers-http';
import { create } from "ipfs-http-client";

// @ts-ignore
const client:any = create('https://ipfs.infura.io:5001/api/v0');


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
    name: 'Three',
    id: '3334',
    level: 'pro'
  }
];

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
  
  async function setProject(){
    try {
        const web3 = new Web3HttpProvider("https://rpc.valist.io/polygon");
  
        const privateKey = ethers.Wallet.createRandom();
        const wallet = new ethers.Wallet(privateKey);
  
        const provider = new ethers.providers.Web3Provider(web3);
        const valist = await createValist(provider, { wallet, metaTx: true });
        const accountID = valist.generateID(137, 'acme-co');
        const projectID = valist.generateID(accountID, 'go-binary')
        setProjectId(projectID)     
        return valist; 
    } catch (err) {
      console.log(err)
    }
  }

  async function saveProject(hash) {
    /* anchor post to smart contract */
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
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

  async function license(valist){
    try {
        const releaseID = await valist.getLatestReleaseID(projectID)
    
        const projectMeta = await valist.getProjectMeta(projectID);
        const latestRelease = await valist.getReleaseMeta(releaseID);
    
        console.log(projectMeta);
        console.log(latestRelease);
    } catch (err) {
      console.log(err)
    }
  }

  async function saveDaoToIpfs() {
    const lis = await setProject()
    setLis(lis)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const project = {
      title,
      desc,
      level,
      royalty,
      bounty
    }
    
    /* save post metadata to ipfs */
    try {
      const added = await client.add(JSON.stringify(dao))
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      //const url = "12"
      setUrlArr(prev => [...prev, url]);    
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function createNewProject(e) {   
    e.preventDefault()
    /* saves post to ipfs then anchors to smart contract */
    if (!title || !desc) return
    const valistObj = await setProject();
    const hash = await saveProjectToIpfs()
    await saveProject(hash)

    console.log("response")
    console.log(response)
    // router.push(`/`)
  }
  
  return (
    <Admin meta={<Meta title="Admin" description="MentorDAO Admin" />}>
      <h3 className="text-2xl font-bold">Your mDAOs</h3>
      <hr className="my-6 opacity-50" />
      <ProjectsList data={data} isDash={true} />
    </Admin>
)};

export default AdminPage;
