import React from 'react'
import {Trip} from '../types'

type Props = {
    trips:Trip[]
}

const OriginPage:React.FC<Props>= (props) => {
  return <div>{`<OriginPage />`}</div>
  
}
export default OriginPage;