import { Grid } from "@mui/material";

export const ImagemBanner: React.FC = () => {
  return (
    <Grid
      sm={4}
      md={7}
      sx={{
        backgroundImage: "url(techRecados.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "20%",
      }}
    />
  );
};


/*import styled from 'styled-components';
import imagebg from '../../assets/techRecados.png';


const BannerImage = styled.figure`
  width: 30%;
  height: 100%;
  background-image: url(${imagebg});
  background-size: cover;
  background-position: center;

`;*/



