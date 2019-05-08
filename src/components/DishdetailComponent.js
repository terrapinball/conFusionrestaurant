import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



    const DishDetail = (props) => {
        if (props.dish != null)
            return (
                <div className="row">
                    <RenderDish dish = {props.dish} />
                    <RenderComments comments={props.dish.comments} />
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

    function RenderComments({comments}) {
        if (comments != null)
            return (
                <div class="col-12 col-md-5 m-1" >
                    <h4>Comments</h4>

                    <ul>
                    {comments.map((comment) => 
                        <div className="list-unstyled" key={comment.id}>
                            <li>{comment.comment}</li>
                            <br></br>
                            <li>--{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
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



export default DishDetail;