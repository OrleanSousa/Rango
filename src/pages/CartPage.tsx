import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Header from '../components/Header'

function CartPage() {
  return (
    <div className="container flex flex-col justify-center  items-center  bg-gray-100 relative">
        <Header/>
        <Cart/>
        <Footer/>
    </div>
  )
}

export default CartPage