import React from "react";

import CountUp from 'react-countup';
import Slider from "react-slick";
import config from "@config";

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from "@material-ui/core/Avatar";
import Rating from '@material-ui/lab/Rating';
import LinearProgress from '@material-ui/core/LinearProgress';

import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import RoomIcon from '@material-ui/icons/Room';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import SearchIcon from '@material-ui/icons/Search';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import RedditIcon from '@material-ui/icons/Reddit';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PersonIcon from '@material-ui/icons/Person';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StarIcon from '@material-ui/icons/Star';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CancelIcon from '@material-ui/icons/Cancel';
import ContactsIcon from '@material-ui/icons/Contacts';
import ShareIcon from '@material-ui/icons/Share';
class Landing extends React.Component{
    render(){
        return(
            <Box className="app-landing">
                <AppBar position="static" color="transparent" className="appbar">
                    <Container>
                        <Toolbar className="toolbar">
                            <img className="logo" alt="IBLUDAY" src="assets/landing/logo.png" />
                            <Box className="space" />
                            <IconButton className="info-button">
                                <ContactsIcon color="primary" />
                            </IconButton>
                            <Box className="info">
                                <Box className="contact">
                                    <IconButton>
                                        <RoomIcon color="primary" className="icon" />
                                    </IconButton>
                                    <Box>
                                        <Typography className="title">ADDRESS</Typography>
                                        <Typography color="textSecondary" className="content">66 Broklyn St. New York</Typography>
                                    </Box>
                                </Box>
                                <Divider orientation="vertical" className="divider"/>
                                <Box className="contact">
                                    <IconButton>
                                        <EmailIcon color="primary" className="icon" />
                                    </IconButton>
                                    <Box>
                                        <Typography className="title">Email</Typography>
                                        <Typography color="textSecondary" className="content">support@ibluday.com</Typography>
                                    </Box>
                                </Box>
                                <Divider orientation="vertical" className="divider"/>
                                <Box className="contact">
                                    <IconButton>
                                        <PhoneIcon color="primary" className="icon" />
                                    </IconButton>
                                    <Box>
                                        <Typography className="title">Phone</Typography>
                                        <Typography color="textSecondary" className="content">+01-21-444-99990</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <AppBar position="static" className="menubar">
                    <Container>
                        <Toolbar className="toolbar">
                            <Box className="links">
                                <Button color="inherit">HOME</Button>
                                <Button color="inherit">OUR SERVICES</Button>
                                <Button color="inherit">TECH STACKS</Button>
                                <Button color="inherit">TESTIMONIALS</Button>
                                <Button color="inherit">ABOUT US</Button>
                                <Button color="inherit">CONTACT US</Button>
                            </Box>
                            <Box className="social">
                                <IconButton className="icon-button"><SearchIcon /></IconButton>
                                <Divider orientation="vertical" variant="middle" flexItem className="divider" />
                                <IconButton className="icon-button"><FacebookIcon /></IconButton>
                                <IconButton className="icon-button"><LinkedInIcon /></IconButton>
                                <IconButton className="icon-button"><InstagramIcon /></IconButton>
                                <IconButton className="icon-button"><TwitterIcon /></IconButton>
                                <IconButton className="icon-button"><RedditIcon /></IconButton>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Box className="hero">
                    <CardMedia 
                        className="image"
                        image="assets/landing/slide/02.jpg"
                    />
                    <Box className="content">
                        <Typography color="primary" className="caption">FOR STARTUP BUSINESS</Typography>
                        <Typography className="top">
                            IT SERVICE <b className="specific">&</b>
                        </Typography>
                        <Typography className="bottom">
                            SOLUTIONS
                        </Typography>
                    </Box>
                </Box>
                <Box className="service" style={{backgroundImage : "url(assets/landing/header-pattern.png)"}}>
                    <Container className="main-container">
                        <Box className="header">
                            <Box className="header-pin">TECHNOLOGY INDEX<Divider className="divider" /></Box>
                            <Typography className="title">IMPROVED AND INNOVATIVE</Typography>
                        </Box>
                        <Box className="service-container">
                            <Slider {...config.slick.service} className="service-container">
                                <Card className="item">
                                    <img className="image" src="assets/landing/service-04.jpg" alt="service" />
                                    <Box className="property">
                                        <IconButton className="icon-button">
                                            <ShareIcon className="icon" />
                                        </IconButton>
                                        <Box className="content">
                                            <Typography className="job">Web Development</Typography>
                                            <Typography className="name">Graphic Design</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card className="item">
                                    <img className="image" src="assets/landing/service-01.jpg" alt="service" />
                                    <Box className="property">
                                        <IconButton className="icon-button">
                                            <ShareIcon className="icon" />
                                        </IconButton>
                                        <Box className="content">
                                            <Typography className="job">Web Development</Typography>
                                            <Typography className="name">Frontend Development</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card className="item">
                                    <img className="image" src="assets/landing/service-02.jpg" alt="service" />
                                    <Box className="property">
                                        <IconButton className="icon-button">
                                            <ShareIcon className="icon" />
                                        </IconButton>
                                        <Box className="content">
                                            <Typography className="job">Web Development</Typography>
                                            <Typography className="name">Backend Development</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card className="item">
                                    <img className="image" src="assets/landing/service-03.jpg" alt="service" />
                                    <Box className="property">
                                        <IconButton className="icon-button">
                                            <ShareIcon className="icon" />
                                        </IconButton>
                                        <Box className="content">
                                            <Typography className="job">Cloud Development</Typography>
                                            <Typography className="name">Google Cloud Computing</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card className="item">
                                    <img className="image" src="assets/landing/service-04.jpg" alt="service" />
                                    <Box className="property">
                                        <IconButton className="icon-button">
                                            <ShareIcon className="icon" />
                                        </IconButton>
                                        <Box className="content">
                                            <Typography className="job">Mobile Development</Typography>
                                            <Typography className="name">iOS & Android Development</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card className="item">
                                    <img className="image" src="assets/landing/service-05.jpg" alt="service" />
                                    <Box className="property">
                                        <IconButton className="icon-button">
                                            <ShareIcon className="icon" />
                                        </IconButton>
                                        <Box className="content">
                                            <Typography className="job">DevOps</Typography>
                                            <Typography className="name">Singer, Fivetran, Etc</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Slider>
                        </Box>
                        <Card className="intro-ceo">
                            <CardContent className="container">
                                <Avatar className="avatar" src="assets/landing/ceo.jpg" />
                                <Box className="content">
                                    <Typography className="ceo-job">FOUNDER & CEO</Typography>
                                    <Typography className="ceo-name">Fat Pig</Typography>
                                </Box>
                            </CardContent>
                            <Box className="signature">
                                <img src="assets/landing/signature.png" alt="signature" />
                            </Box>
                        </Card>
                    </Container>
                </Box>
                <Box className="join-team-section">
                    <Container>
                        <Typography className="join-team">Join our team – We are looking for talented & driven people to come work with us Available Positions</Typography>
                    </Container>
                </Box>
                <Container>
                    <Box className='space-between-sections' />
                    <Grid container spacing={3} className="about-us">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CardMedia 
                                className="cover"
                                image="http://itinc-demo.themesion.com/wp-content/uploads/2020/08/img-new-07.jpg"
                            />
                            <Box className="satisfed-client">
                                <Avatar className="avatar" src="assets/landing/client.jpg" />
                                <Box className="item">
                                    <Typography className="item-count">5.5K</Typography>
                                    <Typography className="item-title">Satisfied Client</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CardContent>
                                <Box className="header-pin">30 YEARS OF EXPERIENCE<Divider className="divider" /></Box>
                                <Typography className="title">WE EXECUTE OUR IDEAS FROM THE START TO FINISH</Typography>
                                <Typography className="content">
                                    iBluday is a software development company specialized in custom application development, mobile and web, e-commerce, 
                                    CRM, outsourcing and IT managed services for startups, small and medium sized businesses.
                                </Typography>
                                <Grid container>
                                    <Grid item xs={12} sm={6}>
                                        <List component="nav" className="list" aria-label="main mailbox folders">
                                            <ListItem button>
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Web Development" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Mobile App Development" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="E-Commerce" />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <List component="nav" className="list" aria-label="main mailbox folders">
                                            <ListItem button>
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="CRM" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Out Sourcing " />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="IT-Services" />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                                <Typography className="content">
                                    Headquartered in Dallas, TX with other locations in New York, Florida, California, Chicago and Kyiv, Ukraine. 
                                </Typography>
                                <Typography className="content join">
                                    Join our team – come work with us. 
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Box className='space-between-sections' />
                    <Box className="agency">
                        <img 
                            className="agency-image"
                            src="assets/landing/agency.jpg"
                            alt="agency"
                        />
                        <Box className="agency-content">
                            <Typography className="title">AGENCY EXCITED WITH OUR SOLUTIONS</Typography>
                            <Box className="link">Read More</Box>
                            <IconButton className="play"><PlayArrowIcon /></IconButton>
                        </Box>
                    </Box>
                    <Box className="branding">
                        <Typography className="description">
                            TRUSTED BY THE WORLD’S BEST ORGANIZATIONS:
                        </Typography>
                        <Slider {...config.slick.branding}>
                            <Box className="content">
                                <img src="assets/landing/brand/01.png" alt="brand" />
                            </Box>
                            <Box className="content">
                                <img src="assets/landing/brand/02.png" alt="brand" />
                            </Box>
                            <Box className="content">
                                <img src="assets/landing/brand/03.png" alt="brand" />
                            </Box>
                            <Box className="content">
                                <img src="assets/landing/brand/04.png" alt="brand" />
                            </Box>
                            <Box className="content">
                                <img src="assets/landing/brand/05.png" alt="brand" />
                            </Box>
                        </Slider>
                    </Box>
                </Container>
                <Grid container className="success-stories">
                    <Grid item lg={2}></Grid>
                    <Grid item xs={12} sm={12} lg={10} className="container">
                        <CardContent>
                            <Box className="header-pin">OUR CUSTOMER'S REVIEW<Divider className="divider" /></Box>
                            <Typography className="title">WHAT CUSTOMER'S TALKING ABOUT US</Typography>
                            <Box className="testimonial">
                                <Slider {...config.slick.testimonial}>
                                    <Box className="content">
                                        <Box className="avatar-container">
                                            <FormatQuoteIcon className="icon" />
                                            <Avatar className="avatar" src="assets/landing/client.jpg" />
                                        </Box>
                                        <Box className="message">
                                            I found ITinc Solutions Private Ltd to be professional, efficient, and very responsive as we went through the process of modifying my website.
                                            I plan on using them again and would recommend them.
                                            <Divider className="divider" />
                                            <Box className="rating">
                                                <Box className="user-info">
                                                    <Typography className="user-name">Charles Gamkong</Typography>
                                                    <Typography className="user-job">iBluday CEO</Typography>
                                                </Box>
                                                <Rating value={5} color="primary" readOnly icon={<StarIcon />}/>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="content">
                                        <Box className="avatar-container">
                                            <FormatQuoteIcon className="icon" />
                                            <Avatar className="avatar" src="assets/landing/client.jpg" />
                                        </Box>
                                        <Box className="message">
                                            I found ITinc Solutions Private Ltd to be professional, efficient, and very responsive as we went through the process of modifying my website.
                                            I plan on using them again and would recommend them.
                                            <Divider className="divider" />
                                            <Box className="rating">
                                                <Box className="user-info">
                                                    <Typography className="user-name">Charles Gamkong</Typography>
                                                    <Typography className="user-job">iBluday CEO</Typography>
                                                </Box>
                                                <Rating value={5} color="primary" readOnly icon={<StarIcon />}/>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="content">
                                        <Box className="avatar-container">
                                            <FormatQuoteIcon className="icon" />
                                            <Avatar className="avatar" src="assets/landing/client.jpg" />
                                        </Box>
                                        <Box className="message">
                                            I found ITinc Solutions Private Ltd to be professional, efficient, and very responsive as we went through the process of modifying my website.
                                            I plan on using them again and would recommend them.
                                            <Divider className="divider" />
                                            <Box className="rating">
                                                <Box className="user-info">
                                                    <Typography className="user-name">Charles Gamkong</Typography>
                                                    <Typography className="user-job">iBluday CEO</Typography>
                                                </Box>
                                                <Rating value={5} color="primary" readOnly icon={<StarIcon />}/>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="content">
                                        <Box className="avatar-container">
                                            <FormatQuoteIcon className="icon" />
                                            <Avatar className="avatar" src="assets/landing/client.jpg" />
                                        </Box>
                                        <Box className="message">
                                            I found ITinc Solutions Private Ltd to be professional, efficient, and very responsive as we went through the process of modifying my website.
                                            I plan on using them again and would recommend them.
                                            <Divider className="divider" />
                                            <Box className="rating">
                                                <Box className="user-info">
                                                    <Typography className="user-name">Charles Gamkong</Typography>
                                                    <Typography className="user-job">iBluday CEO</Typography>
                                                </Box>
                                                <Rating value={5} color="primary" readOnly icon={<StarIcon />}/>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Slider>
                            </Box>
                        </CardContent>
                    </Grid>
                </Grid>
                <Box className="tech-stacks" style={{background : "url(assets/landing/tech.jpg)"}}>
                    <Box className="header">
                        <Box className="header-pin">TECHNOLOGY INDEX<Divider className="divider" /></Box>
                        <Typography className="title">IMPROVED AND INNOVATIVE</Typography>
                    </Box>
                    <Box className="content">
                        <Container>
                            <Grid container className="grid">
                                <Grid item className="item" xs={6} sm={4} md={4} lg={2}>
                                    <IconButton>
                                        <LanguageOutlinedIcon />
                                    </IconButton>
                                    <Box className="circle-dot">
                                        <Box />
                                    </Box>
                                    <Typography>
                                       MARKETING STRATEGY
                                    </Typography>
                                </Grid>
                                <Grid item className="item" xs={6} sm={4} md={4} lg={2}>
                                    <IconButton>
                                        <LanguageOutlinedIcon />
                                    </IconButton>
                                    <Box className="circle-dot">
                                        <Box />
                                    </Box>
                                    <Typography>
                                       MARKETING STRATEGY
                                    </Typography>
                                </Grid>
                                <Grid item className="item" xs={6} sm={4} md={4} lg={2}>
                                    <IconButton>
                                        <LanguageOutlinedIcon />
                                    </IconButton>
                                    <Box className="circle-dot">
                                        <Box />
                                    </Box>
                                    <Typography>
                                       MARKETING STRATEGY
                                    </Typography>
                                </Grid>
                                <Grid item className="item" xs={6} sm={4} md={4} lg={2}>
                                    <IconButton>
                                        <LanguageOutlinedIcon />
                                    </IconButton>
                                    <Box className="circle-dot">
                                        <Box />
                                    </Box>
                                    <Typography>
                                       MARKETING STRATEGY
                                    </Typography>
                                </Grid>
                                <Grid item className="item" xs={6} sm={4} md={4} lg={2}>
                                    <IconButton>
                                        <LanguageOutlinedIcon />
                                    </IconButton>
                                    <Box className="circle-dot">
                                        <Box />
                                    </Box>
                                    <Typography>
                                       MARKETING STRATEGY
                                    </Typography>
                                </Grid>
                                <Grid item className="item" xs={6} sm={4} md={4} lg={2}>
                                    <IconButton>
                                        <LanguageOutlinedIcon />
                                    </IconButton>
                                    <Box className="circle-dot">
                                        <Box></Box>
                                    </Box>
                                    <Typography>
                                       MARKETING STRATEGY
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
                <Container>
                    <Card className="count-up">
                        <CardContent>
                            <Card className="item">
                                <IconButton>
                                    <PersonPinIcon color="primary" className="icon" />
                                </IconButton>
                                <CountUp className="count" start={0} end={34234} duration={3} />
                                <Typography className="title">VISITORS</Typography>
                            </Card>
                            <Card className="item">
                                <IconButton>
                                    <EmojiEmotionsIcon color="primary" className="icon" />
                                </IconButton>
                                <CountUp className="count" start={0} end={2300} duration={3} />
                                <Typography className="title">HAPPY</Typography>
                            </Card>
                            <Card className="item">
                                <IconButton>
                                    <FavoriteIcon color="primary" className="icon" />
                                </IconButton>
                                <CountUp className="count" start={0} end={12300} duration={3} />
                                <Typography className="title">LIKE</Typography>
                            </Card>
                            <Card className="item">
                                <IconButton>
                                    <MonetizationOnIcon color="primary" className="icon" />
                                </IconButton>
                                <CountUp className="count" start={0} end={3400} duration={3} />
                                <Typography className="title">PAID</Typography>
                            </Card>
                        </CardContent>
                    </Card>
                    <Box className="price">
                        <Box className="header">
                            <Box className="header-pin">PRICING PACKAGES<Divider className="divider" /></Box>
                            <Typography className="title">CHOOSE YOUR BEST PLAN</Typography>
                            <Typography className="content">
                                We’ve designed a culture that allows our stewards to assimilate with our clients and bring the best of who we are to your business.We’ve designed a culture that allows our stewards.
                            </Typography>
                        </Box>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Card className="card">
                                    <CardContent className="card-content">
                                        <Typography className="title">BAGIC</Typography>
                                        <List component="nav" className="list" aria-label="main mailbox folders">
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Power And Predictive Dialing" />
                                            </ListItem>
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CancelIcon color="primary" className="noCheck" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="24/7 phone and email support" />
                                            </ListItem>
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Quality & Customer Experience" />
                                            </ListItem>
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CancelIcon color="primary" className="noCheck" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Try for free, forever!" />
                                            </ListItem>
                                        </List>
                                        <Button variant="contained" className="card-button" fullWidth>
                                            BUY NOW 
                                        </Button>
                                        <Divider className="divider" />
                                        <Box className="money">
                                            <AttachMoneyIcon className="icon" />
                                            <Typography className="value">46</Typography>
                                            <Typography className="pertype">/monthly</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Card className="card highlight">
                                    <CardContent className="card-content">
                                        <Typography className="title">STANDARD</Typography>
                                        <List component="nav" className="list" aria-label="main mailbox folders">
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Power And Predictive Dialing" />
                                            </ListItem>
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="24/7 phone and email support" />
                                            </ListItem>
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Quality & Customer Experience" />
                                            </ListItem>
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Try for free, forever!" />
                                            </ListItem>
                                        </List>
                                        <Button variant="contained" className="card-button" fullWidth>
                                            BUY NOW 
                                        </Button>
                                        <Divider className="divider" />
                                        <Box className="money">
                                            <AttachMoneyIcon className="icon" />
                                            <Typography className="value">46</Typography>
                                            <Typography className="pertype">/monthly</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Card className="card">
                                    <CardContent className="card-content">
                                        <Typography className="title">PREMIUM</Typography>
                                        <List component="nav" className="list" aria-label="main mailbox folders">
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Power And Predictive Dialing" />
                                            </ListItem>
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="24/7 phone and email support" />
                                            </ListItem>
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Quality & Customer Experience" />
                                            </ListItem>
                                            <ListItem button className="button">
                                                <ListItemIcon className="icon">
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText className="text" primary="Try for free, forever!" />
                                            </ListItem>
                                        </List>
                                        <Button variant="contained" className="card-button" fullWidth>
                                            BUY NOW 
                                        </Button>
                                        <Divider className="divider" />
                                        <Box className="money">
                                            <AttachMoneyIcon className="icon" />
                                            <Typography className="value">46</Typography>
                                            <Typography className="pertype">/monthly</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Box className="team">
                    <Slider {...config.slick.team}>
                        <Box className="item">
                            <img src="assets/landing/team/team-01.jpg" alt="team-1" />
                            <Box className="property">
                                <Box>
                                    <Typography className="job">Web Designer</Typography>
                                    <Typography className="name">David Beckham</Typography>
                                </Box>
                                <IconButton className="icon-button">
                                    <ShareIcon className="icon" />
                                </IconButton>
                            </Box>
                            <Box className="share">
                            </Box>
                        </Box>
                        <Box className="item">
                            <img src="assets/landing/team/team-02.jpg" alt="team-1" />
                            <Box className="property">
                                <Box>
                                    <Typography className="job">Web Designer</Typography>
                                    <Typography className="name">David Beckham</Typography>
                                </Box>
                                <IconButton className="icon-button">
                                    <ShareIcon className="icon" />
                                </IconButton>
                            </Box>
                            <Box className="share">
                            </Box>
                        </Box>
                        <Box className="item">
                            <img src="assets/landing/team/team-03.jpg" alt="team-1" />
                            <Box className="property">
                                <Box>
                                    <Typography className="job">Web Designer</Typography>
                                    <Typography className="name">David Beckham</Typography>
                                </Box>
                                <IconButton className="icon-button">
                                    <ShareIcon className="icon" />
                                </IconButton>
                            </Box>
                            <Box className="share">
                            </Box>
                        </Box>
                        <Box className="item">
                            <img src="assets/landing/team/team-04.jpg" alt="team-1" />
                            <Box className="property">
                                <Box>
                                    <Typography className="job">Web Designer</Typography>
                                    <Typography className="name">David Beckham</Typography>
                                </Box>
                                <IconButton className="icon-button">
                                    <ShareIcon className="icon" />
                                </IconButton>
                            </Box>
                            <Box className="share">
                            </Box>
                        </Box>
                        <Box className="item">
                            <img src="assets/landing/team/team-02.jpg" alt="team-1" />
                            <Box className="property">
                                <Box>
                                    <Typography className="job">Web Designer</Typography>
                                    <Typography className="name">David Beckham</Typography>
                                </Box>
                                <IconButton className="icon-button">
                                    <ShareIcon className="icon" />
                                </IconButton>
                            </Box>
                            <Box className="share">
                            </Box>
                        </Box>
                        <Box className="item">
                            <img src="assets/landing/team/team-03.jpg" alt="team-1" />
                            <Box className="property">
                                <Box>
                                    <Typography className="job">Web Designer</Typography>
                                    <Typography className="name">David Beckham</Typography>
                                </Box>
                                <IconButton className="icon-button">
                                    <ShareIcon className="icon" />
                                </IconButton>
                            </Box>
                            <Box className="share">
                            </Box>
                        </Box>
                        <Box className="item">
                            <img src="assets/landing/team/team-04.jpg" alt="team-1" />
                            <Box className="property">
                                <Box>
                                    <Typography className="job">Web Designer</Typography>
                                    <Typography className="name">David Beckham</Typography>
                                </Box>
                                <IconButton className="icon-button">
                                    <ShareIcon className="icon" />
                                </IconButton>
                            </Box>
                            <Box className="share">
                            </Box>
                        </Box>
                    </Slider>
                </Box>
                <Container>
                    <Grid container spacing={10} className="team-level">
                        <Grid item xs={12} md={6}>
                            <Box className="header">
                                <Box className="header-pin">OUR EXPERIENCE<Divider className="divider" /></Box>
                                <Typography className="title">EXPERTS WITH EXPERIENCE</Typography>
                            </Box>
                            <Typography className="content">
                                Quality & Customer version of lorem ipsum proin gravida nibh vel velit auctor aliquet aenean sollicitudin lorem quis bibendum auctor nisi elit consequat ipsum nec sagittis sem nibh id elit.
                            </Typography>
                            <Box className="description">
                                <Typography className="title">Consulting</Typography>
                                <Typography className="progress" component="span">90%</Typography>
                            </Box>
                            <LinearProgress className="bar" variant="buffer" value={80} valueBuffer={90} />
                            <Box className="description">
                                <Typography className="title">Consulting</Typography>
                                <Typography className="progress" component="span">70%</Typography>
                            </Box>
                            <LinearProgress className="bar" variant="buffer" value={70} valueBuffer={85} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <List component="nav" className="list" aria-label="main mailbox folders">
                                        <ListItem button className="button">
                                            <ListItemIcon className="icon">
                                                <CheckCircleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText className="text" primary="Proin gravida nibh vel" />
                                        </ListItem>
                                        <ListItem button className="button">
                                            <ListItemIcon className="icon">
                                                <CheckCircleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText className="text" primary="Auctor aliquet aenean quis" />
                                        </ListItem>
                                        <ListItem button className="button">
                                            <ListItemIcon className="icon">
                                                <CheckCircleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText className="text" primary="Bibend auctor nisi elit" />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <List component="nav" className="list" aria-label="main mailbox folders">
                                        <ListItem button className="button">
                                            <ListItemIcon className="icon">
                                                <CheckCircleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText className="text" primary="Proin gravida nibh vel" />
                                        </ListItem>
                                        <ListItem button className="button">
                                            <ListItemIcon className="icon">
                                                <CheckCircleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText className="text" primary="Auctor aliquet aenean quis" />
                                        </ListItem>
                                        <ListItem button className="button">
                                            <ListItemIcon className="icon">
                                                <CheckCircleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText className="text" primary="Bibend auctor nisi elit" />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                            <Box className="divider-container">
                                <Divider className="divider" />
                            </Box>
                            <Box className="experience">
                                <img className="icon" src="assets/landing/experience.svg" alt="svg" />
                                <Box className="container">
                                    <Typography className="title">BEST PRACTICES FROM INDUSTRY EXPERTS</Typography>
                                    <Typography className="content">We’ve designed a culture that allows our stewards to assimilate with our clients and bring.</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
                <Box className="intro" style={{background : 'url(assets/landing/intro.jpg)'}}>
                    <Container className="container">
                        <Typography className="title">
                            WE SOLVE PROBLEMS RELATED TO IT <b>INFRASTRUCTURE.</b>
                        </Typography>
                        <Typography className="short-content">We’ve designed a project that allows our stewards.</Typography>
                        <Box className="play-video">
                            <IconButton className="icon">
                                <PlayArrowIcon />
                            </IconButton>
                            <Typography> How it works?</Typography>
                        </Box>
                    </Container>
                </Box>
                <Container className="sn-container">
                    <Card className="signup-news">
                        <Typography className="title">
                            SUBSCRIBE TO OUR NEWSLETTER
                        </Typography>
                        <Box className="input">
                            <TextField
                                className="input-email"
                                variant="outlined"
                                InputProps={{
                                    placeholder:"Enter Your Email"
                                }}
                            />
                            <Button variant="contained">Subscribe</Button>  
                        </Box>
                        <Box className="corner-icon">
                            <img src="assets/landing/signup-news.png" alt="signup-news" />
                        </Box>
                    </Card>
                </Container>
                <Container>
                    <Box className="blog">
                        <Box className="header">
                            <Box className="header-pin">RECENT NEWS<Divider className="divider" /></Box>
                            <Typography className="title">WHAT'S GOING ON OUR BLOG?</Typography>
                        </Box>
                        <Grid container className="blog-list" spacing={3}>
                            <Grid item xs={12} sm={6} md={4} className="container">
                                <Box className="item">
                                    <img className="blog-image" width="770" height="635" src="assets/landing/blog1.jpg" alt="blog-list"/>
                                    <Box className="property">
                                        <DateRangeIcon />
                                        <Typography>Jun 12, 2021</Typography>
                                    </Box>
                                </Box>
                                <Box className="item-content">
                                    <Box className="property">
                                        <Box>
                                            <DateRangeIcon />
                                            <Typography>Jun 12, 2021</Typography>
                                        </Box>
                                        <Box>
                                            <PersonIcon />
                                            <Typography>By Admin</Typography>
                                        </Box>
                                    </Box>
                                    <Typography className="title">How to become a successful business man</Typography>
                                    <Typography className="content">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et…
                                    </Typography>
                                    <Box className="read-more">
                                        React More 
                                        <IconButton>
                                            <ArrowRightAltIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className="container">
                                <Box className="item">
                                    <img className="blog-image" width="770" height="635" src="assets/landing/blog2.jpg" alt="blog-list"/>
                                    <Box className="property">
                                        <DateRangeIcon />
                                        <Typography>Jun 12, 2021</Typography>
                                    </Box>
                                </Box>
                                <Box className="item-content">
                                    <Box className="property">
                                        <Box>
                                            <DateRangeIcon />
                                            <Typography>Jun 12, 2021</Typography>
                                        </Box>
                                        <Box>
                                            <PersonIcon />
                                            <Typography>By Admin</Typography>
                                        </Box>
                                    </Box>
                                    <Typography className="title">How to become a successful business man</Typography>
                                    <Typography className="content">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et…
                                    </Typography>
                                    <Box className="read-more">
                                        React More 
                                        <IconButton>
                                            <ArrowRightAltIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className="container">
                                <Box className="item">
                                    <img className="blog-image" width="770" height="635" src="assets/landing/blog3.jpg" alt="blog-list"/>
                                    <Box className="property">
                                        <DateRangeIcon />
                                        <Typography>Jun 12, 2021</Typography>
                                    </Box>
                                </Box>
                                <Box className="item-content">
                                    <Box className="property">
                                        <Box>
                                            <DateRangeIcon />
                                            <Typography>Jun 12, 2021</Typography>
                                        </Box>
                                        <Box>
                                            <PersonIcon />
                                            <Typography>By Admin</Typography>
                                        </Box>
                                    </Box>
                                    <Typography className="title">How to become a successful business man</Typography>
                                    <Typography className="content">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et…
                                    </Typography>
                                    <Box className="read-more">
                                        React More 
                                        <IconButton>
                                            <ArrowRightAltIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Container className="contact-container">
                    <Card className="contact-list">
                        <EmailIcon />
                        <Typography>ibluday@ibluday.com</Typography>
                        <Divider flexItem orientation="vertical" />
                        <PhoneIcon />
                        <Typography>+79532957167</Typography>
                        <Divider flexItem orientation="vertical" />
                        <AccessTimeIcon />
                        <Typography> 9:00 AM ~ 20:00 PM</Typography>
                        <Divider flexItem orientation="vertical" />
                        <RoomIcon />
                        <Typography>TX 78731</Typography>
                    </Card>
                </Container>
                <Box className="footer" style={{background : "url(assets/landing/footer.jpg)"}}>
                    <Container> 
                        <Box className="info-list">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={3} lg={3} className="info-item">
                                    <Typography className="title">ABOUT US</Typography>
                                    <Divider className="divider" />
                                    <Typography className="content">
                                        We provide caring and knowledgeable technicians for making people.
                                    </Typography>
                                    <Box className="contact">
                                        <Card className="card">
                                            <Box className="card-content">
                                                <Typography className="card-title">Talk To Our Support</Typography>
                                                <Typography className="card-text">+1 002-123-4567</Typography>
                                            </Box>
                                            <IconButton>
                                                <HeadsetMicIcon color="primary" className="icon"/>
                                            </IconButton>
                                        </Card>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3} className="info-item">
                                    <Typography className="title">INFORMATION</Typography>
                                    <Divider className="divider" />
                                    <Box className="information">
                                        <Box className="item">
                                            <ChevronRightIcon />
                                            <Typography>Managed It Services</Typography>
                                        </Box>
                                        <Box className="item">
                                            <ChevronRightIcon />
                                            <Typography>Business Solutions</Typography>
                                        </Box>
                                        <Box className="item">
                                            <ChevronRightIcon />
                                            <Typography>Tech Stacks</Typography>
                                        </Box>
                                        <Box className="item">
                                            <ChevronRightIcon />
                                            <Typography>Major Skills</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3} className="info-item">
                                    <Typography className="title">LATEST NEWS</Typography>
                                    <Divider className="divider" />
                                    <Box className="news">
                                        <Box className="item">
                                            <CardMedia className="cover" image="assets/landing/about-us.jpg" alt="news" />
                                            <Box className="news-content">
                                                <Typography className="news-title">How to become a successful businessman</Typography>
                                                <Typography className="news-date">June 3, 2020</Typography>
                                            </Box>
                                        </Box>
                                        <Box className="item">
                                            <CardMedia className="cover" image="assets/landing/about-us.jpg" alt="news" />
                                            <Box className="news-content">
                                                <Typography className="news-title">How to become a successful businessman</Typography>
                                                <Typography className="news-date">June 3, 2020</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3} className="info-item">
                                    <Typography className="title">NEWSLETTER</Typography>
                                    <Divider className="divider" />
                                    <Typography className="content">
                                        We provide caring and knowledgeable technicians for making people.
                                    </Typography>
                                    <Box className="newsletter">
                                        <TextField
                                            className="input-email"
                                            variant="outlined"
                                            InputProps={{
                                                placeholder:"Enter Your Email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Button variant="contained" color="primary">
                                                            <SendIcon />
                                                        </Button>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider className="full-divider" />
                        <Box className="copyright">
                            <Typography className="title">
                                Copyright ©2020. All Rights Reserved
                            </Typography>
                            <Box className="quicklinks">
                                <Typography component="p">Faq</Typography>
                                <Typography component="p">Contact Us</Typography>
                                <Typography component="p">About Us</Typography>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        )
    }
}

export default Landing;