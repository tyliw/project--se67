import { useEffect, useState } from "react";
import { MenuInterface } from "../../interface/IMenu";
import { OrderDetailInterface } from "../../interface/IOrderDetail";
import { GetMenu } from "../../service/https/MenuAPI";
import { message } from "antd";
import { FaStar } from "react-icons/fa";
import "./index.css"

interface MenuListProps {
  setSelectMenu: React.Dispatch<React.SetStateAction<OrderDetailInterface[]>>;
}

const MenuList: React.FC<MenuListProps> = ({ setSelectMenu }) => {
  const [menu, setMenu] = useState<MenuInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const getMenus = async () => {
    const res = await GetMenu();
    if (res.status === 200) {
      setMenu(res.data);
    } else {
      setMenu([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const handleSelectMenu = (menu: MenuInterface) => {
    setSelectMenu((prev) => {
      const existingMenu = prev.find((item) => item.MenuID === menu.ID);
      if (existingMenu) {
        return prev.map((item) =>
          item.MenuID === menu.ID
            ? {
                ...item,
                Quantity: item.Quantity + 1,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            Quantity: 1,
            Amount: menu.Price,
            MenuID: menu.ID!,
            Menu: menu,
            OrderID: 0,
          },
        ];
      }
    });
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <>
      {contextHolder}
      {menu.length > 0 ? (
        menu.map((item) => (
          <div key={item.ID} className="menu-item">
            <img
              src={item.ImageMenu}
              alt={item.MenuName}
              className="menu-item-image"
            />
            <div className="menu-item-info">
              <div className="info">
                <h1>{item.MenuName}</h1>
                <p>{item.Description}</p>
              </div>
              <div className="footer">
                <div className="rating">
                  <FaStar color="FFC107" size={25} />
                  <h1 style={{ marginTop: 0}}> 5.0</h1>
                </div>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    // justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                    bottom: "0",
                    margin: 0,
                  }}
                >
                  <h1> ฿ {item.Price.toFixed(2)}</h1>
                  <button
                    className="add-order-button"
                    onClick={() => handleSelectMenu(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No menu items available.</p>
      )}
    </>
  );
};

export default MenuList;
