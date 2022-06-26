// @ts-nocheck
import React, { useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image'
import Modal from '@/components/Modal';
import logo from '../logo.jpg';

const styleProject = classnames('w-54 my-2 mx-2 px-2 py-2 bg-white');

const Project = ({
  setModal,
  item,
  setSelectedProject = (id: string) => console.log(id),
  isDash
} : any ) => {

  // business logic
  const onProjectClick = () => {
    setSelectedProject(item.id);
    // TODO: open project page
  };

  const buttonJoin = (
    <button onClick={() => setModal(true)} className="rounded btn-blue btn-sm py-1 px-2">Apply to the mDAO</button>
  )
  const buttonAddProject = (
    <button onClick={() => setModal(true)} className="rounded btn-blue btn-sm py-1 px-2">Bid on a Project</button>
  )

  const note = (label, text) => (
    <div><span className="text-gray-600">{label} </span>{text}</div>
  )

  return (
    <div onClick={() => onProjectClick()}  style={{ width: 250, height: 400 }} className={styleProject}>
      <h1 className="text-lg font-bold text-gray-700">mDAO name: {item?.title || item?.name}</h1>
      <Image src={logo} />
      {note("Level:", item?.level)}
      {note("Members:", "3")}
      {note("Status:", "in progress")}
      <div className="mt-4">
        {isDash ?  buttonAddProject : buttonJoin}
      </div>
    </div>
  );
};

export default Project;