import React from 'react'
import PlayersList from '../components/PlayersList'

const Lobby = () => {
  return (
    <>
        <h1 style={{ textAlign: 'center' }}>Choose an online player to send him a drawing or wait for an invitation</h1>
        <PlayersList />
    </>
  )
}

export default Lobby