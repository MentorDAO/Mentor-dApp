// @ts-nocheck
import  React from 'react';
import { useState } from 'react';
import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import abiHub from '../../../../../contracts/abi/hub.json'

const DaoPage = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [level, setLevel] = useState('')
  const contractAddress = '0x402D30e7Dba9BE455203A9d02bAB122bc5F59549';

  async function saveDao(hash) {
    /* anchor post to smart contract */
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abiHub, signer)
      console.log('contract: ', contract)
      try {
        const val = await contract.teamDAOMake(title, hash)
        /* optional - wait for transaction to be confirmed before rerouting */
        /* await provider.waitForTransaction(val.hash) */
        console.log('val: ', val)
      } catch (err) {
        console.log('Errorr: ', err)
      }
    }    
  }

  async function createNewDAO() {   
    await saveDao("hash")
  }

  return (
    <Admin meta={<Meta title="Start DAO" description="MentorDAO" />}>
      <h3 className="text-2xl font-bold">Start a micro DAO</h3>
      <hr className="my-6 opacity-80" />
      <FormControl>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input width='200' variant='outline' size='lg' className="my-3 opacity-80 py-1 px-1" onChange={(event) => setTitle(event.target.value)} id='title' type='title' />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <Textarea width='200' variant='outline' size='lg' className="my-3 opacity-80 py-1 px-1" onChange={(event) => setDesc(event.target.value)} id='description' type='description' />
      </FormControl>
      <FormControl>
      <FormLabel htmlFor='country'>Level</FormLabel>
      <Select width='200' size='lg' className="my-3 opacity-80 px-1 py-1" onChange={(event) => setLevel(event.target.value)} id='level' placeholder='Select level'>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>
      </FormControl>
      <Button
        colorScheme='blue'
        mt={4}
        onClick={(e) => createNewDAO()}
        className="btn-indigo btn-sm py-2 px-2"
        type="submit"
      >
        Submit
      </Button>
    </Admin>
  )
};

export default DaoPage;
