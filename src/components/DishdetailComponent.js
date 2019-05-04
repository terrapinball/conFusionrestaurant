import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {

    render() {
        const {dish} = this.props;
        if (dish != null)
            return (
                <div className="row">
                    {this.renderDish(dish)}
                    {this.renderComments(dish.comments)}
                </div>
            );
        else        
            return (
                <div>                
                </div>
            );
    }

    renderDish(dish) {
        return (
            <div class="col-12 col-md-5 m-1" >
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

    renderComments(comments) {
        if (comments != null)
            return (
                <div class="col-12 col-md-5 m-1" >
                    <h4>Comments</h4>

                    <ul>
                    {comments.map((comment) => 
                        <div className="list-unstyled" key={comment.id}>
                            <li>{comment.comment}</li>
                            <br></br>
                            <li>--{comment.author} {comment.date}</li>
                            <br></br>
                            
                        </div>    
                    )}
                    </ul>

                    
                </div>
            )
        else
            return (
                <div>
                </div>
            )
    }

}



export default DishDetail;