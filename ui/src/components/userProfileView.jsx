import { Grid } from "@mantine/core";
import API from "../utils/api";

export default (props) => {
    return(
        <Grid>
            <Grid.Col xs={4}>
                <img src={API.imageView(props?.profilePictureMedia)} style={{height: 100, width: 100, objectFit: 'contain', borderRadius: '50%'}}/>
            </Grid.Col>
            <Grid.Col xs={8}>
                <h4 style={{textAlign: 'left'}}>{props.name}</h4>
                <h6 style={{textAlign: 'left'}}>{props.email}</h6>
            </Grid.Col>
        </Grid>
    )
}