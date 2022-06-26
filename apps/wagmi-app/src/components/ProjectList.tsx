/*
  Client List component
 */

  import React, { useState } from 'react';
  import Project from './Project';
  
  const ProjectsList = ({ data, isDash } : any) => {
    const [selectedProjectId, setSelectedProject] = useState(null);
    console.log(selectedProjectId)
    return (
      <>
        <div className='flex'
          style={{ justifyContent: 'center'}}
          >
          {data.length &&
              data
                .map((project:any, index:any) => (
                  <Project
                    isDash={isDash}
                    key={index}
                    project={project}
                    setSelectedProject={setSelectedProject}
                  />
                ))}
        </div>
      </>
    );
  };
  
  export default ProjectsList;
  