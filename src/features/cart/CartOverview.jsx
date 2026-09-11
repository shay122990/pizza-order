import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectTotal, selectQuantity } from './cartSelectors';

function CartOverview() {
  const total = useSelector(selectTotal);
  const quantity = useSelector(selectQuantity);

  if (!total) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{quantity} pizzas</span>
        <span>$ {total}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
