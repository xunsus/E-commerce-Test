import React, { Component } from 'react';
import {instance} from "../constants";


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        Categories:[],
        Labels:[],
        items: [],
      };

  }
    
      

    async componentDidMount() {

        instance.get('http://127.0.0.1:8000/API/Categories')
          .then((response) => {
            this.setState({
              Categories: response.data,
            })
            
            })
        
        instance.get('http://127.0.0.1:8000/API/Labels')
          .then((response) => {
            this.setState({
            Labels: response.data,
            loading: false
            })
            
          })
        
        instance.get('http://127.0.0.1:8000/API/items', {
            params: {limit: 8}
        })
        .then((response) => {
            this.setState({
                items: response.data.results,
                loading: false
            })
            })        
    }

    
 
        
    
         

    render() {
      const categories = [];
      const categoriesid = [];
      { this.state.Categories.map((Cat) => {
        categories.push(Cat.name)
        categoriesid.push(Cat.id)
      })}
      const Tags = [];
      { this.state.Labels.map((tag) => {
        Tags.push(tag.name)
      })}
      
      const url=window.location.href
      let cat = url.replace("http://127.0.0.1:8000/Category/", '');
      

      
        
        if (this.state.loading) {
          
            return <div>loading...</div>;
            
          }
          

        return (
            <React.Fragment>

    <div className="container">

      
      <nav className="navbar navbar-expand-lg navbar-dark mdb-color lighten-3 mt-3 mb-5">

        
        <span className="navbar-brand">Categories:</span>

        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
          aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="collapse navbar-collapse" id="basicExampleNav">

          
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">All
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Shirts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Sport wears</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Outwears</a>
            </li>

          </ul>
          

          <form className="form-inline">
            <div className="md-form my-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
            </div>
          </form>
        </div>
        

      </nav>
      

      
      <section className="text-center mb-4">

        
        <div className="row wow fadeIn">

        { this.state.items.map((item) => {          
          {if (item.Category.includes(parseInt(cat))) {
            return (              
                <div className="col-lg-3 col-md-6 mb-4" key={item.id}>
                        <div className="card">

                        
                        <div className="view overlay">
                            <img src={item.image} className="card-img-top"
                            alt=""  width="255.5" height="296"/>
                            <a>
                            <div className="mask rgba-white-slight"></div>
                            </a>
                        </div>           
                        <div className="card-body text-center">
                        
                            <a href="" className="grey-text">
                            <h5>{categories[item.Category[0]-1]}/{categories[item.Category[1]-1]}</h5>
                            </a>
                            <h5>
                            <strong>
                                <a href="" className="dark-grey-text">{item.title}{"  "}
                                </a>
                            </strong>
                            </h5>
                            {Tags[item.Label[0]-1] == "Best Seller" ?
                            <h6>
                            <span className="badge badge-pill primary-color">{Tags[item.Label[0]-1]}</span>
                            </h6>
                            :
                            <h6>
                            <span className="badge badge-pill danger-color">{Tags[item.Label[0]-1]}</span>
                            <span className="badge badge-pill primary-color">{Tags[item.Label[1]-1]}</span>
                            </h6>

                            }
                            

                            <h4 className="font-weight-bold blue-text">
                            <strong>{item.price}$</strong>
                            </h4>

                        </div>
                        

                        </div>
                        

                    </div>
             
                    );
          }}
            
                  
        })}
          
        </div>
 
      </section>
      

      <nav className="d-flex justify-content-center wow fadeIn">
        <ul className="pagination pg-blue">

        
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>

          <li className="page-item active">
            <a className="page-link" href="#">1
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">4</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">5</a>
          </li>

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>


    </div>

  

            </React.Fragment>
)
    }
}
export default Category;