import { useState } from 'react';
import { OrderDetailInterface } from '../../interface/IOrderDetail';
import MenuList from '../menu_list/MenuList';
import OrderList from '../order_list/OrderList';
import './index.css';

const LayoutFoodService: React.FC = () => {
  const [selectMenu, setSelectMenu] = useState<OrderDetailInterface[]>([]);

  // useEffect(() => {
  //   // Clear selectMenu when the component is mounted or refreshed
  //   setSelectMenu([]);

  //   // Optionally, if you need to clear `selectMenu` when navigating away from the page
  //   return () => {
  //     setSelectMenu([]);
  //   };
  // }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="container">
      <section className="menu-category"></section>

      <section className="content">
        <div className="menu-list">
          <MenuList setSelectMenu={setSelectMenu} />
        </div>
        <aside>
          <div className="order-list">
            <OrderList selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
          </div>
        </aside>
      </section>
    </div>
  );
};

export default LayoutFoodService;
