import Header from '../components/Header'
import SingleItem from '../components/SingleItem'

function ItemMenu() {
  return (
      <div className='container flex flex-col justify-center  bg-gray-100 relative'>
        <Header/>
        <SingleItem/>
    </div>
  )
}

export default ItemMenu