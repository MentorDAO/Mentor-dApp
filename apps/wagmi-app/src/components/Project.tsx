import React from 'react';
import classnames from 'classnames';
import logo from './mentor.png'
import Image from 'next/image'

const styleProject = classnames('w-54 my-2 mx-2 px-2 py-2 bg-white');

type IProjectProps = {
  project: any;
  setSelectedProject: any;
  isDash: boolean;
};

const Project = ({
  project,
  setSelectedProject = (id: string) => console.log(id),
  isDash
} : IProjectProps ) => {
  // business logic
  const onProjectClick = () => {
    setSelectedProject(project.id);
    // TODO: open project page
  };

  const buttonJoin = (
    <button className="btn-indigo btn-sm py- px-2">Join</button>
  )
  const buttonAddProject = (
    <button className="btn-indigo btn-sm py- px-2">Add Project</button>
  )

  return (
    <div style={{ width: 250, height: 400 }} className={styleProject}>
      <h1 className="text-lg">{project.name}</h1>
      <Image src={logo} />
      <div onClick={() => onProjectClick()}>Level: {project.level}</div>
      <div>Members: 3</div>
      <div>Status: in progress</div>
      {isDash ?  buttonAddProject : buttonJoin}
    </div>
  );
};

export default Project;