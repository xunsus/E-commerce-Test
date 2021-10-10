import React, { useState, useEffect } from "react";
import { fetchPosts, fetchimages } from "../constants";
import { Button, Drawer } from "antd";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Mainpage() {
  const [loading, setloading] = useState(true);
  /*   const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(0); */
  const [Products, setProducts] = useState([]);
  const [mainimages, setmainimages] = useState([]);

  const getproducts = () => {
    fetchPosts().then((response) => {
      setProducts(response.data.data);
    });
  };

  const getmainimages = () => {
    fetchimages().then((response) => {
      setmainimages(response.data[0]);
      setloading(false);
    });
  };

  useEffect(() => {
    getproducts();
    getmainimages();
  }, []);

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
    <React.Fragment>
      <section className="section-slide">
        <div className="wrap-slick1">
          <OwlCarousel className="slick1" items={1} dots={false}>
            <div
              className="item-slick1"
              style={{ backgroundImage: `url(${mainimages.image1})` }}
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="fadeInDown"
                    data-delay="0"
                  >
                    <span className="ltext-101 cl2 respon2">
                      Women Collection 2018
                    </span>
                  </div>

                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="fadeInUp"
                    data-delay="800"
                  >
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                      NEW SEASON
                    </h2>
                  </div>

                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="zoomIn"
                    data-delay="1600"
                  >
                    <a
                      href="product.html"
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="item-slick1"
              style={{ backgroundImage: `url(${mainimages.image2})` }}
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="rollIn"
                    data-delay="0"
                  >
                    <span className="ltext-101 cl2 respon2">
                      Men New-Season
                    </span>
                  </div>

                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="lightSpeedIn"
                    data-delay="800"
                  >
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                      Jackets & Coats
                    </h2>
                  </div>

                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="slideInUp"
                    data-delay="1600"
                  >
                    <a
                      href="product.html"
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="item-slick1"
              style={{ backgroundImage: `url(${mainimages.image3})` }}
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="rotateInDownLeft"
                    data-delay="0"
                  >
                    <span className="ltext-101 cl2 respon2">
                      Men Collection 2018
                    </span>
                  </div>

                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="rotateInUpRight"
                    data-delay="800"
                  >
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                      New arrivals
                    </h2>
                  </div>

                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="rotateIn"
                    data-delay="1600"
                  >
                    <a
                      href="product.html"
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </section>

      <div className="sec-banner bg0 p-t-80 p-b-50">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src={mainimages.image2} alt="IMG-BANNER" />

                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Women
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      Spring 2018
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src={mainimages.image4} alt="IMG-BANNER" />

                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span
                      className="block1-name ltext-102 trans-04 p-b-8"
                      style={{ color: "white" }}
                    >
                      Men
                    </span>

                    <span
                      className="block1-info stext-102 trans-04"
                      style={{ color: "white" }}
                    >
                      Spring 2018
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src={mainimages.image5} alt="IMG-BANNER" />

                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Accessories
                    </span>

                    <span
                      className="block1-info stext-102 trans-04"
                      style={{ color: "white" }}
                    >
                      New Trend
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">Product Overview</h3>
          </div>

          <div className="flex-w flex-sb-m p-b-52">
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
                data-filter="*"
              >
                All Products
              </button>

              <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                data-filter=".women"
              >
                Women
              </button>

              <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                data-filter=".men"
              >
                Men
              </button>

              <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                data-filter=".bag"
              >
                Bag
              </button>

              <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                data-filter=".shoes"
              >
                Shoes
              </button>

              <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                data-filter=".watches"
              >
                Watches
              </button>
            </div>

            <div className="flex-w flex-c-m m-tb-10">
              <div className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
                <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                Filter
              </div>

              <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                Search
              </div>
            </div>

            <div className="dis-none panel-search w-full p-t-10 p-b-15">
              <div className="bor8 dis-flex p-l-15">
                <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                  <i className="zmdi zmdi-search"></i>
                </button>

                <input
                  className="mtext-107 cl2 size-114 plh2 p-r-15"
                  type="text"
                  name="search-product"
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="dis-none panel-filter w-full p-t-10">
              <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                <div className="filter-col1 p-r-15 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">Sort By</div>

                  <ul>
                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        Default
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        Popularity
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        Average rating
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a
                        href="/"
                        className="filter-link stext-106 trans-04 filter-link-active"
                      >
                        Newness
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        Price: Low to High
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        Price: High to Low
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="filter-col2 p-r-15 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">Price</div>

                  <ul>
                    <li className="p-b-6">
                      <a
                        href="/"
                        className="filter-link stext-106 trans-04 filter-link-active"
                      >
                        All
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        $0.00 - $50.00
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        $50.00 - $100.00
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        $100.00 - $150.00
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        $150.00 - $200.00
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="/" className="filter-link stext-106 trans-04">
                        $200.00+
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="filter-col3 p-r-15 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">Color</div>

                  <ul>
                    <li className="p-b-6">
                      <span
                        className="fs-15 lh-12 m-r-6"
                        style={{ color: "/222" }}
                      >
                        <i className="zmdi zmdi-circle"></i>
                      </span>

                      <a href="/" className="filter-link stext-106 trans-04">
                        Black
                      </a>
                    </li>

                    <li className="p-b-6">
                      <span
                        className="fs-15 lh-12 m-r-6"
                        style={{ color: "/4272d7" }}
                      >
                        <i className="zmdi zmdi-circle"></i>
                      </span>

                      <a
                        href="/"
                        className="filter-link stext-106 trans-04 filter-link-active"
                      >
                        Blue
                      </a>
                    </li>

                    <li className="p-b-6">
                      <span
                        className="fs-15 lh-12 m-r-6"
                        style={{ color: "/b3b3b3" }}
                      >
                        <i className="zmdi zmdi-circle"></i>
                      </span>

                      <a href="/" className="filter-link stext-106 trans-04">
                        Grey
                      </a>
                    </li>

                    <li className="p-b-6">
                      <span
                        className="fs-15 lh-12 m-r-6"
                        style={{ color: "/00ad5f" }}
                      >
                        <i className="zmdi zmdi-circle"></i>
                      </span>

                      <a href="/" className="filter-link stext-106 trans-04">
                        Green
                      </a>
                    </li>

                    <li className="p-b-6">
                      <span
                        className="fs-15 lh-12 m-r-6"
                        style={{ color: "/fa4251" }}
                      >
                        <i className="zmdi zmdi-circle"></i>
                      </span>

                      <a href="/" className="filter-link stext-106 trans-04">
                        Red
                      </a>
                    </li>

                    <li className="p-b-6">
                      <span
                        className="fs-15 lh-12 m-r-6"
                        style={{ color: "/aaa" }}
                      >
                        <i className="zmdi zmdi-circle-o"></i>
                      </span>

                      <a href="/" className="filter-link stext-106 trans-04">
                        White
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="filter-col4 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">Tags</div>

                  <div className="flex-w p-t-4 m-r--5">
                    <a
                      href="/"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Fashion
                    </a>

                    <a
                      href="/"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Lifestyle
                    </a>

                    <a
                      href="/"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Denim
                    </a>

                    <a
                      href="/"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Streetstyle
                    </a>

                    <a
                      href="/"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Crafts
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row isotope-grid">
            {Products.map((Product, index) => {
              return (
                <div
                  className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
                  key={index}
                >
                  <div className="block2">
                    <div className="block2-pic hov-img0">
                      <img src={Product.image} alt="IMG-PRODUCT" />

                      <a
                        href={`/post/${Product._id}`}
                        className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                      >
                        View
                      </a>
                    </div>

                    <div className="block2-txt flex-w flex-t p-t-14">
                      <div className="block2-txt-child1 flex-col-l ">
                        <a
                          href="product-detail.html"
                          className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                        >
                          {Product.title}
                        </a>

                        <span className="stext-105 cl3">{Product.Price} $</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex-c-m flex-w w-full p-t-45">
            <a
              href="/"
              className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            >
              Load More
            </a>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export default Mainpage;
