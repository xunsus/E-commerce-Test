import React, { useEffect, useState, Component } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Input,
  Badge,
  PageHeader,
  Select,
  Divider,
  Alert,
} from "antd";
import { Link } from "react-router-dom";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  checkoutURL,
  orderSummaryURL,
  addCouponURL,
  addressListURL,
} from "../constants";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Ikq03KsojeFd5Ujk5QwtofclJr05LR1wfekqsyVC1PhqKPK8b5hMMd0JIsDbqjR68yf1pcvwguyj8Z9q4iQJRs000ozCshOTs"
);

class CouponForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      code: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const { code } = this.state;
    this.props.handleAddCoupon(e, code);
    this.setState({ code: "" });
  };

  render() {
    const { code } = this.state;
    return (
      <React.Fragment>
        <Form name="basic" onFinish={this.handleSubmit}>
          <Form.Item
            placeholder="Enter a coupon.."
            label="Coupon code"
            name="code"
            onChange={this.handleChange}
            value={code}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

export function CheckOut(props) {
  const [loading, setloading] = useState(false);
  const [list, setlist] = useState([]);
  const [error, seterror] = useState();
  const [total, settotal] = useState();
  const [coup, setcoup] = useState();
  const [billingAddresses, setbillingAddresses] = useState([]);
  const [shippingAddresses, setshippingAddresses] = useState([]);
  const [selectedShippingAddress, setselectedShippingAddress] = useState();
  const [selectedBillingAddress, setselectedBillingAddress] = useState();
  const [success, setsuccess] = useState(false);
  const [selected, setSelected] = useState();

  const stripe = useStripe();
  const elements = useElements();

  function handleGetDefaultAddress(addresses) {
    const filteredAddresses = addresses.filter((el) => el.default === true);
    if (filteredAddresses.length > 0) {
      return filteredAddresses[0].id;
    }
    return "";
  }

  function handleFetchBillingAddresses() {
    setloading(true);
    axios
      .get(addressListURL("B"))
      .then((res) => {
        setbillingAddresses(res.data);
        setselectedBillingAddress(handleGetDefaultAddress(res.data)),
          setloading(false);
      })
      .catch((err) => {
        seterror(err);
        setloading(false);
      });
  }

  function handleFetchShippingAddresses() {
    setloading(true);
    axios
      .get(addressListURL("S"))
      .then((res) => {
        setshippingAddresses(res.data),
          setselectedShippingAddress(handleGetDefaultAddress(res.data)),
          setloading(false);
      })
      .catch((err) => {
        seterror(err);
        setloading(false);
      });
  }

  function handleFetchOrder() {
    setloading(true);
    axios
      .get(orderSummaryURL)
      .then((res) => {
        setloading(false);
        setlist(res.data.order_items);
        settotal(res.data.total);
        setcoup(res.data.coupon);
      })
      .catch((err) => {
        if (err.response.status === 404) {
        } else {
          seterror(err);
          setloading(false);
        }
      });
  }

  function handleAddCoupon(e, code) {
    setloading(false);
    axios
      .post(addCouponURL, { code })
      .then((res) => {
        setloading(false);
        handleFetchOrder();
      })
      .catch((err) => {
        setloading(false);
        seterror(err);
      });
  }

  function handleSelectChange(e, { name, value }) {
    setSelected((current) => Object.assign({}, current, { [name]: value }));
  }

  async function submit(ev) {
    ev.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setloading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    stripe.createToken(cardElement).then((result) => {
      if (error) {
        seterror(error);
        setloading(false);
      } else {
        seterror(null);
        console.log(selectedBillingAddress);
        axios
          .post(checkoutURL, {
            stripeToken: result.token.id,
            selectedBillingAddress,
            selectedShippingAddress,
          })
          .then((res) => {
            setloading(false);
            setsuccess(true);
          })
          .catch((err) => {
            setloading(false);
            seterror(err);
          });
      }
    });
  }

  useEffect(() => {
    handleFetchOrder();
    handleFetchBillingAddresses();
    handleFetchShippingAddresses();
  }, []);

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {list.map((item, i) => {
            return (
              <Col span={8} key={i}>
                <Card title={item.item.title} bordered={false}>
                  <img src={item.item.image} width="100" height="100" />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      <br />
      <br />
      <h1>{total} $</h1>
      {coup && (
        <Badge.Ribbon text={coup.code}>
          <Card>${coup.amount}</Card>
        </Badge.Ribbon>
      )}
      <br />
      <br />
      <CouponForm handleAddCoupon={(e, code) => handleAddCoupon(e, code)} />
      <br />
      <PageHeader title="Select a billing address" />
      {billingAddresses.length > 0 ? (
        <Select style={{ width: 200 }} onChange={handleSelectChange}>
          {billingAddresses.map((b) => {
            return (
              <Select.Option
                key={b.id}
                value={b.id}
                name="selectedBillingAddress"
              >
                {" "}
                {`${b.street_address}, ${b.apartment_address}, ${b.country}`}{" "}
              </Select.Option>
            );
          })}
        </Select>
      ) : (
        <p>
          You need to <Link to="/profile">add a billing address</Link>
        </p>
      )}
      <PageHeader title="Select a shipping address" />
      {shippingAddresses.length > 0 ? (
        <Select style={{ width: 200 }} onChange={handleSelectChange}>
          {shippingAddresses.map((s) => {
            return (
              <Select.Option
                key={s.id}
                value={s.id}
                name="selectedShippingAddress"
              >
                {" "}
                {`${s.street_address}, ${s.apartment_address}, ${s.country}`}{" "}
              </Select.Option>
            );
          })}
        </Select>
      ) : (
        <p>
          You need to <Link to="/profile">add a shipping address</Link>
        </p>
      )}
      <Divider />

      {billingAddresses.length < 1 || shippingAddresses.length < 1 ? (
        <p>You need to add addresses before you can complete your purchase</p>
      ) : (
        <React.Fragment>
          <PageHeader title="Would you like to complete the purchase?" />

          {!success ? (
            <Row>
              <Col span={4}></Col>
              <Col span={12}>
                <Form>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </Form>
              </Col>
              <Col span={4}></Col>
            </Row>
          ) : (
            <div>
              <h2>
                You just bought a sweet spatula congrats this is the best
                decision of you're life
              </h2>
            </div>
          )}

          {success && (
            <Alert
              message="Your payment was successful"
              description="Go to your <b>profile</b> to see the order delivery status."
              type="success"
            />
          )}
          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            onClick={submit}
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </React.Fragment>
      )}

      <br />
    </>
  );
}

const WrappedForm = (props) => (
  <Elements stripe={stripePromise}>
    <CheckOut {...props} />
  </Elements>
);

export default WrappedForm;
