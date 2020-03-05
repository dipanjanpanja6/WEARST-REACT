import React,{Component} from 'react'
import PropType from 'prop-types'

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";


import Twitter from '../src/images/twitter.png'
import Instagram from '../src/images/instagram.png'
import Search from '../src/images/search.png'
import Snow from '../src/images/snow.png'
import Snowman from '../src/images/snowman.png'
import Summer from '../src/images/warm.png'
import Monsoom from '../src/images/rain.png'
import Spring from '../src/images/flower.png'

const style = {
    grid_classes_12:{
        paddingTop:"10px",
        paddingLeft:"20px",
        paddingRight:"20px",

    },
    _day_grid_1:{
        height:"54px"
    },
    digre_2_text:{
        marginLeft:"10px"
    },
    grid_1:{
        marginTop:"9px"
    },
    main_grid_class:{
        marginTop: "50px",
        marginLeft: "50px"
    }
};

class Home extends Component{
    constructor() {
        super();
        this.state = {
            data:null,
            season:null,
            seasonImg:{},
            day_1:null,
            day_2:null,
            day_3:null,
            day_4:null,
            day_5:null,
            day_6:null,
            search:''
        }
    }
    componentWillMount() {
        this.getAutoData()
    }

    setSeasonImage = (season) =>{

        if (season == "WINTER"){
            this.setState({seasonImg:Snow})
        }
        if (season == "SPRING"){
            this.setState({seasonImg:Spring})
        }
        if (season == "SUMMER"){
            this.setState({seasonImg:Summer})
        }
        if (season == "MONSOON"){
            this.setState({seasonImg:Monsoom})
        }
    };
    searchData = (event) =>{
        if (event.keyCode == 13){
            const value = this.state.search;
            if (value != null){
                this.getWeatherData(value)
            }

            const data_1 = localStorage.getItem('data_1');
            const data_2 = localStorage.getItem('data_2');
            const data_3 = localStorage.getItem('data_3');
            const data_4 = localStorage.getItem('data_4');
            const data_5 = localStorage.getItem('data_5');

            if (!data_1){
                localStorage.setItem('data_1', value)
            }
            else if (!data_2){
                localStorage.setItem('data_2', value)
            }else if (!data_3){
                localStorage.setItem('data_3', value)
            }
            else if (!data_4){
                localStorage.setItem('data_4', value)
            }
            else if(!data_5){
                localStorage.setItem('data_5', value)
            }

        }
    };
    handleChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    };
    getFromLocalStorage = () =>{
      const data_1 = localStorage.getItem('data_1');
      const data_2 = localStorage.getItem('data_2');
      const data_3 = localStorage.getItem('data_3');
      const data_4 = localStorage.getItem('data_4');
      const data_5 = localStorage.getItem('data_5')

    };
    getAutoData = () =>{
        fetch(`http://localhost:7070/location/ip`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
            }
        })
            .then((response)=>{
                response.json()
                    .then((data)=>{
                        this.setSeasonImage(data.season)
                        this.setState({
                            data:data,
                            season:data.season,
                            day_1:data.day_1,
                            day_2:data.day2,
                            day_3:data.day3,
                            day_4:data.day4,
                            day_5:data.day5,
                            day_6:data.day6,
                            search:''

                        })
                    })
            })
            .catch((error)=>{
                console.log(error)
            })
    };
    getWeatherData = (value) =>{
        fetch(`http://localhost:7070/location/${value}/main`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
            }
        })
            .then((response)=>{
                response.json()
                    .then((data)=>{
                        this.setSeasonImage(data.season)
                        this.setState({
                            data:data,
                            season:data.season,
                            day_1:data.day_1,
                            day_2:data.day2,
                            day_3:data.day3,
                            day_4:data.day4,
                            day_5:data.day5,
                            day_6:data.day6,
                            search:''

                        })
                    })
            })
            .catch((error)=>{
                console.log(error)
            })
    };
    render() {
        const {data, seasonImg, day_1, day_2, day_3, day_4, day_5, day_6} = this.state;
        const {classes} = this.props;

        return(
            <div className="home_div1">
                <div className="home_div2">
                    <Grid>
                        <Grid container
                              direction="row"
                              justify="space-between"
                              alignItems="center" className={classes.grid_classes_12} item sm={12}>
                            <div>
                                <Grid>
                                    <img className="twitter_class" src={Twitter}/>
                                    <img className="instagram_class" src={Instagram}/>
                                </Grid>

                            </div>


                            <div>
                                <p className="Wearest_class">Wearest</p>
                            </div>
                            <div>
                                <div className="form_div_class">
                                    <from>
                                        <button className="classes_search_icon"><i className="fa fa-search"></i></button>

                                        <input value={this.state.search} name="search" onChange={this.handleChange} className="text_input_class" placeholder="search place" onKeyDown={this.searchData}/>
                                    </from>

                                </div>
                            </div>
                        </Grid>
                        <Grid container item sm={12}>
                            <Grid item sm={2}>
                                <Grid container
                                      direction="column"
                                      justify="center"
                                      alignItems="center">
                                    <Grid >
                                        <Grid container>
                                            <div>
                                                <img className="snow_small_class" src={seasonImg != null && seasonImg}/>
                                                <p className="small_winter_class">{day_1 != null && day_1.season}</p>
                                            </div>
                                            <div className="verticalLine"></div>
                                            <div>
                                                <Grid container direction="row">
                                                    <div>
                                                        <Grid className={classes._day_grid_1} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">

                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_1 != null && day_1.day_data.d_1}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_1 != null && day_1.day_data.d_2}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_1 != null && day_1.day_data.d_3}</Typography>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid className={classes.digre_2_text} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">
                                                            <Typography style={{fontSize:"30px", fontWeight:"bold", fontFamily:"Noto Serif"}}>{day_1 != null && day_1.c_temperature}</Typography>
                                                        </Grid>

                                                    </div>
                                                    <div className="digre_class">

                                                    </div>


                                                </Grid>

                                            </div>

                                        </Grid>


                                    </Grid>
                                    <Grid className={classes.grid_1}>
                                        <Grid container>
                                            <div>
                                                <img className="snow_small_class" src={seasonImg != null && seasonImg}/>
                                                <p className="small_winter_class">{day_2 != null && day_2.season}</p>
                                            </div>
                                            <div className="verticalLine"></div>
                                            <div>
                                                <Grid container direction="row">
                                                    <div>
                                                        <Grid className={classes._day_grid_1} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">

                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_2 != null && day_2.day_data.d_1}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_2 != null && day_2.day_data.d_2}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_2 != null && day_2.day_data.d_3}</Typography>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid className={classes.digre_2_text} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">
                                                            <Typography style={{fontSize:"30px", fontWeight:"bold", fontFamily:"Noto Serif"}}>{day_2 != null && day_2.c_temperature}</Typography>
                                                        </Grid>

                                                    </div>
                                                    <div className="digre_class">

                                                    </div>


                                                </Grid>

                                            </div>

                                        </Grid>


                                    </Grid>
                                    <Grid className={classes.grid_1}>
                                        <Grid container>
                                            <div>
                                                <img className="snow_small_class" src={seasonImg != null && seasonImg}/>
                                                <p className="small_winter_class">{day_3 != null && day_3.season}</p>
                                            </div>
                                            <div className="verticalLine"></div>
                                            <div>
                                                <Grid container direction="row">
                                                    <div>
                                                        <Grid className={classes._day_grid_1} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">

                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_3 != null && day_3.day_data.d_1}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_3 != null && day_3.day_data.d_2}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_3 != null && day_3.day_data.d_3}</Typography>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid className={classes.digre_2_text} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">
                                                            <Typography style={{fontSize:"30px", fontWeight:"bold", fontFamily:"Noto Serif"}}>{day_3 != null && day_3.c_temperature}</Typography>
                                                        </Grid>

                                                    </div>
                                                    <div className="digre_class">

                                                    </div>


                                                </Grid>

                                            </div>

                                        </Grid>


                                    </Grid>
                                    <Grid className={classes.grid_1}>
                                        <Grid container>
                                            <div>
                                                <img className="snow_small_class" src={seasonImg != null && seasonImg}/>
                                                <p className="small_winter_class">{day_4 != null && day_4.season}</p>
                                            </div>
                                            <div className="verticalLine"></div>
                                            <div>
                                                <Grid container direction="row">
                                                    <div>
                                                        <Grid className={classes._day_grid_1} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">

                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_4 != null && day_4.day_data.d_1}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_4 != null && day_4.day_data.d_2}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_4 != null && day_4.day_data.d_3}</Typography>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid className={classes.digre_2_text} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">
                                                            <Typography style={{fontSize:"30px", fontWeight:"bold", fontFamily:"Noto Serif"}}>{day_4 != null && day_4.c_temperature}</Typography>
                                                        </Grid>

                                                    </div>
                                                    <div className="digre_class">

                                                    </div>


                                                </Grid>

                                            </div>

                                        </Grid>


                                    </Grid>
                                    <Grid className={classes.grid_1}>
                                        <Grid container>
                                            <div>
                                                <img className="snow_small_class" src={seasonImg != null && seasonImg}/>
                                                <p className="small_winter_class">{day_5 != null && day_5.season}</p>
                                            </div>
                                            <div className="verticalLine"></div>
                                            <div>
                                                <Grid container direction="row">
                                                    <div>
                                                        <Grid className={classes._day_grid_1} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">

                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_5 != null && day_5.day_data.d_1}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_5 != null && day_5.day_data.d_2}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_5 != null && day_5.day_data.d_3}</Typography>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid className={classes.digre_2_text} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">
                                                            <Typography style={{fontSize:"30px", fontWeight:"bold", fontFamily:"Noto Serif"}}>{day_5 != null && day_5.c_temperature}</Typography>
                                                        </Grid>

                                                    </div>
                                                    <div className="digre_class">

                                                    </div>


                                                </Grid>

                                            </div>

                                        </Grid>


                                    </Grid>
                                    <Grid className={classes.grid_1}>
                                        <Grid container>
                                            <div>
                                                <img className="snow_small_class" src={seasonImg != null && seasonImg}/>
                                                <p className="small_winter_class">{day_6 != null && day_6.season}</p>
                                            </div>
                                            <div className="verticalLine"></div>
                                            <div>
                                                <Grid container direction="row">
                                                    <div>
                                                        <Grid className={classes._day_grid_1} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">

                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_6 != null && day_6.day_data.d_1}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_6 != null && day_6.day_data.d_2}</Typography>
                                                            <Typography style={{fontWeight:"bold", fontSize:"9px"}}>{day_6 != null && day_6.day_data.d_3}</Typography>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid className={classes.digre_2_text} container
                                                              direction="column"
                                                              justify="space-evenly"
                                                              alignItems="center">
                                                            <Typography style={{fontSize:"30px", fontWeight:"bold", fontFamily:"Noto Serif"}}>{day_6 != null && day_6.c_temperature}</Typography>
                                                        </Grid>

                                                    </div>
                                                    <div className="digre_class">

                                                    </div>


                                                </Grid>

                                            </div>

                                        </Grid>


                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid sm={10} item>
                                <Grid container
                                      direction="row"
                                      justify="center"
                                      alignItems="center">
                                    <div>
                                        <Grid className={classes.main_grid_class} container
                                              direction="row"
                                              justify="center"
                                              alignItems="center">
                                            <Grid>


                                                <Grid container direction="row"
                                                      justify="flex-start"
                                                      alignItems="center">


                                                    <Grid container>
                                                        <div>
                                                            <Grid container direction="column"
                                                                  justify="center"
                                                                  alignItems="center">
                                                                <img className="large_snow_img" src={seasonImg != null && seasonImg}/>
                                                                <p className="large_winter_text">{this.state.season != null && this.state.season}</p>
                                                            </Grid>
                                                        </div>

                                                        <div className="large_vartical"></div>
                                                        <div>
                                                            <Typography gutterBottom component="h1" variant="h1" style={{ marginTop:"10px",fontFamily:"Noto Serif", fontWeight:"bold"}}>{data!= null && data.c_temperature}</Typography>
                                                        </div>
                                                        <div className="large_digre_div"></div>

                                                    </Grid>

                                                </Grid>

                                                <div>


                                                            <Grid>
                                                                <Typography variant="h5" style={{fontWeight:"bold"}}>{data != null && data.forecasts.date}</Typography>
                                                            </Grid>
                                                            <Grid container
                                                                  direction="row"
                                                                  justify="center"
                                                                  alignItems="center">
                                                                <Typography>{data != null && data.city+", "+data.country}</Typography>
                                                            </Grid>


                                                </div>

                                            </Grid>
                                            <Avatar style={{marginLeft:"80px",width:"320px", height:"320px"}} src={Snowman}/>
                                        </Grid>
                                    </div>

                                </Grid>




                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
Home.propTypes = {
    classes:PropType.object.isRequired
};
export default withStyles(style)(Home)

