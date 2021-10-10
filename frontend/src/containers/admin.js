import React, { useState } from "react";
import { Form, Button, Row, Col } from "antd";
/* import ImageUploader from 'react-images-upload'; */
import axios from "axios";
import FileBase from "react-file-base64";
import { Newimages } from "../constants";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export default function AddItem() {
  const [postData, setPostData] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  /*   useEffect(() => {
    instance.get("http://localhost:5000/posts/Categories").then((response) => {
      setCategory(response.data);
    });
  }, []); */

  const handleSubmit = () => {
    Newimages(postData);
  };

  return (
    <Row>
      <Col span={3}></Col>
      <Col span={18}>
        <Form name="basic" onFinish={handleSubmit}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, image1: base64 })
            }
          />

          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, image2: base64 })
            }
          />

          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, image3: base64 })
            }
          />

          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, image4: base64 })
            }
          />

          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, image5: base64 })
            }
          />

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
