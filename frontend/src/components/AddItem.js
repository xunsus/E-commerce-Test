import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Row,
  Col,
  Modal,
} from "antd";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import FileBase from "react-file-base64";
import {
  createPost,
  fetchCategories,
  AddCategory,
  fetchColors,
  fetchSizes,
  AddColor,
  AddSize,
  fetchPost,
} from "../constants";

export default function AddItem() {
  let Location = useLocation();
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: "",
    Overview: "",
    image: "",
    Price: "",
    Categories: "",
    Sizes: [],
    Colors: [],
  });
  const [loading, setloading] = useState(true);
  const [NewCategory, setNewCategory] = useState({ name: "" });
  const [NewColor, setNewColor] = useState({ name: "" });
  const [NewSize, setNewSize] = useState({ name: "" });
  const [visibleColor, setvisibleColor] = useState(false);
  const [visibleCategory, setvisibleCategory] = useState(false);
  const [visibleSize, setvisibleSize] = useState(false);
  const [Category, setCategory] = useState([]);
  const [Color, setColor] = useState([]);
  const [Size, setSize] = useState([]);
  const [user, setuser] = useState({});

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("profile"))) {
      setuser(JSON.parse(localStorage.getItem("profile")).UserInfo);
      fetchCategories().then((response) => {
        setCategory(response.data);
      });
      fetchColors().then((response) => {
        setColor(response.data);
      });
      fetchSizes().then((response) => {
        setSize(response.data);
      });
      if (Location.state) {
        fetchPost(id).then((response) => {
          setPostData(response.data);
        });
      }

      setloading(false);
    } else {
      alert("not authorized");
    }
  }, []);

  const AddNewCategory = () => {
    AddCategory(NewCategory, user);
    setvisibleCategory(false);
  };

  const AddNewColor = () => {
    AddColor(NewColor, user);
    setvisibleColor(false);
  };

  const AddNewSize = () => {
    AddSize(NewSize, user);
    setvisibleSize(false);
  };

  const handleSubmit = () => {
    try {
      createPost(postData, user);
    } catch (error) {
      console.log(error);
    }
  };

  const { Option } = Select;
  const { TextArea } = Input;

  const categories = [];
  const Categorynames = [];
  const sizes = [];
  const Sizenames = [];
  const colors = [];
  const Colornames = [];

  Category.map((Cat, index) => {
    categories.push(<Option key={index}>{Cat.name}</Option>);
    Categorynames.push(Cat.name);
  });

  Size.map((size, index) => {
    sizes.push(<Option key={index}>{size.name}</Option>);
    Sizenames.push(size.name);
  });

  Color.map((color, index) => {
    colors.push(<Option key={index}>{color.name}</Option>);
    Colornames.push(color.name);
  });

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
    <Row>
      <Col span={3}></Col>
      <Col span={18}>
        <Form name="basic" onFinish={handleSubmit}>
          <Form.Item label="Description">
            <TextArea
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              value={postData.title}
              placeholder="Title"
              autoSize={{ maxRows: 1 }}
            />
          </Form.Item>
          <Row>
            <Form.Item label="Category">
              <Select
                placeholder="Select Category"
                onChange={(value) =>
                  setPostData({ ...postData, Categories: Categorynames[value] })
                }
              >
                {categories}
              </Select>
            </Form.Item>

            <Button type="primary" onClick={() => setvisibleCategory(true)}>
              Add New Category
            </Button>
            <Modal
              title="Basic Modal"
              visible={visibleCategory}
              onOk={AddNewCategory}
              onCancel={() => setvisibleCategory(false)}
            >
              <Form.Item label="Add New Category">
                <TextArea
                  onChange={(e) => setNewCategory({ name: e.target.value })}
                  placeholder="Category"
                  autoSize={{ maxRows: 1 }}
                />
              </Form.Item>
            </Modal>
          </Row>
          <Row>
            <Form.Item label="Sizes">
              <Select
                mode="tags"
                placeholder="Select Size"
                onSelect={(value) =>
                  postData.Sizes.push(Sizenames[value[value?.length - 1]])
                }
                onDeselect={(value) => postData.Sizes.splice(value, 1)}
              >
                {sizes}
              </Select>
            </Form.Item>

            <Button type="primary" onClick={() => setvisibleSize(true)}>
              Add New Size
            </Button>
            <Modal
              title="Basic Modal"
              visible={visibleSize}
              onOk={AddNewSize}
              onCancel={() => setvisibleSize(false)}
            >
              <Form.Item label="Add New Size">
                <TextArea
                  onChange={(e) => setNewSize({ name: e.target.value })}
                  placeholder="Size"
                  autoSize={{ maxRows: 1 }}
                />
              </Form.Item>
            </Modal>
          </Row>
          <Row>
            <Form.Item label="Colors">
              <Select
                mode="tags"
                placeholder="Select Color"
                onSelect={(value) =>
                  postData.Colors.push(Colornames[value[value?.length - 1]])
                }
                onDeselect={(value) => postData.Colors.splice(value, 1)}
              >
                {colors}
              </Select>
            </Form.Item>

            <Button type="primary" onClick={() => setvisibleColor(true)}>
              Add New Color
            </Button>
            <Modal
              title="Basic Modal"
              visible={visibleColor}
              onOk={AddNewColor}
              onCancel={() => setvisibleColor(false)}
            >
              <Form.Item label="Add New Color">
                <TextArea
                  onChange={(e) => setNewColor({ name: e.target.value })}
                  placeholder="Color"
                  autoSize={{ maxRows: 1 }}
                />
              </Form.Item>
            </Modal>
          </Row>

          <Form.Item label="Price">
            <InputNumber
              defaultValue={postData.Price}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(value) => setPostData({ ...postData, Price: value })}
            />
          </Form.Item>

          <Form.Item label="Description">
            <TextArea
              showCount
              maxLength={100}
              value={postData.Overview}
              onChange={(e) =>
                setPostData({ ...postData, Overview: e.target.value })
              }
            />
          </Form.Item>

          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, image: base64 })
              }
            />
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Col span={3}></Col>
      </Col>
    </Row>
  );
}
