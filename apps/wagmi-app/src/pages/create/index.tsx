// @ts-nocheck
import  React from 'react';
import { useState } from 'react';
import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";
import { create } from "ipfs-http-client";
import { ethers } from 'ethers'
import abi from '../../../../../contracts/abi/dao.json'
import abiHub from '../../../../../contracts/abi/hub.json'
const createValist = require('@valist/sdk').create;
import Web3HttpProvider from 'web3-providers-http';
import { useSigner, useConnect, useContract } from 'wagmi'

// @ts-ignore
const client:any = create('https://ipfs.infura.io:5001/api/v0');

const DaoPage = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [level, setLevel] = useState('')
  const [urlArr, setUrlArr] = useState([]);
  const [projectID, setProjectId] = useState("123")
  const [isLoading, setIsLoading] = useState(false)
  const [nfts, setNFTs] = useState(false)
  const contractAddress = '0x402D30e7Dba9BE455203A9d02bAB122bc5F59549';
  const [message, setMessage] = useState('');
  const { activeConnector } = useConnect()
  const { data: signer, isError } = useSigner()

  /**
   * Fetch NFTs via COVALENT NFT API
   * https://www.covalenthq.com/docs/api/#/0/Class-A/Get-changes-in-token-holders-between-two-block-heights/lng=en
   */
  async function offersGetCov(contractHash) {
    // const chain = '137'; //Polygon
    // const chain = '80001'; //Mumbai
    // 69 Opt Kovan
    // let res = await
    fetch(
      `https://api.covalenthq.com/v1/69/tokens/${contractHash}/nft_token_ids/?key=ckey_51d7a300b1364d36a1dc7fb14a5`,
      // `https://api.covalenthq.com/v1/80001/tokens/${contractHash}/nft_token_ids/?key=ckey_3cf63e4335e74f97a35b9f16bb1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        console.warn("[TEST] covalenthq Contract's NFTs:", response?.data?.items);
        response?.data?.items ? setNFTs(response?.data?.items) : setNFTs([]);
        //Done Loading
        setIsLoading(false);
        return response;
      })
      .catch((err) => {
        console.error(err);
        //Done Loading
        setIsLoading(false);
        //Has Error
        setError(err);
      });
    // console.warn("[TEST] covalenthq Contract's NFTs:", res);
  }

  async function createNewDAO(e) {   
    e.preventDefault()
    /* saves post to ipfs then anchors to smart contract */
    if (!title || !desc) return
    const hash = await saveDaoToIpfs()
    await saveDao(hash)
    const response = await offersGetCov(contractAddress)
    console.log("RESP")
    console.log(response)
    // router.push(`/`)
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

  async function saveDao(hash) {
    if (activeConnector) {
      const contract = useContract(contractAddress, abiHub, signer)
      console.log('contract: ', contract)
      try {
        const val = await contract.teamDAOMake(title, hash)
        console.log('val: ', val)
        setMessage('Created new mDAO!')
      } catch (err) {
        console.log('Errorr: ', err)
      }
    }    
  }


    async function saveDaoToIpfs() {
      const dao = {
        title,
        desc,
        level,
        projectID,
      }
      
      try {
        const added = await client.add(JSON.stringify(dao))
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        setUrlArr(prev => [...prev, url]);    
        return added.path
      } catch (err) {
        console.log('error: ', err)
      }
    }
  

  return (
    <Admin meta={<Meta title="Start DAO" description="MentorDAO" />}>
      <h3 className="text-2xl font-bold">Start a micro DAO</h3>
      <hr className="my-6 opacity-80" />
      {message && (<h1 className="green">{message}</h1>)}
      <form className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor='title'>Title</label>
          <input className="my-3 opacity-80 py-1 px-1 w-64" onChange={(event) => setTitle(event.target.value)} id='title' type='title' />
        </div>
        <div className="flex flex-col">
        <label htmlFor='description'>Description</label>
        <textarea className="my-3 opacity-80 py-1 px-1 w-64" onChange={(event) => setDesc(event.target.value)} id='description' type='description' />
        </div>
        <div>
        <div className="flex flex-col">
      <label htmlFor='country'>Level</label>
      <select  className="my-3 opacity-80 px-1 py-1 w-64" onChange={(event) => setLevel(event.target.value)} id='level' placeholder='Select level'>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      </div>
      </div>
      <button
        onClick={(e) => createNewDAO(e)}
        className="btn-indigo btn-sm py-2 px-2 w-24"
        type="submit"
      >
        Submit
      </button>
      </form>
    </Admin>
  )
};

export default DaoPage;

