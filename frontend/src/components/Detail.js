import React, { useState, useEffect } from "react";
import { Form, Select, InputNumber, Button, Popconfirm } from "antd";
import { useHistory, Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  fetchPost,
  fetchPostsBySearch,
  AdditemtoCart,
  deletePost,
} from "../constants";
import { useParams } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

function Details() {
  const history = useHistory();
  const [ProductInfo, setProductInfo] = useState({
    _id: "",
    title: "",
    Overview: "",
    image: "",
    Price: "",
    Categories: [],
    Colors: [],
    Sizes: [],
  });
  const [RelatedProducts, setRelatedProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  const [postData, setPostData] = useState({
    id: id,
    Size: [],
    Color: [],
    Quantity: "",
  });

  useEffect(() => {
    fetchPost(id).then((response) => {
      setProductInfo(response.data);
    });
    fetchPostsBySearch({
      search: "none",
      Categories: ProductInfo?.Categories.join(","),
    }).then((response) => {
      setRelatedProducts(response.data.data);
    });
    setloading(false);
  }, []);

  function handleAddToCart(item) {
    setloading(true);
    let user = JSON.parse(localStorage.getItem("profile"))?.UserInfo._id;
    if (user) {
      AdditemtoCart(item, user);
    } else {
      if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", JSON.stringify([item]));
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...JSON.parse(localStorage.getItem("cart")), item])
        );
      }
    }
    setloading(false);
  }

  function confirm() {
    deletePost(id).then(history.push("/"));
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const recommendedPosts = RelatedProducts.filter(
    ({ _id }) => _id !== ProductInfo._id
  );

  return (
    <React.Fragment>
      <section className="sec-product-detail bg0 p-t-65 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-7 p-b-30">
              <div className="p-l-25 p-r-30 p-lr-0-lg">
                <div className="wrap-slick3 flex-sb flex-w">
                  <div className="wrap-slick3-dots"></div>
                  <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                  <OwlCarousel
                    className="slick3 gallery-lb"
                    items={1}
                    dots={false}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={2000}
                  >
                    <div className="item-slick3" data-thumb={ProductInfo.image}>
                      <div className="wrap-pic-w pos-relative">
                        <img src={ProductInfo.image} alt="IMG-PRODUCT" />

                        <a
                          className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                          href={ProductInfo.image}
                        >
                          <i className="fa fa-expand"></i>
                        </a>
                      </div>
                    </div>

                    <div className="item-slick3" data-thumb={ProductInfo.image}>
                      <div className="wrap-pic-w pos-relative">
                        <img src={ProductInfo.image} alt="IMG-PRODUCT" />

                        <a
                          className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                          href={ProductInfo.image}
                        >
                          <i className="fa fa-expand"></i>
                        </a>
                      </div>
                    </div>

                    <div className="item-slick3" data-thumb={ProductInfo.image}>
                      <div className="wrap-pic-w pos-relative">
                        <img src={ProductInfo.image} alt="IMG-PRODUCT" />

                        <a
                          className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                          href={ProductInfo.image}
                        >
                          <i className="fa fa-expand"></i>
                        </a>
                      </div>
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-5 p-b-30">
              <div className="p-r-50 p-t-5 p-lr-0-lg">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                  {ProductInfo.title}
                </h4>

                <span className="mtext-106 cl2">{ProductInfo.Price}$</span>

                <p className="stext-102 cl3 p-t-23">{ProductInfo.Overview}</p>

                <div className="p-t-33">
                  <Form
                    name="basic"
                    {...formItemLayout}
                    onFinish={() => handleAddToCart(postData)}
                  >
                    <Form.Item label="Sizes">
                      <Select
                        placeholder="Select Size"
                        onSelect={(value) =>
                          setPostData({ ...postData, Size: value })
                        }
                      >
                        {ProductInfo.Sizes.map((Size, index) => {
                          return (
                            <Select.Option key={index} value={Size} name={Size}>
                              {" "}
                              {Size}{" "}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Colors">
                      <Select
                        placeholder="Select Color"
                        onSelect={(value) =>
                          setPostData({ ...postData, Color: value })
                        }
                      >
                        {ProductInfo.Colors.map((Color, index) => {
                          return (
                            <Select.Option
                              key={index}
                              value={Color}
                              name={Color}
                            >
                              {Color}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>

                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-204 flex-w flex-m respon6-next">
                        <div className="flex-w m-r-20 m-tb-10">
                          <InputNumber
                            size="large"
                            min={1}
                            max={100000}
                            defaultValue={1}
                            onChange={(value) =>
                              setPostData({ ...postData, Quantity: value })
                            }
                          />
                        </div>

                        <button
                          htmltype="submit"
                          className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
                <Link
                  to={{
                    pathname: "/Add-Item",
                    state: { Edit: true },
                  }}
                >
                  <Button type="primary">Update</Button>
                </Link>
                <Popconfirm
                  title="Are you sure to delete this item?"
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="Cancel"
                >
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </Popconfirm>
                <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                  <div className="flex-m bor9 p-r-10 m-r-11">
                    <a
                      href="/"
                      className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                      data-tooltip="Add to Wishlist"
                    >
                      <i className="zmdi zmdi-favorite"></i>
                    </a>
                  </div>

                  <a
                    href="/"
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Facebook"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>

                  <a
                    href="/"
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Twitter"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>

                  <a
                    href="/"
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Google Plus"
                  >
                    <i className="fa fa-google-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bor10 m-t-50 p-t-43 p-b-40">
            <div className="tab01">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item p-b-10">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="/description"
                    role="tab"
                  >
                    Description
                  </a>
                </li>

                <li className="nav-item p-b-10">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="/information"
                    role="tab"
                  >
                    Additional information
                  </a>
                </li>

                <li className="nav-item p-b-10">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="/reviews"
                    role="tab"
                  >
                    Reviews (1)
                  </a>
                </li>
              </ul>

              <div className="tab-content p-t-43">
                <div
                  className="tab-pane fade show active"
                  id="description"
                  role="tabpanel"
                >
                  <div className="how-pos2 p-lr-15-md">
                    <p className="stext-102 cl6">
                      Aenean sit amet gravida nisi. Nam fermentum est felis,
                      quis feugiat nunc fringilla sit amet. Ut in blandit ipsum.
                      Quisque luctus dui at ante aliquet, in hendrerit lectus
                      interdum. Morbi elementum sapien rhoncus pretium maximus.
                      Nulla lectus enim, cursus et elementum sed, sodales vitae
                      eros. Ut ex quam, porta consequat interdum in, faucibus eu
                      velit. Quisque rhoncus ex ac libero varius molestie.
                      Aenean tempor sit amet orci nec iaculis. Cras sit amet
                      nulla libero. Curabitur dignissim, nunc nec laoreet
                      consequat, purus nunc porta lacus, vel efficitur tellus
                      augue in ipsum. Cras in arcu sed metus rutrum iaculis.
                      Nulla non tempor erat. Duis in egestas nunc.
                    </p>
                  </div>
                </div>

                <div className="tab-pane fade" id="information" role="tabpanel">
                  <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                      <ul className="p-lr-28 p-lr-15-sm">
                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">Weight</span>

                          <span className="stext-102 cl6 size-206">
                            0.79 kg
                          </span>
                        </li>

                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">
                            Dimensions
                          </span>

                          <span className="stext-102 cl6 size-206">
                            110 x 33 x 100 cm
                          </span>
                        </li>

                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">
                            Materials
                          </span>

                          <span className="stext-102 cl6 size-206">
                            60% cotton
                          </span>
                        </li>

                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">Color</span>

                          <span className="stext-102 cl6 size-206">
                            Black, Blue, Grey, Green, Red, White
                          </span>
                        </li>

                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">Size</span>

                          <span className="stext-102 cl6 size-206">
                            XL, L, M, S
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="reviews" role="tabpanel">
                  <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                      <div className="p-b-30 m-lr-15-sm">
                        <div className="flex-w flex-t p-b-68">
                          <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                            <img src="images/avatar-01.jpg" alt="AVATAR" />
                          </div>

                          <div className="size-207">
                            <div className="flex-w flex-sb-m p-b-17">
                              <span className="mtext-107 cl2 p-r-20">
                                Ariana Grande
                              </span>

                              <span className="fs-18 cl11">
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star-half"></i>
                              </span>
                            </div>

                            <p className="stext-102 cl6">
                              Quod autem in homine praestantissimum atque
                              optimum est, id deseruit. Apud ceteros autem
                              philosophos
                            </p>
                          </div>
                        </div>

                        <form className="w-full">
                          <h5 className="mtext-108 cl2 p-b-7">Add a review</h5>

                          <p className="stext-102 cl6">
                            Your email address will not be published. Required
                            fields are marked *
                          </p>

                          <div className="flex-w flex-m p-t-50 p-b-23">
                            <span className="stext-102 cl3 m-r-16">
                              Your Rating
                            </span>

                            <span className="wrap-rating fs-18 cl11 pointer">
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <input
                                className="dis-none"
                                type="number"
                                name="rating"
                              />
                            </span>
                          </div>

                          <div className="row p-b-25">
                            <div className="col-12 p-b-5">
                              <label className="stext-102 cl3" htmlFor="review">
                                Your review
                              </label>
                              <textarea
                                className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                                id="review"
                                name="review"
                              ></textarea>
                            </div>

                            <div className="col-sm-6 p-b-5">
                              <label className="stext-102 cl3" htmlFor="name">
                                Name
                              </label>
                              <input
                                className="size-111 bor8 stext-102 cl2 p-lr-20"
                                id="name"
                                type="text"
                                name="name"
                              />
                            </div>

                            <div className="col-sm-6 p-b-5">
                              <label className="stext-102 cl3" htmlFor="email">
                                Email
                              </label>
                              <input
                                className="size-111 bor8 stext-102 cl2 p-lr-20"
                                id="email"
                                type="text"
                                name="email"
                              />
                            </div>
                          </div>

                          <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
          <span className="stext-107 cl6 p-lr-25">SKU: JAK-01</span>

          <span className="stext-107 cl6 p-lr-25">Categories: Jacket, Men</span>
        </div>
      </section>

      <section className="sec-relate-product bg0 p-t-45 p-b-105">
        <div className="container">
          <div className="p-b-45">
            <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
          </div>

          <div className="wrap-slick2">
            <div className="slick2">
              {recommendedPosts.map((Product, index) => (
                <div
                  className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15"
                  key={index}
                >
                  <div className="block2">
                    <div className="block2-pic hov-img0">
                      <img src={Product.image} alt="IMG-PRODUCT" />

                      <a
                        href={`/${Product._id}`}
                        className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                      >
                        Quick View
                      </a>
                    </div>

                    <div className="block2-txt flex-w flex-t p-t-14">
                      <div className="block2-txt-child1 flex-col-l ">
                        <a
                          href={`/${Product._id}`}
                          className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                        >
                          {Product.title}
                        </a>

                        <span className="stext-105 cl3">{Product.Price}</span>
                      </div>

                      <div className="block2-txt-child2 flex-r p-t-3">
                        <a
                          href={`/${Product._id}`}
                          className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                        >
                          <img
                            className="icon-heart1 dis-block trans-04"
                            src="images/icons/icon-heart-01.png"
                            alt="ICON"
                          />
                          <img
                            className="icon-heart2 dis-block trans-04 ab-t-l"
                            src="images/icons/icon-heart-02.png"
                            alt="ICON"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Details;
