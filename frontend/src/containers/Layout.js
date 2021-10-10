import React, { useState, useEffect } from "react";
import { Layout, Avatar, Dropdown, Menu, Button, Drawer } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { logout, fetchPost, fetchCart } from "../constants";

const { Content } = Layout;

function CustomLayout(props) {
  const [loading, setloading] = useState(true);
  const history = useHistory();
  const [Visible, setVisible] = useState(false);
  const [cart, setcart] = useState([]);
  const [CartVar, setCartVar] = useState([]);
  const [rerender, setrerender] = useState(false);

  var storage = JSON.parse(localStorage.getItem("cart"));
  var tots = 0;

  const ShowDrawer = () => {
    setVisible(!Visible);
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("profile"))?.UserInfo._id;
    if (user) {
      fetchCart(user).then((response) => {
        for (let i = 0; i <= response.data.length - 1; i++) {
          setCartVar((CartVar) => [...CartVar, response.data[i]]);
          fetchPost(response.data[i].id).then((response) => {
            setcart((cart) => [...cart, response.data]);
          });
        }
      });
    } else {
      if (localStorage.getItem("cart") !== null) {
        for (let i = 0; i <= storage.length - 1; i++) {
          fetchPost(storage[i].id).then((response) => {
            setcart((cart) => [...cart, response.data]);
          });
        }
      }
    }
    setloading(false);
  }, []);

  const count = (Quantity, Price) => {
    tots += Quantity * Price;
  };

  const handleaddQuantity = (id) => {
    let temp = JSON.parse(localStorage.getItem("cart"));
    temp[id].Quantity += 1;
    localStorage.setItem("cart", JSON.stringify(temp));
    setrerender(!rerender);
  };

  const handledecreseQuantity = (id) => {
    let temp = JSON.parse(localStorage.getItem("cart"));
    if (temp[id].Quantity > 1) {
      temp[id].Quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(temp));
    } else {
      let newtemp = temp.filter((item) => item.id !== temp[id].id);
      console.log(newtemp);
      localStorage.setItem("cart", JSON.stringify(newtemp));
    }
    setrerender(!rerender);
  };

  const handleLogout = async () => {
    try {
      let refreshToken = JSON.parse(
        localStorage.getItem("profile")
      ).refreshToken;
      localStorage.clear();
      await logout({ refreshToken });
      history.push("/");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Layout className="layout">
      <Drawer placement="right" size={"large"} visible={Visible}>
        <br />
        <div>
          <div className="s-full js-hide-cart"></div>

          <div className="header-cart-title flex-w flex-sb-m p-b-8">
            <span className="mtext-103 cl2">Your Cart</span>

            <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
              <i className="zmdi zmdi-close"></i>
            </div>
          </div>

          <div className="header-cart-content flex-w js-pscroll">
            <ul className="header-cart-wrapitem w-full">
              {localStorage.getItem("profile") ? (
                <React.Fragment>
                  {cart.length === 1 ? (
                    <li className="header-cart-item flex-w flex-t m-b-12">
                      <div className="header-cart-item-img">
                        <img src={cart[0].image} alt="IMG" />
                      </div>

                      <div className="header-cart-item-txt p-t-8">
                        <a
                          href="#"
                          className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                        >
                          {cart[0].title}
                        </a>

                        <span className="header-cart-item-info">
                          {storage[0].Quantity} x {cart[0].Price}$
                        </span>
                      </div>
                      <Button
                        icon={<PlusCircleOutlined />}
                        shape="round"
                        type="link"
                        onClick={() => handleaddQuantity()}
                      ></Button>

                      <Button
                        icon={<MinusCircleOutlined />}
                        shape="round"
                        type="link"
                        onClick={() => handledecreseQuantity()}
                      ></Button>
                    </li>
                  ) : null}
                  {cart.length > 1
                    ? cart.map((order_item, index) => {
                        return (
                          <li
                            key={index}
                            className="header-cart-item flex-w flex-t m-b-12"
                          >
                            <div className="header-cart-item-img">
                              <img src={order_item.image} alt="IMG" />
                            </div>
                            <div className="header-cart-item-txt p-t-8">
                              <a
                                href="#"
                                className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                              >
                                {order_item.title}
                              </a>

                              <span className="header-cart-item-info">
                                {CartVar[index].Quantity} x {order_item.Price}$
                              </span>
                            </div>
                            <Button
                              icon={<PlusCircleOutlined />}
                              shape="round"
                              type="link"
                              onClick={() => handleaddQuantity(index)}
                            ></Button>

                            <Button
                              icon={<MinusCircleOutlined />}
                              shape="round"
                              type="link"
                              onClick={() => handledecreseQuantity(index)}
                            ></Button>

                            {count(CartVar[index].Quantity, order_item.Price)}
                          </li>
                        );
                      })
                    : null}
                  {cart.length < 1 ? <h3>No items in your cart</h3> : null}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {cart.length === 1 ? (
                    <li className="header-cart-item flex-w flex-t m-b-12">
                      <div className="header-cart-item-img">
                        <img src={cart[0].image} alt="IMG" />
                      </div>

                      <div className="header-cart-item-txt p-t-8">
                        <a
                          href="#"
                          className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                        >
                          {cart[0].title}
                        </a>

                        <span className="header-cart-item-info">
                          {storage[0].Quantity} x {cart[0].Price}$
                        </span>
                      </div>
                      <Button
                        icon={<PlusCircleOutlined />}
                        shape="round"
                        type="link"
                        onClick={() => handleaddQuantity()}
                      ></Button>

                      <Button
                        icon={<MinusCircleOutlined />}
                        shape="round"
                        type="link"
                        onClick={() => handledecreseQuantity()}
                      ></Button>
                    </li>
                  ) : null}
                  {cart.length > 1
                    ? cart.map((order_item, index) => {
                        return (
                          <li
                            key={index}
                            className="header-cart-item flex-w flex-t m-b-12"
                          >
                            <div className="header-cart-item-img">
                              <img src={order_item.image} alt="IMG" />
                            </div>
                            <div className="header-cart-item-txt p-t-8">
                              <a
                                href="#"
                                className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                              >
                                {order_item.title}
                              </a>

                              <span className="header-cart-item-info">
                                {storage[index].Quantity} x {order_item.Price}$
                              </span>
                            </div>
                            <Button
                              icon={<PlusCircleOutlined />}
                              shape="round"
                              type="link"
                              onClick={() => handleaddQuantity(index)}
                            ></Button>

                            <Button
                              icon={<MinusCircleOutlined />}
                              shape="round"
                              type="link"
                              onClick={() => handledecreseQuantity(index)}
                            ></Button>

                            {count(storage[index].Quantity, order_item.Price)}
                          </li>
                        );
                      })
                    : null}
                  {cart.length < 1 ? <h3>No items in your cart</h3> : null}
                </React.Fragment>
              )}
            </ul>

            <div className="w-full">
              <div className="header-cart-total w-full p-tb-40">
                Total: ${tots}
              </div>

              <div className="header-cart-buttons flex-w w-full">
                <a
                  href="shoping-cart.html"
                  className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
                >
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      <div>
        <header>
          <div className="container-menu-desktop fix-menu-desktop">
            <div className="wrap-menu-desktop">
              <nav className="limiter-menu-desktop container">
                <a href="/Add-Item" className="logo">
                  <img src="" alt="IMG-LOGO" />
                </a>

                <div className="menu-desktop">
                  <ul className="main-menu">
                    <li className="active-menu">
                      <a href="/">Home</a>
                    </li>

                    <li>
                      <a href="/signup">Shop</a>
                    </li>

                    <li className="label1" data-label1="hot">
                      <a href="shoping-cart.html">Features</a>
                    </li>

                    <li>
                      <a href="blog.html">Blog</a>
                    </li>

                    <li>
                      <a href="about.html">About</a>
                    </li>

                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                  </ul>
                </div>

                <div className="wrap-icon-header flex-w flex-r-m">
                  <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                    <i className="zmdi zmdi-search"></i>
                  </div>

                  <div
                    className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                    data-notify="2"
                  >
                    <Button onClick={ShowDrawer}>
                      <i className="zmdi zmdi-shopping-cart"></i>
                    </Button>
                  </div>

                  <Button onClick={handleLogout}>Log Out</Button>
                  <a
                    href="/Add-Item"
                    className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                    data-notify="0"
                  >
                    <i className="zmdi zmdi-favorite-outline"></i>
                  </a>
                </div>
              </nav>
            </div>
          </div>

          <div className="wrap-header-mobile">
            <div className="logo-mobile">
              <a href="index.html">
                <img src="" alt="IMG-LOGO" />
              </a>
            </div>

            <div className="wrap-icon-header flex-w flex-r-m m-r-15">
              <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
                <i className="zmdi zmdi-search"></i>
              </div>

              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
                data-notify="2"
              >
                <i className="zmdi zmdi-shopping-cart"></i>
              </div>

              <a
                href="/Add-Item"
                className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
                data-notify="0"
              >
                <i className="zmdi zmdi-favorite-outline"></i>
              </a>
            </div>

            <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </div>
          </div>

          <div className="menu-mobile">
            <ul className="main-menu-m">
              <li>
                <a href="/">Home</a>

                <span className="arrow-main-menu-m">
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </span>
              </li>

              <li>
                <a href="/signup">Shop</a>
              </li>

              <Button onClick={handleLogout}>Log Out</Button>

              <li>
                <a
                  href="shoping-cart.html"
                  className="label1 rs1"
                  data-label1="hot"
                >
                  Features
                </a>
              </li>

              <li>
                <a href="blog.html">Blog</a>
              </li>

              <li>
                <a href="about.html">About</a>
              </li>

              <li>
                <a href="contact.html">Contact</a>
              </li>
            </ul>
          </div>

          <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
            <div className="container-search-header">
              <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
                <img src="" alt="CLOSE" />
              </button>

              <form className="wrap-search-header flex-w p-l-15">
                <button className="flex-c-m trans-04">
                  <i className="zmdi zmdi-search"></i>
                </button>
                <input
                  className="plh3"
                  type="text"
                  name="search"
                  placeholder="Search..."
                />
              </form>
            </div>
          </div>
        </header>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Content>
        <div>{props.children}</div>
      </Content>
      <footer className="bg3 p-t-75 p-b-32">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Categories</h4>

              <ul>
                <li className="p-b-10">
                  <a
                    href="/Add-Item"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Women
                  </a>
                </li>

                <li className="p-b-10">
                  <a
                    href="/Add-Item"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Men
                  </a>
                </li>

                <li className="p-b-10">
                  <a
                    href="/Add-Item"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Shoes
                  </a>
                </li>

                <li className="p-b-10">
                  <a
                    href="/Add-Item"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Watches
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Help</h4>

              <ul>
                <li className="p-b-10">
                  <a
                    href="/Add-Item"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Track Order
                  </a>
                </li>

                <li className="p-b-10">
                  <a
                    href="/Add-Item"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Returns
                  </a>
                </li>

                <li className="p-b-10">
                  <a
                    href="/Add-Item"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Shipping
                  </a>
                </li>

                <li className="p-b-10">
                  <a
                    href="/Add-Item"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">GET IN TOUCH</h4>

              <p className="stext-107 cl7 size-201">
                Any questions? Let us know in store at 8th floor, 379 Hudson St,
                New York, NY 10018 or call us on (+1) 96 716 6879
              </p>

              <div className="p-t-27">
                <a
                  href="/Add-Item"
                  className="fs-18 cl7 hov-cl1 trans-04 m-r-16"
                >
                  <i className="fa fa-facebook"></i>
                </a>

                <a
                  href="/Add-Item"
                  className="fs-18 cl7 hov-cl1 trans-04 m-r-16"
                >
                  <i className="fa fa-instagram"></i>
                </a>

                <a
                  href="/Add-Item"
                  className="fs-18 cl7 hov-cl1 trans-04 m-r-16"
                >
                  <i className="fa fa-pinterest-p"></i>
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Newsletter</h4>

              <form>
                <div className="wrap-input1 w-full p-b-4">
                  <input
                    className="input1 bg-none plh1 stext-107 cl7"
                    type="text"
                    name="email"
                    placeholder="email@example.com"
                  />
                  <div className="focus-input1 trans-04"></div>
                </div>

                <div className="p-t-18">
                  <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="p-t-40">
            <div className="flex-c-m flex-w p-b-18">
              <a href="/Add-Item" className="m-all-1">
                <img src="" alt="ICON-PAY" />
              </a>

              <a href="/Add-Item" className="m-all-1">
                <img src="" alt="ICON-PAY" />
              </a>

              <a href="/Add-Item" className="m-all-1">
                <img src="" alt="ICON-PAY" />
              </a>

              <a href="/Add-Item" className="m-all-1">
                <img src="" alt="ICON-PAY" />
              </a>

              <a href="/Add-Item" className="m-all-1">
                <img src="" alt="ICON-PAY" />
              </a>
            </div>

            <p className="stext-107 cl6 txt-center">
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script> All
              rights reserved | Made with{" "}
              <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
              <a href="https://colorlib.com" target="/">
                Colorlib
              </a>{" "}
              &amp; distributed by{" "}
              <a href="https://themewagon.com" target="/">
                ThemeWagon
              </a>
            </p>
          </div>
        </div>
      </footer>

      <div className="btn-back-to-top" id="myBtn">
        <span className="symbol-btn-back-to-top">
          <i className="zmdi zmdi-chevron-up"></i>
        </span>
      </div>

      <div className="wrap-modal1 js-modal1 p-t-60 p-b-20">
        <div className="overlay-modal1 js-hide-modal1"></div>

        <div className="container">
          <div className="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
            <button className="how-pos3 hov3 trans-04 js-hide-modal1">
              <img src="" alt="CLOSE" />
            </button>

            <div className="row">
              <div className="col-md-6 col-lg-7 p-b-30">
                <div className="p-l-25 p-r-30 p-lr-0-lg">
                  <div className="wrap-slick3 flex-sb flex-w">
                    <div className="wrap-slick3-dots"></div>
                    <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                    <div className="slick3 gallery-lb">
                      <div
                        className="item-slick3"
                        data-thumb="images/product-detail-01.jpg"
                      >
                        <div className="wrap-pic-w pos-relative">
                          <img src="" alt="IMG-PRODUCT" />

                          <a
                            className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                            href="images/product-detail-01.jpg"
                          >
                            <i className="fa fa-expand"></i>
                          </a>
                        </div>
                      </div>

                      <div
                        className="item-slick3"
                        data-thumb="images/product-detail-02.jpg"
                      >
                        <div className="wrap-pic-w pos-relative">
                          <img src="" alt="IMG-PRODUCT" />

                          <a
                            className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                            href="images/product-detail-02.jpg"
                          >
                            <i className="fa fa-expand"></i>
                          </a>
                        </div>
                      </div>

                      <div
                        className="item-slick3"
                        data-thumb="images/product-detail-03.jpg"
                      >
                        <div className="wrap-pic-w pos-relative">
                          <img src="" alt="IMG-PRODUCT" />

                          <a
                            className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                            href="images/product-detail-03.jpg"
                          >
                            <i className="fa fa-expand"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-5 p-b-30">
                <div className="p-r-50 p-t-5 p-lr-0-lg">
                  <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                    Lightweight Jacket
                  </h4>

                  <span className="mtext-106 cl2">$58.79</span>

                  <p className="stext-102 cl3 p-t-23">
                    Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus
                    ligula. Mauris consequat ornare feugiat.
                  </p>

                  <div className="p-t-33">
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">Size</div>

                      <div className="size-204 respon6-next">
                        <div className="rs1-select2 bor8 bg0">
                          <select className="js-select2" name="time">
                            <option>Choose an option</option>
                            <option>Size S</option>
                            <option>Size M</option>
                            <option>Size L</option>
                            <option>Size XL</option>
                          </select>
                          <div className="dropDownSelect2"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">Color</div>

                      <div className="size-204 respon6-next">
                        <div className="rs1-select2 bor8 bg0">
                          <select className="js-select2" name="time">
                            <option>Choose an option</option>
                            <option>Red</option>
                            <option>Blue</option>
                            <option>White</option>
                            <option>Grey</option>
                          </select>
                          <div className="dropDownSelect2"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-204 flex-w flex-m respon6-next">
                        <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                          <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                            <i className="fs-16 zmdi zmdi-minus"></i>
                          </div>

                          <input
                            className="mtext-104 cl3 txt-center num-product"
                            type="number"
                            name="num-product"
                          />

                          <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                            <i className="fs-16 zmdi zmdi-plus"></i>
                          </div>
                        </div>

                        <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                    <div className="flex-m bor9 p-r-10 m-r-11">
                      <a
                        href="/Add-Item"
                        className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                        data-tooltip="Add to Wishlist"
                      >
                        <i className="zmdi zmdi-favorite"></i>
                      </a>
                    </div>

                    <a
                      href="/Add-Item"
                      className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                      data-tooltip="Facebook"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>

                    <a
                      href="/Add-Item"
                      className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                      data-tooltip="Twitter"
                    >
                      <i className="fa fa-twitter"></i>
                    </a>

                    <a
                      href="/Add-Item"
                      className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                      data-tooltip="Google Plus"
                    >
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default CustomLayout;
