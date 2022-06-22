import React from 'react'
import AddListModal from '../components/AddListModal'
import Lists from '../components/Lists'

const Home = () => {
  return (
    <div>
      <AddListModal />
        <Lists />
    </div>
  )
}

export default Home