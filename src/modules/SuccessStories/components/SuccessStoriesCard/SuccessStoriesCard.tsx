import { useState } from "react";
import { COLORS } from "@muc/constants";
import { Box, Stack, Typography } from "@mui/material";
import { CustomButton } from "@muc/components";

const SuccessStoriesCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Stack>
      <Box component="img" src="/assets/images/video_pic_4.jpg" />
      <Stack
        direction="row"
        justifyContent="center"
        gap="20px"
        fontSize="40px"
        lineHeight={1.4}
        alignItems="center"
      >
        <Typography sx={{ fontSize: "40px", color: COLORS.secondary.main }}>
          Muhammad
        </Typography>
        <span style={{ color: COLORS.gray.darkGray }}>&</span>
        <Typography sx={{ fontSize: "40px", color: COLORS.primary.main }}>
          Anila
        </Typography>
      </Stack>
      <Stack
        sx={{
          position: "relative",
          padding: 2,
          borderRadius: "5px",
          // bgcolor: COLORS.secondary.main,
          bgcolor: " #D26981",
          color: COLORS.white.main,
        }}
      >
        <Typography
          variant="h5"
          fontSize="20px"
          sx={{ color: COLORS.white.main }}
        >
          Our story
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxHeight: isExpanded ? "300px" : "auto",
            whiteSpace: isExpanded ? "normal" : "nowrap",
            overflow: isExpanded ? "auto" : "hidden",
            textOverflow: isExpanded ? "clip" : "ellipsis",
            transition: "all 0.3s ease",
            color: COLORS.white.main,
            overflowY: isExpanded ? "auto" : "hidden",

            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: COLORS.primary.main,
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: COLORS.gray.lightGray,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: COLORS.gray.lightDarkGray,
            },
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus error
          sapiente corporis porro hic cum iure? Quisquam maiores repudiandae
          itaque temporibus culpa nesciunt ratione hic optio quis placeat
          suscipit eveniet quos, sapiente, quidem expedita laboriosam nihil
          pariatur enim obcaecati quia et. Distinctio doloremque officia unde
          alias magni fuga? Natus explicabo, dolorum distinctio accusamus
          mollitia quam illo fugiat quibusdam eveniet quaerat cumque consectetur
          quos expedita repellat. Molestiae mollitia porro iste laboriosam
          dolorum ipsum, aliquid blanditiis repellat id veniam doloremque beatae
          eaque reiciendis odio fugit deleniti laborum fuga vitae sed maiores
          sunt eveniet, optio rerum. Fugit numquam nisi, recusandae nihil illum
          alias reprehenderit sapiente pariatur officia nam suscipit quisquam
          enim eum corrupti cupiditate eius, dignissimos exercitationem.
          Doloribus beatae veritatis, qui, nobis veniam iste officiis fuga velit
          deleniti sint nihil, numquam voluptatibus suscipit voluptas! In maxime
          iste numquam cum aut odio, ratione obcaecati adipisci amet eveniet
          nemo ullam optio. Laborum molestiae nisi ducimus earum totam
          distinctio et sit quia nemo facere quisquam excepturi, sunt tempore
          cupiditate quis nobis voluptate quasi. Laborum quidem consequatur at
          facere eligendi tempora dolorum iure quae ea. Nesciunt ut ratione,
          itaque, sit, possimus maxime porro vitae quia qui cum dolorem facere!
          Sit aspernatur ad impedit nam illum temporibus ipsa a ratione,
          veritatis vel doloremque sunt consectetur ipsam culpa recusandae nisi
          laborum architecto perspiciatis quo nostrum libero earum cumque
          repudiandae quidem. Veniam, esse aliquid iure, itaque aliquam quod
          fugiat quasi dolorum voluptas vitae laboriosam quibusdam quidem sit?
          Nobis, unde, tempore laboriosam deserunt aliquam minima odio excepturi
          suscipit, odit nam reprehenderit! Officia, quod cumque, ipsa,
          repudiandae laborum eius dolorum perferendis quibusdam optio earum
          nobis error libero voluptatibus voluptatem. Necessitatibus beatae,
          iure nisi sunt laudantium quis maxime, ducimus nesciunt, doloremque
          dicta iste numquam. Sequi, ipsa porro nemo reiciendis neque
          necessitatibus corporis odio amet nisi quibusdam repellat? Excepturi
          cumque, beatae dicta pariatur cum eos, maiores omnis provident nemo,
          quod dolore ea aspernatur molestiae obcaecati tenetur. Doloribus
          obcaecati quasi, inventore exercitationem enim excepturi, facere
          voluptates eveniet culpa rerum repellendus quae libero deserunt porro!
          Reprehenderit sequi ullam cum aperiam ipsam quae alias? Tempore magni
          qui eum veniam cumque repellendus quisquam quasi fuga a assumenda
          eveniet, quod suscipit omnis id voluptates sunt iure saepe explicabo
          nesciunt nihil. Asperiores, quasi. Odit consectetur incidunt error
          ullam pariatur quia doloremque expedita, est exercitationem ad tenetur
          earum facilis, corporis illo at maxime eum. Dolores temporibus
          praesentium consectetur perspiciatis minima tempora? Accusamus neque
          sed fugit voluptas ipsum dolore obcaecati consequuntur tempore!
        </Typography>

        <CustomButton
          onClick={handleToggle}
          variant="outlined"
          color={COLORS.white.main}
          title={isExpanded ? "Read Less" : "Read More"}
          height="32px"
          width="120px"
        />
        {isExpanded && (
          <>
            <Box
              component="img"
              src="/assets/images/HeartPoster.png"
              sx={{
                width: "200px",
                height: "auto",
                position: "absolute",
                left: "0",
                bottom: "-2%",
                opacity: ".4",
              }}
            />
            <Box
              component="img"
              src="/assets/images/HeartPoster.png"
              sx={{
                width: "200px",
                height: "auto",
                position: "absolute",
                right: "0",
                top: "0",
                opacity: ".3",
              }}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default SuccessStoriesCard;
