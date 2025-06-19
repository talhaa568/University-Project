import React, { useState } from 'react'
import Sidnav from './Sidnav'
import Logicgates from './Logicgates'
import CustomDropdown from './CustomDropdown'

function Home() {
  const [is_select,Setis_select]=useState();
  return (
    <>
    <Sidnav is_select={is_select} Setis_select={Setis_select}/>
    <Logicgates is_select={is_select} Setis_select={Setis_select}/>
     
    </>
  )
}

export default Home
