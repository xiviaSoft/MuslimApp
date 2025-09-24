import { CustomCard } from "@muc/components";
import { Grid } from "@mui/material";



interface GalleryCardProps {
  id: string,
  name: string,
  age: number,
  // image?: string,

}

const GalleryCard = ({ id, name, age }: GalleryCardProps) => {
  return (
    <>
      <Grid container>

        <Grid md={3} p={2}>
          <CustomCard
            key={id}
            id={id}
            // height={'350px'}
            name={name}
            age={age}
            img={'assets/images/girl-i'}
          // rating={item.rating}
          // location={item.location}
          // countryFlag={item.countryflag}
          // profession={item.profession}
          />
        </Grid>

      </Grid>
    </>
  );
};

export default GalleryCard;
