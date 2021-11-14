import Head from 'next/head'
import MembersView from '../src/components/MembersView/MembersView'

export default function Home() {
  return (
    <div>
      <MembersView/>  
      {/* adding this component here for testing purpose only.. it will be inside classroom people page 
      along with the navbar  */}
    </div>
  )
}

