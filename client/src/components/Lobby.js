import React from 'react'
import Nav from './Nav'
import ShowStatus from '../containers/ShowStatus'

const Lobby = () => (
  <div className='background stretch'>
		<Nav
			title={`${APP_NAME}`} />
		<div style={{
			paddingLeft: 10,
			paddingRight: 10
			}}>
  		<ShowStatus />
		</div>
  </div>
)

export default Lobby
