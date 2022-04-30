import React from 'react'
import moment from 'moment'

const GameSession = ({timeCounter, score}) => {
  return (
    <div className='game-session'>
        <h3>Total Time:
            <span> { moment
          .utc(
            moment.duration(timeCounter, 'seconds').as('milliseconds')
          )
          .format('HH:mm:ss') }</span>
        </h3>
        <h3>Total Points:
            <span> { score }</span>
        </h3>
    </div>
  )
}

export default GameSession