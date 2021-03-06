import React from "react";
import Carousel from 'react-material-ui-carousel'
import Clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Box from "@material-ui/core/Box";

class Reactions extends React.Component{
    render(){
        const data = this.props.data;
        return(
            <Card className={Clsx("app-card-box-shadow", "app-list-card", "app-card-no-padding")}>
                <Carousel animation="slide" navButtonsAlwaysInvisible={true} indicators={false}>
                    {data.bigsale.map((item, idx) => {
                        return(
                            <Box key={idx} className="app-news-bigsale-box">
                                <img className="app-news-bigsale-img" src={item.image} alt={item.title} />
                            </Box>
                        )
                    })}
                </Carousel>
                <img alt="ribbon" className="app-news-bigsale-ribbon" src="assets/newsfeed/bigsale-ribbon.png" />
            </Card>
        )
    }
}

export default Reactions;