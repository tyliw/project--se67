import { useState } from 'react';
import { OrderDetailInterface } from '../../interface/IOrderDetail';
import CruiseShipLogo from '../../../assets/cruise_ship_logo.jpg';
import MenuList from '../menu_list/MenuList';
import OrderList from '../order_list/OrderList';
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import './index.css';

const LayoutFoodService: React.FC = () => {
  const [selectMenu, setSelectMenu] = useState<OrderDetailInterface[]>([]);

  return (
    <div className="container">
      <header className="navbar">
        <div>
          <img src={CruiseShipLogo} className="cruise-ship-logo-logo" />
        </div>
        <div className="menu">
          <a href=""> <CgProfile size={35} /> </a>
          <a href="/cart"> <TiShoppingCart size={35} /> </a>
        </div>
      </header>

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
