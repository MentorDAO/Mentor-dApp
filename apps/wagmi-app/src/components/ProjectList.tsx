/*
  Client List component
 */

  import React, { useState } from 'react';
  import Project from './Project';
  
  const ProjectsList = ({ data, isDash, setSelectedProject, setModal } : any) => {
    return (
      <>
        <div className='flex'
          style={{ justifyContent: 'space-around'}}
          >
          {data.length &&
              data
                .map((item:any, index:any) => (
                  <Project
                    isDash={isDash}
                    setModal={setModal}
                    key={index}
                    item={item}
                    setSelectedProject={setSelectedProject}
                  />
                ))}
        </div>
      </>
    );
  };
  
  export default ProjectsList;
  