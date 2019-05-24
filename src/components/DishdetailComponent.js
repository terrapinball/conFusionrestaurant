import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Row, Label, Button, Modal, ModalHeader, ModalBody, Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));

class CommentForm extends Component {

    constructor(props) {
        super(props);
            this.state = {
                isNavOpen: false,
                isModalOpen: false
            };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    handleComment(event) {
        this.toggleModal();
        alert("Thanks " + this.author.value + " !");
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggleModal}><span className="fa fa-pencil"></span>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmit} onSubmitFailed={(error) => console.log({error})} >
                                <Row className="form-group ">
                                    <Col md={10}>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select>
                                    </Col>    
                                </Row>
                                <Row className="form-group">
                                    <Col md={10}>    
                                        <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" id="author" name="author" 
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                          />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required: ',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                    />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={10}>
                                        <Label htmlFor="comment">Comment</Label>
                                            <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6"
                                            />
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                </Modal>  
            </div>
        )
    }
}

    const DishDetail = (props) => {
        if (props.dish != null)
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish = {props.dish} />
                        <RenderComments comments={props.comments} 
                        addComment={props.addComment}
                        dishId={props.dish.id}
                        />
                    </div>
                </div>
            );
        else        
            return (
                <div>                
                </div>
            );
    }

    function RenderDish({dish}) {
        return (
            <div className="col-12 col-md-5 m-1" >
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

     const RenderComments = ({comments, addComment, dishId}) => {
        
        if (comments != null) {
            return (
                <div className="col-12 col-md-5 m-1" >
                    <h4>Comments</h4>
                        <ul>
                        {comments.map((comment) => 
                            <div className="list-unstyled" key={comment.id}>
                                <li>{comment.comment}</li>
                                <li>--{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
                                <br></br>
                                
                            </div>
                        )}
                        </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                      
                </div>

            );
        }
    
        else
            return (
                <div>
                </div>
            )
    }




export default DishDetail;