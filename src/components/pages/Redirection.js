import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
function Redirection(props) {
  const url = useParams()
  useEffect(() => {
    console.log(url)
    if (url.url == 1) {
      window.location.href = 'http://exchange.mglcoin.io'
    }
  }, [])
  return (
    <div className='fixed h-full w-full text-center item-center'>
      <span className='text-xl absolute '>Loading...</span>
    </div>
  )
}

export default Redirection
